// src/components/TagsList.jsx
import { useState } from "react";
import { useUser } from "../context/UserContext";
import {
  X,
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
  Star,
  Folder,
  Sofa,
  Apple,
  TrainFront,
  IdCard,
} from "lucide-react";
import useSwipe from "../hooks/useSwipe.js";

export default function TagsList({ tags, setTags, transactions }) {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#00FF00");
  const [goal, setGoal] = useState("");
  const [iconName, setIconName] = useState("Tag");

  // Array de iconos con nombre y componente
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
  // Mapa de iconos con estilos dinámicos según tag.color
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

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!name) return alert("Rellena el nombre de la etiqueta");
    try {
      const res = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          color,
          objetivo: parseFloat(goal) || 0,
          userId: user.id,
          iconName,
        }),
      });
      const json = await res.json();
      if (json.error) alert("Error: " + json.error);
      else {
        setTags([...tags, json.data[0]]);
        setName("");
        setColor("#00FF00");
        setGoal("");
        setIconName("Tag");
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error creando la etiqueta");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta etiqueta?")) return;
    try {
      const res = await fetch("/api/tags", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!json.error) setTags((prev) => prev.filter((t) => t.id !== id));
      else alert("Error al borrar: " + json.error);
    } catch (err) {
      console.error(err);
      alert("Error borrando etiqueta");
    }
  };

  const TagItem = ({ tag }) => {
    const iconsMap = {
      PiggyBank: <PiggyBank className="w-6 h-6" style={{ color: tag.color }} />,
      Wallet: <Wallet className="w-6 h-6" style={{ color: tag.color }} />,
      ShoppingCart: (
        <ShoppingCart className="w-6 h-6" style={{ color: tag.color }} />
      ),
      CreditCard: (
        <CreditCard className="w-6 h-6" style={{ color: tag.color }} />
      ),
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
      Apple: <Apple className="w-6 h-6" />,
      TrainFront: (
        <TrainFront className="w-6 h-6" style={{ color: tag.color }} />
      ),
      IdCard: <IdCard className="w-6 h-6" style={{ color: tag.color }} />,
    };

    const { swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } =
      useSwipe(-100, -50);

    const tagTx =
      transactions?.filter(
        (tx) => tx?.tag_id && tx.tag_id.toString() === tag.id.toString()
      ) || [];

    const income = tagTx
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const expense = tagTx
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const progress = tag.objetivo
      ? Math.min((expense / tag.objetivo) * 100, 100)
      : 0;

    return (
      <div className="relative rounded-2xl">
        {/* Botón borrar */}
        <div className="absolute top-0 right-0 h-full px-4 flex items-center justify-center bg-red-600 text-white font-bold rounded-2xl z-0">
          <button onClick={() => handleDelete(tag.id)}>Borrar</button>
        </div>

        {/* Tarjeta deslizable */}
        <div
          className="flex flex-col gap-2 bg-white rounded-xl p-4 border border-[var(--light-gray)]"
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
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center rounded-lg shrink-0 size-12"
                  style={{ backgroundColor: `${tag.color}25` }}
                >
                  {/* Icono según selección */}
                  <div>{iconsMap[tag.icon_name] || <Tag />}</div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <a
                    href={`/tags/${tag.id}`}
                    className="text-[var(--text-light)] text-[var(--base)] font-medium"
                  >
                    {tag.name}
                  </a>
                  {tag.objetivo ? (
                    <p className="text-dark-gray text-sm font-normal leading-normal">
                      Objetivo: {tag.objetivo}
                    </p>
                  ) : (
                    <p className="text-dark-gray text-sm font-normal leading-normal">
                      Sin objetivos
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between text-sm mb-1">
              <span className="text-[var(--income-text)] font-semibold">
                Ingresos: {income.toFixed(2)} €
              </span>
              <span className="text-[var(--expense-text)] font-semibold">
                Gastos: {expense.toFixed(2)} €
              </span>
            </div>

            {tag.objetivo > 0 && (
              <div>
                <div className="w-full bg-[var(--light-gray)] rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundColor:
                        expense < tag.objetivo ? tag.color : "green",
                    }}
                  />
                </div>
                <div className="mt-2 text-sm font-medium text-end">
                  {expense < tag.objetivo ? (
                    <span className="text-gray-700">
                      Te faltan{" "}
                      <span className="text-bold text-[var(--income-text)]">
                        {(tag.objetivo - expense).toFixed(2)} €{" "}
                      </span>
                      para llegar al objetivo
                    </span>
                  ) : (
                    <span className="text-green-600 font-bold">
                      ¡Objetivo superado!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <div className="flex items-center justify-between pb-3 pt-5">
          <h2 className="text-[var(--text-light)] text-[22px] font-bold">
            Etiquetas
          </h2>
          <button
            className="flex items-center justify-center gap-2 round h-12 px-4 font-bold text-[var(--base)] min-w-[84px] max-w-[480px] h-10 rounded-full bg-[var(--light-gray)] text-[var(--dark-gray)] text-sm"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-6 h-6" /> Añadir
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {tags?.length > 0 ? (
            tags.map((tag) => <TagItem key={tag.id} tag={tag} />)
          ) : (
            <div>No hay etiquetas aún</div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="m-5 bg-white round shadow-xl p-6 w-full max-w-md">
              <div className="flex items-center p-4 pb-2 justify-between">
                <div className="text-[#0e1a13] dark:text-white flex size-12 shrink-0 items-center"></div>
                <h2 className="text-[#0e1a13] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                  Crear etiqueta
                </h2>
                <button onClick={() => setShowForm(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddTag} className="space-y-4">
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                      Nombre
                    </p>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Comida, Transporte..."
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] focus:border-none h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal"
                    />
                  </label>
                </div>
                <div>
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

                {/* Selector de iconos */}
                <div className="py-3">
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
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                      Objetivo (Opcional)
                    </p>
                    <input
                      type="number"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="€"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] focus:border-none h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal"
                    />
                  </label>
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
    </div>
  );
}
