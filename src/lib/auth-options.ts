import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }
        const isCorrectPassword = await compare(credentials.password, user.password);
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }
        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { isAdmin: true } });
        token.isAdmin = dbUser?.isAdmin ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Fires after PrismaAdapter commits the new user row — safe to FK-reference it now
      const adminEmail = process.env.ADMIN_EMAIL;
      await prisma.user.update({
        where: { id: user.id },
        data: { isAdmin: !!(adminEmail && user.email === adminEmail) },
      });
      await prisma.userRestaurantProfile.create({ data: { userId: user.id } });
      await prisma.userSocialSettings.create({ data: { userId: user.id } });
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
