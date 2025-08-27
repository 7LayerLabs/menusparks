-- MenuSparks Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'restaurant_owner',
    subscription_tier VARCHAR(20) DEFAULT 'none', -- 'appetizer', 'main_meal', 'dessert'
    subscription_status VARCHAR(20) DEFAULT 'inactive', -- 'active', 'inactive', 'cancelled'
    stripe_customer_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    cuisine_type VARCHAR(100),
    average_monthly_revenue DECIMAL(10,2),
    food_cost_percentage DECIMAL(5,2) DEFAULT 32.00,
    current_waste_percentage DECIMAL(5,2) DEFAULT 7.00,
    operating_hours JSONB, -- Store hours as JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inventory categories
CREATE TABLE IF NOT EXISTS inventory_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO inventory_categories (name, description) VALUES
('Proteins', 'Meat, fish, poultry, and plant-based proteins'),
('Vegetables', 'Fresh and frozen vegetables'),
('Dairy', 'Milk, cheese, butter, eggs, and dairy products'),
('Grains', 'Rice, pasta, bread, and grain products'),
('Pantry', 'Spices, oils, vinegars, and shelf-stable items'),
('Beverages', 'Non-alcoholic beverages'),
('Alcohol', 'Wine, beer, and spirits'),
('Dessert Items', 'Dessert ingredients and components')
ON CONFLICT DO NOTHING;

-- Inventory items
CREATE TABLE IF NOT EXISTS inventory_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES inventory_categories(id),
    name VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2),
    unit VARCHAR(50), -- 'lbs', 'oz', 'pieces', 'gallons', etc.
    cost_per_unit DECIMAL(10,2),
    expiration_date DATE,
    supplier VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Generated specials
CREATE TABLE IF NOT EXISTS generated_specials (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients JSONB, -- Store ingredient list as JSON
    prep_instructions TEXT,
    cooking_instructions TEXT,
    serving_suggestions TEXT,
    estimated_cost DECIMAL(10,2),
    suggested_price DECIMAL(10,2),
    profit_margin DECIMAL(5,2),
    dietary_tags JSONB, -- 'vegetarian', 'vegan', 'gluten-free', etc.
    social_media_copy TEXT,
    image_suggestions TEXT,
    week_of DATE,
    status VARCHAR(20) DEFAULT 'generated', -- 'generated', 'approved', 'rejected', 'used'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User sessions for authentication
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email captures from landing page
CREATE TABLE IF NOT EXISTS email_captures (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    source VARCHAR(50), -- 'hero', 'pricing', 'footer', etc.
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subscription management
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    stripe_subscription_id VARCHAR(255) UNIQUE,
    tier VARCHAR(20) NOT NULL, -- 'appetizer', 'main_meal', 'dessert'
    billing_cycle VARCHAR(20) DEFAULT 'weekly', -- 'weekly', 'annual'
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'past_due'
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_restaurants_user_id ON restaurants(user_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_restaurant_id ON inventory_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_generated_specials_restaurant_id ON generated_specials(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_generated_specials_week_of ON generated_specials(week_of);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token_hash ON user_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_email_captures_created_at ON email_captures(created_at);

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_items_updated_at BEFORE UPDATE ON inventory_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_generated_specials_updated_at BEFORE UPDATE ON generated_specials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();