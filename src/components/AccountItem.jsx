import React from "react";
import useSwipe from "../hooks/useSwipe.js";
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
} from "lucide-react";

export default function AccountItem({ account, transactions, onDelete }) {
  const { swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipe();

  // Filtrar transacciones de esta cuenta
  const accountTransactions = transactions.filter(
    (tx) => tx.account_id === account.id
  );

  // Calcular ingresos y gastos
  const income = accountTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expenses = accountTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Balance = saldo inicial + ingresos - gastos
  const balance = (account.saldo || 0) + income - expenses;

  // Mapa de iconos
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

  const handleDelete = async () => {
    if (!confirm(`¿Seguro que quieres borrar la cuenta "${account.name}"?`))
      return;

    try {
      const res = await fetch("/api/accounts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: account.id }),
      });
      const json = await res.json();
      if (!json.error) onDelete(account.id);
      else alert("Error borrando la cuenta: " + json.error);
    } catch (err) {
      console.error(err);
      alert("Error borrando la cuenta");
    }
  };

  return (
    <div className="relative flex flex-col gap-3 mb-4">
      {/* Botón borrar */}
      <div className="absolute top-0 right-0 h-full px-4 flex items-center justify-center bg-red-600 text-white font-bold rounded-2xl">
        <button onClick={handleDelete}>Borrar</button>
      </div>

      {/* Tarjeta de cuenta deslizable */}
      <div
        className="flex flex-col gap-4 bg-white rounded-xl p-4 border border-[var(--light-gray)]"
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition:
            swipeOffset === 0 || swipeOffset === -100
              ? "transform 0.2s ease"
              : "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center gap-4">
          {/* Icono dinámico */}
          <div
            className="flex items-center justify-center rounded-lg shrink-0 w-12 h-12 bg-red-100"
            style={{ backgroundColor: `${account.color}30` }}
          >
            {iconsMap[account.icon_name] || (
              <Wallet
                className="text-red-600 w-6 h-6"
                style={{ color: account.color }}
              />
            )}
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <a
              href={`/accounts/${account.id}`}
              className="text-[var(--text-light)] text-[var(--base)] font-medium"
            >
              {account.name}
            </a>
            <span className="text-[var(--dark-gray)] text-2xl font-bold">
              {account.saldo} €
            </span>
          </div>
        </div>

        <div className="w-full bg-light-gray rounded-full h-3 flex overflow-hidden">
          {[income, expenses, Math.max(income - expenses, 0)].map(
            (val, idx) => {
              const total = income + expenses;
              const width = total > 0 ? (val / total) * 100 : 0;
              const bgColors = [
                "bg-[var(--income-dark)]",
                "bg-[var(--expense-dark)]",
                "bg-[var(--benefit-dark)]",
              ];
              return (
                <div
                  key={idx}
                  className={bgColors[idx]}
                  style={{
                    width: `${width}%`,
                    transition: "width 0.3s ease",
                    borderRadius:
                      idx === 0
                        ? "9999px 0 0 9999px"
                        : idx === 2
                        ? "0 9999px 9999px 0"
                        : "0",
                  }}
                ></div>
              );
            }
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-semibold text-[var(--income-text)]">Ingresos</p>
            <p className="text-[var(--dark-gray)]">{income.toFixed(2)} €</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--expense-text)]">Gastos</p>
            <p className="text-[var(--dark-gray)]">{expenses.toFixed(2)} €</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--benefit-text)]">
              Beneficios
            </p>
            <p className="text-[var(--dark-gray)]">
              {(income - expenses).toFixed(2)} €
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
