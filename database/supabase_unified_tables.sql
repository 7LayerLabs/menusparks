-- MenuSparks Unified Database Structure
-- This connects email captures → restaurants → everything else

-- Enable UUID extension (skip if already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Update/Create contacts table (master record for everyone)
-- This might be your existing email capture table - rename as needed
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

-- If you already have an email table, run this instead:
-- ALTER TABLE your_existing_email_table 
-- ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255) UNIQUE,
-- ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255),
-- ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50),
-- ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50),
-- ADD COLUMN IF NOT EXISTS converted_to_customer BOOLEAN DEFAULT FALSE;

-- 2. Restaurants table (linked to contacts)
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE, -- Links to email/contact
  name VARCHAR(255) NOT NULL,
  cuisine_type VARCHAR(100) NOT NULL,
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

-- 3. Inventory submissions (linked to restaurant)
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

-- 4. Generated specials (linked to restaurant)
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

-- 5. Stripe events (linked to contact)
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

-- 6. Newsletter subscriptions (linked to contact)
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  newsletter_type VARCHAR(50), -- industry, custom
  stripe_price_id VARCHAR(255),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_stripe_customer ON contacts(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_contact ON restaurants(contact_id);
CREATE INDEX IF NOT EXISTS idx_inventory_restaurant ON inventory_submissions(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_specials_restaurant ON generated_specials(restaurant_id);

-- Create updated_at trigger function
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

-- Create a view to see everything together
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

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Helper function to get or create contact
CREATE OR REPLACE FUNCTION get_or_create_contact(
  p_email VARCHAR,
  p_source VARCHAR DEFAULT 'signup'
)
RETURNS UUID AS $$
DECLARE
  v_contact_id UUID;
BEGIN
  -- Try to find existing contact
  SELECT id INTO v_contact_id FROM contacts WHERE email = p_email;
  
  -- Create if doesn't exist
  IF v_contact_id IS NULL THEN
    INSERT INTO contacts (email, source) 
    VALUES (p_email, p_source)
    RETURNING id INTO v_contact_id;
  END IF;
  
  RETURN v_contact_id;
END;
$$ LANGUAGE plpgsql;