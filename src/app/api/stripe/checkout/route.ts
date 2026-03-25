import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';
import { authOptions } from '@/lib/auth-options';
import stripeProductIds from '../../../../../stripe-product-ids.json';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Tier = 'quick_byte' | 'chefs_choice';

const TIER_PRICE_MAP: Record<Tier, string> = {
  quick_byte: stripeProductIds.quickBites.monthly,
  chefs_choice: stripeProductIds.chefsChoice.monthly,
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let tier: Tier;
  try {
    const body = await req.json();
    tier = body.tier;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!tier || !TIER_PRICE_MAP[tier]) {
    return NextResponse.json(
      { error: 'Invalid tier. Must be "quick_byte" or "chefs_choice".' },
      { status: 400 }
    );
  }

  const priceId = TIER_PRICE_MAP[tier];
  const baseUrl = process.env.NEXTAUTH_URL;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard?subscribed=true`,
    cancel_url: `${baseUrl}/dashboard`,
    customer_email: session.user.email ?? undefined,
    metadata: {
      userId: session.user.id,
      tier,
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
