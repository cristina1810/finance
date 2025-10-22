import { supabase } from "../../lib/supabase.js";

export async function POST({ request }) {
  const { email, password } = await request.json();

  // 1️⃣ Autenticación
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    return new Response(
      JSON.stringify({ data: null, error: authError.message }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // 2️⃣ Obtener datos de la tabla "users" (incluyendo name)
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, email, name")
    .eq("id", authData.user.id)
    .single(); // porque solo esperamos 1 usuario

  if (userError) {
    return new Response(
      JSON.stringify({ data: null, error: userError.message }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // 3️⃣ Devolver usuario completo con name
  return new Response(JSON.stringify({ data: userData, error: null }), {
    headers: { "Content-Type": "application/json" },
  });
}
