import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { promo_id, email, stripe_customer_id, tier } = await request.json()

    if (!promo_id || !email) {
      return NextResponse.json(
        { success: false, message: 'Promo ID and email are required' },
        { status: 400 }
      )
    }

    // Call the use_promo_code function
    const { data, error } = await supabase
      .rpc('use_promo_code', {
        p_promo_id: promo_id,
        p_email: email,
        p_stripe_customer_id: stripe_customer_id || null,
        p_tier: tier || null
      })

    if (error) {
      console.error('Promo usage error:', error)
      return NextResponse.json(
        { success: false, message: 'Error recording promo code usage' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: data, message: data ? 'Promo code applied' : 'Failed to apply promo code' })
  } catch (error) {
    console.error('Promo usage error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}