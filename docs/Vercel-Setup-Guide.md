# Vercel Environment Variables Setup Guide

**Project:** menusparks-app
**Vercel Dashboard:** https://vercel.com/7layerlabs-projects/menusparks-app

---

## Environment Variables to Add

Go to: **Project Settings → Environment Variables**
(https://vercel.com/7layerlabs-projects/menusparks-app/settings/environment-variables)

### Required for All Environments (Production, Preview, Development)

Copy these values from your local `.env.local` file:

---

### 1. Database (Supabase)

**Variable:** `DATABASE_URL`
**Value:**
```
postgresql://postgres.fbzjjxhyfovvjjjqmyqw:1420Lakeview%21@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

**Variable:** `DIRECT_URL`
**Value:**
```
postgresql://postgres:1420Lakeview%21@db.fbzjjxhyfovvjjjqmyqw.supabase.co:5432/postgres
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

### 2. NextAuth.js

**Variable:** `NEXTAUTH_URL`
**Value for Production:**
```
https://menusparks-app.vercel.app
```
**OR if using custom domain:**
```
https://app.menusparks.com
```
**Environments:** ✅ Production only

**Note:** For Preview/Development, Vercel auto-sets this

---

**Variable:** `NEXTAUTH_SECRET`
**Value:**
```
local-dev-secret-change-in-production
```
**⚠️ IMPORTANT:** Change this to a secure random string for production!

Generate a secure secret:
```bash
openssl rand -base64 32
```

**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

### 3. AI Providers

**Variable:** `GEMINI_API_KEY`
**Value:**
```
AIzaSyCL75VWSQ1GOmF5bYn44UCSA1LrztgyLLs
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

**Variable:** `PERPLEXITY_API_KEY`
**Value:**
```
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
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

**Variable:** `AI_PROVIDER`
**Value:**
```
gemini
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

### 4. Stripe (Test Mode for now)

**Variable:** `STRIPE_SECRET_KEY`
**Value:**
```
sk_test_51RyEptDlxrM8ZIxcCpoEbgzfC3QX5teA77bSzCbxYcpAUA5FspBcKnE3eIpPaCMBECIuFvk3x2Iitrl8tehsbUJ6003b47hiEw
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

**Variable:** `STRIPE_PUBLISHABLE_KEY`
**Value:**
```
pk_test_51RyEptDlxrM8ZIxcgkFRYFiYkZejNjCMjX6pk3jLt6je9wkqeG6o97eerUYVcYX2A6RYZq9HnV2OrS2fGMJQJ54P00ugnLEjnW
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

**Variable:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
**Value:**
```
pk_test_51RyEptDlxrM8ZIxcgkFRYFiYkZejNjCMjX6pk3jLt6je9wkqeG6o97eerUYVcYX2A6RYZq9HnV2OrS2fGMJQJ54P00ugnLEjnW
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

### 5. Optional (Add Later)

**Variable:** `STRIPE_WEBHOOK_SECRET`
**Value:** (Get from Stripe webhook setup)
**Environments:** ✅ Production only

---

**Variable:** `SENDGRID_API_KEY` or `RESEND_API_KEY`
**Value:** (Add when email service is set up)
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

**Variable:** `EMAIL_FROM`
**Value:**
```
recipes@menusparks.com
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

## Step-by-Step Instructions

1. **Go to Environment Variables page:**
   https://vercel.com/7layerlabs-projects/menusparks-app/settings/environment-variables

2. **For each variable above:**
   - Click "Add New" button
   - Enter the **Variable name** (e.g., `DATABASE_URL`)
   - Paste the **Value**
   - Select environments: Check all three (Production, Preview, Development)
   - Click "Save"

3. **After adding all variables:**
   - Go to Deployments tab
   - Click "..." on the latest deployment
   - Click "Redeploy" to apply environment variables

---

## Important Security Notes

### ⚠️ Before Going Live (Production):

1. **Change `NEXTAUTH_SECRET`** to a secure random value:
   ```bash
   openssl rand -base64 32
   ```

2. **Switch to Stripe Live Mode:**
   - Get live API keys from Stripe dashboard
   - Replace `sk_test_...` with `sk_live_...`
   - Replace `pk_test_...` with `pk_live_...`

3. **Set up production database** (if different from dev):
   - Create separate Supabase production project
   - Update `DATABASE_URL` and `DIRECT_URL`

4. **Add Stripe webhook secret:**
   - Set up webhook endpoint in Stripe
   - Add `STRIPE_WEBHOOK_SECRET` to Vercel

---

## Custom Domain Setup (Optional)

If you want to use `app.menusparks.com` instead of `menusparks-app.vercel.app`:

1. **Add domain in Vercel:**
   - Project Settings → Domains
   - Add `app.menusparks.com`

2. **Update DNS records** (in your domain provider):
   - Add CNAME: `app` → `cname.vercel-dns.com`

3. **Update `NEXTAUTH_URL`:**
   - Change to `https://app.menusparks.com`
   - Redeploy

---

## Verification Checklist

After adding all environment variables and redeploying:

- [ ] Visit production URL (menusparks-app.vercel.app)
- [ ] Test authentication (login/register)
- [ ] Verify database connection (user creation works)
- [ ] Check Stripe integration (can view pricing)
- [ ] Test API routes (no 500 errors)
- [ ] Check browser console for errors

---

## Troubleshooting

**Build fails after adding env vars:**
- Check for typos in variable names
- Ensure no extra spaces in values
- Redeploy from Deployments tab

**Database connection fails:**
- Verify `DATABASE_URL` and `DIRECT_URL` are correct
- Check Supabase is allowing connections from Vercel IPs

**Stripe errors:**
- Ensure all three Stripe variables are set
- Verify test mode keys are being used
- Check Stripe dashboard for API errors

**NextAuth errors:**
- Verify `NEXTAUTH_URL` matches your deployment URL
- Check `NEXTAUTH_SECRET` is set
- Ensure database connection works (sessions table exists)

---

## Quick Copy-Paste List

For fast setup, here are all variables in one place:

```
DATABASE_URL=postgresql://postgres.fbzjjxhyfovvjjjqmyqw:1420Lakeview%21@aws-1-us-east-2.pooler.supabase.com:6543/postgres
DIRECT_URL=postgresql://postgres:1420Lakeview%21@db.fbzjjxhyfovvjjjqmyqw.supabase.co:5432/postgres
NEXTAUTH_URL=https://menusparks-app.vercel.app
NEXTAUTH_SECRET=local-dev-secret-change-in-production
GEMINI_API_KEY=AIzaSyCL75VWSQ1GOmF5bYn44UCSA1LrztgyLLs
PERPLEXITY_API_KEY=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
AI_PROVIDER=gemini
STRIPE_SECRET_KEY=sk_test_51RyEptDlxrM8ZIxcCpoEbgzfC3QX5teA77bSzCbxYcpAUA5FspBcKnE3eIpPaCMBECIuFvk3x2Iitrl8tehsbUJ6003b47hiEw
STRIPE_PUBLISHABLE_KEY=pk_test_51RyEptDlxrM8ZIxcgkFRYFiYkZejNjCMjX6pk3jLt6je9wkqeG6o97eerUYVcYX2A6RYZq9HnV2OrS2fGMJQJ54P00ugnLEjnW
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RyEptDlxrM8ZIxcgkFRYFiYkZejNjCMjX6pk3jLt6je9wkqeG6o97eerUYVcYX2A6RYZq9HnV2OrS2fGMJQJ54P00ugnLEjnW
EMAIL_FROM=recipes@menusparks.com
```

---

**Last Updated:** October 12, 2025
**Project:** MenuSparks App
**Environment:** Test/Development Mode
