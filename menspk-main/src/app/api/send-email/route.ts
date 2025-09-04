import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json()

    // For now, we'll use EmailJS API directly
    // In production, you might want to use SendGrid, Resend, or another service
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_tk9f7ak',
        template_id: 'template_custom', // You'll need to create a generic template
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'kMJXzY8qzAGtmeqhE',
        template_params: {
          to_email: to,
          subject: subject,
          html_content: html,
          from_name: 'MenuSparks',
          reply_to: 'admin@menusparks.com'
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}