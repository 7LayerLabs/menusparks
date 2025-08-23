import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const referralCode = params.code?.toUpperCase()
    
    if (!referralCode || !supabase) {
      return NextResponse.json(
        { valid: false, error: 'Invalid request' },
        { status: 400 }
      )
    }

    // Check if referral code exists
    const { data, error } = await supabase
      .from('email_captures')
      .select('email, referral_count')
      .eq('referral_code', referralCode)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { valid: false, error: 'Invalid referral code' },
        { status: 404 }
      )
    }

    // Return referrer info (without exposing full email)
    const maskedEmail = data.email.substring(0, 3) + '***@' + data.email.split('@')[1]
    
    return NextResponse.json({
      valid: true,
      referralCode,
      referrer: maskedEmail,
      message: `You were referred by ${maskedEmail}!`
    })
  } catch (error) {
    console.error('Referral validation error:', error)
    return NextResponse.json(
      { valid: false, error: 'Server error' },
      { status: 500 }
    )
  }
}