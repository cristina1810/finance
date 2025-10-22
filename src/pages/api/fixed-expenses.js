import { supabase } from "../../lib/supabase.js";
export async function GET({ url }) {
  const userId = url.searchParams.get("userId");
  const { data, error } = await supabase
    .from("fixed_expenses")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true });

  // Renombrar icon_name a iconName
  const fixedExpenses = data?.map((fe) => ({
    ...fe,
    iconName: fe.icon_name,
  }));

  return new Response(
    JSON.stringify({ data: fixedExpenses, error: error?.message ?? null }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST({ request }) {
  const {
    name,
    amount,
    date,
    account_id,
    user_id,
    tag_id,
    paid = false,
    icon_name: iconName,
  } = await request.json();

  // Validaciones de campos obligatorios
  if (!name || amount == null || !date || !account_id || !user_id) {
    return new Response(
      JSON.stringify({ data: null, error: "Faltan campos obligatorios" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  const { data, error } = await supabase
    .from("fixed_expenses")
    .insert({
      name,
      amount: parseFloat(amount),
      date,
      account_id,
      user_id,
      tag_id,
      paid,
      icon_name: iconName,
    })
    .select();

  return new Response(JSON.stringify({ data, error: error?.message ?? null }), {
    headers: { "Content-Type": "application/json" },
  });
}
export async function PUT({ params, request }) {
  const { id } = params;
  const body = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: "Falta el ID" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("fixed_expenses")
    .update(body)
    .eq("id", id)
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ data }));
}
