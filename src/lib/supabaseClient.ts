import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables. Check your .env file.')
  throw new Error('Missing Supabase configuration')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
