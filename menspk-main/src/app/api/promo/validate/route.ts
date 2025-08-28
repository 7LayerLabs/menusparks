import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { code, email, tier } = await request.json()

    if (!code || !email) {
      return NextResponse.json(
        { valid: false, message: 'Code and email are required' },
        { status: 400 }
      )
    }

    // Call the validate_promo_code function
    const { data, error } = await supabase
      .rpc('validate_promo_code', {
        p_code: code,
        p_email: email,
        p_tier: tier || null
      })

    if (error) {
      console.error('Promo validation error:', error)
      return NextResponse.json(
        { valid: false, message: 'Error validating promo code' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Promo validation error:', error)
    return NextResponse.json(
      { valid: false, message: 'Server error' },
      { status: 500 }
    )
  }
}