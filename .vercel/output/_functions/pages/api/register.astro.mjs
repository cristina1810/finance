import { s as supabase } from '../../chunks/supabase_g8X1I6VK.mjs';
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  try {
    const { email, password } = await request.json();

    // 1️⃣ Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return new Response(
        JSON.stringify({ data: null, error: authError.message }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // 2️⃣ Insertar usuario en tabla pública
    // NO guardes la contraseña en texto plano. Aquí solo guardamos email y id
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([{ id: authData.user.id, email }]);

    if (userError) {
      return new Response(
        JSON.stringify({ data: null, error: userError.message }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ data: { user: authData.user }, error: null }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        data: null,
        error: "Error de conexión. Intenta de nuevo.",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
