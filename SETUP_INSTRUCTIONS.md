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

Create a new file called `.env` in the `menspk-main/` folder with your API keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://fbzjjxhyfovvjjjqmyqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration (for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here

# Optional: Email Configuration
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_here
```

**Important**: Never commit the `.env` file to Git!

## Step 4: Run the Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000 (or 3001, 3002 if port is busy)

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
```

## Project Structure

```
menusparks/
└── menspk-main/          # Main application folder
    ├── src/
    │   ├── app/          # Next.js pages and API routes
    │   ├── components/   # React components
    │   └── lib/          # Utilities and integrations
    ├── public/           # Static assets (images, etc.)
    ├── package.json      # Dependencies
    └── .env             # Environment variables (create this!)
```

## Getting Your API Keys

### Supabase (Database)
1. Go to https://supabase.com
2. Sign in to your account
3. Select your MenuSparks project
4. Go to Settings → API
5. Copy your URL and anon key

### Stripe (Payments)
1. Go to https://stripe.com
2. Sign in to your account
3. Go to Developers → API keys
4. Copy your test keys (or production keys for live site)

## Troubleshooting

### Port Already in Use
If you get a "port 3000 already in use" error:
- The app will automatically try ports 3001, 3002, etc.
- Or kill the process using the port: `npx kill-port 3000`

### Module Not Found Errors
Run `npm install` again to ensure all dependencies are installed.

### Environment Variable Issues
- Make sure your `.env` file is in the `menspk-main/` folder (not the root)
- Restart the dev server after changing `.env` values

## Making Changes

1. Make your code changes
2. Test locally with `npm run dev`
3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

## Need Help?

- Check the `CLAUDE.md` file for project-specific guidance
- Review the `README.md` for project overview
- Contact: admin@menusparks.com

---

**Remember**: The `.env` file with your API keys is the only thing not included in the repository. Everything else is ready to go!