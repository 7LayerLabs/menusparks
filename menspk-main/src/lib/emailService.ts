// Email service - now using SendGrid instead
// This file is kept for backwards compatibility
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_tk9f7ak'
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'kMJXzY8qzAGtmeqhE'

interface WelcomeEmailData {
  tier: string
  profileLink: string
}

export async function sendWelcomeEmail(customerEmail: string, data: WelcomeEmailData) {
  try {
    // Prepare the email template parameters
    const templateParams = {
      to_email: customerEmail,
      to_name: customerEmail.split('@')[0], // Use email prefix as name for now
      restaurant_name: '', // Will be filled when they complete profile
      tier_name: getTierDisplayName(data.tier),
      profile_link: data.profileLink,
      subject: 'Welcome to MenuSparks! Complete Your Profile to Get Started',
      message: getWelcomeMessage(data.tier)
    }

    // Send using EmailJS API (server-side)
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: 'template_welcome', // You'll need to create this template in EmailJS
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: templateParams
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    console.log('Welcome email sent successfully to:', customerEmail)
    return true
  } catch (error) {
    console.error('Error sending welcome email:', error)
    // Don't throw - we don't want to break the checkout flow if email fails
    return false
  }
}

function getTierDisplayName(tier: string): string {
  switch (tier) {
    case 'appetizer':
      return 'Quick Bite'
    case 'main_meal':
      return "Chef's Choice"
    case 'dessert':
      return 'Full Kitchen'
    default:
      return 'MenuSparks'
  }
}

function getWelcomeMessage(tier: string): string {
  const baseMessage = `Thank you for joining MenuSparks! You've taken the first step toward eliminating food waste and increasing your restaurant's profitability.

What happens next:

1. ✅ Payment Confirmed - Your subscription is now active
2. 📋 Complete Your Profile - Tell us about your restaurant (click the link below)
3. 🍽️ Receive Your First Specials - Within 24 hours of profile completion

Your ${getTierDisplayName(tier)} plan includes:
`

  switch (tier) {
    case 'appetizer':
      return baseMessage + `
• 5 weekly chef-created specials
• Basic ingredient optimization
• Simple prep instructions
• Email support

Click the button below to complete your restaurant profile and start receiving your custom specials!`

    case 'main_meal':
      return baseMessage + `
• 10 weekly chef-created specials
• Advanced customization options
• Social media content included
• Recipe performance analytics
• Priority support

Click the button below to complete your restaurant profile and start receiving your custom specials!`

    default:
      return baseMessage + `
Click the button below to complete your restaurant profile and start receiving your custom specials!`
  }
}

// Alternative: Send a simple welcome email using a basic template
export async function sendSimpleWelcomeEmail(customerEmail: string, tier: string) {
  // This is a backup method using fetch to your own API
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: customerEmail,
        subject: 'Welcome to MenuSparks! Complete Your Profile',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f97316, #ef4444); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">Welcome to MenuSparks!</h1>
            </div>
            
            <div style="padding: 30px; background: #ffffff;">
              <h2 style="color: #1f2937;">Your subscription is active! 🎉</h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thank you for choosing MenuSparks. You're now part of a community of smart restaurant owners 
                who are turning excess inventory into profit.
              </p>

              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">What Happens Next?</h3>
                <ol style="color: #4b5563; line-height: 1.8;">
                  <li><strong>Complete Your Profile</strong> - Tell us about your restaurant</li>
                  <li><strong>We Create Your Specials</strong> - Custom recipes within 24 hours</li>
                  <li><strong>Start Saving</strong> - Use inventory before it expires</li>
                </ol>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://menusparks.com'}/profile" 
                   style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #f97316, #ef4444); 
                          color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Complete Your Restaurant Profile →
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px; text-align: center;">
                Your ${getTierDisplayName(tier)} plan is now active. You'll receive your first batch of specials 
                within 24 hours of completing your profile.
              </p>
            </div>

            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Questions? Reply to this email or contact us at admin@menusparks.com
              </p>
            </div>
          </div>
        `
      })
    })

    return response.ok
  } catch (error) {
    console.error('Error sending simple welcome email:', error)
    return false
  }
}