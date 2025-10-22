import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useUser } from "../context/UserContext";
import FixedExpenseItem from "./FixedExpenseItem";
import FixedExpensesForm from "./FixedExpensesForm";

export default function FixedExpensesList({
  fixedExpenses,
  setFixedExpenses,
  accounts,
  showHeader = true,
}) {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [fixedTag, setFixedTag] = useState(null);

  // Buscar o crear la etiqueta "Gastos fijos"
  useEffect(() => {
    if (!user?.id) return;

    const fetchOrCreateFixedTag = async () => {
      const res = await fetch(`/api/tags?userId=${user.id}`);
      const json = await res.json();
      const existingTag = json.data.find(
        (t) => t.name.toLowerCase() === "gastos fijos"
      );

      if (existingTag) {
        setFixedTag(existingTag);
      } else {
        const createRes = await fetch("/api/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Gastos fijos", userId: user.id }),
        });
        const createJson = await createRes.json();
        setFixedTag(createJson.data[0]);
      }
    };

    fetchOrCreateFixedTag();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este gasto fijo?")) return;

    try {
      const res = await fetch(`/api/fixed-expenses/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!json.error) {
        setFixedExpenses((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert("Error al borrar: " + json.error);
      }
    } catch (err) {
      console.error("Error borrando gasto fijo:", err);
      alert("Error borrando gasto fijo");
    }
  };
  const handleGenerateTransaction = async (expense) => {
    if (!user?.id) return alert("Usuario no logueado");

    // Validación de campos obligatorios
    if (!expense.account_id || !expense.amount || !expense.name) {
      return alert(
        "Error: el gasto fijo tiene campos incompletos. Revisa que la cuenta, nombre y cantidad estén definidos."
      );
    }

    // Calcular la siguiente fecha (mes siguiente)
    const nextDate = new Date(expense.date);
    nextDate.setMonth(nextDate.getMonth() + 1);
    const nextDateStr = nextDate.toISOString().split("T")[0];

    // Log de depuración
    console.log("Generando transacción con:", {
      name: expense.name,
      amount: parseFloat(expense.amount),
      date: nextDateStr,
      account_id: expense.account_id,
      user_id: user.id,
      tag_id: expense.tag_id || null,
    });

    try {
      // Crear transacción
      const txRes = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: expense.name, // <--- antes era name
          amount: parseFloat(expense.amount),
          date: nextDateStr,
          type: "expense", // <--- obligatorio
          account_id: expense.account_id,
          user_id: user.id,
          tag_id: expense.tag_id || null,
        }),
      });

      const txJson = await txRes.json();
      if (txJson.error)
        return alert("Error al generar la transacción: " + txJson.error);

      // Actualizar la fecha del gasto fijo
      const fixRes = await fetch(`/api/fixed-expenses/${expense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: nextDateStr }),
      });
      const fixJson = await fixRes.json();
      if (fixJson.error)
        return alert(
          "Error al actualizar la fecha del gasto fijo: " + fixJson.error
        );

      // Actualizar estado local
      setFixedExpenses((prev) =>
        prev.map((f) => (f.id === expense.id ? { ...f, date: nextDateStr } : f))
      );

      alert("Transacción generada correctamente");
    } catch (err) {
      console.error("Error generando la transacción:", err);
      alert("Error generando la transacción");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {showHeader && (
        <div className="flex items-center justify-between pb-3 ">
          <h2 className="text-[var(--text-light)] text-[22px] font-bold">
            Gastos Fijos
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="min-w-[84px] max-w-[480px] h-10 rounded-full bg-[var(--light-gray)] text-[var(--dark-gray)] text-sm flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold text-base "
          >
            <Plus className="w-6 h-6" /> Añadir
          </button>
        </div>
      )}

      {!showForm ? (
        <div>
          {fixedExpenses.length === 0 ? (
            <p>No hay gastos fijos.</p>
          ) : (
            fixedExpenses.map((fe) => {
              console.log(fe.iconName); // <--- ¿Qué aparece aquí?
              return (
                <FixedExpenseItem
                  key={fe.id}
                  expense={fe}
                  onDelete={handleDelete}
                  handleGenerateTransaction={handleGenerateTransaction}
                />
              );
            })
          )}
        </div>
      ) : (
        <FixedExpensesForm
          accounts={accounts}
          fixedExpenses={fixedExpenses}
          setFixedExpenses={setFixedExpenses}
          closeForm={() => setShowForm(false)}
          fixedTag={fixedTag}
          user={user}
        />
      )}
    </div>
  );
}
