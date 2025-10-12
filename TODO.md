# MenuSparks - Master Project Checklist

**Last Updated:** October 11, 2025
**Status:** Planning → Development

> **RULE:** Everything we add to this project goes in this file. This is the single source of truth.

---

## PHASE 0: PROJECT SETUP & FOUNDATION

### 0.1 Documentation ✅ COMPLETE
- [x] Create PRD document
- [x] Create Product Vision document
- [x] Create Technical Architecture document
- [x] Create Reference Project Analysis document
- [x] Create AI Agent Army B2B Outreach document
- [x] Create Practical Agent Architecture document
- [x] Create TODO.md master checklist (this file)
- [x] Review and confirm tech stack decisions with Derek
- [x] Get Perplexity API credentials from Derek
- [x] Get Gemini API key from Derek
- [ ] Determine pricing for service tiers

### 0.2 Development Environment Setup
- [ ] Install Node.js (v18+) and npm
- [ ] Install Git
- [ ] Set up GitHub repository
- [ ] Configure Git with user info
- [ ] Install VS Code (or preferred IDE)
- [ ] Install VS Code extensions (ES7, Tailwind IntelliSense, Prisma)

### 0.3 Project Initialization ✅ COMPLETE
- [x] Create Next.js 15 project with TypeScript
- [x] Initialize Git repository
- [x] Create `.gitignore` file
- [x] Create `.env.example` file with all required variables
- [x] Create `.env.local` file (not committed)
- [x] Set up project folder structure (src/app, components, lib, services, agents)
- [x] Install core dependencies (React, Next.js, TypeScript, Tailwind CSS)
- [x] Configure TypeScript (tsconfig.json)
- [x] Configure Tailwind CSS v4 with @tailwindcss/postcss
- [x] Set up ESLint

### 0.4 External Service Setup
- [ ] Create Supabase account and project (PostgreSQL + Auth)
- [ ] Get Supabase connection string and API keys
- [ ] Create Stripe account
- [ ] Get Stripe API keys (test mode)
- [ ] Set up Stripe products for Quick Byte and Chef's Choice
- [ ] Create Vercel account for deployment
- [ ] Create SendGrid/Resend account for emails
- [ ] Get email API keys
- [ ] Create Sentry account for error tracking
- [ ] Get Sentry DSN

### 0.5 Database Setup ✅ COMPLETE
- [x] Install Prisma
- [x] Create Prisma schema for users table (with NextAuth fields)
- [x] Create Prisma schema for restaurants table
- [x] Create Prisma schema for subscriptions table
- [x] Create Prisma schema for deliveries table
- [x] Create Prisma schema for recipes table
- [x] Create Prisma schema for payments table
- [x] Create Prisma schema for newsletters table
- [x] Create Prisma schema for accounts/sessions (NextAuth)
- [x] Run initial migration (20251012000251_init)
- [x] Generate Prisma Client
- [x] Test database connection (Supabase PostgreSQL)

---

## PHASE 1: MVP CORE - QUICK BYTE SERVICE (Weeks 1-4)

**Goal:** Launch Quick Byte tier with manual delivery (admin triggers)

### 1.1 Authentication System ✅ COMPLETE
- [x] Install NextAuth.js v4
- [x] Install bcryptjs for password hashing
- [x] Configure NextAuth.js API route (`/api/auth/[...nextauth]`)
- [x] Set up credentials provider with Prisma adapter
- [x] Create user registration API endpoint (`/api/auth/register`)
- [x] Create login page UI (`/auth/login`)
- [x] Create registration page UI (`/auth/register`)
- [x] Add password hashing with bcrypt (12 rounds)
- [x] Add password validation (8+ chars, uppercase, lowercase, number)
- [x] Add email validation
- [x] Implement JWT session management
- [x] Create centralized Prisma client (src/lib/prisma.ts)
- [x] Create SessionProvider wrapper component
- [x] Create protected dashboard page (`/dashboard`)
- [x] Test authentication flow end-to-end
- [ ] Add "Forgot Password" functionality
- [ ] Create password reset flow

### 1.2 Landing Page & Marketing Site
- [ ] Design landing page wireframe
- [ ] Build hero section with value proposition
- [ ] Create "How It Works" section
- [ ] Build pricing comparison table (Quick Byte vs Chef's Choice)
- [ ] Add testimonials section (use placeholder initially)
- [ ] Create FAQ section
- [ ] Build footer with links
- [ ] Add CTA buttons throughout
- [ ] Make landing page fully responsive
- [ ] Optimize for SEO (meta tags, structured data)
- [ ] Add email capture for waitlist (optional)
- [ ] Connect "Sign Up" buttons to registration flow

### 1.3 Restaurant Profile Setup Flow
- [ ] Create multi-step onboarding wizard UI
- [ ] **Step 1:** Basic restaurant info form
  - [ ] Restaurant name
  - [ ] City, state, zip
  - [ ] Restaurant type (dropdown)
  - [ ] Cuisine style (multi-select)
- [ ] **Step 2:** Upload menu
  - [ ] File upload component (PDF, images, text)
  - [ ] Menu parsing logic (extract text)
  - [ ] Preview uploaded menu
  - [ ] Manual menu entry option
- [ ] **Step 3:** Kitchen equipment selection
  - [ ] Checkbox list of common equipment
  - [ ] "Other" field for custom equipment
- [ ] **Step 4:** Brand preferences
  - [ ] Price tier selector (budget, moderate, upscale)
  - [ ] Brand voice notes (textarea)
  - [ ] Dietary preferences/restrictions
- [ ] **Step 5:** Review & confirm
- [ ] Save restaurant profile to database
- [ ] Handle validation errors gracefully
- [ ] Add progress indicator (step X of 5)
- [ ] Allow "Save and Continue Later"

### 1.4 Subscription Selection & Billing
- [ ] Create subscription tier selection page
- [ ] Build Quick Byte plan card
- [ ] Build Chef's Choice plan card
- [ ] Add delivery day selector (Mon-Sun dropdown)
- [ ] Add delivery time preference (morning/afternoon)
- [ ] Integrate Stripe Checkout
  ```bash
  npm install @stripe/stripe-js stripe
  ```
- [ ] Create Stripe Customer on user signup
- [ ] Create Stripe Subscription on tier selection
- [ ] Store Stripe subscription ID in database
- [ ] Handle successful payment webhook
- [ ] Handle failed payment webhook
- [ ] Create subscription confirmation page
- [ ] Send confirmation email

### 1.5 AI Integration Agent (Core Service)
- [ ] Install AI provider SDKs
  ```bash
  npm install @google/generative-ai openai @anthropic-ai/sdk axios
  ```
- [ ] Create `src/services/aiService.ts`
- [ ] Implement multi-provider abstraction layer
  ```typescript
  interface AIProvider {
    generateRecipes(context, count): Promise<Recipe[]>
    generateSocialPost(recipe): Promise<string>
    generateEmailCopy(lead): Promise<string>
  }
  ```
- [ ] Implement GeminiProvider class
- [ ] Implement OpenAIProvider class (backup)
- [ ] Implement PerplexityProvider class (research)
- [ ] Add environment variable provider selection
- [ ] Implement retry logic for API failures
- [ ] Add rate limiting
- [ ] Implement cost tracking
- [ ] Create prompt templates for recipe generation
- [ ] Test Gemini recipe generation with sample data
- [ ] Test Perplexity research capabilities

### 1.6 Recipe Generation Engine
- [ ] Create `src/agents/recipeGenerationEngine.ts`
- [ ] Implement recipe generation logic
  ```typescript
  async function generateRecipes(restaurant, count): Promise<Recipe[]>
  ```
- [ ] Build prompt that includes:
  - [ ] Restaurant type and cuisine style
  - [ ] Current menu (for context)
  - [ ] Available equipment
  - [ ] Brand voice
  - [ ] Recipe count
- [ ] Parse AI response into structured Recipe objects
- [ ] Handle malformed AI responses
- [ ] Add retry logic for failed generations
- [ ] Test with various restaurant profiles
- [ ] Validate output format

### 1.7 Recipe Validation Agent
- [ ] Create `src/agents/recipeValidator.ts`
- [ ] Implement validation checks:
  - [ ] Check portions are realistic (4-50 servings)
  - [ ] Check timing is reasonable (< 4 hours total)
  - [ ] Check ingredients are compatible
  - [ ] Check recipe matches brand/cuisine
  - [ ] Check equipment requirements are met
- [ ] Create validation scoring system (0-100)
- [ ] Reject recipes below threshold (< 70)
- [ ] Log validation failures for improvement
- [ ] Create validation report for debugging

### 1.8 Recipe Output Format & UI
- [ ] Design RecipeCard component
- [ ] Build RecipeCard component with Tailwind
- [ ] Display recipe name and meal type
- [ ] Display menu description
- [ ] Display yield (portions)
- [ ] Display ingredient list
- [ ] Display Mise en Place section
- [ ] Display Pre-Service Prep section
- [ ] Display Service Instructions section
- [ ] Display Chef's Notes
- [ ] Add Print button (opens print dialog)
- [ ] Add Save to Favorites button
- [ ] Style for mobile responsiveness
- [ ] Add recipe image placeholder (optional)

### 1.9 PDF Export Functionality
- [ ] Install PDF generation libraries
  ```bash
  npm install jspdf html2canvas
  ```
- [ ] Create PDF export utility
- [ ] Format recipe for PDF layout
- [ ] Add MenuSparks branding to PDF
- [ ] Include restaurant name in PDF
- [ ] Add date generated
- [ ] Test PDF generation
- [ ] Add download trigger from RecipeCard

### 1.10 User Dashboard (Basic)
- [ ] Create dashboard layout component
- [ ] Build sidebar navigation
- [ ] Create "My Recipes" page
- [ ] Display list of delivered recipe batches
- [ ] Show delivery dates
- [ ] Allow viewing past recipes
- [ ] Create "My Profile" page
- [ ] Allow editing restaurant profile
- [ ] Show current subscription details
- [ ] Add "Next Delivery" countdown
- [ ] Make dashboard responsive

### 1.11 Admin Dashboard (Manual Trigger)
- [ ] Create admin authentication check
- [ ] Build admin-only dashboard
- [ ] Create "All Users" list view
- [ ] Create "All Subscriptions" list view
- [ ] Show subscriptions by delivery day
- [ ] Build "Trigger Delivery" button
- [ ] Implement manual recipe generation trigger
  ```typescript
  POST /api/admin/trigger-delivery
  { subscriptionId: string }
  ```
- [ ] Show generation progress/status
- [ ] Display generation errors
- [ ] Add retry failed generation button

### 1.12 Email Delivery Agent
- [ ] Install email service SDK (SendGrid/Resend)
  ```bash
  npm install @sendgrid/mail
  # or
  npm install resend
  ```
- [ ] Create `src/services/emailService.ts`
- [ ] Create email template for weekly recipes
- [ ] Use React Email for template (optional but recommended)
  ```bash
  npm install react-email @react-email/components
  ```
- [ ] Design email layout
- [ ] Include restaurant name in subject line
- [ ] List all recipes with brief descriptions
- [ ] Add "View Full Recipe" links to dashboard
- [ ] Add unsubscribe link
- [ ] Test email rendering across clients
- [ ] Implement email sending function
- [ ] Handle email delivery failures
- [ ] Log email sends to database

### 1.13 Payment Processing Agent
- [ ] Create Stripe webhook endpoint
  ```typescript
  POST /api/webhooks/stripe
  ```
- [ ] Verify Stripe webhook signatures
- [ ] Handle `invoice.payment_succeeded` event
- [ ] Create payment record in database
- [ ] Handle `invoice.payment_failed` event
- [ ] Update subscription status on failure
- [ ] Send payment receipt email
- [ ] Send payment failure notification email
- [ ] Test webhook with Stripe CLI
  ```bash
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  ```

### 1.14 End-to-End Testing (MVP)
- [ ] Test complete signup flow
- [ ] Test restaurant profile creation
- [ ] Test subscription purchase (Stripe test mode)
- [ ] Test admin manual recipe generation
- [ ] Test email delivery
- [ ] Test recipe viewing in dashboard
- [ ] Test PDF export
- [ ] Test payment webhook handling
- [ ] Test error scenarios (API failures, etc.)
- [ ] Fix all bugs found during testing

### 1.15 MVP Deployment
- [ ] Create Vercel project
- [ ] Connect GitHub repository
- [ ] Configure environment variables in Vercel
- [ ] Set up Supabase production database
- [ ] Run database migrations on production
- [ ] Deploy to Vercel
- [ ] Test production deployment
- [ ] Set up custom domain (menusparks.com)
- [ ] Configure DNS records
- [ ] Enable HTTPS
- [ ] Set up Sentry error tracking
- [ ] Monitor first production usage

### 1.16 Beta Testing with Bobola's Restaurant
- [ ] Create Bobola's account
- [ ] Set up Bobola's restaurant profile
- [ ] Subscribe to Quick Byte tier (free for testing)
- [ ] Generate first batch of recipes
- [ ] Get Derek's feedback on recipes
- [ ] Iterate on recipe quality
- [ ] Test weekly delivery flow
- [ ] Gather testimonial from Derek/team

---

## PHASE 2: CHEF'S CHOICE + AUTOMATION (Weeks 5-6)

**Goal:** Add Chef's Choice tier with social media content + automated daily delivery

### 2.1 Social Media Content Agent
- [ ] Create `src/agents/socialMediaContentAgent.ts`
- [ ] Implement social post generation
  ```typescript
  async function generateSocialPost(recipe, platform): Promise<string>
  ```
- [ ] Create Instagram post template
- [ ] Create Facebook post template
- [ ] Include relevant hashtags
- [ ] Match restaurant brand voice
- [ ] Generate post for each recipe
- [ ] Save social posts to database
- [ ] Test social post quality

### 2.2 Enhanced Recipe Email (Chef's Choice)
- [ ] Update email template for Chef's Choice tier
- [ ] Include social media posts section
- [ ] Format social posts for easy copy/paste
- [ ] Add platform icons (Instagram, Facebook)
- [ ] Test Chef's Choice email rendering
- [ ] Add tier-specific logic to email service

### 2.3 Background Job Queue Setup
- [ ] Install BullMQ and Redis
  ```bash
  npm install bullmq ioredis
  ```
- [ ] Set up Redis connection (Upstash or Railway)
- [ ] Create queue configuration
- [ ] Define job types:
  - [ ] `daily-orchestrator`
  - [ ] `generate-delivery`
  - [ ] `generate-social-content`
  - [ ] `send-email`
  - [ ] `process-payment`
- [ ] Create worker processes for each job type
- [ ] Test job queue locally

### 2.4 Daily Orchestrator Agent
- [ ] Create `src/agents/dailyOrchestrator.ts`
- [ ] Implement daily check logic
  ```typescript
  async function checkDailyDeliveries(): Promise<void>
  ```
- [ ] Query subscriptions by delivery_day
- [ ] Queue generation jobs for each subscription
- [ ] Add logging for orchestrator runs
- [ ] Set up scheduled cron job (12:01 AM daily)
- [ ] Use Vercel Cron or external scheduler
  ```typescript
  // vercel.json
  {
    "crons": [{
      "path": "/api/cron/daily-orchestrator",
      "schedule": "1 0 * * *"
    }]
  }
  ```
- [ ] Protect cron endpoint with secret token
- [ ] Test orchestrator logic

### 2.5 Automated Recipe Generation Pipeline
- [ ] Update recipe generation to work via queue
- [ ] Create job handler for `generate-delivery`
- [ ] Load restaurant context from database
- [ ] Generate recipes (5 or 10 based on tier)
- [ ] Validate recipes
- [ ] Save recipes to database
- [ ] Queue social content job (if Chef's Choice)
- [ ] Queue email job
- [ ] Handle generation failures with retries
- [ ] Log all generation attempts

### 2.6 Automated Email Delivery Pipeline
- [ ] Create job handler for `send-email`
- [ ] Fetch recipes from database
- [ ] Fetch social posts if applicable
- [ ] Render email template
- [ ] Send email via SendGrid/Resend
- [ ] Update delivery record (delivered_at timestamp)
- [ ] Queue payment job
- [ ] Handle email failures with retries
- [ ] Log all email sends

### 2.7 Automated Payment Processing Pipeline
- [ ] Create job handler for `process-payment`
- [ ] Create Stripe payment intent
- [ ] Charge customer based on tier
- [ ] Save payment record
- [ ] Handle payment success
- [ ] Handle payment failure
  - [ ] Send dunning email
  - [ ] Update subscription status
  - [ ] Retry payment after 3 days
- [ ] Log all payment attempts

### 2.8 Delivery Status Tracking
- [ ] Add status field to deliveries table
  - `scheduled`, `generating`, `delivering`, `delivered`, `failed`
- [ ] Update status throughout pipeline
- [ ] Show delivery status in user dashboard
- [ ] Show status in admin dashboard
- [ ] Add retry button for failed deliveries

### 2.9 Chef's Choice Launch Preparation
- [ ] Update pricing page with Chef's Choice details
- [ ] Create comparison table (Quick Byte vs Chef's Choice)
- [ ] Allow tier upgrades from user dashboard
- [ ] Handle prorated billing for upgrades
- [ ] Test Chef's Choice subscription flow
- [ ] Test social media content generation
- [ ] Test automated end-to-end delivery

### 2.10 Monitoring & Alerts
- [ ] Set up logging for all agents
- [ ] Create CloudWatch/BetterStack dashboards
- [ ] Set up alerts for:
  - [ ] Recipe generation failures
  - [ ] Email delivery failures
  - [ ] Payment processing failures
  - [ ] High API costs
- [ ] Create Slack/email notification system
- [ ] Test alerting system

### 2.11 Deployment & Testing
- [ ] Deploy automated system to production
- [ ] Test orchestrator runs on schedule
- [ ] Monitor first automated delivery
- [ ] Verify emails sent correctly
- [ ] Verify payments processed correctly
- [ ] Fix any issues found
- [ ] Onboard first paying customers

---

## PHASE 3: B2B AGENT ARMY (Weeks 7-8)

**Goal:** Build automated B2B outreach system for sales

### 3.1 B2B Dashboard UI
- [ ] Create admin section for B2B campaigns
- [ ] Build CSV upload interface
- [ ] Add drag-and-drop file upload
- [ ] Show CSV preview table
- [ ] Add "Generate Campaign" button
- [ ] Build processing progress indicator
- [ ] Create campaign results dashboard
- [ ] Build individual lead preview cards

### 3.2 CSV Parsing & Validation
- [ ] Install CSV parser
  ```bash
  npm install papaparse
  ```
- [ ] Create CSV parsing utility
- [ ] Validate required columns:
  - `restaurant_name`
  - `city`
  - `state`
- [ ] Validate optional columns:
  - `website`
  - `cuisine_type`
  - `email`
- [ ] Handle malformed CSV files
- [ ] Show validation errors to user

### 3.3 Campaign Orchestrator Agent
- [ ] Create `src/agents/campaignOrchestrator.ts`
- [ ] Implement campaign processing logic
  ```typescript
  async function processCampaign(leads: Lead[]): Promise<Campaign>
  ```
- [ ] Launch parallel agents for each lead
- [ ] Aggregate results
- [ ] Handle partial failures
- [ ] Generate campaign summary report
- [ ] Save campaign to database

### 3.4 Lead Enrichment Agent (Perplexity)
- [ ] Create `src/agents/leadEnrichmentAgent.ts`
- [ ] Implement Perplexity research
  ```typescript
  async function enrichLead(lead: Lead): Promise<EnrichedLead>
  ```
- [ ] Research restaurant online presence
- [ ] Find owner/chef name
- [ ] Extract menu items and pricing
- [ ] Analyze brand voice
- [ ] Find pain points from reviews
- [ ] Get social media links
- [ ] Structure research data
- [ ] Handle cases where website doesn't exist
- [ ] Test with real restaurant data

### 3.5 Mockup Generation Agent (fal.ai)
- [ ] Create fal.ai account
- [ ] Get fal.ai API key
- [ ] Install fal.ai SDK
  ```bash
  npm install @fal-ai/serverless-client
  ```
- [ ] Create `src/agents/mockupGenerationAgent.ts`
- [ ] Generate 2-3 sample recipes per lead
- [ ] Create recipe card image mockups
- [ ] Create social media post mockups
- [ ] Upload mockups to S3/Cloudflare R2
- [ ] Return mockup URLs
- [ ] Test mockup generation quality

### 3.6 Email Copywriting Agent (GPT-4)
- [ ] Create `src/agents/emailCopywritingAgent.ts`
- [ ] Implement email sequence generation
  ```typescript
  async function writeEmailSequence(lead, mockups): Promise<Email[]>
  ```
- [ ] Generate Email 1: Problem awareness + intrigue
- [ ] Generate Email 2: Value + ROI
- [ ] Generate Email 3: Urgency + easy yes
- [ ] Personalize with owner name
- [ ] Reference specific pain points
- [ ] Include mockup links
- [ ] Match prospect's brand voice
- [ ] Generate 2 subject line variations per email
- [ ] Test email copy quality

### 3.7 Campaign Assembly Agent
- [ ] Create `src/agents/campaignAssemblyAgent.ts`
- [ ] Combine enriched data + mockups + emails
- [ ] Create tracking links for emails
  ```
  https://menusparks.com/track/{leadId}/email/{emailNumber}
  ```
- [ ] Generate campaign summary report
- [ ] Export to CSV for CRM import
- [ ] Create campaign dashboard view
- [ ] Save complete campaign to database

### 3.8 Campaign Results Dashboard
- [ ] Display campaign summary stats
- [ ] Show lead-by-lead breakdown
- [ ] Preview emails for each lead
- [ ] Show mockups for each lead
- [ ] Display enriched data
- [ ] Add "Edit Email" functionality
- [ ] Add "Send Campaign" button (manual approval)
- [ ] Create "Download CSV" export

### 3.9 Email Tracking System
- [ ] Create tracking pixel endpoint
  ```typescript
  GET /api/track/:leadId/email/:emailNumber/open
  ```
- [ ] Track email opens
- [ ] Create link redirect endpoint
  ```typescript
  GET /api/track/:leadId/email/:emailNumber/click
  ```
- [ ] Track link clicks
- [ ] Save tracking events to database
- [ ] Display engagement metrics in dashboard

### 3.10 Campaign Sending System
- [ ] Integrate with SendGrid for bulk sending
- [ ] Implement email sequence scheduler
- [ ] Send Email 1 immediately
- [ ] Schedule Email 2 for 2 days later
- [ ] Schedule Email 3 for 4 days later
- [ ] Handle bounces and unsubscribes
- [ ] Track delivery status
- [ ] Show sending progress in dashboard

### 3.11 Lead Response Handling
- [ ] Set up dedicated email for responses
  ```
  sales@menusparks.com
  ```
- [ ] Parse incoming email replies
- [ ] Match replies to leads
- [ ] Flag leads with responses in dashboard
- [ ] Send notification to Derek
- [ ] Create "Hot Leads" view

### 3.12 Cost Tracking & Reporting
- [ ] Track AI API costs per campaign
- [ ] Show cost breakdown:
  - Lead enrichment (Perplexity)
  - Mockup generation (fal.ai)
  - Email writing (GPT-4)
- [ ] Calculate cost per lead
- [ ] Calculate cost per response
- [ ] Display ROI metrics

### 3.13 Testing & Deployment
- [ ] Test with sample CSV (10 leads)
- [ ] Verify enrichment quality
- [ ] Verify mockup quality
- [ ] Verify email copy quality
- [ ] Test tracking links
- [ ] Test email sending
- [ ] Run full campaign with 50 leads
- [ ] Monitor results
- [ ] Deploy to production

---

## PHASE 4: MARKET INTELLIGENCE SERVICES (Weeks 9-10)

**Goal:** Launch newsletter tiers with automated market research

### 4.1 Newsletter Database Schema
- [ ] Create newsletters table
  ```sql
  - id
  - type (industry, regional_custom)
  - content (JSON)
  - published_at
  - sent_count
  ```
- [ ] Create newsletter_subscriptions table
- [ ] Create newsletter_recipients table (tracking)
- [ ] Run migration

### 4.2 Industry Newsletter Agent (Perplexity)
- [ ] Create `src/agents/industryNewsletterAgent.ts`
- [ ] Implement weekly market research
  ```typescript
  async function generateIndustryNewsletter(): Promise<Newsletter>
  ```
- [ ] Use Perplexity to research:
  - [ ] Top industry news (past 7 days)
  - [ ] Commodity price changes
  - [ ] Supply chain issues
  - [ ] Regulatory updates
  - [ ] Consumer trends
- [ ] Structure research data
- [ ] Format as newsletter sections
- [ ] Test research quality

### 4.3 Newsletter Content Formatting
- [ ] Create newsletter email template
- [ ] Design header/hero section
- [ ] Create sections:
  - [ ] Market Snapshot
  - [ ] This Week's Headlines
  - [ ] Commodity Price Watch
  - [ ] Supply Chain Updates
  - [ ] Industry Insights
  - [ ] What It Means for You
- [ ] Add unsubscribe link
- [ ] Make template mobile responsive
- [ ] Test rendering across email clients

### 4.4 Newsletter Writing Agent (GPT-4)
- [ ] Create `src/agents/newsletterWritingAgent.ts`
- [ ] Transform Perplexity research into engaging copy
- [ ] Match Derek's voice (from CLAUDE.md)
- [ ] Add actionable insights
- [ ] Include relevant data/statistics
- [ ] Write compelling section headlines
- [ ] Add TL;DR summary at top
- [ ] Test copy quality and tone

### 4.5 Regional Intelligence Agent (Perplexity)
- [ ] Create `src/agents/regionalIntelligenceAgent.ts`
- [ ] Implement personalized market research
  ```typescript
  async function generateRegionalIntel(restaurant): Promise<Report>
  ```
- [ ] Research region-specific pricing
- [ ] Find local events impacting dining
- [ ] Identify seasonal opportunities
- [ ] Track local competition
- [ ] Monitor supply chain in region
- [ ] Test with different regions

### 4.6 Custom Newsletter Personalization
- [ ] Create custom newsletter template
- [ ] Include restaurant name
- [ ] Reference their specific location
- [ ] Mention their cuisine type
- [ ] Include region-specific data
- [ ] Add personalized recommendations
- [ ] Test personalization quality

### 4.7 Newsletter Subscription Management
- [ ] Add newsletter tiers to pricing page
- [ ] Create newsletter subscription flow
- [ ] Allow selecting multiple newsletters
- [ ] Set delivery day preference
- [ ] Integrate Stripe billing for newsletters
- [ ] Create newsletter management in dashboard
- [ ] Allow pausing/resuming newsletters

### 4.8 Newsletter Delivery System
- [ ] Create weekly newsletter job queue
- [ ] Schedule industry newsletter (e.g., every Monday)
- [ ] Generate industry newsletter content
- [ ] Send to all industry newsletter subscribers
- [ ] Generate custom newsletters per subscriber
- [ ] Send personalized newsletters
- [ ] Track newsletter opens/clicks
- [ ] Log all newsletter sends

### 4.9 Newsletter Analytics
- [ ] Track newsletter open rates
- [ ] Track click-through rates
- [ ] Track most-clicked sections
- [ ] Show analytics in admin dashboard
- [ ] Create subscriber engagement reports
- [ ] Identify popular topics
- [ ] Use data to improve future newsletters

### 4.10 Newsletter Archive
- [ ] Create public newsletter archive page
- [ ] Display past industry newsletters
- [ ] Allow browsing by date
- [ ] Add search functionality
- [ ] Use as lead magnet (preview before paywall)
- [ ] Optimize for SEO

### 4.11 Testing & Launch
- [ ] Test newsletter generation
- [ ] Test with Derek's feedback
- [ ] Verify Perplexity research quality
- [ ] Test email delivery
- [ ] Test personalization
- [ ] Run beta with select subscribers
- [ ] Launch newsletter tiers publicly

---

## PHASE 5: SCALE, GROWTH & OPTIMIZATION (Weeks 11-12)

**Goal:** Add retention features, optimize operations, prepare for growth

### 5.1 Onboarding Assistant Agent
- [ ] Create AI chatbot for onboarding
- [ ] Integrate chatbot UI in profile setup
- [ ] Train on MenuSparks features
- [ ] Help users choose equipment
- [ ] Suggest tier based on needs
- [ ] Answer common questions
- [ ] Test chatbot helpfulness

### 5.2 Support Chatbot Agent
- [ ] Create support chatbot widget
- [ ] Train on FAQ and documentation
- [ ] Handle common support questions:
  - [ ] "When is my next delivery?"
  - [ ] "How do I change my delivery day?"
  - [ ] "How do I cancel?"
  - [ ] "I didn't receive my email"
- [ ] Escalate complex issues to human
- [ ] Track common issues
- [ ] Improve based on user feedback

### 5.3 Retention Agent
- [ ] Identify churn risk signals:
  - [ ] User hasn't logged in (2+ weeks)
  - [ ] Recipes not viewed
  - [ ] Payment failures
- [ ] Send re-engagement emails
- [ ] Offer discount/incentive
- [ ] Request feedback
- [ ] Track retention metrics
- [ ] A/B test retention strategies

### 5.4 Upsell Agent
- [ ] Identify upsell opportunities:
  - [ ] Quick Byte users viewing recipes 10+ times
  - [ ] High engagement users
  - [ ] Users who save many favorites
- [ ] Send upgrade suggestions
- [ ] Highlight Chef's Choice benefits
- [ ] Offer trial of higher tier
- [ ] Track conversion rates
- [ ] Optimize upsell timing

### 5.5 Performance Optimization
- [ ] Audit API response times
- [ ] Optimize database queries (add indexes)
- [ ] Implement caching (Redis):
  - [ ] Restaurant profiles
  - [ ] Common prompts
  - [ ] Recipe templates
- [ ] Optimize AI API usage
- [ ] Reduce unnecessary API calls
- [ ] Batch operations where possible
- [ ] Monitor and optimize costs

### 5.6 Recipe Quality Improvements
- [ ] Analyze recipe feedback from users
- [ ] Identify common quality issues
- [ ] Improve prompt engineering
- [ ] Add more context to prompts
- [ ] Fine-tune validation rules
- [ ] A/B test different prompts
- [ ] Track recipe save/use rates

### 5.7 User Feedback System
- [ ] Add recipe rating system (1-5 stars)
- [ ] Add "Report Issue" button
- [ ] Collect feedback on recipe quality
- [ ] Create feedback dashboard
- [ ] Respond to user feedback
- [ ] Use feedback to improve prompts

### 5.8 Analytics & Metrics Dashboard
- [ ] Create comprehensive analytics dashboard
- [ ] Track key metrics:
  - [ ] MRR (Monthly Recurring Revenue)
  - [ ] Churn rate
  - [ ] Customer LTV
  - [ ] Recipes generated per day
  - [ ] Email open rates
  - [ ] Payment success rates
  - [ ] AI API costs
- [ ] Create charts and visualizations
- [ ] Set up automated reports
- [ ] Share metrics with Derek weekly

### 5.9 Mobile Optimization
- [ ] Audit mobile experience
- [ ] Optimize dashboard for mobile
- [ ] Optimize recipes for mobile viewing
- [ ] Test on various devices
- [ ] Improve mobile navigation
- [ ] Consider PWA features

### 5.10 SEO & Content Marketing
- [ ] Optimize landing page for SEO
- [ ] Create blog section
- [ ] Write SEO-optimized articles:
  - [ ] "How to Reduce Food Waste in Restaurants"
  - [ ] "10 Ways to Use Excess Inventory"
  - [ ] "AI-Powered Menu Innovation"
- [ ] Create case studies from users
- [ ] Build backlinks
- [ ] Monitor SEO rankings

### 5.11 Referral Program
- [ ] Design referral program
- [ ] Create referral link system
- [ ] Offer incentives (1 month free?)
- [ ] Build referral dashboard
- [ ] Track referral conversions
- [ ] Send referral credits automatically

### 5.12 Multi-Restaurant Support
- [ ] Allow users to manage multiple restaurants
- [ ] Create restaurant switcher in dashboard
- [ ] Handle separate subscriptions per restaurant
- [ ] Offer multi-restaurant discount
- [ ] Build for consultant persona

### 5.13 Recipe Collections & Favorites
- [ ] Allow saving favorite recipes
- [ ] Create recipe collections
- [ ] Share collections between team members
- [ ] Export collection as PDF
- [ ] Search within favorites

### 5.14 Team Collaboration Features
- [ ] Add team member invites
- [ ] Role-based permissions (owner, chef, viewer)
- [ ] Shared recipe access
- [ ] Comments on recipes
- [ ] Activity feed

---

## FUTURE ENHANCEMENTS (Post-Launch)

### V1.1 Features
- [ ] Food costing calculator
- [ ] Nutritional information generation
- [ ] Allergen labeling
- [ ] Recipe versioning
- [ ] Print-friendly menu cards
- [ ] QR code generation for specials

### V2.0 Features
- [ ] Cloud sync across devices
- [ ] Mobile app (React Native)
- [ ] POS integration (Toast, Square)
- [ ] Supplier API integration
- [ ] Real-time inventory tracking
- [ ] Automated ordering suggestions
- [ ] Full weekly menu generation
- [ ] Multi-language support

### B2B Expansion
- [ ] Restaurant group/franchise features
- [ ] White-label options
- [ ] API for third-party integrations
- [ ] Advanced analytics for consultants
- [ ] Bulk management tools

---

## DEPLOYMENT CHECKLIST

### Pre-Launch
- [ ] Complete security audit
- [ ] Test all user flows end-to-end
- [ ] Verify all environment variables
- [ ] Set up production database backups
- [ ] Configure SSL certificates
- [ ] Set up monitoring and alerts
- [ ] Prepare customer support documentation
- [ ] Create onboarding videos/tutorials
- [ ] Set up legal pages (Terms, Privacy Policy)
- [ ] Get legal review of terms
- [ ] Set up business analytics (Mixpanel/PostHog)
- [ ] Create launch announcement content

### Launch Day
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test critical paths in production
- [ ] Monitor error logs
- [ ] Announce launch (email, social media)
- [ ] Onboard first beta customers
- [ ] Monitor for issues
- [ ] Respond to support requests promptly

### Post-Launch (Week 1)
- [ ] Daily monitoring of all systems
- [ ] Review error logs
- [ ] Check AI API costs
- [ ] Monitor delivery success rates
- [ ] Gather user feedback
- [ ] Fix critical bugs immediately
- [ ] Plan first iteration improvements

---

## ONGOING MAINTENANCE

### Daily
- [ ] Monitor error logs (Sentry)
- [ ] Check delivery success rates
- [ ] Review payment processing
- [ ] Respond to support requests

### Weekly
- [ ] Review analytics dashboard
- [ ] Check AI API costs vs budget
- [ ] Review user feedback
- [ ] Test automated deliveries
- [ ] Update TODO.md with new tasks

### Monthly
- [ ] Review churn and retention metrics
- [ ] Analyze recipe quality feedback
- [ ] Optimize prompts based on data
- [ ] Review and optimize costs
- [ ] Plan next features
- [ ] Security updates for dependencies

---

## CURRENT STATUS

**Phase:** 1.2 - Landing Page & Marketing Site (MVP Development)
**Last Completed:** Phase 1.1 - Authentication System ✅
**Next Action:** Build landing page OR continue with Phase 1.3 (Restaurant Profile Setup)

**Completed:**
- ✅ Phase 0.3 - Project Initialization (Next.js 15 + TypeScript + Tailwind CSS v4)
- ✅ Phase 0.5 - Database Setup (Supabase PostgreSQL + Prisma)
- ✅ Phase 1.1 - Authentication System (NextAuth.js + JWT + Protected Routes)

**Active:**
- 🔄 Gemini API key obtained: AIzaSyCL75VWSQ1GOmF5bYn44UCSA1LrztgyLLs
- 🔄 Perplexity API key obtained: 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
- 🔄 Server running on http://localhost:3005

**Pending:**
- [ ] Stripe API keys (for billing)
- [ ] SendGrid/Resend API key (for emails)
- [ ] Confirm pricing strategy for tiers

---

## NOTES

- **Cost Tracking:** Monitor AI API costs closely - budget $100/month initially
- **Quality First:** Recipe quality is #1 priority - iterate on prompts until perfect
- **Automate Everything:** Every manual process should eventually be automated
- **Derek's Input:** Get feedback from Bobola's Restaurant throughout development
- **Document Everything:** Keep this TODO.md updated with all changes

---

**Last Updated:** October 11, 2025 by Claude Code
