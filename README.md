# MenuSparks

AI-Powered Menu Optimization for Restaurants

## Overview

MenuSparks is a SaaS platform that delivers automated weekly recipe specials to restaurants. Using AI, we help kitchens reduce food waste, control costs, and keep menus fresh with personalized, on-brand recipe innovation.

## Project Status

**Phase:** 0 - Project Setup ✅
**Next:** Phase 1 - MVP Development (Quick Byte Service)

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Supabase)
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **AI Providers:** Gemini, OpenAI, Perplexity
- **Email:** SendGrid/Resend
- **Job Queue:** BullMQ + Redis
- **Deployment:** Vercel

## Project Structure

```
menusparks/
├── docs/                    # All project documentation
│   ├── PRD-MenuSpark.md
│   ├── Product-Vision-MenuSparks.md
│   ├── Technical-Architecture.md
│   ├── Reference-Project-Analysis.md
│   ├── AI-Agent-Army-B2B-Outreach.md
│   └── Practical-Agent-Architecture.md
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   ├── services/            # AI services, API clients
│   ├── agents/              # AI agents (recipe gen, B2B, etc.)
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── TODO.md                  # Master project checklist (316 tasks)
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Supabase account)
- API keys (see .env.example)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Menusparks
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your actual API keys
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Service Tiers

### 1. Quick Byte Service - $XX/week
- 5 weekly recipes
- Basic ingredient optimization
- Simple prep instructions

### 2. Chef's Choice - $XX/week
- 10 weekly specials
- Advanced customization
- Detailed prep instructions
- Social media content

### 3. Industry Newsletter - $XX/week
- Weekly market intelligence
- Commodity pricing trends
- Industry insights

### 4. Custom Market Intelligence - $XX/week
- Personalized market updates
- Region-specific pricing
- Local event opportunities

## Key Features

### Core Product
- 🤖 **AI Recipe Generation** - Powered by Gemini API
- 📅 **Automated Weekly Delivery** - Set your day, get recipes automatically
- 🎨 **Brand Matching** - Recipes tailored to your restaurant's style
- 📱 **Social Media Content** - Instagram/Facebook posts included (Chef's Choice)
- 💰 **Food Cost Optimization** - Use inventory you already have
- 📧 **Email Delivery** - Recipes sent directly to your inbox

### B2B Sales Agent Army
- 🔍 **Lead Enrichment** - Perplexity-powered research
- 🖼️ **Mockup Generation** - fal.ai creates visual examples
- ✍️ **Email Copywriting** - GPT-4 writes personalized campaigns
- 📊 **Campaign Dashboard** - Track engagement and conversions

### Market Intelligence
- 📰 **Industry Newsletter** - Weekly market trends and insights
- 🌎 **Regional Intelligence** - Personalized local market data
- 📈 **Commodity Tracking** - Price trends and supply chain updates

## Development Phases

### ✅ Phase 0: Project Setup (Complete)
- Documentation created
- Next.js project initialized
- Folder structure set up
- Configuration files created

### 🔄 Phase 1: MVP - Quick Byte (Weeks 1-4)
- Authentication system
- Restaurant profile setup
- Recipe generation engine
- Email delivery
- Stripe billing

### Phase 2: Chef's Choice + Automation (Weeks 5-6)
- Social media content generation
- Automated daily orchestrator
- Background job queue

### Phase 3: B2B Agent Army (Weeks 7-8)
- Lead enrichment agent
- Mockup generation agent
- Email copywriting agent
- Campaign dashboard

### Phase 4: Market Intelligence (Weeks 9-10)
- Industry newsletter agent
- Regional intelligence agent
- Newsletter subscription management

### Phase 5: Scale & Growth (Weeks 11-12)
- Retention and upsell agents
- Performance optimization
- Analytics dashboard

## Environment Variables

See `.env.example` for all required environment variables.

Key variables needed to start:
- `GEMINI_API_KEY` - For recipe generation
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - For authentication
- `STRIPE_SECRET_KEY` - For payments

## Documentation

All project documentation is in the `/docs` folder:

- **PRD:** Product Requirements Document
- **Product Vision:** Business model and strategy
- **Technical Architecture:** System design and tech stack
- **Agent Architecture:** 20 production agents explained
- **TODO.md:** Complete 316-task checklist

## Contributing

This is a private project. For questions or access, contact Derek.

## License

Private - All Rights Reserved

---

**Built with** ⚡ Next.js, 🧠 AI, and ☕ lots of coffee

**Owner:** Derek - Serial entrepreneur, restaurant owner (Bobola's), father of 7, vibecoding enthusiast
