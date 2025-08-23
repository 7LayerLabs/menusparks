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

    // Get CUSTOMER's referral stats (not waitlist)
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Not a paying customer. Only active subscribers can refer others.' },
        { status: 404 }
      )
    }

    if (data.subscription_status !== 'active') {
      return NextResponse.json(
        { error: 'Your subscription is not active. Reactivate to use referrals.' },
        { status: 403 }
      )
    }

    // Calculate rewards based on PAID referrals only
    const rewards = {
      referralCode: data.referral_code,
      totalReferrals: data.paid_referral_count || 0,
      freeWeeksEarned: data.free_weeks_earned || 0,
      subscriptionTier: data.subscription_tier,
      nextReward: `${(data.paid_referral_count || 0) + 1} paid referral${(data.paid_referral_count || 0) + 1 > 1 ? 's' : ''}`,
      shareUrl: `https://menusparks.com?ref=${data.referral_code}`,
      message: `You earn 1 free week for every friend who becomes a paying customer!`
    }

    return NextResponse.json(rewards)
  } catch (error) {
    console.error('Customer referral stats error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}