import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if we have valid environment variables
// Check for valid URL format to prevent build errors
let supabaseClient: any = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    // Validate URL format
    new URL(supabaseUrl)
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.warn('Invalid Supabase configuration:', error)
  }
}

export const supabase = supabaseClient