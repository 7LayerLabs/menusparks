import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  generationsUsed: number;
  generationsThisMonth: number;
  createdAt: Date;
  isAdmin: boolean;
  subscriptions: { tier: string; status: string }[];
};

type AdminGeneration = {
  id: string;
  userId: string;
  recipeCount: number;
  mealTypes: string;
  recipeStyle: string;
  complexity: string;
  createdAt: Date;
  user: { email: string };
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  if (!session.user.isAdmin) {
    redirect('/dashboard');
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
        user: { select: { email: true } },
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200">
      {/* Header */}
      <nav className="sticky top-0 z-40 bg-[#0d1117]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-orange-400 tracking-tight">MenuSparks</span>
              <span className="text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Admin
              </span>
            </div>
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-lg transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Total Users</p>
            <p className="text-4xl font-black text-orange-400">{totalUsers}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Total Generations</p>
            <p className="text-4xl font-black text-orange-400">{totalGenerations}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Active Subscriptions</p>
            <p className="text-4xl font-black text-orange-400">{activeSubscriptions}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-sm font-black uppercase tracking-widest text-orange-400">
              All Users ({users.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Gen Total</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Gen Month</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Subscription</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Joined</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Role</th>
                </tr>
              </thead>
              <tbody>
                {(users as AdminUser[]).map((user) => {
                  const sub = user.subscriptions[0];
                  return (
                    <tr key={user.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                      <td className="px-6 py-3 text-gray-300">{user.email}</td>
                      <td className="px-6 py-3 text-gray-400">{user.name || '—'}</td>
                      <td className="px-6 py-3 text-gray-300 font-mono">{user.generationsUsed}</td>
                      <td className="px-6 py-3 text-gray-300 font-mono">{user.generationsThisMonth}</td>
                      <td className="px-6 py-3">
                        {sub ? (
                          <span className="text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full capitalize">
                            {sub.tier}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-600">free</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-gray-500 text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        {user.isAdmin ? (
                          <span className="text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                            admin
                          </span>
                        ) : (
                          <span className="text-xs text-gray-600">user</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Generations Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-sm font-black uppercase tracking-widest text-orange-400">
              Recent Generations (last 20)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">User</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Count</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Meal Types</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Style</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Complexity</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {(recentGenerations as AdminGeneration[]).map((gen) => (
                  <tr key={gen.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                    <td className="px-6 py-3 text-gray-400 text-xs">{gen.user.email}</td>
                    <td className="px-6 py-3 text-gray-300 font-mono">{gen.recipeCount}</td>
                    <td className="px-6 py-3 text-gray-300 text-xs max-w-[160px] truncate">{gen.mealTypes}</td>
                    <td className="px-6 py-3">
                      <span className="text-xs font-semibold text-orange-400/80 capitalize">{gen.recipeStyle}</span>
                    </td>
                    <td className="px-6 py-3 text-gray-400 text-xs capitalize">{gen.complexity}</td>
                    <td className="px-6 py-3 text-gray-500 text-xs">
                      {new Date(gen.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
