# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MenuSparks is a Next.js 15 application that provides an AI-powered restaurant menu optimization platform. The current implementation is a conversion-focused landing page for a SaaS that generates profitable restaurant specials from existing inventory.

### Core Business Model
- **Problem**: Restaurants waste 4-10% of food budget annually through poor inventory management
- **Solution**: Weekly AI-generated specials using existing inventory to reduce waste and increase profits
- **Pricing**: Three tiers ($10/week Appetizer, $20/week Main Meal, $35/week Dessert) plus newsletters

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
- Three tiers with feature lists
- À la carte newsletters section
- 100% satisfaction guarantee section
- Billing state managed with useState

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

### Recently Completed
- Streamlined landing page flow for conversion
- Removed About section to separate page
- Simplified pricing to $10/$20/$35 weekly
- Made savings calculator visual with cards
- Added collapsible recipe example
- Implemented annual pricing toggle
- Updated stats: Recipe Database to 10,000+ items
- Updated restaurant experience to "over 10 restaurants managed"
- Cleaned footer: removed unnecessary sections, simplified to email + legal links
- Updated contact to admin@menusparks.com via mailto in header
- Removed Reviews navigation temporarily
- Updated How It Works to clear 3-step process
- Reduced section spacing for better visual flow

### Known Issues
- Mobile menu doesn't close after navigation
- Forms don't persist after page refresh
- No backend integration yet
- Images need optimization
- Need to create actual About, Privacy, Terms pages

### Upcoming Features (from PRD)
- Backend initialization (Express + PostgreSQL)
- Google Gemini API integration for AI generation
- User authentication system
- Restaurant profile management
- Inventory input system
- Stripe payment processing
- Analytics and tracking
- Create missing pages (About, Privacy, Terms)