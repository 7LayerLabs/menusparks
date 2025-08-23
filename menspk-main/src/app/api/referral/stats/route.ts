import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email || !supabase) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }

    // Get user's referral stats
    const { data, error } = await supabase
      .from('email_captures')
      .select('referral_code, referral_count')
      .eq('email', email)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Email not found in waitlist' },
        { status: 404 }
      )
    }

    // Calculate rewards
    const rewards = {
      referralCode: data.referral_code,
      totalReferrals: data.referral_count || 0,
      freeWeeks: Math.floor((data.referral_count || 0) / 3), // 1 free week per 3 referrals
      nextMilestone: 3 - ((data.referral_count || 0) % 3),
      shareUrl: `https://menusparks.com?ref=${data.referral_code}`
    }

    return NextResponse.json(rewards)
  } catch (error) {
    console.error('Referral stats error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}