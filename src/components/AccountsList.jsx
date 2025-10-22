import { useState } from "react";
import { useUser } from "../context/UserContext";
import {
  X,
  Plus,
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
} from "lucide-react";
import AccountItem from "./AccountItem.jsx";

export default function AccountsList({ accounts, setAccounts, transactions }) {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [saldo, setSaldo] = useState("");
  const [color, setColor] = useState("#B77466");
  const [iconName, setIconName] = useState("Wallet");

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

  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!name) return alert("Rellena el nombre de la cuenta");

    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          color,
          saldo: parseFloat(saldo) || 0,
          iconName,
          userId: user.id,
        }),
      });

      const json = await res.json();
      if (!json.error) {
        setAccounts([...accounts, json.data[0]]);
        setName("");
        setSaldo("");
        setColor("#B77466");
        setIconName("Wallet");
        setShowForm(false);
      } else alert("Error: " + json.error);
    } catch (err) {
      console.error(err);
      alert("Error creando la cuenta");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-text-light text-[22px] font-bold">Cuentas</h2>
        {!showForm && (
          <button
            className="flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold tracking-[0.015em] bg-[var(--light-gray)] text-[var(--dark-gray)] text-sm"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-5 h-5" />
            Añadir
          </button>
        )}
      </div>

      <div>
        {accounts.map((account) => {
          const accountTx = transactions.filter(
            (tx) => tx.account_id === account.id
          );
          return (
            <AccountItem
              key={account.id}
              account={account}
              transactions={accountTx}
            />
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="m-5 bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center p-4 pb-2 justify-between">
              <div className="text-[#0e1a13] dark:text-white flex size-12 shrink-0 items-center"></div>
              <h2 className="text-[#0e1a13] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                Crear cuenta
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAccount}>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                    Nombre de la Cuenta
                  </p>
                  <input
                    type="text"
                    placeholder="Ahorros, Cartera..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal"
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                    Saldo Inicial (opcional)
                  </p>
                  <input
                    type="number"
                    step="0.01"
                    value={saldo}
                    onChange={(e) => setSaldo(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal"
                    placeholder="0.00 €"
                  />
                </label>
              </div>

              <div className="py-3">
                <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                  Color
                </p>
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
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        color === c ? "border-black" : "border-gray-300"
                      }`}
                    />
                  ))}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded-full border-2 border-[#aec0d6]/30 focus:border-[#475482] cursor-pointer"
                  />
                </div>
              </div>

              {/* Selector de color personalizado */}

              <div className="">
                <label className="block text-sm font-semibold text-[#111827] mb-2">
                  Icono
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {icons.map((i) => (
                    <button
                      key={i.name}
                      type="button"
                      onClick={() => setIconName(i.name)}
                      className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white ${
                        iconName === i.name
                          ? "ring-2 ring-[var(--primary)]"
                          : "border-gray-300"
                      }`}
                    >
                      {i.component}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-stretch p-4">
                <div className="flex flex-1 gap-3 flex-wrap justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[#e8f2ec] dark:bg-gray-700 text-[#0e1a13] dark:text-white text-base font-bold leading-normal tracking-[0.015em]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[var(--primary)] text-[#0e1a13] text-base font-bold leading-normal tracking-[0.015em]"
                  >
                    Crear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
