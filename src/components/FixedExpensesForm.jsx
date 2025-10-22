import { useState, useEffect } from "react";
import {
  X,
  Euro,
  Calendar,
  Plus,
  Tag,
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
  Folder,
  Sofa,
  Apple,
  TrainFront,
  IdCard,
  ChevronsDownIcon,
  ChevronsUpDown,
} from "lucide-react";
import { Flag, Star } from "lucide-react";

export default function FixedExpensesForm({
  accounts,
  fixedExpenses,
  setFixedExpenses,
  closeForm,
  fixedTag,
  setFixedTag,
  user,
}) {
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedAccount, setSelectedAccount] = useState(accounts?.[0] || null);
  const [iconName, setIconName] = useState("Tag");

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
    if (accounts?.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts, selectedAccount]);

  const handleAddExpense = async () => {
    if (
      !newName ||
      !newAmount ||
      !newDate ||
      !selectedAccount?.id ||
      !user?.id
    ) {
      alert("Rellena todos los campos obligatorios");
      return;
    }

    // Asegurar que la etiqueta "Gastos fijos" existe
    let tagId = fixedTag?.id;
    if (!tagId) {
      const createRes = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Gastos fijos", userId: user.id }),
      });
      const createJson = await createRes.json();
      tagId = createJson.data[0]?.id;
      if (!tagId) {
        alert("No se pudo crear la etiqueta 'Gastos fijos'");
        return;
      }
      setFixedTag(createJson.data[0]);
    }

    // Crear el gasto fijo con icono
    try {
      const res = await fetch("/api/fixed-expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          amount: parseFloat(newAmount),
          date: newDate,
          account_id: selectedAccount.id,
          user_id: user.id,
          tag_id: tagId,
          iconName,
          paid: false,
        }),
      });
      const json = await res.json();
      if (json.error) return alert("Error: " + json.error);

      setFixedExpenses((prev) => [...prev, json.data[0]]);
      setNewName("");
      setNewAmount("");
      setNewDate(new Date().toISOString().split("T")[0]);
      setSelectedAccount(accounts[0]);
      setIconName("Tag");
      closeForm();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el gasto fijo");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="m-5 bg-white round shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div className="text-[#0e1a13] dark:text-white flex size-12 shrink-0 items-center"></div>
          <h2 className="text-[#0e1a13] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Añadir gasto fijo
          </h2>
          <button
            onClick={closeForm}
            className="hover:bg-white/20 rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className=" space-y-6">
          {/* Nombre y Cantidad */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Nombre
              </p>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ej. Spotify, Netflix"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal"
              />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Cantidad
              </p>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#51946c]" />
                <input
                  type="number"
                  step="0.01"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder=" 0.00"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] p-4 pl-8 text-base font-normal leading-normal"
                />
              </div>
            </label>
          </div>
          {/* Fecha */}
          <div>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Fecha de Vencimiento
              </p>
              <div className="relative">
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] text-base font-normal leading-normal"
                />
                <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5  text-[#51946c]" />
              </div>
            </label>
          </div>
          {/* Cuenta */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Cuenta
              </p>
              <div className="relative">
                <select
                  value={selectedAccount?.id || ""}
                  onChange={(e) =>
                    setSelectedAccount(
                      accounts.find((a) => a.id === e.target.value)
                    )
                  }
                  className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 p-4 text-base font-normal leading-normal"
                >
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
                <ChevronsUpDown className="absolute inset-y-4 right-4 flex items-center text-[#51946c] pointer-events-none w-6 h-6" />
              </div>
            </label>
          </div>
          {/* Iconos */}
          <div>
            <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Icono
            </p>
            <div className="grid grid-cols-6 gap-3">
              {icons.map((i) => (
                <button
                  key={i.name}
                  type="button"
                  onClick={() => setIconName(i.name)}
                  className={`flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer ${
                    iconName === i.name
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
          <div className="flex justify-stretch p-4 mt-8">
            <div className="flex flex-1 gap-3 flex-wrap justify-between">
              <button
                onClick={closeForm}
                className="flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[#e8f2ec] dark:bg-gray-700 text-[#0e1a13] dark:text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddExpense}
                className="flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[var(--primary)] text-[#0e1a13] text-base font-bold leading-normal tracking-[0.015em]"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
