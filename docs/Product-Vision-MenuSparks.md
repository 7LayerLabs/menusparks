# MenuSparks.com Product Vision

**Date:** October 11, 2025
**Status:** Planning Phase

## Core Mission

Help restaurants reduce waste, control costs, and increase profitability through AI-powered weekly recipe specials that utilize existing inventory - especially critical in tough economic times.

## Business Model: Subscription Services

MenuSparks.com is a **subscription-based service** where restaurants sign up, select their delivery preferences, and receive automated weekly content.

### Service Tiers

#### 1. Quick Byte Service - $XX/week
**Target:** Small operations, food trucks, cafes
- 5 weekly recipes
- Basic ingredient optimization
- Simple prep instructions
- Charged weekly on selected delivery day

#### 2. Chef's Choice - $XX/week
**Target:** Full-service restaurants, upscale dining
- 10 weekly specials
- Advanced customization options
- Detailed prep instructions
- Social media content for each special
- Charged weekly on selected delivery day

#### 3. Industry Newsletter - $XX/week
**Target:** Restaurant owners, kitchen managers, industry professionals
- Weekly market intelligence report
- Commodity pricing trends
- Supply chain insights
- Industry news and analysis
- Charged weekly on delivery day

#### 4. Custom Market Intelligence - $XX/week
**Target:** Multi-unit operators, restaurant groups, consultants
- Personalized market updates
- Region-specific pricing data
- Local event-driven opportunities
- Inventory-based recommendations
- Custom business insights
- Charged weekly on delivery day

## User Journey

### Onboarding Flow
1. **Landing Page** → Select service tier(s)
2. **Account Creation** → Email, password, payment method
3. **Restaurant Profile Setup:**
   - Restaurant name & type (Fast Casual, Fine Dining, Food Truck, etc.)
   - Cuisine style (Italian, Mexican, American, Fusion, etc.)
   - Current menu upload (for context and brand matching)
   - Kitchen equipment available
   - Dietary restrictions/preferences
   - Geographic location (for market intelligence services)
4. **Delivery Preferences:**
   - Select day of week to receive specials (Monday - Sunday)
   - Time preference (early morning for prep planning)
   - Notification method (email, SMS, dashboard)
5. **Payment Setup** → Billing occurs automatically on delivery day

### Weekly Delivery Flow
1. **Day Before Delivery:** Reminder notification
2. **Delivery Day (Selected Day):**
   - Content delivered via email + dashboard
   - Payment processed automatically
   - Recipes/content ready for kitchen review
3. **Throughout Week:**
   - Access to dashboard to view/print recipes
   - Ability to modify upcoming preferences
   - Track which specials were used

## Key Differentiation: Brand Matching

### Deep Personalization
Every recipe and special is **customized to match**:
- **Restaurant Type:** Fast casual vs. fine dining prep complexity
- **Cuisine Style:** Italian restaurant gets Italian-inspired specials
- **Brand Voice:** Menu descriptions match existing menu tone
- **Equipment:** Only recipes that work with available equipment
- **Current Menu:** Specials complement (not compete with) existing offerings
- **Price Point:** Specials match the restaurant's price tier

### Example:
**Bobola's Restaurant (Italian, Family-Style, Nashua NH)**
- Receives Italian-American specials
- Descriptions match Bobola's warm, family-friendly tone
- Recipes use their existing equipment (no sous vide if they don't have one)
- Specials complement their menu (not another chicken parm if they have 3 already)
- Incorporates regional/seasonal NH ingredients
- Price points match their moderate family dining tier

## Value Proposition

### For Restaurants
1. **Reduce Food Waste:** Use inventory before it spoils
2. **Control Food Costs:** Stop over-ordering, use what you have
3. **Increase Profitability:** Turn excess inventory into profitable specials
4. **Save Time:** No creative burnout, weekly specials delivered automatically
5. **Stay Fresh:** Keep menu exciting without full menu rewrites
6. **Market Intelligence:** Understand commodity pricing to make smarter purchasing decisions

### Why This Matters Now
- Tough economy = tight margins
- Food costs at all-time highs
- Labor costs increasing
- Customers want variety but restaurants can't afford constant menu changes
- Supply chain volatility requires agile menu planning

## Technical Requirements

### Customer-Facing Platform
- **Website:** MenuSparks.com with landing page, pricing, sign-up
- **User Dashboard:** View delivered recipes, manage preferences, billing
- **Email Delivery System:** Automated weekly email with recipes/content
- **Payment Processing:** Stripe/similar for subscription billing
- **Profile Management:** Update restaurant details, equipment, preferences

### Backend Requirements
- **User Authentication & Authorization**
- **Subscription Management:** Billing cycles, tier management
- **Scheduled Job System:** Generate and deliver content on user-selected days
- **AI Integration:** Gemini API (or multi-provider support)
- **Email Service:** SendGrid, AWS SES, or similar
- **Database:** User profiles, restaurant data, delivery history, recipe library

### AI Generation System
- **Context-Aware Prompts:** Include restaurant profile, menu, equipment in every generation
- **Brand Voice Matching:** Analyze existing menu to match tone
- **Batch Generation:** Generate 5-10 recipes per request efficiently
- **Quality Control:** Ensure recipes are practical and on-brand
- **Content Formatting:** Professional recipe cards + social media posts

## Architecture Shift: Standalone → SaaS

### Original Reference Project
- Single-user, local-first
- localStorage for client profiles
- Manual generation
- No billing or scheduling

### MenuSparks.com (What We're Building)
- Multi-tenant SaaS platform
- User accounts with authentication
- Automated weekly delivery system
- Subscription billing
- Cloud database (not localStorage)
- Scheduled AI generation jobs
- Email delivery infrastructure

## Development Phases

### Phase 1: MVP - Quick Byte Service Only
- Landing page + sign-up flow
- User authentication
- Restaurant profile setup
- Quick Byte tier (5 recipes/week)
- Manual delivery (admin triggers generation)
- Basic email delivery
- Stripe billing integration

### Phase 2: Chef's Choice + Automation
- Chef's Choice tier (10 recipes + social content)
- Automated scheduled delivery system
- User dashboard improvements
- Recipe history and favorites

### Phase 3: Market Intelligence Services
- Industry newsletter tier
- Custom market intelligence tier
- Integration with market data sources
- Advanced reporting and insights

### Phase 4: Scale & Optimize
- Multi-unit/consultant features
- Team collaboration
- Analytics and usage tracking
- Mobile app
- API for POS integration

## Success Metrics

- Monthly Recurring Revenue (MRR)
- Customer Lifetime Value (LTV)
- Churn rate
- Recipes actually used by restaurants
- Food waste reduction (customer surveys)
- Cost savings per restaurant (ROI tracking)
- Customer satisfaction (NPS)

## Competitive Advantage

1. **Automated Delivery:** Set it and forget it - recipes arrive weekly
2. **Brand Matching:** Not generic recipes, perfectly matched to your restaurant
3. **Inventory-First:** Focus on using what you have, not what you need to buy
4. **Economic Timing:** Launching when restaurants need cost control most
5. **Multi-Service Platform:** Recipes + market intelligence in one place
