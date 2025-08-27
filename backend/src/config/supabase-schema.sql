-- MenuSparks Database Schema for Supabase
-- Run this in your Supabase SQL Editor (Database > SQL Editor)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (integrated with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    restaurant_name TEXT,
    restaurant_type TEXT,
    phone TEXT,
    subscription_tier TEXT CHECK (subscription_tier IN ('newsletter', 'appetizer', 'entree', 'full-meal', 'trial', 'free')),
    subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'trial')),
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Email captures from landing page
CREATE TABLE IF NOT EXISTS public.email_captures (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL,
    source TEXT NOT NULL, -- 'hero', 'final-cta', 'contact-form', etc.
    restaurant_name TEXT,
    interested_tier TEXT,
    message TEXT,
    converted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Generated specials/recipes
CREATE TABLE IF NOT EXISTS public.specials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    ingredients JSONB, -- Array of {name, quantity, unit, cost}
    instructions TEXT[],
    prep_time INTEGER, -- in minutes
    cook_time INTEGER, -- in minutes
    servings INTEGER,
    cost_per_serving DECIMAL(10, 2),
    selling_price DECIMAL(10, 2),
    profit_margin DECIMAL(5, 2),
    category TEXT, -- 'appetizer', 'entree', 'dessert'
    tags TEXT[],
    social_media_copy TEXT,
    image_suggestions TEXT,
    generated_by TEXT DEFAULT 'ai', -- 'ai', 'manual', 'template'
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Restaurant inventory (for generating specials from existing items)
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    category TEXT, -- 'protein', 'vegetable', 'dairy', 'grain', 'sauce', etc.
    quantity DECIMAL(10, 2),
    unit TEXT, -- 'lbs', 'oz', 'gal', 'each', etc.
    cost_per_unit DECIMAL(10, 2),
    expiration_date DATE,
    supplier TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    restaurant_name TEXT,
    subscription_type TEXT DEFAULT 'weekly', -- 'weekly', 'biweekly', 'monthly'
    topics TEXT[], -- ['inventory-tips', 'seasonal-menus', 'profit-optimization', etc.]
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Usage tracking for analytics
CREATE TABLE IF NOT EXISTS public.usage_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'special_generated', 'special_published', 'inventory_updated', etc.
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    restaurant_name TEXT,
    interested_tier TEXT,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    contacted_at TIMESTAMP WITH TIME ZONE
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Specials policies
CREATE POLICY "Users can view own specials" ON public.specials
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own specials" ON public.specials
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own specials" ON public.specials
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own specials" ON public.specials
    FOR DELETE USING (auth.uid() = user_id);

-- Inventory policies
CREATE POLICY "Users can manage own inventory" ON public.inventory
    FOR ALL USING (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON public.usage_analytics
    FOR SELECT USING (auth.uid() = user_id);

-- Public tables (no RLS needed for landing page captures)
-- These will be managed through backend API with proper validation

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_specials_user_id ON public.specials(user_id);
CREATE INDEX idx_specials_status ON public.specials(status);
CREATE INDEX idx_inventory_user_id ON public.inventory(user_id);
CREATE INDEX idx_inventory_expiration ON public.inventory(expiration_date);
CREATE INDEX idx_email_captures_email ON public.email_captures(email);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing (optional - remove in production)
-- INSERT INTO public.email_captures (email, source, restaurant_name)
-- VALUES 
--     ('admin@menusparks.com', 'test', 'Test Restaurant'),
--     ('demo@menusparks.com', 'hero', 'Demo Bistro');

COMMENT ON TABLE public.profiles IS 'User profiles linked to Supabase Auth';
COMMENT ON TABLE public.email_captures IS 'Email captures from landing page forms';
COMMENT ON TABLE public.specials IS 'AI-generated and manual restaurant specials';
COMMENT ON TABLE public.inventory IS 'Restaurant inventory for special generation';
COMMENT ON TABLE public.newsletter_subscribers IS 'Newsletter subscription management';
COMMENT ON TABLE public.contact_submissions IS 'Contact form submissions from landing page';