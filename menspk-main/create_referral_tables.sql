-- Create referral tracking tables in Supabase
-- Run this in your Supabase SQL Editor

-- Add referral columns to email_captures if they don't exist
ALTER TABLE email_captures 
ADD COLUMN IF NOT EXISTS referral_code VARCHAR(20) UNIQUE,
ADD COLUMN IF NOT EXISTS referred_by VARCHAR(20),
ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;

-- Create index for faster referral lookups
CREATE INDEX IF NOT EXISTS idx_referral_code ON email_captures(referral_code);
CREATE INDEX IF NOT EXISTS idx_referred_by ON email_captures(referred_by);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  -- Generate 8 character code
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code on insert
CREATE OR REPLACE FUNCTION set_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
    -- Ensure uniqueness
    WHILE EXISTS(SELECT 1 FROM email_captures WHERE referral_code = NEW.referral_code) LOOP
      NEW.referral_code := generate_referral_code();
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS set_referral_code_trigger ON email_captures;
CREATE TRIGGER set_referral_code_trigger
  BEFORE INSERT ON email_captures
  FOR EACH ROW
  EXECUTE FUNCTION set_referral_code();

-- Function to increment referral count
CREATE OR REPLACE FUNCTION increment_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE email_captures 
    SET referral_count = referral_count + 1
    WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for incrementing count
DROP TRIGGER IF EXISTS increment_referral_trigger ON email_captures;
CREATE TRIGGER increment_referral_trigger
  AFTER INSERT ON email_captures
  FOR EACH ROW
  EXECUTE FUNCTION increment_referral_count();

-- Test the setup
SELECT 
  email,
  referral_code,
  referred_by,
  referral_count
FROM email_captures 
ORDER BY created_at DESC 
LIMIT 10;