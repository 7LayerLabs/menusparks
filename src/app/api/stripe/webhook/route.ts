import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const TIER_MONTHLY_LIMITS: Record<string, number> = {
  quick_byte: 20,
  chefs_choice: 40,
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier;

        if (!userId || !tier) {
          console.error('[Stripe Webhook] Missing metadata on checkout.session.completed', session.id);
          break;
        }

        const monthlyGenerationLimit = TIER_MONTHLY_LIMITS[tier] ?? 20;

        await prisma.subscription.create({
          data: {
            userId,
            tier,
            status: 'active',
            stripeSubscriptionId: session.subscription as string,
            monthlyGenerationLimit,
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { stripeCustomerId: session.customer as string },
        });

        console.log(`[Stripe Webhook] Subscription created for user ${userId} — tier: ${tier}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: 'cancelled' },
        });
        console.log(`[Stripe Webhook] Subscription cancelled: ${subscription.id}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const stripeSubId = (invoice as any).subscription as string | null;
        if (stripeSubId) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: stripeSubId },
            data: { status: 'past_due' },
          });
          console.log(`[Stripe Webhook] Payment failed, subscription marked past_due: ${stripeSubId}`);
        }
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`[Stripe Webhook] Error handling event ${event.type}:`, err);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
