# Stripe Setup Guide for MenuSparks

## ✅ What's Already Built

1. **Checkout API** - `/api/stripe/checkout`
2. **Webhook Handler** - `/api/stripe/webhook`
3. **Success Page** - `/success`
4. **Pricing Page** - `/pricing` (standalone)
5. **Pricing Component** - Integrated with Stripe checkout

## 🚀 Setup Steps

### 1. Create Stripe Account
Go to [stripe.com](https://stripe.com) and sign up for an account.

### 2. Get Your API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Test Mode** keys:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)

### 3. Update Your .env File
```env
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
```

### 4. Create Products & Prices in Stripe

Go to [Products](https://dashboard.stripe.com/test/products) and create:

#### Product 1: MenuSparks Appetizer
- **Name**: MenuSparks Appetizer
- **Description**: 3-5 weekly AI-generated specials
- **Prices**:
  - Weekly: $10/week (recurring)
  - Annual: $420/year (recurring)

#### Product 2: MenuSparks Main Meal
- **Name**: MenuSparks Main Meal
- **Description**: 5-7 weekly specials with full marketing
- **Prices**:
  - Weekly: $20/week (recurring)
  - Annual: $840/year (recurring)

#### Product 3: MenuSparks Dessert
- **Name**: MenuSparks Dessert
- **Description**: Everything + The Pour Plan access
- **Prices**:
  - Weekly: $35/week (recurring)
  - Annual: $1,470/year (recurring)

### 5. Update Price IDs in Code

After creating products, get the Price IDs and update:

**File**: `src/components/Pricing.tsx`
```javascript
priceId: { 
  weekly: 'price_1ABC123...', // Your actual price ID
  annual: 'price_1DEF456...'  // Your actual price ID
}
```

### 6. Set Up Webhook Endpoint

1. Go to [Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the signing secret (starts with `whsec_`)
6. Add to .env: `STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET`

## 🧪 Testing

### Test Mode Cards
Use these test cards in Stripe's test mode:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

### Test Checkout Flow
1. Start dev server: `npm run dev`
2. Go to pricing section
3. Click any "Order" button
4. Use test card `4242 4242 4242 4242`
5. Any future date for expiry
6. Any 3 digits for CVC
7. Any ZIP code

## 📊 Dashboard Links

- [Payments](https://dashboard.stripe.com/test/payments)
- [Customers](https://dashboard.stripe.com/test/customers)
- [Subscriptions](https://dashboard.stripe.com/test/subscriptions)
- [Products](https://dashboard.stripe.com/test/products)

## 🔄 Going Live

When ready for production:
1. Switch to **Live Mode** in Stripe Dashboard
2. Get production API keys
3. Update .env with production keys
4. Create real products with real prices
5. Update webhook endpoint URL to production domain
6. Test with a real card (small amount)

## 💡 Next Steps

After Stripe is connected:
1. Save customer data to Supabase
2. Send welcome emails via SendGrid
3. Create customer portal for subscription management
4. Add usage-based billing if needed
5. Implement free trial period

## 🆘 Common Issues

**"No such price"** - Make sure price IDs in code match Stripe Dashboard

**"Invalid signature"** - Check webhook secret in .env matches Dashboard

**"Network error"** - Check CORS settings and API routes

**Checkout not redirecting** - Ensure publishable key is correct