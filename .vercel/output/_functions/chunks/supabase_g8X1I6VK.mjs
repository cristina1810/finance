import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL; // ✅ usar esta
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // ✅ usar esta

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("SUPABASE_URL y SUPABASE_ANON_KEY son requeridos");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };
