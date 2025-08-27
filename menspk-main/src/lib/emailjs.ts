// EmailJS configuration for sending welcome emails
// Sign up at https://www.emailjs.com to get your keys (FREE - 200 emails/month)

interface EmailParams {
  to_email: string
  to_name?: string
  referral_code?: string
  referred_by?: string
}

// These will be added to environment variables
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

export async function sendWelcomeEmail(params: EmailParams): Promise<boolean> {
  // Skip if EmailJS is not configured
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.log('EmailJS not configured - skipping welcome email')
    return false
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          to_email: params.to_email,
          to_name: params.to_name || params.to_email.split('@')[0],
          referral_code: params.referral_code || '',
          referred_by: params.referred_by || '',
          // Additional template variables
          website_url: 'https://menusparks.com',
          referral_link: params.referral_code 
            ? `https://menusparks.com?ref=${params.referral_code}`
            : '',
        },
      }),
    })

    if (response.ok) {
      console.log('Welcome email sent successfully to:', params.to_email)
      return true
    } else {
      const error = await response.text()
      console.error('EmailJS error:', error)
      return false
    }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return false
  }
}

// Email template content for reference (you'll create this in EmailJS dashboard)
export const WELCOME_EMAIL_TEMPLATE = `
Subject: 🎉 Welcome to MenuSparks - You're on the Waitlist!

Hi {{to_name}},

Welcome to MenuSparks! 🚀

You've secured your spot on our exclusive waitlist. We're launching soon and you'll be among the first to transform your restaurant's profitability with AI-powered menu optimization.

📊 What to Expect:
• Save $5,600-$11,200 annually on food costs
• Turn excess inventory into profitable specials
• Get chef-quality recipes in seconds
• Professional marketing copy included

🎁 Your Referral Code: {{referral_code}}
Share this link with fellow restaurant owners: {{referral_link}}
When they become paying customers, you'll earn $5 in credits!

💡 While You Wait - Quick Win:
Calculate your potential savings: https://menusparks.com/calculator

We're onboarding restaurants in the order they signed up. You'll receive an email when your spot opens up (typically within 2-3 weeks).

Questions? Reply to this email and we'll help you out.

To your restaurant's success,
The MenuSparks Team

P.S. Follow us for daily restaurant tips:
Twitter: @menusparks
LinkedIn: MenuSparks
`