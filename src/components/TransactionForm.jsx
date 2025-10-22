import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Euro,
  X,
  Plus,
  Tag,
  Star,
  Wallet,
  ChevronsUpDown,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

import { useUser } from "../context/UserContext";

const TransactionForm = ({ type, accounts, closeForm, addTransaction }) => {
  const { user } = useUser();

  const [transactionType, setTransactionType] = useState(type);
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(null);

  const [formData, setFormData] = useState({
    titulo: "",
    cantidad: "",
    fecha: new Date().toISOString().split("T")[0],
    etiquetaId: "",
    cuentaId: "",
    cuentaDestinoId: "",
  });

  useEffect(() => {
    const allowedTypes = ["income", "expense", "transfer"];
    setTransactionType(allowedTypes.includes(type) ? type : "income");

    setFormData({
      titulo: "",
      cantidad: "",
      fecha: new Date().toISOString().split("T")[0],
      etiquetaId: "",
      cuentaId: "",
      cuentaDestinoId: "",
    });

    const fetchTags = async () => {
      const res = await fetch(`/api/tags?userId=${user.id}`);
      const json = await res.json();
      setTags(json.data || []);
    };
    fetchTags();
  }, [type, user]);

  const handleChange = (field, value) =>
    setFormData({ ...formData, [field]: value });

  const handleAddTag = async () => {
    const tagName = newTag.trim();
    if (!tagName) return;

    const res = await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: tagName, userId: user.id }),
    });
    const json = await res.json();
    if (json.error) return alert(json.error);

    setTags([...tags, json.data[0]]);
    setFormData({ ...formData, etiquetaId: json.data[0].id });
    setNewTag("");
    setShowNewTagInput(false);
  };

  const handleSubmit = async () => {
    const { titulo, cantidad, fecha, etiquetaId, cuentaId, cuentaDestinoId } =
      formData;

    // Validaciones básicas
    if (
      !titulo ||
      !cantidad ||
      !fecha ||
      !etiquetaId ||
      !cuentaId ||
      (transactionType === "transfer" && !cuentaDestinoId)
    ) {
      return alert("Por favor completa todos los campos");
    }

    if (transactionType === "transfer" && cuentaId === cuentaDestinoId) {
      return alert("La cuenta de origen y destino no pueden ser la misma");
    }

    const amount = parseFloat(cantidad);
    if (isNaN(amount) || amount <= 0) {
      return alert("Introduce una cantidad válida");
    }

    try {
      let res, json;

      if (transactionType === "transfer") {
        // Crear dos transacciones: gasto en origen e ingreso en destino
        const originTx = {
          description: titulo,
          amount,
          date: fecha,
          type: "expense",
          account_id: cuentaId,
          target_account_id: cuentaDestinoId,
          tag_id: etiquetaId,
          user_id: user.id,
        };
        const destTx = {
          description: titulo,
          amount,
          date: fecha,
          type: "income",
          account_id: cuentaDestinoId,
          target_account_id: cuentaId,
          tag_id: etiquetaId,
          user_id: user.id,
        };

        res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([originTx, destTx]), // enviamos un array
        });

        json = await res.json();
        if (json.error) return alert(json.error);

        addTransaction(json.data); // añadimos ambas transacciones
      } else {
        // Ingreso o gasto normal
        res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: titulo,
            amount,
            date: fecha,
            type: transactionType, // "income" o "expense"
            account_id: cuentaId,
            target_account_id: null,
            tag_id: etiquetaId,
            user_id: user.id,
          }),
        });

        json = await res.json();
        if (json.error) return alert(json.error);

        addTransaction(json.data[0]);
      }

      // Cerrar formulario y resetear campos
      setFormData({
        titulo: "",
        cantidad: "",
        fecha: new Date().toISOString().split("T")[0],
        etiquetaId: "",
        cuentaId: "",
        cuentaDestinoId: "",
      });
      closeForm();
    } catch (err) {
      console.error(err);
      alert("Error al guardar la transacción");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`m-5 rounded-xl bg-[var(--bg-light)] shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors duration-300
   `}
      >
        <div className="flex items-center p-4 pb-2 justify-between">
          <div className="text-[#0e1a13] dark:text-white flex size-12 shrink-0 items-center"></div>
          <div className="flex items-center p-4 pb-2 justify-center relative">
            <h1 className="text-[#0e1a13] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
              {transactionType === "income"
                ? "Nuevo Ingreso"
                : transactionType === "expense"
                ? "Nuevo Gasto"
                : "Transferencia"}
            </h1>
          </div>
          <button
            onClick={closeForm}
            className="hover:bg-white/20 rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario */}
        <div className="space-y-4">
          {/* Título */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[#0e1a13] dark:text-gray-300 text-sm font-medium"
              htmlFor="titulo"
            >
              Título
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              placeholder="Ej: Compra supermercado"
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg  focus:outline-0 focus:ring-0 border-none  h-12  p-3 text-base font-normal leading-normal ${
                transactionType === "income"
                  ? "text-[#0e1a13] dark:text-white bg-[#e8f2ec] dark:bg-[#2a3f33] placeholder:text-[var(--green-accent)]"
                  : transactionType === "expense"
                  ? "text-[#1a0e0e] dark:text-white bg-[var(--red-light-bg)] dark:bg-[var(--red-dark-bg)] placeholder:text-[var(--red-accent)]"
                  : "text-[var(--blue-primary)] bg-[var(--blue-light-bg)]  placeholder:text-[var(--blue-accent)]" // PENDIENTE
              }`}
            />
          </div>

          {/* Cantidad */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[#0e1a13] dark:text-gray-300 text-sm font-medium"
              htmlFor="cantidad"
            >
              Cantidad
            </label>
            <div className="relative">
              <Euro
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5   text-lg font-medium
                ${
                  transactionType === "income"
                    ? "text-[var(--green-accent)] "
                    : transactionType === "expense"
                    ? "text-[var(--red-accent)]"
                    : "text-[var(--blue-accent)]"
                }
                `}
              />
              <input
                type="number"
                step="0.01"
                value={formData.cantidad}
                onChange={(e) => handleChange("cantidad", e.target.value)}
                placeholder="0.00"
                className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg   focus:outline-0 focus:ring-0 border-none  h-12  p-3 pl-7 text-xl font-bold leading-normal ${
                  transactionType === "income"
                    ? "text-primary dark:text-[var(--primary)] bg-[#e8f2ec] dark:bg-[#2a3f33] placeholder:text-[var(--green-accent)] "
                    : transactionType === "expense"
                    ? "text-[var(--primary-expense)] dark:text-[var(--primary-expense)] bg-[var(--red-light-bg)] dark:bg-[var(--red-dark-bg)] placeholder:text-[var(--red-accent)]"
                    : "text-[var(--blue-primary)] bg-[var(--blue-light-bg)]  placeholder:text-[var(--blue-accent)]" // PENDIENTE
                }`}
              />
            </div>
          </div>

          {/* Fecha */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[#0e1a13] dark:text-gray-300 text-sm font-medium"
              htmlFor="fecha"
            >
              Fecha
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => handleChange("fecha", e.target.value)}
                className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border-none  h-12  text-base font-normal leading-normal
                  ${
                    transactionType === "income"
                      ? "text-[#0e1a13] dark:text-white placeholder:text-[var(--green-accent)] bg-[#e8f2ec] dark:bg-[#2a3f33]"
                      : transactionType === "expense"
                      ? "text-[#1a0e0e] bg-[var(--red-light-bg)] placeholder:text-[var(--red-accent)]"
                      : "text-[#1a0e0e] bg-[var(--blue-light-bg)]"
                  }
                    `}
              />
              <Calendar
                className={`absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5  ${
                  transactionType === "income"
                    ? " text-[var(--green-accent)]"
                    : transactionType === "expense"
                    ? "text-[var(--red-accent)]"
                    : "text-[var(--blue-accent)]"
                }`}
              />
            </div>
          </div>
          {/* ---------------------------------------------------------------- */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0e1a13] dark:text-gray-300 text-sm font-medium">
              Etiqueta
            </label>
            {!showNewTagInput ? (
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <select
                    value={formData.etiquetaId}
                    onChange={(e) => handleChange("etiquetaId", e.target.value)}
                    className={`appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg  focus:outline-0 focus:ring-0 border-none  h-12 p-3 text-base font-normal leading-normal ${
                      transactionType === "income"
                        ? " text-[#0e1a13] dark:text-white placeholder:text-[var(--green-accent)] bg-[#e8f2ec] dark:bg-[#2a3f33]"
                        : transactionType === "expense"
                        ? "bg-[var(--red-light-bg)] text-[#1a0e0e]"
                        : "text-[var(--blue-primary)] bg-[var(--blue-light-bg)]  placeholder:text-[var(--blue-accent)]"
                    }`}
                  >
                    <option value="">Selecciona una etiqueta</option>
                    {tags.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <ChevronsUpDown
                    className={`absolute inset-y-3 right-3 flex items-center text-[#51946c] pointer-events-none w-6 h-6  ${
                      transactionType === "income"
                        ? " text-[var(--green-accent)]"
                        : transactionType === "expense"
                        ? "text-[var(--red-accent)]"
                        : "text-[var(--blue-accent)]"
                    }`}
                  />
                </div>
                <button
                  onClick={() => setShowNewTagInput(true)}
                  className={`flex-shrink-0 flex items-center justify-center rounded-lg h-12 w-12
                    ${
                      transactionType === "income"
                        ? " bg-[var(--primary)]"
                        : transactionType === "expense"
                        ? "bg-[var(--primary-expense)] text-[#1a0e0e]"
                        : "bg-[var(--blue-primary)] text-[#1a0e0e]"
                    }
                    `}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2 w-full items-center">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Nombre de la nueva etiqueta"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-[#aec0d6]/30 focus:border-[#475482]"
                />{" "}
                <button
                  onClick={handleAddTag}
                  className={`h-12 w-16 rounded-xl font-bold items-center justify-center ${
                    transactionType === "income"
                      ? "bg-[var(--primary)] text-[#0e1a13]"
                      : transactionType === "expense"
                      ? "bg-[var(--primary-expense)] text-[#1a0e0e]"
                      : "bg-[var(--blue-primary)] text-[#1a0e0e]"
                  }`}
                >
                  <Plus className="mx-auto w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowNewTagInput(false)}
                  className={`h-12 w-16 rounded-xl font-bold items-center justify-center ${
                    transactionType === "income"
                      ? "bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white"
                      : transactionType === "expense"
                      ? "bg-[var(--red-light-bg)] text-[#1a0e0e]"
                      : "bg-[var(--blue-light-bg)] text-[#1a0e0e]"
                  }`}
                >
                  <X className="mx-auto w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Cuentas */}
          <div className="flex flex-col gap-4">
            {transactionType === "transfer" ? (
              // Transfer: cuenta origen y destino en fila
              <div className="flex items-center gap-4">
                {/* Cuenta de Origen */}
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#0e1a13] dark:text-gray-300 text-sm font-medium">
                    Cuenta de Origen
                  </label>
                  <select
                    value={formData.cuentaId}
                    onChange={(e) => handleChange("cuentaId", e.target.value)}
                    className="appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1a0e0e] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[var(--blue-light-bg)] dark:bg-blue-dark-bg h-12 p-3 text-base font-normal leading-normal"
                  >
                    <option value="">Seleccionar</option>
                    {accounts.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Flecha */}
                <div className="flex items-center justify-center text-[var(--blue-accent)]">
                  <LucideIcons.ArrowRight />
                </div>

                {/* Cuenta de Destino */}
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#0e1a13] dark:text-gray-300 text-sm font-medium">
                    Cuenta de Destino
                  </label>
                  <select
                    value={formData.cuentaDestinoId}
                    onChange={(e) =>
                      handleChange("cuentaDestinoId", e.target.value)
                    }
                    className="appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1a0e0e] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[var(--blue-light-bg)] dark:bg-blue-dark-bg h-12 p-3 text-base font-normal leading-normal"
                  >
                    <option value="">Selecciona cuenta de destino</option>
                    {accounts
                      .filter((c) => c.id !== formData.cuentaId)
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ) : (
              // Income o expense: solo cuenta
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[#0e1a13] dark:text-gray-300 text-sm font-medium">
                  {transactionType === "income" ? "Cuenta" : "Cuenta"}
                </label>
                <select
                  value={formData.cuentaId}
                  onChange={(e) => handleChange("cuentaId", e.target.value)}
                  className={`appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border-none h-12 p-3 text-base font-normal
          ${
            transactionType === "income"
              ? "text-[#0e1a13] dark:text-white bg-[#e8f2ec] dark:bg-[#2a3f33]"
              : "text-[#1a0e0e] bg-[var(--red-light-bg)]"
          }`}
                >
                  <option value="">Selecciona una cuenta</option>
                  {accounts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* --------------------------------------------------------------- */}
          {/* Botones */}
          <div className="flex justify-stretch p-4">
            <div className="flex flex-1 gap-3 flex-wrap justify-between">
              <button
                onClick={closeForm}
                className={`flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5  text-base font-bold leading-normal tracking-[0.015em] ${
                  transactionType === "income"
                    ? "bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white"
                    : transactionType === "expense"
                    ? "bg-[var(--red-light-bg)] text-[#1a0e0e]"
                    : "bg-[var(--blue-light-bg)] text-[#1a0e0e]"
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className={`flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5  text-base font-bold leading-normal tracking-[0.015em] ${
                  transactionType === "income"
                    ? "bg-[var(--primary)] text-[#0e1a13]"
                    : transactionType === "expense"
                    ? "bg-[var(--primary-expense)] text-[#1a0e0e]"
                    : "bg-[var(--blue-primary)] text-[#1a0e0e]"
                }`}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
