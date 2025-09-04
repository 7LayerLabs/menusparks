import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/emailService'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as any
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Get customer email and details
        const customerEmail = session.customer_email || session.customer_details?.email
        const stripeCustomerId = session.customer as string
        
        if (customerEmail && supabase) {
          // Check if customer exists
          const { data: existingCustomer } = await supabase
            .from('customers')
            .select('*')
            .eq('email', customerEmail)
            .single()

          if (!existingCustomer) {
            // Get referral code from metadata if present
            const referralCode = session.metadata?.referral_code || null
            
            // Determine subscription tier based on price
            let tier = 'unknown'
            if (session.amount_total) {
              // These are in cents
              if (session.amount_total === 1000 || session.amount_total === 42000) {
                tier = 'appetizer'
              } else if (session.amount_total === 2000 || session.amount_total === 84000) {
                tier = 'main_meal'
              }
            }

            // Create new customer
            const { data: newCustomer, error } = await supabase
              .from('customers')
              .insert([{
                email: customerEmail,
                stripe_customer_id: stripeCustomerId,
                referred_by: referralCode,
                subscription_status: 'active',
                subscription_tier: tier,
                total_revenue: (session.amount_total || 0) / 100
              }])
              .select()
              .single()

            if (error) {
              console.error('Error creating customer:', error)
            } else {
              console.log('New paying customer created:', newCustomer)
              // Send welcome email
              await sendWelcomeEmail(customerEmail, {
                tier: tier,
                profileLink: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://menusparks.com'}/profile`
              })
            }
          } else {
            // Update existing customer
            await supabase
              .from('customers')
              .update({
                stripe_customer_id: stripeCustomerId,
                subscription_status: 'active',
                total_revenue: existingCustomer.total_revenue + ((session.amount_total || 0) / 100),
                updated_at: new Date().toISOString()
              })
              .eq('id', existingCustomer.id)
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        if (supabase) {
          // Update customer status to cancelled
          await supabase
            .from('customers')
            .update({
              subscription_status: 'cancelled',
              updated_at: new Date().toISOString()
            })
            .eq('stripe_customer_id', subscription.customer as string)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        if (supabase) {
          // Update subscription status
          await supabase
            .from('customers')
            .update({
              subscription_status: subscription.status,
              updated_at: new Date().toISOString()
            })
            .eq('stripe_customer_id', subscription.customer as string)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Disable body parsing, need raw body for webhook
export const config = {
  api: {
    bodyParser: false
  }
}