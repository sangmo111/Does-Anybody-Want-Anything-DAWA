import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://polazpgxnpsliexovjvf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvbGF6cGd4bnBzbGlleG92anZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg3NzE0MzcsImV4cCI6MTk5NDM0NzQzN30.IzVHqiBBS8lYqYlMStlACqKXVr2YquwcOsDxAcl5aK0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export const my_user_id = "5fc269cc-3986-4aa1-97b6-c385a3cfea0c";