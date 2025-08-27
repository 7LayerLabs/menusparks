d# 🚀 MenuSparks Supabase Setup Guide

## ✅ Current Status
- **Supabase Project:** Connected! 
- **Project URL:** https://fbzjjxhyfovvjjjqmyqw.supabase.co
- **Backend:** Running on http://localhost:5001
- **Frontend:** Running on http://localhost:3000
- **Contact Email:** admin@menusparks.com

## 📝 Next Steps to Complete Database Setup

### 1. Create Database Tables

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/fbzjjxhyfovvjjjqmyqw
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the entire contents of `backend/src/config/supabase-schema.sql`
5. Paste into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)

The schema will create:
- User profiles table (linked to Supabase Auth)
- Email captures table (for landing page leads)
- Specials table (AI-generated menu items)
- Inventory table (restaurant stock tracking)
- Newsletter subscribers table
- Contact submissions table
- Usage analytics table
- Row Level Security policies
- Performance indexes

### 2. Enable Authentication (Optional but Recommended)

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider for email/password auth
3. Configure email templates if desired
4. Set site URL to `http://localhost:3000` for development

### 3. Get Service Role Key (Optional - for admin operations)

1. Go to **Settings** → **API**
2. Find **Service role key** (keep this SECRET!)
3. Add to `.env` file as `SUPABASE_SERVICE_KEY`

## 🔌 Current Integration Points

### Backend API Endpoints Ready:
- `POST /api/landing/capture-email` - Saves emails to Supabase
- `POST /api/landing/contact` - Saves contact form submissions
- `GET /api/landing/sample-specials` - Returns AI-generated samples

### Frontend Forms Connected:
- Hero email capture → Saves to `email_captures` table
- Contact form → Saves to `contact_submissions` table
- Final CTA email → Saves to `email_captures` table

## 🎯 Features Now Available

With Supabase connected, you can now:

1. **Capture Leads**: All email submissions saved to cloud database
2. **Track Sources**: Know which form/section converts best
3. **Contact Management**: View all inquiries in Supabase dashboard
4. **Real-time Updates**: Supabase provides real-time subscriptions
5. **Secure Storage**: Enterprise-grade PostgreSQL with automatic backups
6. **Scale Infinitely**: No local database limitations

## 🔧 Testing the Integration

### Test Email Capture:
```bash
curl -X POST http://localhost:5001/api/landing/capture-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@menusparks.com", "source": "api-test"}'
```

### Test Contact Form:
```bash
curl -X POST http://localhost:5001/api/landing/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@menusparks.com",
    "restaurant": "Test Restaurant",
    "tier": "appetizer",
    "message": "Testing Supabase integration"
  }'
```

## 📊 View Your Data

1. Go to **Table Editor** in Supabase Dashboard
2. Select any table to view/edit data
3. Use **SQL Editor** for custom queries
4. Check **Database** → **Backups** for automatic backups

## 🚀 Production Checklist

When ready to deploy:

- [ ] Change JWT_SECRET in `.env` to a secure random string
- [ ] Set up proper email service (SendGrid, Postmark, etc.)
- [ ] Configure Stripe for payment processing
- [ ] Set up Google Gemini API for AI generation
- [ ] Enable Supabase Auth email verification
- [ ] Configure custom domain in Supabase
- [ ] Set up monitoring and alerts
- [ ] Enable point-in-time recovery for database

## 🆘 Troubleshooting

**If backend shows "Supabase not configured":**
- Check `.env` file has correct SUPABASE_URL and SUPABASE_ANON_KEY
- Restart backend: Stop with Ctrl+C, run `npm run dev` again

**If "Table doesn't exist" errors:**
- Run the SQL schema in Supabase SQL Editor
- Check for any error messages in the SQL output

**If authentication fails:**
- Ensure Supabase Auth is enabled
- Check CORS settings in Supabase Dashboard

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)

---

**Your backend is now running WITHOUT local PostgreSQL!** 🎉
Everything is cloud-based with Supabase's free tier (500MB database, 2GB bandwidth, 50K requests/month).