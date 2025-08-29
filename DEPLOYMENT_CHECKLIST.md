# MenuSparks Deployment Checklist

## Pre-Deployment Requirements

### 1. Environment Variables ⚠️ CRITICAL
Add ALL of these to Vercel/production environment:

```bash
# Google Gemini API (SERVER-SIDE ONLY - no NEXT_PUBLIC prefix!)
GEMINI_API_KEY=AIzaSyCyk58AYYjZr5JTN-KdLoOYGRwM9S3X79c

# Stripe Configuration (LIVE MODE)
STRIPE_SECRET_KEY=sk_live_[YOUR_LIVE_KEY]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[YOUR_LIVE_KEY]

# Stripe Price IDs (LIVE)
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_WEEKLY=price_1RzLIVDlxrM8ZIxccXQOfcT0
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_ANNUAL=price_1RzLJcDlxrM8ZIxcQad2yLn7
NEXT_PUBLIC_STRIPE_PRICE_MAIN_WEEKLY=price_1RzLKrDlxrM8ZIxcauTWpOFn
NEXT_PUBLIC_STRIPE_PRICE_MAIN_ANNUAL=price_1RzLKrDlxrM8ZIxclcFO4WCT
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_INDUSTRY=price_1RzLLxDlxrM8ZIxctmOIRPSU
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_CUSTOM=price_1RzLNPDlxrM8ZIxc45k28YfR

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fbzjjxhyfovvjjjqmyqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[GET_FROM_SUPABASE_DASHBOARD]
SUPABASE_SERVICE_ROLE_KEY=[GET_FROM_SUPABASE_DASHBOARD]

# Application URL
NEXT_PUBLIC_APP_URL=https://menusparks.com
```

### 2. Code Cleanup

- [ ] Remove all console.log statements from production code
- [ ] Remove debugging code from API endpoints
- [ ] Clean up commented-out code
- [ ] Remove test/demo credentials
- [ ] Ensure no API keys in code

### 3. Security Audit

- [ ] Verify GEMINI_API_KEY has NO "NEXT_PUBLIC" prefix
- [ ] Check all API endpoints have proper error handling
- [ ] Implement rate limiting on API routes
- [ ] Add CORS configuration
- [ ] Set up authentication middleware
- [ ] Enable HTTPS enforcement
- [ ] Add input validation/sanitization

### 4. Database Setup (Supabase)

Create these tables in Supabase:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  subscription_status TEXT,
  subscription_tier TEXT
);

-- Recipes table
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  recipe_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Saved recipes
CREATE TABLE saved_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  recipe_id UUID REFERENCES recipes(id),
  saved_at TIMESTAMP DEFAULT NOW()
);

-- Recipe history
CREATE TABLE recipe_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  settings JSONB,
  recipes JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Waitlist
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Performance Optimization

- [ ] Run `npm run build` and check for errors
- [ ] Check bundle size (should be < 1MB)
- [ ] Enable image optimization
- [ ] Add lazy loading for components
- [ ] Implement caching strategies
- [ ] Minimize API calls

### 6. Testing

- [ ] Test recipe generation with various inputs
- [ ] Test file upload functionality
- [ ] Test all payment flows (use Stripe test mode first)
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Test error states
- [ ] Test loading states

### 7. Monitoring Setup

- [ ] Set up error tracking (Sentry/Rollbar)
- [ ] Configure uptime monitoring
- [ ] Set up Google Analytics
- [ ] Configure conversion tracking
- [ ] Set up API usage monitoring

## Deployment Steps

### Step 1: Prepare Repository
```bash
# Clean up sensitive files
rm -rf .env.local
rm -rf .env

# Ensure .gitignore includes
echo ".env.local" >> .gitignore
echo ".env" >> .gitignore
echo "node_modules" >> .gitignore
echo ".next" >> .gitignore

# Commit changes
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Import GitHub repository
3. Select "menspk-main" as root directory
4. Add ALL environment variables
5. Deploy

### Step 3: Post-Deployment

- [ ] Test live site thoroughly
- [ ] Verify API endpoints work
- [ ] Test recipe generation
- [ ] Test payment flow
- [ ] Check mobile responsiveness
- [ ] Monitor error logs
- [ ] Set up domain DNS if needed

### Step 4: Enable Production Features

- [ ] Switch Stripe to live mode (if not already)
- [ ] Enable Supabase Row Level Security
- [ ] Set up email notifications
- [ ] Configure backup strategy
- [ ] Set up SSL certificate

## Launch Day Checklist

### Morning of Launch
- [ ] Final testing of all features
- [ ] Check all API keys are working
- [ ] Verify payment processing
- [ ] Test recipe generation one more time
- [ ] Clear any test data

### During Launch
- [ ] Monitor error logs
- [ ] Watch server performance
- [ ] Check API usage/limits
- [ ] Monitor user signups
- [ ] Be ready to rollback if needed

### Post-Launch
- [ ] Send announcement email
- [ ] Post on social media
- [ ] Monitor user feedback
- [ ] Check conversion rates
- [ ] Review error reports

## Rollback Plan

If critical issues occur:
1. Revert to previous deployment in Vercel
2. Disable recipe generation temporarily
3. Put up maintenance page if needed
4. Fix issues in development
5. Test thoroughly
6. Redeploy

## Support Contacts

- **Vercel Support**: dashboard.vercel.com/support
- **Stripe Support**: dashboard.stripe.com/support
- **Google Cloud**: console.cloud.google.com
- **Supabase**: app.supabase.com/support

## Notes

- Current API usage: ~0.1% of Gemini quota
- Stripe is in LIVE mode - be careful!
- Dashboard is demo mode only (no real auth yet)
- localStorage is temporary - will be replaced with Supabase

---

**Remember**: The most critical item is ensuring the GEMINI_API_KEY does NOT have the NEXT_PUBLIC prefix in production!