-- Fix permissions for email_captures table in Supabase
-- Run this in your Supabase SQL Editor

-- First, check if the table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'email_captures'
);

-- If table doesn't exist, create it
CREATE TABLE IF NOT EXISTS public.email_captures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100) DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_captures_email ON email_captures(email);

-- Disable RLS temporarily to test (you can re-enable later with proper policies)
ALTER TABLE email_captures DISABLE ROW LEVEL SECURITY;

-- Grant permissions to anon role (this is what your public key uses)
GRANT ALL ON public.email_captures TO anon;
GRANT ALL ON public.email_captures TO authenticated;

-- Allow public access for inserts (waitlist signups)
CREATE POLICY "Allow public inserts" ON email_captures
  FOR INSERT
  WITH CHECK (true);

-- Allow public to check if email exists (for duplicate prevention)  
CREATE POLICY "Allow public select own email" ON email_captures
  FOR SELECT
  USING (true);

-- If you want to re-enable RLS later, uncomment this:
-- ALTER TABLE email_captures ENABLE ROW LEVEL SECURITY;

-- Test insert to verify it works
-- INSERT INTO email_captures (email, source) 
-- VALUES ('test@example.com', 'sql_test')
-- ON CONFLICT (email) DO NOTHING;

-- Check if test worked
SELECT * FROM email_captures ORDER BY created_at DESC LIMIT 5;