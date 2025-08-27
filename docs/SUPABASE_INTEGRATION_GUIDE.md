# 🔗 MenuSparks Unified Database Integration Guide

## Overview
This guide helps you connect your existing Supabase email captures with the new restaurant system, creating a unified database where **emails → restaurants → everything else**.

## 📊 Database Structure

```
contacts (master table) 
    ↓
restaurants (one per contact)
    ↓
├── inventory_submissions
├── generated_specials  
└── newsletter_subscriptions
```

## 🚀 Quick Setup (5 minutes)

### Step 1: Check Your Existing Tables
First, see what tables you already have in Supabase:

1. Go to your Supabase dashboard
2. Click **SQL Editor**
3. Run this query:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```
4. Note the name of your email capture table (likely `emails`, `email_captures`, `signups`, etc.)

### Step 2: Run the Integration SQL

1. Open `SUPABASE_UNIFIED_INTEGRATION.sql` 
2. Find your scenario:
   - **Option A**: If you want to add columns to your existing email table
   - **Option B**: If you want to create a new `contacts` table that links to emails
3. Copy the entire SQL file
4. Paste in Supabase SQL Editor
5. **IMPORTANT**: Uncomment the section that matches your setup
6. Click **Run**

### Step 3: Update Your .env.local

Make sure your `.env.local` has the real Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_anon_key...
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key...
```

### Step 4: Switch to Unified API Route

The unified API route (`route-unified.ts`) automatically:
- Links new restaurants to existing email captures
- Creates a contact if email doesn't exist
- Marks contacts as converted customers
- Maintains the connection between all data

To use it:
```bash
# Rename the files
cd menspk-main/menspk-main/src/app/api/restaurant/setup
mv route.ts route-old.ts
mv route-unified.ts route.ts
```

## 🔍 Test Your Integration

### 1. Test Email → Restaurant Flow
```sql
-- See all contacts and their restaurants
SELECT * FROM customer_overview;
```

### 2. Check Recent Activity
```sql
-- See what's happening in last 7 days
SELECT * FROM recent_activity;
```

### 3. Test Helper Function
```sql
-- Create a test restaurant for an email
SELECT create_restaurant_for_contact(
  'test@example.com', 
  'Test Restaurant', 
  'Italian'
);
```

## 📝 What Happens When Someone Signs Up

1. **Email Capture** (Hero/Footer form)
   - Email saved to `contacts` table
   - Source tracked (hero, footer, etc.)
   - `converted_to_customer` = false

2. **Stripe Checkout**
   - Contact updated with `stripe_customer_id`
   - `subscription_status` and `subscription_tier` set
   - `converted_to_customer` = true

3. **Restaurant Onboarding** (Success page)
   - Restaurant created linked to contact
   - Equipment and pricing preferences saved
   - Inventory submission recorded
   - First special generated

4. **Ongoing Use**
   - All specials linked to restaurant
   - All inventory linked to restaurant
   - Everything traces back to original email

## 🎯 Benefits of Unified Structure

1. **Single Source of Truth**: One email = one contact = one restaurant
2. **Conversion Tracking**: See who converted from email → customer
3. **Complete History**: Track journey from first signup to active user
4. **No Duplicates**: Email uniqueness enforced at contact level
5. **Easy Reporting**: Views show everything connected

## 📊 Useful Queries

### See Conversion Rate
```sql
SELECT 
  COUNT(*) as total_contacts,
  COUNT(CASE WHEN converted_to_customer THEN 1 END) as customers,
  ROUND(COUNT(CASE WHEN converted_to_customer THEN 1 END)::numeric / COUNT(*) * 100, 2) as conversion_rate
FROM contacts;
```

### Find Most Active Restaurants
```sql
SELECT 
  r.name,
  c.email,
  COUNT(gs.id) as specials_created,
  MAX(gs.created_at) as last_active
FROM restaurants r
JOIN contacts c ON c.id = r.contact_id
LEFT JOIN generated_specials gs ON gs.restaurant_id = r.id
GROUP BY r.id, c.id
ORDER BY specials_created DESC;
```

### Track Source Performance
```sql
SELECT 
  source,
  COUNT(*) as signups,
  COUNT(CASE WHEN converted_to_customer THEN 1 END) as conversions,
  ROUND(COUNT(CASE WHEN converted_to_customer THEN 1 END)::numeric / COUNT(*) * 100, 2) as conversion_rate
FROM contacts
GROUP BY source
ORDER BY conversions DESC;
```

## 🔧 Troubleshooting

### "function get_or_create_contact does not exist"
- You haven't run the full SQL script
- Make sure to run the entire `SUPABASE_UNIFIED_INTEGRATION.sql`

### "relation contacts does not exist"
- You need to either:
  - Create the contacts table (Option B in SQL)
  - Or rename your existing email table to contacts

### Data not linking properly
- Check that email addresses match exactly
- Ensure stripe_customer_id is being passed correctly
- Verify the API route is using `route-unified.ts`

## 🚦 Next Steps

Once unified structure is working:
1. ✅ Test full signup → payment → onboarding flow
2. ✅ Set up Stripe webhooks to update subscription status
3. ✅ Add Gemini API for real special generation
4. ✅ Create customer dashboard
5. ✅ Enable Row Level Security before production

## 💡 Pro Tips

- The `customer_overview` view is your dashboard goldmine
- Use `recent_activity` view for real-time monitoring
- Helper functions make complex operations simple
- Always test with a real email flow end-to-end

---

**Questions?** The unified structure ensures you never lose the connection between an email capture and their restaurant data. Everything is linked!