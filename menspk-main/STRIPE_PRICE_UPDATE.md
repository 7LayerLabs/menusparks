# Stripe Price Update Tracking

## Updated Prices (As of Sept 4, 2025)

### Quick Bite
- **Weekly**: $15 (was $10)
  - ✅ NEW Price ID: `price_1S3jceDlxrM8ZIxcD2SDs3sP`
  - Old Price ID: `price_1RzLIVDlxrM8ZIxccXQOfcT0`
- **Monthly**: $49 (was $35)
  - ✅ NEW Price ID: `price_1S3jceDlxrM8ZIxcDl1yVK6c`
  - Old: `NEXT_PUBLIC_STRIPE_PRICE_QUICK_BITE_MONTHLY`

### Chef's Choice  
- **Weekly**: $25 (was $20)
  - ✅ NEW Price ID: `price_1S3jdxDlxrM8ZIxcGZYwkEvF`
  - Old Price ID: `price_1RzLKrDlxrM8ZIxcauTWpOFn`
- **Monthly**: $79 (was $75)
  - ✅ NEW Price ID: `price_1S3jeDDlxrM8ZIxcIRLhqyL3`
  - Old: `NEXT_PUBLIC_STRIPE_PRICE_CHEF_CHOICE_MONTHLY`

### Full Kitchen
- **Weekly**: $35
  - ⏳ NEEDS PRICE ID
- **Monthly**: $140
  - ⏳ NEEDS PRICE ID

## Where to Update

1. **Vercel Dashboard** (PRODUCTION):
   - Go to: https://vercel.com/your-project/settings/environment-variables
   - Update each NEXT_PUBLIC_STRIPE_PRICE_* variable with new price IDs

2. **Local Testing** (.env.local):
   - Already using TEST mode prices
   - No changes needed for local development

## How to Create New Prices in Stripe

1. Go to: https://dashboard.stripe.com/products
2. Find your product (Quick Bite, Chef's Choice, etc.)
3. Click "Add another price"
4. Set the amount and billing period
5. Copy the new price_xxx ID
6. Update in Vercel environment variables

## Status Checklist

- [x] Quick Bite Weekly ($15) - `price_1S3jceDlxrM8ZIxcD2SDs3sP`
- [x] Quick Bite Monthly ($49) - `price_1S3jceDlxrM8ZIxcDl1yVK6c`
- [x] Chef's Choice Weekly ($25) - `price_1S3jdxDlxrM8ZIxcGZYwkEvF`
- [x] Chef's Choice Monthly ($79) - `price_1S3jeDDlxrM8ZIxcIRLhqyL3`
- [ ] Full Kitchen Weekly ($35)
- [ ] Full Kitchen Monthly ($140)

## Notes
- Newsletter prices remain unchanged at $5 and $10
- Old price IDs should remain active for existing subscriptions
- New prices only apply to new customers