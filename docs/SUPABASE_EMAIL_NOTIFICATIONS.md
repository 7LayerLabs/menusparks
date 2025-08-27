# 📧 Email Notification Setup for MenuSparks

## Option 1: Supabase Database Webhooks (Easiest - 5 minutes)

### Step 1: Enable Database Webhooks in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/fbzjjxhyfovvjjjqmyqw
2. Navigate to **Database** → **Webhooks**
3. Click **"Create a new hook"**
4. Configure:
   - **Name**: "Email Capture Notifications"
   - **Table**: `email_captures`
   - **Events**: Check only `INSERT`
   - **Type**: HTTP Request
   - **URL**: We'll use a service like Zapier or Make.com (see below)

### Step 2: Connect to Email Service (Choose One)

#### Option A: Zapier (Free tier available)
1. Sign up at https://zapier.com (free)
2. Create a new Zap:
   - **Trigger**: Webhooks by Zapier → Catch Hook
   - Copy the webhook URL
   - Paste it in Supabase webhook URL field
3. **Action**: Gmail or Outlook → Send Email
   - To: admin@menusparks.com
   - Subject: "New MenuSparks Waiting List Signup!"
   - Body: Include the email and source from webhook data
4. Turn on the Zap

#### Option B: Make.com (Free tier - 1000 operations/month)
1. Sign up at https://make.com (free)
2. Create scenario with Webhook trigger
3. Add Email module to send to admin@menusparks.com
4. Copy webhook URL to Supabase

---

## Option 2: Supabase Edge Functions (More Control)

### Create an Edge Function for Email Notifications

1. In Supabase Dashboard, go to **Edge Functions**
2. Click **"New Function"**
3. Name it: `email-notification`
4. Add this code:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = 'your-resend-api-key' // Get free at resend.com
const ADMIN_EMAIL = 'admin@menusparks.com'

serve(async (req) => {
  try {
    const { record } = await req.json()
    
    // Send email using Resend (free tier: 100 emails/month)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'MenuSparks <onboarding@resend.dev>',
        to: ADMIN_EMAIL,
        subject: '🎉 New Waiting List Signup!',
        html: `
          <h2>New MenuSparks Waiting List Signup</h2>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Source:</strong> ${record.source}</p>
          <p><strong>Restaurant:</strong> ${record.restaurant_name || 'Not provided'}</p>
          <p><strong>Time:</strong> ${new Date(record.created_at).toLocaleString()}</p>
          <br>
          <p>View all signups in your <a href="https://supabase.com/dashboard/project/fbzjjxhyfovvjjjqmyqw/editor">Supabase Dashboard</a></p>
        `,
      }),
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
```

5. Deploy the function
6. Create a Database Webhook (like Option 1) but use your Edge Function URL

---

## Option 3: Simple Email Forwarding (No Code Required)

### Use Supabase's Built-in Email Templates

1. Go to **Authentication** → **Email Templates**
2. You can't directly use this for custom notifications, but...
3. Create a Supabase Database Function (trigger):

```sql
-- Run this in SQL Editor
CREATE OR REPLACE FUNCTION notify_admin_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- This logs to Supabase logs (you can monitor these)
  RAISE LOG 'New signup: % from %', NEW.email, NEW.source;
  
  -- You could also insert into a separate "admin_notifications" table
  INSERT INTO admin_notifications (
    type,
    message,
    data,
    created_at
  ) VALUES (
    'new_signup',
    'New waiting list signup: ' || NEW.email,
    row_to_json(NEW),
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER on_email_capture
  AFTER INSERT ON email_captures
  FOR EACH ROW
  EXECUTE FUNCTION notify_admin_on_signup();

-- Create notifications table
CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT,
  message TEXT,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Option 4: Quick & Dirty - Email Form Service (5 minutes)

### Use a Form-to-Email Service
Instead of complex setup, use a service that emails form submissions:

1. **Formspree** (https://formspree.io)
   - Free tier: 50 submissions/month
   - Add to your frontend forms:
   ```javascript
   // In addition to saving to database
   await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     body: JSON.stringify({ email, source }),
     headers: { 'Content-Type': 'application/json' }
   })
   ```

2. **EmailJS** (https://www.emailjs.com)
   - Free tier: 200 emails/month
   - Direct from frontend to your email
   - No backend needed

---

## Recommended: Start Simple

For immediate results without complexity:

1. **For now**: Check Supabase dashboard daily at:
   https://supabase.com/dashboard/project/fbzjjxhyfovvjjjqmyqw/editor

2. **Quick notification**: Use Zapier free tier (5 minutes to set up)

3. **Long term**: When you have more signups, upgrade to a proper email service

---

## To Check Your Current Signups

1. Go to: https://supabase.com/dashboard/project/fbzjjxhyfovvjjjqmyqw/sql
2. Run this query:
```sql
SELECT * FROM email_captures ORDER BY created_at DESC;
```

Or use the Table Editor for a visual interface:
https://supabase.com/dashboard/project/fbzjjxhyfovvjjjqmyqw/editor

---

## Important Notes

- **Email sending limits**: Free tiers typically allow 50-200 emails/month
- **From address**: Most services require domain verification for custom "from" addresses
- **Compliance**: Add unsubscribe links when you start sending marketing emails
- **Testing**: Always test with your own email first

The simplest approach is checking the Supabase dashboard regularly until you need automated notifications.