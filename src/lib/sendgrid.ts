// SendGrid email service for MenuSparks
// This handles all transactional emails

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

interface WelcomeEmailData {
  tier: string
  profileLink: string
}

// SendGrid API configuration
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@menusparks.com'
const ADMIN_EMAIL = process.env.SENDGRID_ADMIN_EMAIL || 'admin@menusparks.com'

/**
 * Send email using SendGrid API
 */
async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured')
    return false
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: options.to }]
        }],
        from: { 
          email: FROM_EMAIL,
          name: 'MenuSparks'
        },
        subject: options.subject,
        content: [
          {
            type: 'text/plain',
            value: options.text || 'Please view this email in HTML'
          },
          {
            type: 'text/html',
            value: options.html
          }
        ]
      })
    })

    if (response.ok || response.status === 202) {
      console.log('Email sent successfully to:', options.to)
      return true
    } else {
      const error = await response.text()
      console.error('SendGrid error:', response.status, error)
      return false
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

/**
 * Send welcome email to new customer
 */
export async function sendWelcomeEmail(customerEmail: string, data: WelcomeEmailData) {
  const tierName = getTierDisplayName(data.tier)
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #f97316, #ef4444); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">Welcome to MenuSparks!</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 18px; opacity: 0.95;">Your ${tierName} plan is now active</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
            Thank you for choosing MenuSparks! You're now part of a community of smart restaurant owners who are turning excess inventory into profit.
          </p>

          <!-- What Happens Next -->
          <div style="background: #f9fafb; border-radius: 8px; padding: 24px; margin: 24px 0;">
            <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 16px 0;">What Happens Next?</h2>
            
            <div style="margin: 20px 0;">
              <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                <div style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">✓</div>
                <div>
                  <strong style="color: #1f2937;">Payment Confirmed</strong>
                  <p style="color: #6b7280; margin: 4px 0 0 0; font-size: 14px;">Your subscription is active and ready</p>
                </div>
              </div>

              <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                <div style="background: #f97316; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">2</div>
                <div>
                  <strong style="color: #1f2937;">Complete Your Profile</strong>
                  <p style="color: #6b7280; margin: 4px 0 0 0; font-size: 14px;">Tell us about your restaurant and inventory</p>
                </div>
              </div>

              <div style="display: flex; align-items: flex-start;">
                <div style="background: #f97316; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">3</div>
                <div>
                  <strong style="color: #1f2937;">Get Your First Specials</strong>
                  <p style="color: #6b7280; margin: 4px 0 0 0; font-size: 14px;">Delivered within 24 hours of profile completion</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Your Plan Includes -->
          <div style="margin: 24px 0;">
            <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0;">Your ${tierName} Plan Includes:</h3>
            ${getPlanFeatures(data.tier)}
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="${data.profileLink}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #f97316, #ef4444); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Complete Your Restaurant Profile →
            </a>
          </div>

          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 24px 0 0 0;">
            Once you complete your profile, we'll create your first batch of custom specials within 24 hours.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px 0;">
            Questions? Reply to this email or contact us at
          </p>
          <a href="mailto:admin@menusparks.com" style="color: #f97316; text-decoration: none; font-weight: 500;">admin@menusparks.com</a>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: customerEmail,
    subject: 'Welcome to MenuSparks - Complete Your Profile to Get Started',
    html,
    text: `Welcome to MenuSparks!\n\nYour ${tierName} plan is now active.\n\nNext steps:\n1. Complete your restaurant profile\n2. Receive your first custom specials within 24 hours\n\nComplete your profile here: ${data.profileLink}\n\nQuestions? Contact admin@menusparks.com`
  })
}

/**
 * Send notification email to admin
 */
export async function sendAdminNotification(subject: string, content: string) {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[MenuSparks Admin] ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #1f2937;">${subject}</h2>
        <div style="color: #4b5563; line-height: 1.6;">
          ${content}
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 12px;">
          This is an automated notification from MenuSparks.com
        </p>
      </div>
    `,
    text: content
  })
}

/**
 * Helper functions
 */
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

function getPlanFeatures(tier: string): string {
  const features = {
    appetizer: [
      '5 weekly chef-created specials',
      'Basic ingredient optimization',
      'Simple prep instructions',
      'Email support'
    ],
    main_meal: [
      '10 weekly chef-created specials',
      'Advanced customization options',
      'Social media content included',
      'Recipe performance analytics',
      'Priority support'
    ],
    dessert: [
      'Unlimited weekly recipes',
      'Pour Plan included (beverages)',
      'Seasonal menu planning',
      'Waste tracking & alerts',
      '1-on-1 consultation calls',
      'White-glove support'
    ]
  }

  const tierFeatures = features[tier as keyof typeof features] || features.appetizer
  
  return `<ul style="margin: 0; padding: 0; list-style: none;">
    ${tierFeatures.map(feature => 
      `<li style="color: #4b5563; font-size: 14px; margin: 8px 0; padding-left: 24px; position: relative;">
        <span style="position: absolute; left: 0; color: #10b981;">✓</span>
        ${feature}
      </li>`
    ).join('')}
  </ul>`
}