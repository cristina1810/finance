import { supabase } from "../../lib/supabase.js";

// GET: obtener cuentas de un usuario
export async function GET({ request }) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  if (!userId)
    return new Response(JSON.stringify({ error: "userId required" }), {
      status: 400,
    });

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId);

  return new Response(JSON.stringify({ data, error: error?.message ?? null }), {
    headers: { "Content-Type": "application/json" },
  });
}

// POST: crear nueva cuenta
export async function POST({ request }) {
  const {
    name,
    userId,
    color = "#B77466",
    saldo = 0,
    iconName = "Wallet",
  } = await request.json();

  const { data: existing } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId)
    .eq("name", name);

  if (existing.length > 0) {
    return new Response(JSON.stringify({ error: "La cuenta ya existe" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("accounts")
    .insert([{ name, color, saldo, icon_name: iconName, user_id: userId }])
    .select();

  return new Response(JSON.stringify({ data, error: error?.message ?? null }), {
    headers: { "Content-Type": "application/json" },
  });
}

// PUT: actualizar cuenta por id
export async function PUT({ request }) {
  const { id, name, color, iconName } = await request.json();
  if (!id)
    return new Response(JSON.stringify({ error: "id required" }), {
      status: 400,
    });

  const { data, error } = await supabase
    .from("accounts")
    .update({ name, color, icon_name: iconName })
    .eq("id", id)
    .select();

  return new Response(JSON.stringify({ data, error: error?.message ?? null }), {
    headers: { "Content-Type": "application/json" },
  });
}

// DELETE: borrar cuenta por id
export async function DELETE({ request }) {
  const { id } = await request.json();
  if (!id)
    return new Response(JSON.stringify({ error: "id required" }), {
      status: 400,
    });

  const { data, error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", id)
    .select();

  return new Response(JSON.stringify({ data, error: error?.message ?? null }), {
    headers: { "Content-Type": "application/json" },
  });
}
