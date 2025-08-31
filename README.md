# MenuSparks

AI-powered restaurant menu optimization platform that generates profitable specials from existing inventory.

**Live Site:** https://menusparks.com

## Overview

MenuSparks helps restaurants reduce food waste (4-10% of budget) by creating weekly custom specials using ingredients already in stock. Turn potential waste into profit with AI-generated recipes tailored to your restaurant's style.

## Latest Updates (August 31, 2025)

### Seven Layer Framework Implementation
- Complete restructure based on professional UX review
- "Line cooks can cook. They can't create." messaging
- Three personas with custom imagery
- Mission-driven purpose about leveling the playing field
- Clear ROI: "$10 = 1 Special Sold"

### AI Recipe Generator Dashboard
- **24 Restaurant Styles** - From Classic American to Vegan
- **14 Recipe Categories** - Breakfast to Desserts
- **Professional Output** - 3-phase recipes with prep instructions
- **Social Media Ready** - Auto-generated posts with emojis
- **Secure Implementation** - Server-side Gemini API integration

## Features

- 🎯 **Smart Recipe Generation** - AI creates specials from your exact inventory
- 💰 **Waste Reduction** - Save $5,600-$11,200 annually 
- 📱 **Weekly Specials** - Fresh menu items delivered on schedule
- 🔐 **Private Web Portal** - Secure access to all your recipes (Coming Soon)
- 📊 **ROI Calculator** - See exact savings for your restaurant
- 🎨 **24 Restaurant Styles** - Recipes match your cuisine type
- 📝 **Professional Format** - Export-ready recipes with scaling

## Tech Stack

- **Framework:** Next.js 15.5.0 with App Router
- **Language:** TypeScript 5.9.2
- **Styling:** Tailwind CSS 3.4.17
- **AI:** Google Gemini 1.5 Flash
- **Payments:** Stripe (Live Mode)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/7LayerLabs/menusparks.git
cd menusparks/menspk-main
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your keys
```

Required environment variables:
```
# Stripe (Live Mode)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Gemini AI (Server-side only)
GEMINI_API_KEY=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to see the application.

## Project Structure

```
menspk-main/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # Backend API routes
│   │   ├── dashboard/    # AI Recipe Generator
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   │   ├── dashboard/    # Dashboard components
│   │   └── [others]      # Landing page components
│   └── lib/             # Utilities and integrations
├── public/              
│   └── images/          # Custom icons and assets
└── package.json         # Dependencies
```

## Key Pages

- `/` - Landing page with Seven Layer Framework
- `/dashboard` - AI Recipe Generator (Demo Mode)
- `/calculator` - ROI/Waste Calculator
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service

## Pricing

### One-Time Setup
- **Launch Special:** $97 (Limited Time)

### Subscription Plans
- **Appetizer:** $10/week or $40/month - 1 special per week
- **Main Meal:** $20/week or $80/month - 3 specials per week  
- **Dessert:** Coming Soon - Daily specials + analytics

### Newsletters
- **Industry Newsletter:** $5/week - Market trends
- **Custom Newsletter:** $10/week - Personalized insights

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Deployment

The site auto-deploys to Vercel on push to main branch:

1. Push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

2. Vercel automatically builds and deploys

### Vercel Configuration
- Root Directory: `menspk-main`
- Build Command: `npm run build`
- Output Directory: `.next`
- Node Version: 18.x

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For questions or support: 
- Email: admin@menusparks.com
- GitHub Issues: https://github.com/7LayerLabs/menusparks/issues

## License

© 2025 MenuSparks. All rights reserved.

---

Built with ❤️ for independent restaurants by Derek @ 7 Layer Labs