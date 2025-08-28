import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any,
})

export async function GET(request: NextRequest) {
  try {
    // Create a simple test checkout session with inline price
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'MenuSparks Test - Appetizer Plan',
              description: 'Weekly subscription for testing',
            },
            unit_amount: 1000, // $10.00
            recurring: {
              interval: 'week',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/#pricing`,
    })

    // Redirect to checkout
    return NextResponse.redirect(session.url!)
  } catch (error: any) {
    console.error('Test checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create test checkout' },
      { status: 500 }
    )
  }
}