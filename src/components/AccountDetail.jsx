// src/components/AccountDetail.jsx
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
  Edit2,
  Save,
  ArrowLeft,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import TransactionItem from "./TransactionItem.jsx";

export default function AccountDetail({ accountId, closePage }) {
  const { user, loadingUser } = useUser();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedColor, setEditedColor] = useState("#B77466");
  const [editedIconName, setEditedIconName] = useState("Wallet");
  const icons = [
    { name: "PiggyBank", component: <PiggyBank /> },
    { name: "Wallet", component: <Wallet /> },
    { name: "ShoppingCart", component: <ShoppingCart /> },
    { name: "CreditCard", component: <CreditCard /> },
    { name: "Baby", component: <Baby /> },
    { name: "Smile", component: <Smile /> },
    { name: "Tickets", component: <Tickets /> },
    { name: "RefreshCw", component: <RefreshCw /> },
    { name: "Notebook", component: <Notebook /> },
    { name: "Wrench", component: <Wrench /> },
    { name: "Heart", component: <Heart /> },
    { name: "Star", component: <Star /> },
    { name: "Folder", component: <Folder /> },
    { name: "Sofa", component: <Sofa /> },
    { name: "Apple", component: <Apple /> },
    { name: "TrainFront", component: <TrainFront /> },
    { name: "IdCard", component: <IdCard /> },
  ];

  useEffect(() => {
    if (!user?.id || !accountId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Traer todas las cuentas y seleccionar la actual
        const resAcc = await fetch(`/api/accounts?userId=${user.id}`);
        const accJson = await resAcc.json();
        const found = accJson.data.find((acc) => acc.id === accountId);
        setAccount(found);

        if (found) {
          setEditedName(found.name);
          setEditedColor(found.color);
          setEditedIconName(found.icon_name || "Wallet");
        }

        // Traer todas las transacciones del usuario
        const resTrans = await fetch(`/api/transactions?userId=${user.id}`);
        const transJson = await resTrans.json();
        if (!transJson.error) {
          const filtered = transJson.data
            .filter((t) => t.account_id === accountId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

          // Agrupar por día
          const grouped = filtered.reduce((acc, tx) => {
            const dateKey = new Date(tx.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
            });
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(tx);
            return acc;
          }, {});

          setTransactions(grouped);
        }

        // Traer todas las etiquetas del usuario
        const resTags = await fetch(`/api/tags?userId=${user.id}`);
        const tagsJson = await resTags.json();
        if (!tagsJson.error) setTags(tagsJson.data);
      } catch (err) {
        console.error("Error cargando cuenta o transacciones:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [accountId, user]);

  if (loadingUser) return <p>Cargando usuario...</p>;
  if (!user) return <p>No estás logueado.</p>;
  if (loading) return <p>Cargando cuenta y transacciones...</p>;
  if (!account) return <p>Cuenta no encontrada.</p>;

  const allTransactions = Object.values(transactions).flat();
  const totalIncome = allTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = allTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const iconsMap = {
    PiggyBank: (
      <PiggyBank className="w-6 h-6" style={{ color: account.color }} />
    ),
    Wallet: <Wallet className="w-6 h-6" style={{ color: account.color }} />,
    ShoppingCart: (
      <ShoppingCart className="w-6 h-6" style={{ color: account.color }} />
    ),
    CreditCard: (
      <CreditCard className="w-6 h-6" style={{ color: account.color }} />
    ),
    Baby: <Baby className="w-6 h-6" style={{ color: account.color }} />,
    Smile: <Smile className="w-6 h-6" style={{ color: account.color }} />,
    Tickets: <Tickets className="w-6 h-6" style={{ color: account.color }} />,
    RefreshCw: (
      <RefreshCw className="w-6 h-6" style={{ color: account.color }} />
    ),
    Notebook: <Notebook className="w-6 h-6" style={{ color: account.color }} />,
    Wrench: <Wrench className="w-6 h-6" style={{ color: account.color }} />,
    Heart: <Heart className="w-6 h-6" style={{ color: account.color }} />,
    Star: <Star className="w-6 h-6" style={{ color: account.color }} />,
    Folder: <Folder className="w-6 h-6" style={{ color: account.color }} />,
    Sofa: <Sofa className="w-6 h-6" style={{ color: account.color }} />,
    Apple: <Apple className="w-6 h-6" />,
    TrainFront: (
      <TrainFront className="w-6 h-6" style={{ color: account.color }} />
    ),
    IdCard: <IdCard className="w-6 h-6" style={{ color: account.color }} />,
  };
  const handleSave = async () => {
    try {
      const res = await fetch("/api/accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: account.id,
          name: editedName,
          color: editedColor,
          iconName: editedIconName, // <-- CAMBIO AQUI
          userId: user.id, // opcional si tu backend lo necesita
        }),
      });

      const json = await res.json();

      if (!json.error) {
        setAccount((prev) => ({
          ...prev,
          name: editedName,
          color: editedColor,
          icon_name: editedIconName, // mantén icon_name aquí para renderizar correctamente
        }));
        setIsEditing(false);
      } else {
        console.error("Error al actualizar la cuenta:", json.error);
      }
    } catch (err) {
      console.error("Error guardando cambios:", err);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[var(--background-light)] text-text-light font-display">
      {isEditing ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="m-5 bg-white round shadow-xl p-6 w-full max-w-md">
            <div className="flex flex-col gap-6">
              {/* Selector de icono */}
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

                {/* Selector color */}
              </div>
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

              {/* Botón guardar */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full bg-[var(--blue-light-bg)] hover:bg-green-600 text-[var(--text-light)] font-semibold py-3 round shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="w-full bg-[var(--primary)] hover:bg-green-600 text-gray-800 font-semibold py-3 round shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 z-20 bg-background-light px-4 pt-4 pb-2">
          <div className="flex items-center justify-between w-full">
            <button className="flex items-center justify-center p-2 text-dark-gray">
              <ArrowLeft onClick={closePage} />
            </button>

            <h1 className="text-[28px] font-bold leading-tight tracking-[-0.015em] text-center flex-1 flex items-center justify-center gap-2">
              {iconsMap[account.icon_name] || (
                <Wallet className="w-6 h-6" style={{ color: account.color }} />
              )}
              {account.name}
            </h1>

            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-blue-500"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Resumen de balance */}
      <div className="flex  flex-col gap-4 p-4 ">
        <div className="flex flex-col gap-4 rounded-xl border border-[var(--light-gray)] bg-white p-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-base font-medium leading-normal text-[var(--dark-gray)]">
              Saldo Actual
            </p>
            <p className="text-4xl font-bold leading-tight">
              {balance.toFixed(2)} €
            </p>
          </div>
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
              <p className="font-semibold text-[var(--expense-text)]">Gastos</p>
              <p className="text-[var(--dark-gray)]">
                {totalExpenses.toFixed(2)} €
              </p>
            </div>
            <div>
              <p className="font-semibold text-[var(--benefit-text)]">
                Beneficios
              </p>
              <p className="text-[var(--dark-gray)]">{balance.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transacciones */}
      <div className="flex  flex-col gap-4 p-4">
        <h2 className="text-lg font-bold">Transacciones Recientes</h2>
        <div className="flex flex-col gap-3">
          {Object.keys(transactions).length === 0 ? (
            <p>No hay transacciones para esta cuenta.</p>
          ) : (
            Object.keys(transactions).map((date) => (
              <div key={date}>
                <h3 className="text-sm font-semibold text-[var(--dark-gray)] mb-3">
                  {date}
                </h3>
                {transactions[date].map((t) => (
                  <TransactionItem
                    key={t.id}
                    transaction={t}
                    tags={tags}
                    account={account}
                    mode="account"
                    accountId={account.id}
                    onDelete={async (id) => {
                      try {
                        const res = await fetch("/api/transactions", {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id }),
                        });
                        const json = await res.json();
                        if (!json.error) {
                          setTransactions((prev) => {
                            const newGroup = { ...prev };
                            newGroup[date] = newGroup[date].filter(
                              (tr) => tr.id !== id
                            );
                            return newGroup;
                          });
                        }
                      } catch (err) {
                        console.error("Error borrando transacción:", err);
                      }
                    }}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
