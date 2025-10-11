# MenuSparks.com - Technical Architecture

**Date:** October 11, 2025
**Version:** 1.0

## Architecture Overview

MenuSparks.com is a **full-stack SaaS application** with automated content delivery, not a standalone tool.

### Key Architectural Shift
**Reference Project:** Single-user, client-side only, localStorage
**MenuSparks.com:** Multi-tenant SaaS with backend, database, scheduled jobs, and payment processing

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  (React + TypeScript + Tailwind + Vite)                     │
│  - Landing page & marketing site                             │
│  - User authentication flows                                 │
│  - Restaurant profile setup                                  │
│  - User dashboard (view recipes, manage account)             │
│  - Admin dashboard (trigger manual deliveries, view users)   │
└──────────────────┬──────────────────────────────────────────┘
                   │ REST API / GraphQL
┌──────────────────▼──────────────────────────────────────────┐
│                         Backend API                          │
│  (Node.js + Express OR Next.js API Routes)                  │
│  - User authentication & session management                  │
│  - Restaurant profile CRUD operations                        │
│  - Subscription management                                   │
│  - Recipe generation requests                                │
│  - Delivery scheduling                                       │
│  - Webhook handlers (Stripe, email)                          │
└──────────────────┬──────────────────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
┌────────▼─────────┐  ┌──────▼────────────────────────────────┐
│    Database      │  │    Background Job Queue               │
│  (PostgreSQL)    │  │    (BullMQ / Agenda / Cron)          │
│                  │  │                                        │
│ - Users          │  │  - Weekly recipe generation jobs      │
│ - Restaurants    │  │  - Email delivery jobs                │
│ - Subscriptions  │  │  - Payment processing jobs            │
│ - Recipes        │  │  - Scheduled for user-selected days   │
│ - Deliveries     │  └────────────┬───────────────────────────┘
│ - Billing        │               │
└──────────────────┘               │
                                   │
         ┌─────────────────────────┴─────────────────────┐
         │                                               │
┌────────▼──────────┐                        ┌───────────▼────────┐
│   AI Service      │                        │  Email Service     │
│ (Gemini API)      │                        │  (SendGrid/SES)    │
│                   │                        │                    │
│ - Recipe gen      │                        │ - Weekly delivery  │
│ - Brand matching  │                        │ - Transactional    │
│ - Batch requests  │                        │ - Notifications    │
└───────────────────┘                        └────────────────────┘
         │
         │
┌────────▼──────────┐
│  Payment Gateway  │
│    (Stripe)       │
│                   │
│ - Subscriptions   │
│ - Weekly billing  │
│ - Webhooks        │
└───────────────────┘
```

## Tech Stack Decision

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite (fast, modern)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router v6
- **State Management:** React Context + Hooks (or Zustand for complex state)
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios or Fetch API

### Backend Options

#### Option A: Separate Backend (Recommended for Scale)
- **Runtime:** Node.js
- **Framework:** Express.js or Fastify
- **Language:** TypeScript
- **Authentication:** JWT + bcrypt or Passport.js
- **Validation:** Zod or Joi
- **ORM:** Prisma or TypeORM

#### Option B: Next.js Full Stack (Faster MVP)
- **Framework:** Next.js 14+ (App Router)
- **API Routes:** Built-in Next.js API
- **SSR/SSG:** For marketing pages
- **Authentication:** NextAuth.js
- **All frontend tech same as above**

**Recommendation:** Start with **Next.js** for MVP speed, can split to separate backend later if needed.

### Database
- **Primary:** PostgreSQL (Supabase or Railway for easy hosting)
- **ORM:** Prisma (excellent TypeScript support)
- **Caching:** Redis (for session management and job queue)

### Background Jobs
- **Job Queue:** BullMQ (Redis-based, reliable)
- **Scheduler:** node-cron or BullMQ's built-in repeat
- **Use Cases:**
  - Daily check for which users need recipes today
  - Generate recipes for each user
  - Send emails
  - Process payments

### External Services

#### AI Provider
- **Primary:** Google Gemini API (@google/generative-ai)
- **Fallback:** OpenAI or Anthropic (multi-provider support)
- **Strategy:** Store provider preference per user for future flexibility

#### Email Delivery
- **Options:**
  - SendGrid (reliable, good templates)
  - AWS SES (cost-effective at scale)
  - Resend (developer-friendly, React email templates)
- **Recommendation:** Resend for MVP (React email components)

#### Payment Processing
- **Provider:** Stripe
- **Features Needed:**
  - Subscription management
  - Webhook handling
  - Tiered pricing
  - Automatic weekly billing
- **Integration:** @stripe/stripe-js + stripe (backend SDK)

#### File Storage (Future)
- **Provider:** AWS S3 or Cloudflare R2
- **Use Case:** User-uploaded menus, generated PDFs, images

### Deployment & Hosting

#### Frontend + Backend (Next.js)
- **Primary:** Vercel (optimized for Next.js)
- **Alternative:** Railway, Render, or AWS

#### Database
- **Primary:** Supabase (PostgreSQL + built-in auth + storage)
- **Alternative:** Railway, Neon, or AWS RDS

#### Redis (Job Queue)
- **Options:** Upstash Redis (serverless), Railway, or Redis Cloud

#### Monitoring & Logging
- **Error Tracking:** Sentry
- **Analytics:** PostHog or Mixpanel
- **Logging:** Better Stack (LogTail) or Winston + CloudWatch

## Database Schema (Preliminary)

```typescript
// Core Tables

users
├── id (uuid, primary key)
├── email (unique)
├── password_hash
├── name
├── created_at
├── updated_at
└── stripe_customer_id

restaurants
├── id (uuid, primary key)
├── user_id (foreign key → users)
├── name
├── type (enum: fine_dining, casual, food_truck, etc.)
├── cuisine_style (array or enum: italian, mexican, etc.)
├── description
├── location (city, state, zip)
├── menu_context (text - uploaded menu parsed)
├── equipment (array: oven, grill, fryer, etc.)
├── dietary_preferences (array)
├── price_tier (enum: budget, moderate, upscale)
├── brand_voice_notes (text)
├── created_at
└── updated_at

subscriptions
├── id (uuid, primary key)
├── user_id (foreign key → users)
├── restaurant_id (foreign key → restaurants)
├── tier (enum: quick_byte, chefs_choice, industry_newsletter, custom_intelligence)
├── status (enum: active, paused, cancelled)
├── delivery_day (enum: monday, tuesday, etc.)
├── delivery_time (time)
├── stripe_subscription_id
├── current_period_start
├── current_period_end
├── created_at
└── updated_at

deliveries
├── id (uuid, primary key)
├── subscription_id (foreign key → subscriptions)
├── scheduled_date (date)
├── delivered_at (timestamp)
├── status (enum: scheduled, generating, delivered, failed)
├── recipe_ids (array of uuids)
├── email_sent (boolean)
├── created_at
└── updated_at

recipes
├── id (uuid, primary key)
├── restaurant_id (foreign key → restaurants)
├── delivery_id (foreign key → deliveries) (nullable)
├── name
├── meal_type (enum: appetizer, entree, dessert, etc.)
├── menu_description
├── yield
├── ingredients (jsonb)
├── mise_en_place (jsonb)
├── pre_service_prep (jsonb)
├── service_instructions (jsonb)
├── chefs_notes (text)
├── social_media_post (text)
├── style (enum: creative, classic, hybrid)
├── complexity (enum: basic, intermediate, chef_level)
├── created_at
└── updated_at

payments
├── id (uuid, primary key)
├── user_id (foreign key → users)
├── subscription_id (foreign key → subscriptions)
├── stripe_payment_intent_id
├── amount (decimal)
├── status (enum: succeeded, failed, pending)
├── billing_date
├── created_at
└── updated_at
```

## API Endpoints (Preliminary)

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - End session
- `GET /api/auth/me` - Get current user

### Restaurants
- `POST /api/restaurants` - Create restaurant profile
- `GET /api/restaurants/:id` - Get restaurant details
- `PUT /api/restaurants/:id` - Update restaurant profile
- `DELETE /api/restaurants/:id` - Delete restaurant

### Subscriptions
- `POST /api/subscriptions` - Create subscription
- `GET /api/subscriptions` - List user subscriptions
- `GET /api/subscriptions/:id` - Get subscription details
- `PUT /api/subscriptions/:id` - Update subscription (change day, pause, etc.)
- `DELETE /api/subscriptions/:id` - Cancel subscription

### Recipes
- `GET /api/recipes` - List recipes for restaurant
- `GET /api/recipes/:id` - Get recipe details
- `POST /api/recipes/:id/favorite` - Save recipe as favorite
- `GET /api/recipes/:id/pdf` - Download recipe as PDF

### Deliveries
- `GET /api/deliveries` - List past deliveries for user
- `GET /api/deliveries/:id` - Get delivery details
- `POST /api/deliveries/:id/regenerate` - Trigger manual regeneration (admin)

### Webhooks
- `POST /api/webhooks/stripe` - Handle Stripe events

### Admin (Future)
- `GET /api/admin/users` - List all users
- `GET /api/admin/deliveries` - View all scheduled deliveries
- `POST /api/admin/deliveries/trigger` - Manually trigger delivery job

## Scheduled Jobs

### Daily Job: Recipe Delivery Orchestrator
**Runs:** Every day at 12:01 AM (server time)

```typescript
async function dailyDeliveryOrchestrator() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Get all active subscriptions scheduled for today
  const subscriptionsToDeliver = await db.subscriptions.findMany({
    where: {
      status: 'active',
      delivery_day: today.toLowerCase()
    },
    include: {
      user: true,
      restaurant: true
    }
  });

  // Queue a job for each subscription
  for (const sub of subscriptionsToDeliver) {
    await jobQueue.add('generate-and-deliver', {
      subscriptionId: sub.id,
      restaurantId: sub.restaurant_id,
      tier: sub.tier
    });
  }
}
```

### Job: Generate and Deliver Recipes
**Triggered by:** Daily orchestrator

```typescript
async function generateAndDeliverRecipes(job) {
  const { subscriptionId, restaurantId, tier } = job.data;

  // 1. Get restaurant profile and context
  const restaurant = await db.restaurants.findUnique({ where: { id: restaurantId } });

  // 2. Generate recipes based on tier
  const recipeCount = tier === 'quick_byte' ? 5 : 10;
  const recipes = await aiService.generateRecipes({
    count: recipeCount,
    restaurantContext: restaurant,
    includeSocialMedia: tier === 'chefs_choice'
  });

  // 3. Save recipes to database
  const savedRecipes = await db.recipes.createMany({ data: recipes });

  // 4. Create delivery record
  const delivery = await db.deliveries.create({
    data: {
      subscription_id: subscriptionId,
      scheduled_date: new Date(),
      status: 'delivered',
      recipe_ids: savedRecipes.map(r => r.id)
    }
  });

  // 5. Send email
  await emailService.sendWeeklyRecipes({
    to: restaurant.user.email,
    recipes: savedRecipes,
    restaurantName: restaurant.name
  });

  // 6. Process payment
  await stripeService.createPaymentIntent({
    subscriptionId,
    amount: getTierPrice(tier)
  });
}
```

## Security Considerations

1. **Authentication:** JWT tokens with httpOnly cookies
2. **Authorization:** Row-level security - users can only access their own data
3. **API Rate Limiting:** Prevent abuse
4. **Input Validation:** Zod schemas on all endpoints
5. **SQL Injection:** Using ORM (Prisma) with parameterized queries
6. **XSS Protection:** Sanitize user inputs, CSP headers
7. **API Keys:** Environment variables, never committed to git
8. **Stripe Webhooks:** Verify webhook signatures
9. **HTTPS Only:** Enforce SSL in production

## Development Workflow

### Phase 1: MVP Setup (Week 1-2)
1. Initialize Next.js project with TypeScript
2. Set up Tailwind CSS
3. Configure Prisma + PostgreSQL (Supabase)
4. Implement authentication (NextAuth.js)
5. Build basic landing page
6. Create restaurant profile flow

### Phase 2: Core Features (Week 3-4)
1. Integrate Gemini API
2. Build recipe generation logic
3. Create user dashboard
4. Implement Quick Byte tier
5. Set up Stripe integration
6. Build email delivery system

### Phase 3: Automation (Week 5-6)
1. Set up BullMQ job queue
2. Implement daily orchestrator job
3. Build Chef's Choice tier
4. Test end-to-end automated delivery
5. Add payment processing

### Phase 4: Polish & Launch (Week 7-8)
1. Error handling and logging
2. Email templates and branding
3. Monitoring and alerts
4. Beta testing with Bobola's Restaurant
5. Launch Quick Byte + Chef's Choice tiers

## Next Steps

1. **Confirm tech stack decisions**
2. **Set up development environment**
3. **Initialize Next.js project**
4. **Create database schema with Prisma**
5. **Build authentication system**
6. **Start with landing page + onboarding flow**
