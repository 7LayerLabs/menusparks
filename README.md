# MenuSparks

AI-powered restaurant menu optimization platform that generates profitable specials from existing inventory.

## Overview

MenuSparks helps restaurants reduce food waste (4-10% of budget) by creating weekly custom specials using ingredients already in stock. Turn potential waste into profit with AI-generated recipes.

## Features

- 🎯 **Smart Inventory Matching** - AI analyzes your current stock to create appealing specials
- 💰 **Waste Reduction** - Save $5,600-$11,200 annually by utilizing existing inventory
- 📱 **Weekly Specials** - Fresh menu items delivered weekly to keep customers engaged
- 📊 **ROI Calculator** - See your exact savings based on restaurant size

## Tech Stack

- Next.js 15.4.6
- TypeScript
- Tailwind CSS
- Supabase (Database)
- React 19

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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
cp .env.example .env
# Edit .env with your Supabase and Stripe keys
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
menspk-main/
├── src/
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components
│   └── lib/         # Utilities and integrations
├── public/          # Static assets
└── package.json     # Dependencies
```

## Pricing

- **Appetizer Plan**: $10/week - 1 special per week
- **Main Meal Plan**: $20/week - 3 specials per week  
- **Dessert Plan**: $35/week - Daily specials + analytics

## Contact

For questions or support: admin@menusparks.com

## License

© 2025 MenuSparks. All rights reserved.