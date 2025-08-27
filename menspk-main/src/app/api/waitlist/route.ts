import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/emailjs'

export async function POST(request: NextRequest) {
  try {
    // Log environment variables (without exposing sensitive data)
    console.log('=== WAITLIST API DEBUG ===')
    console.log('Supabase URL configured:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Supabase Key configured:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    console.log('Supabase client exists:', !!supabase)
    console.log('URL value starts with https:', process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('https'))
    console.log('Key length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length)
    
    // Check if Supabase is configured
    if (!supabase) {
      console.error('Supabase not configured - missing environment variables')
      return NextResponse.json(
        { error: 'Database not configured. Please try again later.' },
        { status: 503 }
      )
    }

    const { email, source, referralCode } = await request.json()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('email_captures')
      .select('email')
      .eq('email', email)
      .single()

    if (existingEmail) {
      return NextResponse.json(
        { message: 'You\'re already on the waitlist!' },
        { status: 200 }
      )
    }

    // Insert into email_captures table
    const insertData: any = {
      email,
      source: source || 'website',
      created_at: new Date().toISOString()
    }
    
    // Add referral code if provided
    if (referralCode) {
      insertData.referred_by = referralCode.toUpperCase()
    }
    
    const { data, error } = await supabase
      .from('email_captures')
      .insert([insertData])
      .select('referral_code')

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add to waitlist', details: error.message },
        { status: 500 }
      )
    }

    // Send welcome email (non-blocking - don't wait for response)
    const userReferralCode = data?.[0]?.referral_code
    if (userReferralCode) {
      sendWelcomeEmail({
        to_email: email,
        referral_code: userReferralCode,
        referred_by: referralCode
      }).catch(err => {
        // Log error but don't fail the request
        console.error('Welcome email failed:', err)
      })
    }

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist!', 
        referralCode: userReferralCode,
        data 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}