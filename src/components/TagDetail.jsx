import { useState, useEffect } from "react";
import {
  PiggyBank,
  Wallet,
  ShoppingCart,
  CreditCard,
  Baby,
  Smile,
  Tickets,
  RefreshCw,
  Notebook,
  Wrench,
  Heart,
  Star,
  Folder,
  Sofa,
  Apple,
  TrainFront,
  IdCard,
  Euro,
  Edit2,
  Save,
  ArrowLeft,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import TransactionItem from "./TransactionItem.jsx";

export default function TagDetail({ tagId, closePage }) {
  const { user, loadingUser } = useUser();

  const [tag, setTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedColor, setEditedColor] = useState("#B77466");
  const [editedGoal, setEditedGoal] = useState(0);
  const [editedIconName, setEditedIconName] = useState("Wallet");

  useEffect(() => {
    if (!user?.id || !tagId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const resTags = await fetch(`/api/tags?userId=${user.id}`);
        const tagsJson = await resTags.json();
        const allTags = tagsJson.data || [];
        setTags(allTags);

        const found = allTags.find((t) => t.id === tagId);
        setTag(found);

        if (found) {
          setEditedName(found.name);
          setEditedColor(found.color);
          setEditedGoal(found.goal ?? 0);
          setEditedIconName(found.icon_name || "Wallet"); // inicializamos icono
        }

        const resTrans = await fetch(`/api/transactions?userId=${user.id}`);
        const userTransactions = (await resTrans.json()).data || [];
        setTransactions(userTransactions.filter((t) => t.tag_id === tagId));

        const resAcc = await fetch(`/api/accounts?userId=${user.id}`);
        const accJson = await resAcc.json();
        setAccounts(accJson.data || []);
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tagId, user]);

  if (loadingUser) return <p>Cargando usuario...</p>;
  if (!user) return <p>No estás logueado.</p>;
  if (loading) return <p>Cargando etiqueta y transacciones...</p>;
  if (!tag) return <p>Etiqueta no encontrada.</p>;

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const handleSave = async () => {
    try {
      const res = await fetch("/api/tags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: tag.id,
          name: editedName,
          color: editedColor,
          objetivo: editedGoal,
          iconName: editedIconName, // <-- enviamos icono al backend
        }),
      });

      const json = await res.json();

      if (!json.error) {
        setTag((prev) => ({
          ...prev,
          name: editedName,
          color: editedColor,
          objetivo: editedGoal,
          icon_name: editedIconName, // <-- actualizamos localmente
        }));
        setIsEditing(false);
      } else {
        console.error("Error al actualizar la etiqueta:", json.error);
      }
    } catch (err) {
      console.error("Error guardando cambios:", err);
    }
  };
  // 🔹 Eliminar transacción
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta transacción?")) return;

    try {
      const res = await fetch("/api/transactions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();

      if (!json.error) {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      } else {
        console.error("Error borrando transacción:", json.error);
      }
    } catch (err) {
      console.error("Error borrando transacción:", err);
    }
  };
  const icons = [
    {
      name: "PiggyBank",
      component: <PiggyBank className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Wallet",
      component: <Wallet className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "ShoppingCart",
      component: (
        <ShoppingCart className="w-6 h-6" style={{ color: tag.color }} />
      ),
    },
    {
      name: "CreditCard",
      component: (
        <CreditCard className="w-6 h-6" style={{ color: tag.color }} />
      ),
    },
    {
      name: "Baby",
      component: <Baby className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Smile",
      component: <Smile className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Tickets",
      component: <Tickets className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "RefreshCw",
      component: <RefreshCw className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Notebook",
      component: <Notebook className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Wrench",
      component: <Wrench className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Heart",
      component: <Heart className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Star",
      component: <Star className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Folder",
      component: <Folder className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Sofa",
      component: <Sofa className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "Apple",
      component: <Apple className="w-6 h-6" style={{ color: tag.color }} />,
    },
    {
      name: "TrainFront",
      component: (
        <TrainFront className="w-6 h-6" style={{ color: tag.color }} />
      ),
    },
    {
      name: "IdCard",
      component: <IdCard className="w-6 h-6" style={{ color: tag.color }} />,
    },
  ];
  const iconsMap = {
    PiggyBank: <PiggyBank className="w-6 h-6" style={{ color: tag.color }} />,
    Wallet: <Wallet className="w-6 h-6" style={{ color: tag.color }} />,
    ShoppingCart: (
      <ShoppingCart className="w-6 h-6" style={{ color: tag.color }} />
    ),
    CreditCard: <CreditCard className="w-6 h-6" style={{ color: tag.color }} />,
    Baby: <Baby className="w-6 h-6" style={{ color: tag.color }} />,
    Smile: <Smile className="w-6 h-6" style={{ color: tag.color }} />,
    Tickets: <Tickets className="w-6 h-6" style={{ color: tag.color }} />,
    RefreshCw: <RefreshCw className="w-6 h-6" style={{ color: tag.color }} />,
    Notebook: <Notebook className="w-6 h-6" style={{ color: tag.color }} />,
    Wrench: <Wrench className="w-6 h-6" style={{ color: tag.color }} />,
    Heart: <Heart className="w-6 h-6" style={{ color: tag.color }} />,
    Star: <Star className="w-6 h-6" style={{ color: tag.color }} />,
    Folder: <Folder className="w-6 h-6" style={{ color: tag.color }} />,
    Sofa: <Sofa className="w-6 h-6" style={{ color: tag.color }} />,
    Apple: <Apple className="w-6 h-6" style={{ color: tag.color }} />,
    TrainFront: <TrainFront className="w-6 h-6" style={{ color: tag.color }} />,
    IdCard: <IdCard className="w-6 h-6" style={{ color: tag.color }} />,
  };
  return (
    <div className="">
      {/* 🔹 Información de la etiqueta */}
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[var(--background-light)] text-[var(--text-light)] font-display">
        {isEditing ? (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="m-5 bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
              <div className="flex flex-col gap-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Nombre de la cuenta
                  </label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Ej: Cuenta Principal"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Objetivo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Objetivo
                  </label>
                  <input
                    type="number"
                    value={editedGoal}
                    onChange={(e) => setEditedGoal(Number(e.target.value))}
                    placeholder="Ej: 100"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "#fecaca",
                      "#fed7aa",
                      "#fef08a",
                      "#d9f99d",
                      "#bfdbfe",
                      "#e9d5ff",
                      "#fbcfe8",
                    ].map((c) => (
                      <button
                        key={c}
                        type="button"
                        style={{ backgroundColor: c }}
                        onClick={() => setEditedColor(c)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          editedColor === c ? "border-black" : "border-gray-300"
                        }`}
                      />
                    ))}
                    <input
                      type="color"
                      value={editedColor}
                      onChange={(e) => setEditedColor(e.target.value)}
                      className="w-8 h-8 rounded-full border-2 border-[#aec0d6]/30 focus:border-[#475482] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Icono */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Selecciona un icono
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {icons.map((i) => (
                      <button
                        key={i.name}
                        type="button"
                        onClick={() => setEditedIconName(i.name)}
                        className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer ${
                          editedIconName === i.name
                            ? "ring-2 ring-[var(--primary)]"
                            : "border-gray-300"
                        } bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white`}
                      >
                        {i.component}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full bg-[var(--blue-light-bg)] hover:bg-green-600 text-[var(--text-light)] font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="w-full bg-[var(--primary)] hover:bg-green-600 text-gray-800 font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="sticky top-0 z-20 bg-[var(--background-light)] px-4 pt-4 pb-2 flex items-center justify-between">
            <button onClick={closePage}>
              <ArrowLeft />
            </button>
            <h1 className={`text-[28px] font-bold flex items-center gap-2 `}>
              {icons.find((i) => i.name === tag.icon_name)?.component || (
                <Wallet style={{ color: tag.color }} />
              )}
              {tag.name}
            </h1>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 "
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-4 rounded-xl border border-[var(--light-gray)] bg-white p-4">
            <div className="mt-2 grid grid-cols-3 text-center text-sm">
              <div>
                <p className="font-semibold text-[var(--income-text)]">
                  Ingresos
                </p>
                <p className="text-[var(--dark-gray)]">
                  {totalIncome.toFixed(2)} €
                </p>
              </div>

              <div>
                <p className="font-semibold text-[var(--expense-text)]">
                  Gastos
                </p>
                <p className="text-[var(--dark-gray)]">
                  {totalExpenses.toFixed(2)} €
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--benefit-text)]">
                  Beneficios
                </p>
                <p className="text-[var(--dark-gray)]">
                  {balance.toFixed(2)} €
                </p>
              </div>
              {/* 🔹 Objetivo mensual */}
            </div>
            <div>
              {tag.objetivo != null && tag.objetivo > 0 && (
                <div className="pt-3 border-t border-[#aec0d6]/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#475482] font-medium">
                      Objetivo mensual
                    </span>
                    <span className="text-xs font-bold text-[#111827]">
                      {totalExpenses.toFixed(2)} / {tag.objetivo} €
                    </span>
                  </div>

                  <div className="w-full bg-[#aec0d6]/20 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          (totalExpenses / tag.objetivo) * 100,
                          100
                        )}%`,
                        backgroundColor:
                          totalExpenses < tag.objetivo ? tag.color : "green",
                      }}
                    />
                  </div>

                  <div className="mt-2 text-sm font-medium">
                    {totalExpenses < tag.objetivo ? (
                      <span className="text-gray-700">
                        Te faltan {(tag.objetivo - totalExpenses).toFixed(2)} €
                        para llegar al objetivo
                      </span>
                    ) : (
                      <span className="text-green-600 font-bold">
                        ¡Objetivo superado! 🎉
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {transactions.length === 0 ? (
            <p>No hay transacciones para esta etiqueta.</p>
          ) : (
            <ul className="space-y-3">
              {transactions.map((t) => {
                const account = accounts.find((a) => a.id === t.account_id);
                return (
                  <TransactionItem
                    key={t.id}
                    transaction={t}
                    tags={tags}
                    account={account} // ✅ Ahora sí está definida
                    onDelete={handleDelete}
                    mode="tag"
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
      {/* 🔹 Transacciones */}
    </div>
  );
}
