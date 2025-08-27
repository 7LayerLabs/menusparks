-- MenuSparks Unified Database Integration
-- This connects your existing email captures to the restaurant system
-- Run this in your existing Supabase project

-- Step 1: Check what tables you already have
-- Run this query first to see your existing tables:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- ============================================
-- OPTION A: If you have a simple email table
-- ============================================
-- If your existing email table is called something like 'emails', 'email_captures', 'signups', etc.
-- We'll add columns to link it with restaurant data

-- Example: If your table is called 'email_captures', run:
/*
ALTER TABLE email_captures 
ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50),
ADD COLUMN IF NOT EXISTS converted_to_customer BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
*/

-- ============================================
-- OPTION B: Create a contacts table that links to existing emails
-- ============================================
-- If you want to keep your email table separate, create this linking table:

CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  source VARCHAR(100), -- hero, footer, final_cta, stripe_checkout, etc
  converted_to_customer BOOLEAN DEFAULT FALSE,
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255),
  subscription_status VARCHAR(50), -- trialing, active, canceled, etc
  subscription_tier VARCHAR(50), -- appetizer, main_meal, dessert
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Import existing emails into contacts (adjust table name as needed)
-- INSERT INTO contacts (email, source, created_at)
-- SELECT email, 'initial_capture', created_at 
-- FROM your_existing_email_table
-- ON CONFLICT (email) DO NOTHING;

-- ============================================
-- CREATE RESTAURANT TABLES (linked to contacts/emails)
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Restaurants table (linked to contacts/email)
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE, -- Links to email/contact
  name VARCHAR(255) NOT NULL,
  cuisine_type VARCHAR(100) NOT NULL,
  cuisine_other VARCHAR(100), -- For when cuisine_type = 'Other'
  address TEXT,
  equipment TEXT[], -- Kitchen equipment array
  average_entree_price VARCHAR(50),
  food_cost_target VARCHAR(50),
  seating_capacity INTEGER,
  service_style VARCHAR(50),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(contact_id) -- One restaurant per contact
);

-- 2. Inventory submissions (linked to restaurant)
CREATE TABLE IF NOT EXISTS inventory_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  high_inventory_items TEXT,
  low_inventory_items TEXT,
  file_urls TEXT[],
  submission_date DATE DEFAULT CURRENT_DATE,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Generated specials (linked to restaurant)
CREATE TABLE IF NOT EXISTS generated_specials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  inventory_submission_id UUID REFERENCES inventory_submissions(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT[],
  instructions TEXT[],
  prep_time VARCHAR(50),
  cook_time VARCHAR(50),
  servings VARCHAR(50),
  menu_price DECIMAL(10, 2),
  food_cost DECIMAL(10, 2),
  profit_margin DECIMAL(5, 2),
  marketing_copy TEXT,
  image_url VARCHAR(500),
  active BOOLEAN DEFAULT TRUE,
  special_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Stripe events (linked to contact)
CREATE TABLE IF NOT EXISTS stripe_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  stripe_event_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  event_type VARCHAR(100),
  event_data JSONB,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 5. Newsletter subscriptions (linked to contact)
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  newsletter_type VARCHAR(50), -- industry, custom
  stripe_price_id VARCHAR(255),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_stripe_customer ON contacts(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_contact ON restaurants(contact_id);
CREATE INDEX IF NOT EXISTS idx_inventory_restaurant ON inventory_submissions(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_specials_restaurant ON generated_specials(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_specials_date ON generated_specials(special_date);

-- ============================================
-- CREATE TRIGGER FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE
  ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_restaurants_updated_at ON restaurants;
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE
  ON restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CREATE HELPFUL VIEWS
-- ============================================

-- View to see everything together
CREATE OR REPLACE VIEW customer_overview AS
SELECT 
  c.id as contact_id,
  c.email,
  c.stripe_customer_id,
  c.subscription_status,
  c.subscription_tier,
  c.converted_to_customer,
  r.id as restaurant_id,
  r.name as restaurant_name,
  r.cuisine_type,
  r.onboarding_completed,
  COUNT(DISTINCT gs.id) as total_specials_generated,
  MAX(gs.created_at) as last_special_date
FROM contacts c
LEFT JOIN restaurants r ON r.contact_id = c.id
LEFT JOIN generated_specials gs ON gs.restaurant_id = r.id
GROUP BY c.id, r.id;

-- View to see recent activity
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
  'email_capture' as activity_type,
  c.email,
  c.created_at,
  c.source as details
FROM contacts c
WHERE c.created_at > NOW() - INTERVAL '7 days'
UNION ALL
SELECT 
  'restaurant_onboarding' as activity_type,
  c.email,
  r.created_at,
  r.name as details
FROM restaurants r
JOIN contacts c ON c.id = r.contact_id
WHERE r.created_at > NOW() - INTERVAL '7 days'
UNION ALL
SELECT 
  'special_generated' as activity_type,
  c.email,
  gs.created_at,
  gs.name as details
FROM generated_specials gs
JOIN restaurants r ON r.id = gs.restaurant_id
JOIN contacts c ON c.id = r.contact_id
WHERE gs.created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get or create contact by email
CREATE OR REPLACE FUNCTION get_or_create_contact(
  p_email VARCHAR,
  p_source VARCHAR DEFAULT 'signup',
  p_stripe_customer_id VARCHAR DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_contact_id UUID;
BEGIN
  -- Try to find existing contact
  SELECT id INTO v_contact_id FROM contacts WHERE email = p_email;
  
  -- Create if doesn't exist
  IF v_contact_id IS NULL THEN
    INSERT INTO contacts (email, source, stripe_customer_id) 
    VALUES (p_email, p_source, p_stripe_customer_id)
    RETURNING id INTO v_contact_id;
  ELSIF p_stripe_customer_id IS NOT NULL THEN
    -- Update stripe customer ID if provided
    UPDATE contacts 
    SET stripe_customer_id = p_stripe_customer_id
    WHERE id = v_contact_id;
  END IF;
  
  RETURN v_contact_id;
END;
$$ LANGUAGE plpgsql;

-- Function to link restaurant to contact
CREATE OR REPLACE FUNCTION create_restaurant_for_contact(
  p_email VARCHAR,
  p_restaurant_name VARCHAR,
  p_cuisine_type VARCHAR,
  p_stripe_customer_id VARCHAR DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_contact_id UUID;
  v_restaurant_id UUID;
BEGIN
  -- Get or create contact
  v_contact_id := get_or_create_contact(p_email, 'restaurant_signup', p_stripe_customer_id);
  
  -- Update contact as converted customer
  UPDATE contacts 
  SET converted_to_customer = TRUE
  WHERE id = v_contact_id;
  
  -- Create restaurant
  INSERT INTO restaurants (contact_id, name, cuisine_type)
  VALUES (v_contact_id, p_restaurant_name, p_cuisine_type)
  ON CONFLICT (contact_id) DO UPDATE
  SET name = EXCLUDED.name,
      cuisine_type = EXCLUDED.cuisine_type
  RETURNING id INTO v_restaurant_id;
  
  RETURN v_restaurant_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- ============================================
-- TEST YOUR SETUP
-- ============================================
-- After running this SQL, test with these queries:

-- 1. Check all your tables:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

-- 2. Test the helper function:
-- SELECT get_or_create_contact('test@example.com', 'test_source');

-- 3. Test creating a restaurant:
-- SELECT create_restaurant_for_contact('test@example.com', 'Test Restaurant', 'Italian');

-- 4. View the customer overview:
-- SELECT * FROM customer_overview;

-- 5. Check recent activity:
-- SELECT * FROM recent_activity;