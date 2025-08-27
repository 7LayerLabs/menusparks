# 📧 EmailJS Setup for MenuSparks Welcome Emails

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account (FREE)

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up Free" (200 emails/month free)
3. Verify your email address

### Step 2: Add Email Service

1. In EmailJS Dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (easiest - use your personal Gmail)
   - **Outlook** 
   - **Custom SMTP** (for business email)
4. Click "Connect Account" and authorize
5. Name it: "MenuSparks"
6. Click "Create Service"
7. **Copy the Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template

1. Click "Email Templates" → "Create New Template"
2. Set Template Name: "Welcome Email"
3. Configure the template:

**Subject Line:**
```
🎉 Welcome to MenuSparks - You're on the Waitlist!
```

**From Name:**
```
MenuSparks
```

**From Email:**
```
Your verified email address
```

**To Email:**
```
{{to_email}}
```

**Reply To:**
```
support@menusparks.com (or your email)
```

**Email Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
    .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3; margin: 20px 0; }
    .cta-button { display: inline-block; background: #2196f3; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .referral-box { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to MenuSparks!</h1>
      <p>You're officially on the waitlist!</p>
    </div>
    
    <div class="content">
      <p>Hi <strong>{{to_name}}</strong>,</p>
      
      <p>Congratulations! You've secured your spot on the MenuSparks exclusive waitlist. 🚀</p>
      
      <p>We're putting the finishing touches on the platform that will transform how restaurants manage inventory and create profitable specials.</p>
      
      <div class="highlight">
        <h3>📊 What You'll Get:</h3>
        <ul>
          <li>Save <strong>$5,600-$11,200</strong> annually on food costs</li>
          <li>Turn excess inventory into profitable specials in seconds</li>
          <li>Chef-quality recipes with exact portions</li>
          <li>Marketing copy that sells</li>
          <li>Weekly specials delivered automatically</li>
        </ul>
      </div>
      
      <div class="referral-box">
        <h3>🎁 Your Referral Code</h3>
        <h2 style="color: #2196f3; margin: 10px 0;">{{referral_code}}</h2>
        <p>Share this link with fellow restaurant owners:</p>
        <p><a href="{{referral_link}}">{{referral_link}}</a></p>
        <p><small>Earn <strong>$5 in credits</strong> for each friend who becomes a paying customer!</small></p>
      </div>
      
      <h3>💡 While You Wait:</h3>
      <p>Calculate your exact savings potential:</p>
      <a href="https://menusparks.com/calculator" class="cta-button">Calculate My Savings →</a>
      
      <h3>⏰ What's Next?</h3>
      <p>We're onboarding restaurants in the order they signed up. You'll receive an invitation email when your spot opens up (typically within 2-3 weeks).</p>
      
      <p>In the meantime, follow us for daily restaurant profit tips:</p>
      <ul>
        <li>Twitter: <a href="https://twitter.com/menusparks">@menusparks</a></li>
        <li>LinkedIn: <a href="https://linkedin.com/company/menusparks">MenuSparks</a></li>
      </ul>
      
      <p>Have questions? Just reply to this email - we personally read every message.</p>
      
      <p>To your restaurant's success,<br>
      <strong>The MenuSparks Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© 2025 MenuSparks | <a href="https://menusparks.com">menusparks.com</a></p>
      <p>You're receiving this because you signed up for the MenuSparks waitlist.</p>
    </div>
  </div>
</body>
</html>
```

4. Click "Save"
5. **Copy the Template ID** (looks like: `template_xyz789`)

### Step 4: Get Your Public Key

1. Click "Account" → "General"
2. Find "Public Key" under API Keys
3. **Copy the Public Key** (looks like: `AbCdEfGhIjKlMnOpQrSt`)

### Step 5: Add to Environment Variables

Add these to your `.env.local` file:
```env
# EmailJS Configuration (FREE - 200 emails/month)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123    # Your Service ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789  # Your Template ID  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOpQrSt  # Your Public Key
```

### Step 6: Deploy to Vercel

Add the same environment variables in Vercel:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add all three EmailJS variables
3. Redeploy for changes to take effect

## Testing

1. Sign up with a test email on your site
2. Check that email inbox for the welcome message
3. Verify the referral code is included
4. Test the referral link works

## Email Limits

- **Free Plan**: 200 emails/month
- **Resets**: Monthly on your signup date
- **Upgrade**: $9/month for 1,000 emails when needed

## Troubleshooting

### Emails Not Sending?
1. Check EmailJS dashboard for logs
2. Verify environment variables are set
3. Check browser console for errors
4. Ensure email service is connected in EmailJS

### Gmail Blocking?
1. Use "Less secure app access" or
2. Create an App Password in Gmail settings
3. Use the App Password instead of regular password

### Rate Limiting?
- Free tier: Max 2 emails per second
- Implement queuing for bulk sends

## Optional Enhancements

### Add Admin Notification
Also send yourself a copy when someone signs up:
1. Create another template for admin notifications
2. Add a second `sendEmail` call in the API

### Custom Domain Email
For professional sending:
1. Verify your domain in EmailJS
2. Set up SPF/DKIM records
3. Use support@menusparks.com as sender

## Support

- EmailJS Docs: https://www.emailjs.com/docs/
- Status Page: https://status.emailjs.com/
- Contact: support@emailjs.com

---

✅ **That's it!** Your welcome emails are now automated and professional.