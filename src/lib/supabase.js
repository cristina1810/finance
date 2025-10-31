import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL; // ✅ usar esta
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // ✅ usar esta

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("SUPABASE_URL y SUPABASE_ANON_KEY son requeridos");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true, // renueva automáticamente el token
    persistSession: true, // guarda la sesión en localStorage
    detectSessionInUrl: true, // detecta si llega un token por URL
  },
});
