import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

const FREE_TRIAL_LIMIT = 5;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscriptions: {
        where: { status: 'active' },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Admins have unlimited generations
  if (user.isAdmin) {
    return NextResponse.json({
      generationsUsed: user.generationsUsed,
      isSubscribed: true,
      isAdmin: true,
      freeTrialLimit: null,
      freeTrialRemaining: null,
      monthlyLimit: null,
      monthlyUsed: null,
      monthlyRemaining: null,
      tier: 'admin',
      canGenerate: true,
    });
  }

  const activeSubscription = user.subscriptions?.[0] ?? null;
  const isSubscribed = !!activeSubscription;
  const generationsUsed = user.generationsUsed;

  if (!isSubscribed) {
    const freeTrialRemaining = Math.max(0, FREE_TRIAL_LIMIT - generationsUsed);
    return NextResponse.json({
      generationsUsed,
      isSubscribed: false,
      freeTrialLimit: FREE_TRIAL_LIMIT,
      freeTrialRemaining,
      monthlyLimit: null,
      monthlyUsed: null,
      monthlyRemaining: null,
      tier: null,
      canGenerate: freeTrialRemaining > 0,
    });
  }

  const monthlyLimit = activeSubscription.monthlyGenerationLimit;
  const monthlyUsed = user.generationsThisMonth;
  const monthlyRemaining = Math.max(0, monthlyLimit - monthlyUsed);

  return NextResponse.json({
    generationsUsed,
    isSubscribed: true,
    freeTrialLimit: FREE_TRIAL_LIMIT,
    freeTrialRemaining: 0,
    monthlyLimit,
    monthlyUsed,
    monthlyRemaining,
    tier: activeSubscription.tier,
    canGenerate: monthlyRemaining > 0,
  });
}
