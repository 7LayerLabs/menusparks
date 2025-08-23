-- Create customer referral system for PAID customers only
-- Run this in your Supabase SQL Editor

-- Create customers table for paid subscribers
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255) UNIQUE,
  referral_code VARCHAR(20) UNIQUE,
  referred_by VARCHAR(20),
  referral_count INTEGER DEFAULT 0,
  paid_referral_count INTEGER DEFAULT 0, -- Only counts when referrals become paying
  subscription_status VARCHAR(50), -- active, cancelled, past_due
  subscription_tier VARCHAR(50), -- appetizer, main_meal, dessert
  total_revenue DECIMAL(10,2) DEFAULT 0,
  free_weeks_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_customer_referral_code ON customers(referral_code);
CREATE INDEX IF NOT EXISTS idx_customer_stripe_id ON customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_email ON customers(email);

-- Create referral rewards tracking
CREATE TABLE IF NOT EXISTS referral_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  referred_customer_id UUID REFERENCES customers(id),
  reward_type VARCHAR(50), -- 'free_week', 'discount', 'credit'
  reward_value DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending', -- pending, applied, expired
  applied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Function to generate customer referral code (prefixed with 'MS' for MenuSparks)
CREATE OR REPLACE FUNCTION generate_customer_referral_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := 'MS'; -- Prefix for customer codes
  i INTEGER;
BEGIN
  -- Generate 6 character code after prefix (total 8 chars)
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code for new customers
CREATE OR REPLACE FUNCTION set_customer_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_customer_referral_code();
    -- Ensure uniqueness
    WHILE EXISTS(SELECT 1 FROM customers WHERE referral_code = NEW.referral_code) LOOP
      NEW.referral_code := generate_customer_referral_code();
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS set_customer_referral_code_trigger ON customers;
CREATE TRIGGER set_customer_referral_code_trigger
  BEFORE INSERT ON customers
  FOR EACH ROW
  EXECUTE FUNCTION set_customer_referral_code();

-- Function to handle successful referral (when referred customer pays)
CREATE OR REPLACE FUNCTION process_paid_referral()
RETURNS TRIGGER AS $$
DECLARE
  referrer_id UUID;
  new_free_weeks INTEGER;
BEGIN
  -- Only process if this is a new paying customer with a referrer
  IF NEW.subscription_status = 'active' AND NEW.referred_by IS NOT NULL THEN
    -- Find the referrer
    SELECT id INTO referrer_id 
    FROM customers 
    WHERE referral_code = NEW.referred_by;
    
    IF referrer_id IS NOT NULL THEN
      -- Increment paid referral count
      UPDATE customers 
      SET 
        paid_referral_count = paid_referral_count + 1,
        free_weeks_earned = free_weeks_earned + 1, -- 1 free week per paid referral
        updated_at = NOW()
      WHERE id = referrer_id;
      
      -- Create reward record
      INSERT INTO referral_rewards (
        customer_id,
        referred_customer_id,
        reward_type,
        reward_value,
        status
      ) VALUES (
        referrer_id,
        NEW.id,
        'free_week',
        1,
        'pending'
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for paid referral processing
DROP TRIGGER IF EXISTS process_paid_referral_trigger ON customers;
CREATE TRIGGER process_paid_referral_trigger
  AFTER INSERT OR UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION process_paid_referral();

-- Grant permissions
GRANT ALL ON customers TO authenticated;
GRANT ALL ON referral_rewards TO authenticated;
GRANT SELECT ON customers TO anon; -- Anonymous can only read

-- Sample query to check customer referrals
SELECT 
  email,
  referral_code,
  subscription_status,
  paid_referral_count,
  free_weeks_earned
FROM customers 
WHERE subscription_status = 'active'
ORDER BY paid_referral_count DESC;