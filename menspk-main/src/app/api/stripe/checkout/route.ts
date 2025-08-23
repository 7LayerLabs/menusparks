import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
})

export async function POST(request: NextRequest) {
  try {
    const { priceId, mode = 'subscription' } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/#pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    }

    // Only add customer_creation for payment mode
    if (mode === 'payment') {
      sessionConfig.customer_creation = 'always'
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}