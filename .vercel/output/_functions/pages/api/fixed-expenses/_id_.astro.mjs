import { s as supabase } from '../../../chunks/supabase_Dv3kogQT.mjs';
export { renderers } from '../../../renderers.mjs';

async function DELETE({ params }) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Falta el ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { error } = await supabase.from("fixed_expenses").delete().eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

async function PUT({ params, request }) {
  const { id } = params; // del filename [id].js
  if (!id)
    return new Response(JSON.stringify({ error: "id required" }), {
      status: 400,
    });

  const body = await request.json();
  const updateData = {};

  if (body.date) updateData.date = body.date;
  if (body.amount) updateData.amount = parseFloat(body.amount);
  if (body.name) updateData.name = body.name;
  if (body.account_id) updateData.account_id = body.account_id;
  if (body.user_id) updateData.user_id = body.user_id;
  if (body.tag_id !== undefined) updateData.tag_id = body.tag_id;

  try {
    const { data, error } = await supabase
      .from("fixed_expenses")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return new Response(JSON.stringify({ data, error: null }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error updating fixed expense:", err);
    return new Response(JSON.stringify({ data: null, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
