# MenuSparks Todo List
**Last Updated:** January 21, 2025
**Site Status:** LIVE at menusparks.com 🎉

## 🚨 URGENT - Fix Live Site Issues

### 1. Add Environment Variables in Vercel
- [ ] Go to Vercel Dashboard → Settings → Environment Variables
- [ ] Add NEXT_PUBLIC_SUPABASE_URL
- [ ] Add NEXT_PUBLIC_SUPABASE_ANON_KEY  
- [ ] Add STRIPE_SECRET_KEY
- [ ] Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- [ ] Redeploy after adding

### 2. Fix Waste Calculator ROI Section
- [ ] Investigate why calculator file keeps reverting
- [ ] Manually update in GitHub if needed
- [ ] Add spoilage breakdown (21% focus)
- [ ] Add MenuSparks services list
- [ ] Add ROI percentage calculation

## 📝 CONTENT TASKS

### Create Missing Pages
- [ ] About page (/about)
  - [ ] Derek's story
  - [ ] Restaurant experience
  - [ ] Mission statement
  - [ ] Team info

### Add Social Proof
- [ ] Restaurant testimonials
- [ ] Success metrics
- [ ] Case studies
- [ ] Sample specials gallery

## 🔧 TECHNICAL TASKS

### Backend Setup
- [ ] Configure Supabase tables
  - [ ] email_captures
  - [ ] restaurants
  - [ ] generated_specials
  - [ ] inventory_submissions
- [ ] Test waitlist signup
- [ ] Set up Stripe checkout
- [ ] Create user authentication flow

### Performance & SEO
- [ ] Optimize images (compress logo.png)
- [ ] Add meta tags for SEO
- [ ] Create sitemap.xml
- [ ] Add Google Analytics
- [ ] Set up error tracking (Sentry)

### Bug Fixes
- [ ] Mobile menu doesn't close on navigation
- [ ] Calculator updates not persisting
- [ ] Waitlist form needs success validation

## 🚀 FEATURE DEVELOPMENT

### Phase 1: MVP Launch (Current)
- [x] Landing page
- [x] Waste calculator
- [x] Basic waitlist
- [ ] Email notifications
- [ ] Payment processing

### Phase 2: Restaurant Dashboard
- [ ] User login/signup
- [ ] Restaurant profile setup
- [ ] Inventory input form
- [ ] Special generation (Gemini API)
- [ ] Special history

### Phase 3: Advanced Features
- [ ] Weekly email automation
- [ ] Social media integration
- [ ] Analytics dashboard
- [ ] Multi-location support
- [ ] Custom branding options

## 📊 MARKETING TASKS

### Launch Preparation
- [ ] Create launch email sequence
- [ ] Set up social media accounts
- [ ] Prepare press release
- [ ] Build email list
- [ ] Create demo video

### Content Marketing
- [ ] Write 5 blog posts about food waste
- [ ] Create Instagram content calendar
- [ ] Design promotional graphics
- [ ] Build partnership list

## 🎯 WEEKLY GOALS

### Week of Jan 21-28, 2025
1. **Monday-Tuesday:** Fix environment variables and test Supabase
2. **Wednesday-Thursday:** Create About page and fix calculator
3. **Friday-Weekend:** Set up Stripe and test payments

### Week of Jan 29-Feb 4, 2025
1. **Monday-Tuesday:** Build restaurant dashboard wireframes
2. **Wednesday-Thursday:** Implement authentication
3. **Friday-Weekend:** Create first AI special generation

## 📌 IMPORTANT NOTES

### Access Information
- **GitHub:** https://github.com/7LayerLabs/menusparks
- **Vercel:** menusparks.vercel.app (dashboard)
- **Live Site:** https://menusparks.com
- **Supabase:** Project ID: fbzjjxhyfovvjjjqmyqw

### Development Commands
```bash
cd menspk-main
npm install
npm run dev  # localhost:3000
npm run build
```

### Deployment
- Auto-deploys on push to main branch
- Manual redeploy in Vercel dashboard
- DNS managed through Namecheap

## ✅ COMPLETED TASKS

### January 21, 2025
- [x] Set up GitHub repository
- [x] Deploy to Vercel
- [x] Connect custom domain
- [x] Create Privacy Policy
- [x] Create Terms of Service
- [x] Fix nested folder structure issues
- [x] Update landing page copy
- [x] Add waste calculator
- [x] Configure DNS

---

**Remember:** Every commit to main branch auto-deploys to production!