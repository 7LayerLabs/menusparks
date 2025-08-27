-- MenuSparks Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Restaurants table (main business entity)
CREATE TABLE restaurants (
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
CREATE TABLE restaurant_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  equipment TEXT[], -- Array of equipment like ['Grill', 'Deep Fryer', 'Convection Oven']
  average_entree_price VARCHAR(50),
  food_cost_target VARCHAR(50),
  seating_capacity INTEGER,
  service_style VARCHAR(50), -- fine_dining, casual, fast_casual, etc
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(restaurant_id)
);

-- 3. Inventory submissions
CREATE TABLE inventory_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  high_inventory_items TEXT, -- Items they need to move
  low_inventory_items TEXT, -- Items to avoid using
  file_urls TEXT[], -- URLs to uploaded files (invoices, photos, etc)
  submission_date DATE DEFAULT CURRENT_DATE,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Generated specials
CREATE TABLE generated_specials (
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

-- 5. Email captures from landing page
CREATE TABLE email_signups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100), -- hero, footer, final_cta, etc
  converted_to_customer BOOLEAN DEFAULT FALSE,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 6. Stripe payments/events log
CREATE TABLE stripe_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  stripe_event_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE SET NULL,
  event_type VARCHAR(100), -- checkout.session.completed, customer.subscription.created, etc
  event_data JSONB,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 7. Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  newsletter_type VARCHAR(50), -- industry, custom
  stripe_price_id VARCHAR(255),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX idx_restaurants_email ON restaurants(email);
CREATE INDEX idx_restaurants_stripe_customer ON restaurants(stripe_customer_id);
CREATE INDEX idx_inventory_restaurant ON inventory_submissions(restaurant_id);
CREATE INDEX idx_specials_restaurant ON generated_specials(restaurant_id);
CREATE INDEX idx_specials_date ON generated_specials(special_date);
CREATE INDEX idx_email_signups_email ON email_signups(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to tables
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE
  ON restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurant_profiles_updated_at BEFORE UPDATE
  ON restaurant_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Enable after testing
-- ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE restaurant_profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE inventory_submissions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE generated_specials ENABLE ROW LEVEL SECURITY;

-- Sample RLS Policies (uncomment when ready)
-- CREATE POLICY "Restaurants can view own data" ON restaurants
--   FOR SELECT USING (auth.uid() = user_id);

-- CREATE POLICY "Restaurants can update own data" ON restaurants
--   FOR UPDATE USING (auth.uid() = user_id);

COMMENT ON TABLE restaurants IS 'Main restaurant accounts';
COMMENT ON TABLE restaurant_profiles IS 'Detailed restaurant configuration';
COMMENT ON TABLE inventory_submissions IS 'Weekly inventory data uploads';
COMMENT ON TABLE generated_specials IS 'AI-generated menu specials';
COMMENT ON TABLE email_signups IS 'Landing page email captures';
COMMENT ON TABLE stripe_events IS 'Stripe webhook event log';
COMMENT ON TABLE newsletter_subscriptions IS 'Newsletter subscription tracking';

-- Grant permissions (Supabase handles this, but included for completeness)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;