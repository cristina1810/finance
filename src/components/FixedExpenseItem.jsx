import {
  Check,
  Tag,
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
import useSwipe from "../hooks/useSwipe";

export default function FixedExpenseItem({
  expense,
  onDelete,
  handleGenerateTransaction,
}) {
  const { swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipe();

  // Mapeo de iconos
  const iconsMap = {
    PiggyBank: <PiggyBank className="w-6 h-6" />,
    Wallet: <Wallet className="w-6 h-6" />,
    ShoppingCart: <ShoppingCart className="w-6 h-6" />,
    CreditCard: <CreditCard className="w-6 h-6" />,
    Baby: <Baby className="w-6 h-6" />,
    Smile: <Smile className="w-6 h-6" />,
    Tickets: <Tickets className="w-6 h-6" />,
    RefreshCw: <RefreshCw className="w-6 h-6" />,
    Notebook: <Notebook className="w-6 h-6" />,
    Wrench: <Wrench className="w-6 h-6" />,
    Heart: <Heart className="w-6 h-6" />,
    Star: <Star className="w-6 h-6" />,
    Folder: <Folder className="w-6 h-6" />,
    Sofa: <Sofa className="w-6 h-6" />,
    Apple: <Apple className="w-6 h-6" />,
    TrainFront: <TrainFront className="w-6 h-6" />,
    IdCard: <IdCard className="w-6 h-6" />,
  };
  return (
    <div className="relative rounded-2xl">
      {/* Botón borrar */}
      <div className="absolute top-0 right-0 h-full px-4 flex items-center justify-center bg-red-600 text-white font-bold rounded-2xl">
        <button onClick={() => onDelete(expense.id)}>Borrar</button>
      </div>

      {/* Tarjeta deslizable */}
      <div
        className="flex gap-4 bg-white rounded-xl p-4 justify-between items-center border border-[var(--light-gray)] mb-3"
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
        <div className="flex items-center gap-4 flex-1">
          {/* Icono dinámico */}
          <div className="text-[var(--expense-text)] flex items-center justify-center rounded-lg bg-[var(--expense-light)] shrink-0 size-12">
            {iconsMap[expense.iconName] || <Tag className="w-6 h-6" />}
          </div>

          {/* Información del gasto */}
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-[var(--text-light)] text-base font-medium">
              {expense.name}
            </p>
            <p className="text-[var(--dark-gray)] text-sm font-normal">
              {new Date(expense.date).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              })}
            </p>
          </div>

          {/* Cantidad */}
          <div className="flex items-center gap-2">
            <p className="text-[var(--expense-text)] text-base font-bold">
              {expense.amount}€
            </p>
          </div>
        </div>

        {/* Botón generar transacción */}
        <button
          onClick={() => handleGenerateTransaction(expense)}
          className="p-1 bg-gray-100 rounded-full"
        >
          <Check className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
