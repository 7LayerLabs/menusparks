# Required Environment Variables for Vercel

Add these to your Vercel project settings → Environment Variables

## 1. Google Gemini API
```
NEXT_PUBLIC_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```
Get your key from: https://makersuite.google.com/app/apikey

## 2. Supabase (Already set)
```
NEXT_PUBLIC_SUPABASE_URL=https://fbzjjxhyfovvjjjqmyqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiempqeGh5Zm92dmpqanFteXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MzAwNjAsImV4cCI6MjA3MTIwNjA2MH0.mj5R4UVIQQvidYw-xr7RSbvyN5y1oP72KMA6N2Y_QkI
```

## 3. Stripe Keys - YOU NEED TO GET THESE FROM STRIPE DASHBOARD

### Option A: Use TEST mode (Recommended for now)
Go to https://dashboard.stripe.com/test/apikeys and get:
```
STRIPE_SECRET_KEY=sk_test_[your_actual_test_secret_key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_[your_actual_test_publishable_key]
```

Then create test products at https://dashboard.stripe.com/test/products and get the price IDs:
```
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_WEEKLY=[price_id_from_stripe]
NEXT_PUBLIC_STRIPE_PRICE_MAIN_WEEKLY=[price_id_from_stripe]
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_ANNUAL=[price_id_from_stripe]
NEXT_PUBLIC_STRIPE_PRICE_MAIN_ANNUAL=[price_id_from_stripe]
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_INDUSTRY=[price_id_from_stripe]
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_CUSTOM=[price_id_from_stripe]
```

### Option B: Use LIVE mode (For real payments)
Go to https://dashboard.stripe.com/apikeys and get:
```
STRIPE_SECRET_KEY=sk_live_[your_actual_live_secret_key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[your_actual_live_publishable_key]
```

Then use your existing LIVE price IDs:
```
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_WEEKLY=price_1RzLIVDlxrM8ZIxccXQOfcT0
NEXT_PUBLIC_STRIPE_PRICE_MAIN_WEEKLY=price_1RzLKrDlxrM8ZIxcauTWpOFn
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_ANNUAL=price_1RzLJcDlxrM8ZIxcQad2yLn7
NEXT_PUBLIC_STRIPE_PRICE_MAIN_ANNUAL=price_1RzLKrDlxrM8ZIxclcFO4WCT
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_INDUSTRY=price_1RzLLxDlxrM8ZIxctmOIRPSU
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_CUSTOM=price_1RzLNPDlxrM8ZIxc45k28YfR
```

## How to Add to Vercel:
1. Go to https://vercel.com/dashboard
2. Select your menusparks project
3. Go to Settings → Environment Variables
4. Add each variable above
5. Click Save
6. Redeploy for changes to take effect

## Current Status:
- ✅ Gemini API is working
- ✅ Free demo access is enabled (no payment needed)
- ❌ Stripe payments won't work until you add the keys above