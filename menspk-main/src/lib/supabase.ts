import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if we have valid environment variables
let supabaseClient: any = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    // Ensure URL is a string and properly formatted
    const url = String(supabaseUrl).trim()
    const key = String(supabaseAnonKey).trim()
    
    // Basic URL validation
    if (url.startsWith('http://') || url.startsWith('https://')) {
      supabaseClient = createClient(url, key)
    } else {
      console.warn('Invalid Supabase URL format - must start with http:// or https://')
    }
  } catch (error) {
    console.warn('Supabase configuration error:', error)
  }
} else {
  console.warn('Supabase environment variables not configured')
}

export const supabase = supabaseClient