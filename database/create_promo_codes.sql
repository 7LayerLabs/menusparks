-- Create promo codes table for MenuSparks
-- Run this in your Supabase SQL Editor

-- Create the promo_codes table
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('free_trial', 'percentage', 'fixed_amount')),
  discount_value INTEGER NOT NULL, -- For free_trial: days, percentage: 0-100, fixed_amount: cents
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  valid_until TIMESTAMP WITH TIME ZONE,
  max_uses INTEGER, -- NULL for unlimited
  current_uses INTEGER DEFAULT 0,
  applicable_tiers TEXT[], -- ['appetizer', 'main_meal', 'dessert'] or NULL for all
  is_active BOOLEAN DEFAULT TRUE,
  created_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create promo code usage tracking table
CREATE TABLE IF NOT EXISTS public.promo_code_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_code_id UUID REFERENCES promo_codes(id) ON DELETE CASCADE,
  customer_email VARCHAR(255) NOT NULL,
  stripe_customer_id VARCHAR(255),
  used_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  subscription_tier VARCHAR(50),
  UNIQUE(promo_code_id, customer_email) -- Prevent same email using code twice
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_promo_usage_email ON promo_code_usage(customer_email);

-- Create function to validate and use promo code
CREATE OR REPLACE FUNCTION validate_promo_code(
  p_code VARCHAR,
  p_email VARCHAR,
  p_tier VARCHAR DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  v_promo RECORD;
  v_result JSON;
BEGIN
  -- Find the promo code
  SELECT * INTO v_promo 
  FROM promo_codes 
  WHERE UPPER(code) = UPPER(p_code) 
    AND is_active = TRUE
  LIMIT 1;
  
  -- Check if code exists
  IF v_promo IS NULL THEN
    RETURN json_build_object(
      'valid', FALSE,
      'message', 'Invalid promo code'
    );
  END IF;
  
  -- Check if code is expired
  IF v_promo.valid_until IS NOT NULL AND v_promo.valid_until < NOW() THEN
    RETURN json_build_object(
      'valid', FALSE,
      'message', 'This promo code has expired'
    );
  END IF;
  
  -- Check if code hasn't started yet
  IF v_promo.valid_from > NOW() THEN
    RETURN json_build_object(
      'valid', FALSE,
      'message', 'This promo code is not yet active'
    );
  END IF;
  
  -- Check max uses
  IF v_promo.max_uses IS NOT NULL AND v_promo.current_uses >= v_promo.max_uses THEN
    RETURN json_build_object(
      'valid', FALSE,
      'message', 'This promo code has reached its usage limit'
    );
  END IF;
  
  -- Check if user has already used this code
  IF EXISTS (
    SELECT 1 FROM promo_code_usage 
    WHERE promo_code_id = v_promo.id 
      AND customer_email = p_email
  ) THEN
    RETURN json_build_object(
      'valid', FALSE,
      'message', 'You have already used this promo code'
    );
  END IF;
  
  -- Check if tier is applicable
  IF p_tier IS NOT NULL AND v_promo.applicable_tiers IS NOT NULL THEN
    IF NOT (p_tier = ANY(v_promo.applicable_tiers)) THEN
      RETURN json_build_object(
        'valid', FALSE,
        'message', 'This promo code is not valid for the selected plan'
      );
    END IF;
  END IF;
  
  -- Code is valid!
  RETURN json_build_object(
    'valid', TRUE,
    'message', 'Promo code applied successfully',
    'discount_type', v_promo.discount_type,
    'discount_value', v_promo.discount_value,
    'description', v_promo.description,
    'promo_id', v_promo.id
  );
END;
$$ LANGUAGE plpgsql;

-- Function to record promo code usage
CREATE OR REPLACE FUNCTION use_promo_code(
  p_promo_id UUID,
  p_email VARCHAR,
  p_stripe_customer_id VARCHAR DEFAULT NULL,
  p_tier VARCHAR DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Record the usage
  INSERT INTO promo_code_usage (
    promo_code_id,
    customer_email,
    stripe_customer_id,
    subscription_tier
  ) VALUES (
    p_promo_id,
    p_email,
    p_stripe_customer_id,
    p_tier
  );
  
  -- Increment usage counter
  UPDATE promo_codes 
  SET current_uses = current_uses + 1,
      updated_at = NOW()
  WHERE id = p_promo_id;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Insert some sample promo codes
INSERT INTO promo_codes (code, description, discount_type, discount_value, applicable_tiers, max_uses) 
VALUES 
  ('FREEWEEK', 'One week free trial', 'free_trial', 7, NULL, NULL),
  ('LAUNCH50', 'Launch special - 50% off first month', 'percentage', 50, NULL, 100),
  ('NASHUA2025', 'Local restaurant special - 2 weeks free', 'free_trial', 14, ARRAY['appetizer', 'main_meal'], 50)
ON CONFLICT (code) DO NOTHING;

-- Grant permissions
GRANT SELECT ON promo_codes TO anon;
GRANT SELECT, INSERT, UPDATE ON promo_code_usage TO anon;
GRANT ALL ON promo_codes TO authenticated;
GRANT ALL ON promo_code_usage TO authenticated;