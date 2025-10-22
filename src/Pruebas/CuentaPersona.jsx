import React from "react";
import "./App.css"; // Si quieres incluir Tailwind y tu configuración

const transactions = [
  {
    title: "Salario",
    category: "Ingresos",
    amount: 5000.0,
    type: "income",
    icon: "arrow_downward",
  },
  {
    title: "Compra Supermercado",
    category: "Alimentación",
    amount: 150.5,
    type: "expense",
    icon: "arrow_upward",
  },
  {
    title: "Factura de Internet",
    category: "Servicios",
    amount: 60.0,
    type: "expense",
    icon: "arrow_upward",
  },
  {
    title: "Cena con amigos",
    category: "Ocio",
    amount: 85.7,
    type: "expense",
    icon: "arrow_upward",
  },
  {
    title: "Transporte Público",
    category: "Transporte",
    amount: 25.0,
    type: "expense",
    icon: "arrow_upward",
  },
];

const AccountDetail = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-text-light font-display">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background-light px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center p-2 text-dark-gray">
            <span className="material-symbols-outlined text-2xl">
              arrow_back_ios_new
            </span>
          </button>
          <h1 className="text-[28px] font-bold leading-tight tracking-[-0.015em]">
            Banco Principal
          </h1>
        </div>
      </div>

      {/* Balance */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-4 rounded-xl border border-light-gray bg-white p-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-base font-medium leading-normal text-dark-gray">
              Saldo Actual
            </p>
            <p className="text-4xl font-bold leading-tight">$12,350.00</p>
          </div>
          <div className="mt-2 grid grid-cols-3 text-center text-sm">
            <div>
              <p className="font-semibold text-income-text">Ingresos</p>
              <p className="text-dark-gray">$5,000.00</p>
            </div>
            <div>
              <p className="font-semibold text-expense-text">Gastos</p>
              <p className="text-dark-gray">$1,200.00</p>
            </div>
            <div>
              <p className="font-semibold text-benefit-text">Beneficio</p>
              <p className="text-dark-gray">$3,800.00</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Transacciones Recientes</h2>
          <div className="flex flex-col gap-3">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      tx.type === "income"
                        ? "bg-income-light text-income-text"
                        : "bg-expense-light text-expense-text"
                    }`}
                  >
                    <span className="material-symbols-outlined">{tx.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{tx.title}</p>
                    <p className="text-sm text-dark-gray">{tx.category}</p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    tx.type === "income"
                      ? "text-income-text"
                      : "text-expense-text"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
