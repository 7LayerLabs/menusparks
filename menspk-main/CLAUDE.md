# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MenuSparks is a Next.js 15 application that provides an AI-powered restaurant menu optimization platform. **LIVE at https://menusparks.com with Stripe payments enabled.**

### Core Business Model
- **Problem**: Restaurants waste 4-10% of food budget annually through poor inventory management
- **Solution**: Weekly AI-generated specials using existing inventory to reduce waste and increase profits
- **Pricing**: 
  - Appetizer: $10/week or $420/year
  - Main Meal: $20/week or $840/year
  - Dessert: Coming Soon
  - Industry Newsletter: $5/week
  - Custom Newsletter: $10/week

### Current Status
- **Live Site**: https://menusparks.com
- **Payments**: Stripe integration (LIVE MODE) ✅
- **Mode**: Waitlist signups (limited spots messaging)

### Design Philosophy
**"Cool vibes don't convert - CLARITY is king."**
- Prioritize clear communication over trendy aesthetics
- Focus on quantifiable value (savings calculator prominent)
- Every element must drive toward conversion
- Keep landing page flow tight and persuasive

## Development Commands

```bash
# Navigate to Next.js application directory first
cd menspk-main

# Install dependencies
npm install

# Start development server (usually http://localhost:3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

**Important**: All Next.js code is in the `menspk-main/` subdirectory. Always cd into it before running commands.

## Architecture

### Directory Structure
```
menspk-master/ (root)
├── menspk-main/           # Next.js application (ALL CODE HERE)
│   ├── src/
│   │   ├── app/          # App Router - page.tsx is main landing
│   │   │   └── globals.css # Custom Tailwind utilities
│   │   └── components/   # React components
│   ├── public/           # Static assets
│   └── package.json      # Dependencies
├── subagents/            # AI agent documentation
├── newsletters/          # Auto-generated market reports
├── culinary-ideas/       # Auto-generated recipes
└── tasks/               # Project management
```

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 3.4.17
- **React**: Version 19.1.1
- **State Management**: React hooks (useState)
- **Data Storage**: localStorage (temporary - will migrate to backend)

## Current Landing Page Flow

The optimized conversion flow in `app/page.tsx`:
1. **Hero** - "STOP! adding to your inventory" headline with email capture
2. **SavingsCalculator** - Visual savings cards showing +$5,600 to +$11,200 annual savings
3. **MenuSparkExample** - Collapsible recipe card showing tangible output
4. **HowItWorks** - Simplified 3-step process
5. **Pricing** - Three tiers with annual toggle (10 weeks free)
6. **Final CTA** - Credibility statement + email capture

### Component Patterns

All components follow consistent patterns:
- Interactive components use `'use client'` directive
- TypeScript functional components with explicit return types
- Form handling stores to localStorage temporarily
- Toast notifications for user feedback
- Mobile-responsive with Tailwind breakpoints

### Styling System

Custom utilities in `globals.css`:
- `.btn-primary`: Blue CTA buttons (bg-blue-600)
- `.btn-secondary`: Orange secondary buttons (bg-orange-500)
- `.section-container`: Responsive max-width wrapper
- `.gradient-text`: Fire gradient for hero text
- `.animate-fadeIn`: Smooth reveal animation

Color palette:
- **Primary**: Blue (blue-600, blue-700) - main CTAs
- **Accent**: Orange (orange-500, orange-600) - highlights
- **Success**: Green (green-500) - savings/positive
- **Background**: Black/Gray-900 - dark theme
- **Text**: White (headings), Gray-300 (body)

## Key Business Components

### Pricing Component (`Pricing.tsx`)
- Weekly/Annual toggle (annual saves 10 weeks)
- Three tiers with feature lists (Dessert is "Coming Soon")
- À la carte newsletters section with Stripe checkout
- 100% satisfaction guarantee section
- All buttons connected to live Stripe checkout
- Loading states during checkout redirect

### SavingsCalculator Component
- Three revenue tiers ($500k, $750k, $1M)
- Visual cards with green savings highlights
- Based on 32% food cost, 7% waste industry averages
- "Calculate My Exact Savings" CTA

### MenuSparkExample Component
- Collapsible recipe card (collapsed by default)
- Shows complete special with ingredients, prep notes
- Includes social media copy and image suggestions
- Demonstrates tangible value proposition

## Data Flow

Currently using localStorage for:
- Email captures from Hero and FinalCTA forms
- Contact form submissions
- Data structure: `{email, timestamp, source}`

Future backend integration points:
- Email capture → Marketing automation API
- Contact forms → CRM integration
- Pricing selection → Stripe checkout
- User accounts → Authentication system

## Specialized Subagents

Reference `subagents/` folder for specialized Claude agents:
- **nextjs-fullstack-developer**: Next.js implementation
- **api-integration-specialist**: Third-party integrations
- **uiux-design-specialist**: Tailwind and responsive design
- **culinary-genius**: Recipe generation
- **marketing-content-creator**: Copy and campaigns
- **newsletter-curator**: Market intelligence

## Content Auto-Generation

### Newsletters (`newsletters/`)
Format: `YYYY-MM-DD_market-brief.md`
Command: "Create this week's market brief"

### Culinary Ideas (`culinary-ideas/`)
Format: `YYYY-MM-DD_[type]_[dish-name].md`
Command: "Create a special with [ingredients]"

## Current State & Next Steps

### Recently Completed (August 23, 2025)
- ✅ **STRIPE PAYMENTS LIVE** - Full checkout integration with live mode
- ✅ All price IDs configured (Appetizer, Main Meal, Newsletters)
- ✅ Changed all CTAs to "Join the Waitlist" messaging
- ✅ Added "Coming Soon" blur overlay on Dessert tier
- ✅ Fixed success page with Suspense boundary
- ✅ Connected newsletter subscription buttons
- ✅ Privacy Policy and Terms of Service pages created
- ✅ Annual pricing toggle (10 weeks free)
- ✅ Visual savings calculator with cards
- ✅ Collapsible recipe example
- ✅ Responsive design for mobile/desktop

### Environment Variables (Required in Vercel)
```
# Stripe (LIVE MODE) - ✅ ADDED
STRIPE_SECRET_KEY=sk_live_[your_key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[your_key]
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_WEEKLY=price_1RzLIVDlxrM8ZIxccXQOfcT0
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_ANNUAL=price_1RzLJcDlxrM8ZIxcQad2yLn7
NEXT_PUBLIC_STRIPE_PRICE_MAIN_WEEKLY=price_1RzLKrDlxrM8ZIxcauTWpOFn
NEXT_PUBLIC_STRIPE_PRICE_MAIN_ANNUAL=price_1RzLKrDlxrM8ZIxclcFO4WCT
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_INDUSTRY=price_1RzLLxDlxrM8ZIxctmOIRPSU
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_CUSTOM=price_1RzLNPDlxrM8ZIxc45k28YfR

# Supabase - ⏳ TO BE ADDED
NEXT_PUBLIC_SUPABASE_URL=https://fbzjjxhyfovvjjjqmyqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[from .env file]
```

### Known Issues
- Mobile menu doesn't close after navigation
- Waste Calculator needs ROI enhancement section
- About page returns 404 (not created yet)
- Supabase not connected (needs env vars)

### Recently Completed (August 29, 2025) - AI DASHBOARD
- ✅ **GOOGLE GEMINI AI INTEGRATION** - Secure server-side implementation
- ✅ **FULL DASHBOARD** with recipe generator, history, saved recipes, analytics
- ✅ **24 RESTAURANT STYLES** with multi-select checkboxes
- ✅ **14 RECIPE TYPES** with quantity selectors
- ✅ **PROFESSIONAL UI** with gradients, animations, emoji icons
- ✅ **FILE UPLOAD** for ingredient lists and menus
- ✅ **3-PHASE RECIPES** (prep, bulk prep, service)
- ✅ **SOCIAL MEDIA POSTS** auto-generated with emojis
- ✅ **EXPORT FUNCTIONALITY** (Markdown format)
- ✅ **LOGIN PAGE** with demo access

### AI Recipe Generator Details

#### Security Implementation
- API key stored server-side only (no NEXT_PUBLIC prefix)
- Secure backend endpoints (/api/generate-recipes-full)
- No sensitive data exposed to frontend
- Following Google's official security recommendations

#### Dashboard Features
- **Recipe Generator Tab**: Full configuration with all options
- **Recipe History Tab**: Track all past generations
- **Saved Recipes Tab**: Save and organize favorites
- **Analytics Tab**: Usage statistics and insights

#### Configuration Options
- **Recipe Types** (14): Breakfast, Lunch, Dinner, Appetizer, Main Course, Dessert, Soup/Chowder, Salad, Sandwich, Side Dish, Beverage, Snack, Bakery Item
- **Restaurant Styles** (24): American (New/Traditional), Classic Diner, Italian, French, Chinese, Indian, Mexican, Mediterranean, Seafood, Steakhouse, Vegan, Gluten-Free, Kids Menu, etc.
- **Complexity Levels**: Basic, Intermediate, Chef Level
- **Recipe Creativity**: Creative, Classic, Hybrid
- **Equipment Options** (17): Grill, Fryer, Smoker, Sous Vide, Pizza Oven, etc.
- **File Upload Support**: CSV, TXT, PDF, Images

#### API Configuration
```bash
# In .env.local (server-side only)
GEMINI_API_KEY=your_api_key_here  # NO NEXT_PUBLIC prefix!

# Models used
- gemini-1.5-flash (current, supports text and images)
- gemini-pro (deprecated, replaced)
- gemini-pro-vision (deprecated, replaced)
```

### Known Issues
- Mobile menu doesn't close after navigation
- JSON parsing occasionally fails (improved error handling added)
- Rate limiting not yet implemented
- Authentication is demo mode only

### Upcoming Features
- Supabase integration for data persistence
- Real user authentication system
- Rate limiting for API calls
- Recipe rating system
- PDF export functionality
- Print-friendly recipe view
- Team collaboration features
- Nutritional information