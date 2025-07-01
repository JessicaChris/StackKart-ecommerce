import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bvrxwdfflycggrilbenh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2cnh3ZGZmbHljZ2dyaWxiZW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDI3MTEsImV4cCI6MjA2NjMxODcxMX0.5noclZ8qD8f9BvIvM6ppFnRtde-glffwNGi74Zs7PNs'

export const supabase = createClient(supabaseUrl, supabaseKey)
