import { s as supabase } from '../../chunks/supabase_Dv3kogQT.mjs';
export { renderers } from '../../renderers.mjs';

// GET: obtener transacciones de un usuario
async function GET({ url }) {
  const userId = url.searchParams.get("userId");
  if (!userId) {
    return new Response(
      JSON.stringify({ data: null, error: "userId required" }),
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId);

  return new Response(JSON.stringify({ data, error: error?.message ?? null }), {
    headers: { "Content-Type": "application/json" },
  });
}

// POST: crear transacción
async function POST({ request }) {
  let body = await request.json();

  // Puede ser una sola transacción o un array
  const transactionsArray = Array.isArray(body) ? body : [body];

  // Validar transacciones
  for (const tx of transactionsArray) {
    const {
      description,
      amount,
      date,
      type,
      account_id,
      target_account_id,
      tag_id,
      user_id,
    } = tx;

    if (!description || !amount || !date || !type || !account_id || !user_id) {
      return new Response(
        JSON.stringify({
          data: null,
          error: "Faltan campos obligatorios en alguna transacción",
        }),
        { status: 400 }
      );
    }

    if (!["income", "expense", "transfer"].includes(type)) {
      return new Response(
        JSON.stringify({ data: null, error: "Tipo de transacción inválido" }),
        { status: 400 }
      );
    }
  }

  // Insertar todas las transacciones
  const { data, error } = await supabase
    .from("transactions")
    .insert(transactionsArray)
    .select();

  if (error)
    return new Response(JSON.stringify({ data: null, error: error.message }), {
      status: 500,
    });

  // 🔄 Actualizar saldo (columna "saldo") de cada cuenta implicada
  for (const tx of data) {
    const { account_id, amount, type } = tx;

    // Obtener saldo actual
    const { data: cuentaData, error: cuentaError } = await supabase
      .from("accounts")
      .select("saldo")
      .eq("id", account_id)
      .single();

    if (cuentaError || !cuentaData) continue;

    const saldoActual = parseFloat(cuentaData.saldo || 0);
    let nuevoSaldo = saldoActual;

    if (type === "income") nuevoSaldo += amount;
    else if (type === "expense") nuevoSaldo -= amount;

    await supabase
      .from("accounts")
      .update({ saldo: nuevoSaldo })
      .eq("id", account_id);
  }

  return new Response(JSON.stringify({ data, error: null }), {
    headers: { "Content-Type": "application/json" },
  });
}

// PUT: actualizar transacción por id
// PUT: actualizar transacción y ajustar saldo
async function PUT({ request }) {
  const {
    id,
    titulo,
    cantidad,
    fecha,
    tipo,
    cuentaId,
    cuentaDestinoId,
    etiquetaId,
  } = await request.json();

  if (!id)
    return new Response(JSON.stringify({ data: null, error: "id required" }), {
      status: 400,
    });

  // 1️⃣ Obtener transacción original
  const { data: original, error: originalError } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (originalError || !original)
    return new Response(
      JSON.stringify({ data: null, error: "Transacción no encontrada" }),
      { status: 404 }
    );

  // 2️⃣ Revertir efecto anterior en su cuenta
  const { data: cuentaAntigua } = await supabase
    .from("accounts")
    .select("saldo")
    .eq("id", original.account_id)
    .single();

  if (cuentaAntigua) {
    let saldo = parseFloat(cuentaAntigua.saldo || 0);
    if (original.type === "income") saldo -= original.amount;
    else if (original.type === "expense") saldo += original.amount;

    await supabase
      .from("accounts")
      .update({ saldo })
      .eq("id", original.account_id);
  }

  // 3️⃣ Construir los nuevos datos
  const updateData = {};
  if (titulo) updateData.description = titulo;
  if (cantidad) updateData.amount = parseFloat(cantidad);
  if (fecha) updateData.date = fecha;
  if (tipo) updateData.type = tipo;
  if (cuentaId) updateData.account_id = cuentaId;
  if (etiquetaId) updateData.tag_id = etiquetaId;
  updateData.target_account_id = tipo === "transfer" ? cuentaDestinoId : null;

  // 4️⃣ Actualizar transacción
  const { data, error } = await supabase
    .from("transactions")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error)
    return new Response(JSON.stringify({ data: null, error: error.message }), {
      status: 500,
    });

  const updated = data[0];

  // 5️⃣ Aplicar el nuevo efecto al saldo actual de la nueva cuenta
  const { data: cuentaNueva } = await supabase
    .from("accounts")
    .select("saldo")
    .eq("id", updated.account_id)
    .single();

  if (cuentaNueva) {
    let saldo = parseFloat(cuentaNueva.saldo || 0);
    if (updated.type === "income") saldo += updated.amount;
    else if (updated.type === "expense") saldo -= updated.amount;

    await supabase
      .from("accounts")
      .update({ saldo })
      .eq("id", updated.account_id);
  }

  return new Response(JSON.stringify({ data: updated, error: null }), {
    headers: { "Content-Type": "application/json" },
  });
}
// DELETE: borrar transacción y revertir saldo
async function DELETE({ request }) {
  const { id } = await request.json();

  if (!id)
    return new Response(JSON.stringify({ data: null, error: "id required" }), {
      status: 400,
    });

  // 1️⃣ Obtener la transacción a borrar
  const { data: transaccion, error: txError } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (txError || !transaccion)
    return new Response(
      JSON.stringify({ data: null, error: "Transacción no encontrada" }),
      { status: 404 }
    );

  // 2️⃣ Revertir efecto en el saldo
  const { data: cuentaData } = await supabase
    .from("accounts")
    .select("saldo")
    .eq("id", transaccion.account_id)
    .single();

  if (cuentaData) {
    let saldo = parseFloat(cuentaData.saldo || 0);
    if (transaccion.type === "income") saldo -= transaccion.amount;
    else if (transaccion.type === "expense") saldo += transaccion.amount;

    await supabase
      .from("accounts")
      .update({ saldo })
      .eq("id", transaccion.account_id);
  }

  // 3️⃣ Borrar la transacción
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .select();

  return new Response(JSON.stringify({ data, error: error?.message ?? null }), {
    headers: { "Content-Type": "application/json" },
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
