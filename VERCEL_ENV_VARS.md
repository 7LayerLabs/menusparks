# Vercel Environment Variables for MenuSparks

Add these to your Vercel Dashboard → Settings → Environment Variables

## Stripe Configuration

```
STRIPE_SECRET_KEY=(Get from your .env file - starts with sk_test_)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RyEptDlxrM8ZIxcgkFRYFiYkZejNjCMjX6pk3jLt6je9wkqeG6o97eerUYVcYX2A6RYZq9HnV2OrS2fGMJQJ54P00ugnLEjnW

# MenuSparks Appetizer Price IDs
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_WEEKLY=price_1RzLIVDlxrM8ZIxccXQOfcT0
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_ANNUAL=price_1RzLJcDlxrM8ZIxcQad2yLn7

# MenuSparks Main Meal Price IDs
NEXT_PUBLIC_STRIPE_PRICE_MAIN_WEEKLY=price_1RzLKrDlxrM8ZIxcauTWpOFn
NEXT_PUBLIC_STRIPE_PRICE_MAIN_ANNUAL=price_1RzLKrDlxrM8ZIxclcFO4WCT

# MenuSparks Dessert Price IDs (COMING SOON - OPTIONAL)
NEXT_PUBLIC_STRIPE_PRICE_DESSERT_WEEKLY=
NEXT_PUBLIC_STRIPE_PRICE_DESSERT_ANNUAL=

# Newsletter (A La Carte Options)
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_INDUSTRY=price_1RzLLxDlxrM8ZIxctmOIRPSU
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_CUSTOM=price_1RzLNPDlxrM8ZIxc45k28YfR
```

## Supabase Configuration

```
NEXT_PUBLIC_SUPABASE_URL=https://fbzjjxhyfovvjjjqmyqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiempqeGh5Zm92dmpqanFteXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MzAwNjAsImV4cCI6MjA3MTIwNjA2MH0.mj5R4UVIQQvidYw-xr7RSbvyN5y1oP72KMA6N2Y_QkI
```

## Status:
- ✅ Appetizer price IDs ready
- ✅ Main Meal price IDs ready
- ⏸️ Dessert is "Coming Soon" (optional for now)

## Next Steps:
1. Copy all these environment variables to Vercel Dashboard
2. Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables
3. Add each variable one by one
4. Click "Save" after adding all variables
5. Redeploy to activate Stripe checkout (or it will auto-deploy)