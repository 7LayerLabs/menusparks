# 🚀 MenuSparks Supabase Setup - Complete Guide

## ✅ What's Already Done
1. **Tables SQL created** - `supabase_tables.sql` ready to run
2. **Supabase client installed** - npm package added
3. **API connected** - Restaurant setup saves to database
4. **Client configured** - `/lib/supabase.ts` ready

## 📋 Quick Setup Steps (10 minutes)

### Step 1: Create Supabase Project
1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Name: `menusparks`
4. Database Password: **SAVE THIS!** (you'll need it)
5. Region: Choose closest to you
6. Click "Create Project" (takes ~2 minutes)

### Step 2: Run Database Setup
1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy ALL contents from `supabase_tables.sql`
4. Paste and click **Run**
5. You should see "Success. No rows returned"

### Step 3: Get Your API Keys
1. Click **Settings** (gear icon) → **API**
2. Copy these values:

```env
# Add to .env.local file
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_anon_key...
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key...
```

### Step 4: Update Your .env.local
Replace the placeholder values in `/menspk-main/menspk-main/.env.local`:
```env
# Supabase Configuration (REAL VALUES)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

### Step 5: Restart Your Dev Server
```bash
# Stop server (Ctrl+C)
# Start again
cd menspk-main/menspk-main
npm run dev
```

## 🧪 Test It Works

1. Go through Stripe checkout
2. Fill out restaurant form on success page
3. Submit form
4. Check Supabase Dashboard → **Table Editor**
5. You should see data in:
   - `restaurants` table
   - `restaurant_profiles` table
   - `inventory_submissions` table
   - `generated_specials` table

## 📊 What Gets Saved

When a restaurant submits the form:

### `restaurants` table:
- Restaurant name
- Cuisine type
- Email
- Stripe customer ID

### `restaurant_profiles` table:
- Kitchen equipment array
- Average entrée price
- Target food cost %

### `inventory_submissions` table:
- High inventory items (to use)
- Low inventory items (to avoid)
- Uploaded file references

### `generated_specials` table:
- Special name & description
- Ingredients list
- Instructions
- Pricing & margins
- Marketing copy

## 🔍 View Your Data

In Supabase Dashboard:
1. Click **Table Editor** (left sidebar)
2. Select any table to view data
3. Data appears in real-time as forms are submitted

## 🛡️ Security Notes

**Currently Open for Testing:**
- Tables are publicly accessible for testing
- Row Level Security (RLS) is commented out

**Before Production:**
1. Enable RLS on all tables
2. Create proper security policies
3. Use authentication for restaurant access

## 🚨 Common Issues & Fixes

### "relation does not exist"
- You haven't run the SQL setup script
- Go to SQL Editor and run `supabase_tables.sql`

### "Invalid API key"
- Check your .env.local has real keys (not placeholders)
- Keys start with `eyJ...`
- Restart dev server after changing .env.local

### "permission denied for schema public"
- Your project might have RLS enabled by default
- Run: `ALTER TABLE restaurants DISABLE ROW LEVEL SECURITY;`
- Do this for each table temporarily

### Form submits but no data saved
- Check browser console for errors
- Check Supabase Dashboard → **Logs** → **API logs**
- Verify all environment variables are set

## 🎯 Next Steps

Once this works:
1. **Add Gemini API** for real special generation
2. **Create dashboard** for restaurants to view history
3. **Add email notifications** when specials are generated
4. **Enable authentication** for restaurant login

## 💡 Pro Tips

- **Free Tier Limits**: 500MB database, 2GB bandwidth, 50k API requests/month
- **Backup Data**: Export regularly from Table Editor
- **Monitor Usage**: Check Settings → Usage to avoid limits
- **Test Webhook**: Add Stripe webhook to update subscription status

---

**Need Help?**
- Supabase Discord: discord.supabase.com
- Docs: supabase.com/docs
- Your data is at: `https://app.supabase.com/project/YOUR_PROJECT_ID`