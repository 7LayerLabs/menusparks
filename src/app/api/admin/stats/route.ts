import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const [
    totalUsers,
    totalGenerations,
    activeSubscriptions,
    users,
    recentGenerations,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.recipeGeneration.count(),
    prisma.subscription.count({ where: { status: 'active' } }),
    prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        generationsUsed: true,
        generationsThisMonth: true,
        createdAt: true,
        isAdmin: true,
        subscriptions: {
          where: { status: 'active' },
          select: { tier: true, status: true },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.recipeGeneration.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userId: true,
        recipeCount: true,
        mealTypes: true,
        recipeStyle: true,
        complexity: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    totalUsers,
    totalGenerations,
    activeSubscriptions,
    users,
    recentGenerations,
  });
}
