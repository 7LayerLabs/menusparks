# Setup Instructions for New Development Environment

Follow these steps when setting up MenuSparks on a new computer.

## Prerequisites

- **Node.js 18+** installed (download from https://nodejs.org)
- **Git** installed (download from https://git-scm.com)
- **Code editor** (VS Code recommended: https://code.visualstudio.com)

## Step 1: Clone the Repository

```bash
git clone https://github.com/7LayerLabs/menusparks.git
cd menusparks/menspk-main
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in package.json.

## Step 3: Set Up Environment Variables

Create a new file called `.env.local` in the `menspk-main/` folder with your API keys:

```env
# Stripe Configuration (LIVE MODE)
STRIPE_SECRET_KEY=sk_live_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_WEEKLY=price_1RzLIVDlxrM8ZIxccXQOfcT0
NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_ANNUAL=price_1RzLJcDlxrM8ZIxcQad2yLn7
NEXT_PUBLIC_STRIPE_PRICE_MAIN_WEEKLY=price_1RzLKrDlxrM8ZIxcauTWpOFn
NEXT_PUBLIC_STRIPE_PRICE_MAIN_ANNUAL=price_1RzLKrDlxrM8ZIxclcFO4WCT
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_INDUSTRY=price_1RzLLxDlxrM8ZIxctmOIRPSU
NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_CUSTOM=price_1RzLNPDlxrM8ZIxc45k28YfR

# Google Gemini AI (Server-side only - NO NEXT_PUBLIC prefix!)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fbzjjxhyfovvjjjqmyqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Important**: 
- Never commit the `.env.local` file to Git!
- The `GEMINI_API_KEY` must NOT have the `NEXT_PUBLIC_` prefix for security
- Use `.env.local` instead of `.env` for Next.js projects

## Step 4: Run the Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3001 (or 3002, 3003 if port is busy)

## Available Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking (if configured)
npm run type-check
```

## Project Structure

```
menusparks/
└── menspk-main/          # Main application folder
    ├── src/
    │   ├── app/          # Next.js pages and API routes
    │   │   ├── api/      # Backend endpoints
    │   │   ├── dashboard/ # AI Recipe Generator
    │   │   └── page.tsx  # Landing page
    │   ├── components/   # React components
    │   │   ├── dashboard/ # Dashboard components
    │   │   └── [others]  # Landing components
    │   └── lib/          # Utilities and integrations
    ├── public/           
    │   └── images/       # Custom icons and assets
    ├── package.json      # Dependencies
    └── .env.local       # Environment variables (create this!)
```

## Getting Your API Keys

### Google Gemini AI
1. Go to https://aistudio.google.com/apikey
2. Create a new API key
3. Add to `.env.local` as `GEMINI_API_KEY` (no NEXT_PUBLIC prefix!)

### Stripe (Payments)
1. Go to https://stripe.com
2. Sign in to your account
3. Go to Developers → API keys
4. Copy your live keys (or test keys for development)
5. The price IDs are already configured in the instructions above

### Supabase (Database)
1. Go to https://supabase.com
2. Sign in to your account
3. Select your MenuSparks project
4. Go to Settings → API
5. Copy your URL and anon key

## Key Features to Test

1. **Landing Page** - Seven Layer Framework at `/`
2. **AI Dashboard** - Recipe generator at `/dashboard`
3. **Waste Calculator** - ROI calculator at `/calculator`
4. **Stripe Checkout** - Test payment flow (use test mode first)
5. **Recipe Generation** - Test with sample ingredients

## Troubleshooting

### Port Already in Use
If you get a "port 3001 already in use" error:
- The app will automatically try ports 3002, 3003, etc.
- Or kill the process using the port: `npx kill-port 3001`

### Module Not Found Errors
Run `npm install` again to ensure all dependencies are installed.

### Environment Variable Issues
- Make sure your `.env.local` file is in the `menspk-main/` folder (not the root)
- Restart the dev server after changing `.env.local` values
- Check that Gemini API key has NO `NEXT_PUBLIC_` prefix

### Gemini API Errors
- Ensure your API key is valid at https://aistudio.google.com
- Check that the key is server-side only (no NEXT_PUBLIC prefix)
- Model should be `gemini-1.5-flash` (not the deprecated `gemini-pro`)

## Making Changes

1. Make your code changes
2. Test locally with `npm run dev`
3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. Vercel will auto-deploy on push to main

## Deployment to Production

### Vercel Settings
- **Root Directory:** `menspk-main`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Node Version:** 18.x

### Required Environment Variables in Vercel
Add all the environment variables from `.env.local` to your Vercel project settings.

## Recent Updates (August 31, 2025)

- Seven Layer Framework implementation
- Custom image icons replacing emojis
- Web Portal preview section
- AI Dashboard with 24 restaurant styles
- Secure Gemini API integration
- Professional recipe output format

## Need Help?

- Check the `CLAUDE.md` file for project-specific guidance
- Review the `README.md` for project overview
- Check `PROJECT_STATUS.md` for current progress
- Contact: admin@menusparks.com

---

**Remember**: The `.env.local` file with your API keys is the only thing not included in the repository. Everything else is ready to go!