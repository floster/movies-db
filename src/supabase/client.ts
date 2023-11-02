import { createClient } from '@supabase/supabase-js'

const clientURL = import.meta.env.VITE_SUPABASE_URL!
const clientKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(clientURL, clientKey)
