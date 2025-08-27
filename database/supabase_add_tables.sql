-- MenuSparks Additional Tables for Existing Supabase
-- This assumes you already have email capture tables

-- Enable UUID extension (skip if already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Restaurants table (main business entity)
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cuisine_type VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255),
  subscription_status VARCHAR(50) DEFAULT 'trialing',
  subscription_tier VARCHAR(50), -- appetizer, main_meal, dessert
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Restaurant profiles (detailed setup info)
CREATE TABLE IF NOT EXISTS restaurant_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  equipment TEXT[], -- Array of equipment
  average_entree_price VARCHAR(50),
  food_cost_target VARCHAR(50),
  seating_capacity INTEGER,
  service_style VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(restaurant_id)
);

-- 3. Inventory submissions
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

-- 4. Generated specials
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

-- 5. Stripe events log (if you don't have this already)
CREATE TABLE IF NOT EXISTS stripe_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  stripe_event_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE SET NULL,
  event_type VARCHAR(100),
  event_data JSONB,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 6. Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  newsletter_type VARCHAR(50), -- industry, custom
  stripe_price_id VARCHAR(255),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_restaurants_email ON restaurants(email);
CREATE INDEX IF NOT EXISTS idx_restaurants_stripe_customer ON restaurants(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_inventory_restaurant ON inventory_submissions(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_specials_restaurant ON generated_specials(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_specials_date ON generated_specials(special_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_restaurants_updated_at ON restaurants;
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE
  ON restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_restaurant_profiles_updated_at ON restaurant_profiles;
CREATE TRIGGER update_restaurant_profiles_updated_at BEFORE UPDATE
  ON restaurant_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;