# MenuSparks Promo Code System

## Overview
The promo code system allows you to offer free trials, percentage discounts, and fixed amount discounts to customers.

## Features Implemented

### 1. Database Schema (Supabase)
- **promo_codes table**: Stores promo code details
- **promo_code_usage table**: Tracks who used which codes
- **validate_promo_code() function**: Validates codes with business logic
- **use_promo_code() function**: Records usage after successful checkout

### 2. API Endpoints
- **POST /api/promo/validate**: Validates a promo code
- **POST /api/promo/use**: Records promo code usage

### 3. UI Integration
- Promo code input field in Pricing component
- Real-time validation with user feedback
- Visual confirmation when code is applied

### 4. Stripe Integration
- Free trial periods applied automatically
- Percentage discounts via dynamic coupons
- Metadata tracking for analytics

## Sample Promo Codes

Run this SQL in Supabase to create the tables and sample codes:
```sql
-- Run the SQL from database/create_promo_codes.sql
```

Default codes created:
- **FREEWEEK**: 7-day free trial (unlimited uses)
- **LAUNCH50**: 50% off first month (max 100 uses)
- **NASHUA2025**: 14-day free trial for Appetizer/Main tiers (max 50 uses)

## How to Create New Promo Codes

### Via Supabase Dashboard
```sql
INSERT INTO promo_codes (
  code, 
  description, 
  discount_type, 
  discount_value,
  max_uses,
  applicable_tiers,
  valid_until
) VALUES (
  'SUMMER2025',
  'Summer special - 30% off',
  'percentage',
  30,
  200,
  NULL, -- All tiers
  '2025-09-30'::timestamp
);
```

### Discount Types
- **free_trial**: Value = number of days
- **percentage**: Value = percent off (0-100)
- **fixed_amount**: Value = cents off

## Testing

1. **Test Page**: Visit `/test-promo` to test validation
2. **Live Testing**: Use the promo code field in the pricing section

## User Flow

1. User enters promo code in pricing section
2. Clicks "Apply" to validate
3. System checks:
   - Code exists and is active
   - Not expired
   - User hasn't used it before
   - Usage limit not reached
   - Tier is applicable
4. If valid, shows success message
5. When user clicks checkout, discount is applied:
   - Free trials: Stripe trial_period_days
   - Percentages: Dynamic Stripe coupon
6. After successful checkout, usage is recorded

## Admin Management

### Check Usage
```sql
-- See all usage for a code
SELECT * FROM promo_code_usage 
WHERE promo_code_id = (
  SELECT id FROM promo_codes WHERE code = 'FREEWEEK'
);

-- Check remaining uses
SELECT 
  code,
  max_uses,
  current_uses,
  (max_uses - current_uses) as remaining
FROM promo_codes
WHERE is_active = true;
```

### Deactivate a Code
```sql
UPDATE promo_codes 
SET is_active = false 
WHERE code = 'OLDCODE';
```

## Environment Variables

Ensure these are set:
```env
NEXT_PUBLIC_SUPABASE_URL=https://fbzjjxhyfovvjjjqmyqw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_KEY=[your-service-key] # Optional, for server-side operations
```

## Troubleshooting

### Code not validating
1. Check Supabase connection
2. Verify tables exist in database
3. Check browser console for API errors

### Discount not applying in Stripe
1. Verify Stripe API keys are set
2. Check Stripe dashboard for created coupons
3. Review checkout session metadata

## Future Enhancements
- [ ] Admin dashboard for code management
- [ ] Bulk code generation
- [ ] Referral-based codes
- [ ] Time-limited flash sales
- [ ] Customer segment targeting