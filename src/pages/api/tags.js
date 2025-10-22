import { supabase } from "../../lib/supabase.js";

// GET: obtener tags de un usuario
export async function GET({ url }) {
  const userId = url.searchParams.get("userId");
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("user_id", userId);

  return new Response(JSON.stringify({ data, error: error?.message ?? null }), {
    headers: { "Content-Type": "application/json" },
  });
}

// POST: crear nueva etiqueta
export async function POST({ request }) {
  try {
    const {
      name,
      color = "#00FF00",
      userId,
      objetivo = null,
      iconName,
    } = await request.json();

    const { data, error } = await supabase
      .from("tags")
      .insert({ name, color, objetivo, user_id: userId, icon_name: iconName })
      .select();

    return new Response(
      JSON.stringify({ data, error: error?.message ?? null }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ data: null, error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

// PUT: actualizar etiqueta
export async function PUT({ request }) {
  try {
    const { id, name, color, objetivo, iconName } = await request.json();
    if (!id)
      return new Response(
        JSON.stringify({ data: null, error: "id requerido" }),
        { status: 400 }
      );

    const { data, error } = await supabase
      .from("tags")
      .update({ name, color, objetivo, icon_name: iconName })
      .eq("id", id)
      .select();

    return new Response(
      JSON.stringify({ data, error: error?.message ?? null }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ data: null, error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

// DELETE: eliminar etiqueta
export async function DELETE({ request }) {
  try {
    const { id } = await request.json();
    if (!id)
      return new Response(
        JSON.stringify({ data: null, error: "id requerido" }),
        { status: 400 }
      );

    const { data, error } = await supabase.from("tags").delete().eq("id", id);

    return new Response(
      JSON.stringify({ data, error: error?.message ?? null }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ data: null, error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
