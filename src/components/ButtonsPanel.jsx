import { useState } from "react";
import { Plus, Minus, ArrowLeftRight } from "lucide-react";

export default function ButtonsPanel({
  setShowTransactionForm,
  setTransactionType,
}) {
  const handleAddIncome = () => {
    setTransactionType("income");
    setShowTransactionForm(true);
  };

  const handleAddExpense = () => {
    setTransactionType("expense");
    setShowTransactionForm(true);
  };

  const handleTransfer = () => {
    setTransactionType("transfer");
    setShowTransactionForm(true);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <button
          className="flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold tracking-[0.015em] flex-1 bg-[var(--income-light)] text-[var(--income-text)] border border-[var(--income-dark)]"
          onClick={handleAddIncome}
        >
          {" "}
          <Plus className="w-6 h-6" />
          <span className="font-bold text-sm">Ingreso</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold tracking-[0.015em] flex-1 bg-[var(--expense-light)] text-[var(--expense-text)] border border-[var(--expense-dark)]"
          onClick={handleAddExpense}
        >
          {" "}
          <Minus className="w-6 h-6" />
          <span className="font-bold text-sm">Gasto</span>
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold tracking-[0.015em] w-full bg-[var(--light-gray)] text-[var(--dark-gray)] border border-[var(--medium-gray)]"
          onClick={handleTransfer}
        >
          <ArrowLeftRight className="w-6 h-6" />
          <span className="font-semibold text-sm">Transferir</span>
        </button>
      </div>
    </div>
  );
}
