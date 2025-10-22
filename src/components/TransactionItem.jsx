// src/components/TransactionItem.jsx
import { ArrowDown, ArrowUp, Tag } from "lucide-react";
import useSwipe from "../hooks/useSwipe";

export default function TransactionItem({
  transaction,
  tags,
  account,
  onDelete,
  mode = "tag",
}) {
  const { swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipe();

  const sign = transaction.type === "income" ? "+" : "-";
  const tag = tags.find((tag) => tag.id === transaction.tag_id);

  const handleDelete = async () => {
    if (!window.confirm("¿Eliminar esta transacción?")) return;
    await onDelete(transaction.id);
  };

  return (
    <div className="relative rounded-2xl flex flex-col gap-3 mb-3">
      {/* Botón borrar */}
      <div className="absolute top-0 right-0 h-full px-4 flex items-center justify-center bg-red-600 text-white font-bold rounded-2xl">
        <button onClick={handleDelete}>Borrar</button>
      </div>

      {/* Tarjeta de transacción */}
      <div
        className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
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
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              transaction.type === "income"
                ? "bg-[var(--income-light)] text-[var(--income-text)]"
                : "bg-[var(--expense-light)] text-[var(--expense-text)]"
            }`}
          >
            {transaction.type === "income" ? <ArrowUp /> : <ArrowDown />}
          </div>
          <div>
            <div>
              <p className="font-semibold">{transaction.description}</p>
              {mode === "tag" && account && (
                <p className="text-sm text-[var(--dark-gray)]">
                  {account.name}
                </p>
              )}
              {mode === "account" && tag && (
                <p className="text-sm text-[var(--dark-gray)]">{tag.name}</p>
              )}
            </div>
          </div>
        </div>
        <div
          className={`font-semibold ${
            transaction.type === "income"
              ? "text-[var(--income-text)]"
              : "text-[var(--expense-text)]"
          }`}
        >
          {sign} {transaction.amount} €
        </div>
      </div>
    </div>
  );
}
