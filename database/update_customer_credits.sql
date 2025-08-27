-- Update customer referral system to use credits instead of free weeks
-- Run this in Supabase SQL Editor

-- First, rename the column from free_weeks_earned to credits_earned
ALTER TABLE customers 
RENAME COLUMN free_weeks_earned TO credits_earned;

-- Update the column comment to reflect new purpose
COMMENT ON COLUMN customers.credits_earned IS 'Total credits earned from referrals ($5 per referral)';

-- Drop the old referral_rewards table if it exists (we'll track credits directly in customers table)
DROP TABLE IF EXISTS referral_rewards CASCADE;

-- Update any existing data to convert weeks to credits (1 week = $5 credit)
-- This assumes no existing data, but included for safety
UPDATE customers 
SET credits_earned = COALESCE(credits_earned, 0) * 5
WHERE credits_earned IS NOT NULL;

-- Add a credits_used column to track redemptions
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS credits_used INTEGER DEFAULT 0;

COMMENT ON COLUMN customers.credits_used IS 'Total credits redeemed';

-- Add a credits_balance generated column for easy balance calculation
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS credits_balance INTEGER GENERATED ALWAYS AS (credits_earned - credits_used) STORED;

COMMENT ON COLUMN customers.credits_balance IS 'Current available credit balance';

-- Create a credit transactions table for audit trail
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('earned', 'redeemed', 'expired', 'adjustment')),
  amount INTEGER NOT NULL,
  description TEXT,
  related_referral_email VARCHAR(255),
  stripe_payment_intent VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_credit_transactions_customer ON credit_transactions(customer_id);
CREATE INDEX idx_credit_transactions_created ON credit_transactions(created_at);

-- Update the trigger function to award credits instead of weeks
CREATE OR REPLACE FUNCTION award_referral_credit()
RETURNS TRIGGER AS $$
BEGIN
  -- Only process if customer has a referral code from someone else
  IF NEW.referred_by IS NOT NULL AND NEW.subscription_status = 'active' 
     AND (OLD.subscription_status IS NULL OR OLD.subscription_status != 'active') THEN
    
    -- Award $5 credit to the referrer
    UPDATE customers 
    SET 
      paid_referral_count = COALESCE(paid_referral_count, 0) + 1,
      credits_earned = COALESCE(credits_earned, 0) + 5,
      updated_at = CURRENT_TIMESTAMP
    WHERE referral_code = NEW.referred_by
      AND subscription_status = 'active';
    
    -- Log the credit transaction
    INSERT INTO credit_transactions (
      customer_id, 
      type, 
      amount, 
      description, 
      related_referral_email
    )
    SELECT 
      id, 
      'earned', 
      5, 
      'Referral credit from ' || NEW.email,
      NEW.email
    FROM customers 
    WHERE referral_code = NEW.referred_by;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger with the new function
DROP TRIGGER IF EXISTS award_referral_on_payment ON customers;
CREATE TRIGGER award_referral_on_payment
  AFTER UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION award_referral_credit();

-- Add a view for easy credit summary
CREATE OR REPLACE VIEW customer_credit_summary AS
SELECT 
  c.id,
  c.email,
  c.referral_code,
  c.paid_referral_count,
  c.credits_earned,
  c.credits_used,
  c.credits_balance,
  c.subscription_tier,
  c.subscription_status,
  COUNT(ct.id) FILTER (WHERE ct.type = 'earned') as total_credit_transactions,
  MAX(ct.created_at) FILTER (WHERE ct.type = 'earned') as last_credit_earned
FROM customers c
LEFT JOIN credit_transactions ct ON c.id = ct.customer_id
GROUP BY c.id;

COMMENT ON VIEW customer_credit_summary IS 'Summary view of customer referral credits';