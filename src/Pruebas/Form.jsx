import React, { useState } from "react";

const NewTransfer = () => {
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("Principal");
  const [toAccount, setToAccount] = useState("Ahorros");
  const [date, setDate] = useState("Hoy");
  const [description, setDescription] = useState("");

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-background-light dark:bg-[#2c1a1a] rounded-xl flex flex-col shadow-lg">
          {/* Header */}
          <div className="flex items-center p-4 pb-2 justify-center relative">
            <h1 className="text-[#1a0e0e] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
              Nueva Transferencia
            </h1>
          </div>

          {/* Form */}
          <div className="flex-grow p-4 space-y-4">
            {/* Cantidad */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[#1a0e0e] dark:text-gray-300 text-sm font-medium"
                htmlFor="cantidad"
              >
                Cantidad
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-accent text-lg font-medium">
                  $
                </span>
                <input
                  id="cantidad"
                  type="number"
                  placeholder="0.00"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-blue-primary dark:text-blue-primary focus:outline-0 focus:ring-0 border-none bg-blue-light-bg dark:bg-blue-dark-bg h-12 placeholder:text-blue-accent p-3 pl-7 text-xl font-bold leading-normal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            {/* Cuentas Origen y Destino */}
            <div className="flex items-center gap-4">
              {/* Origen */}
              <div className="flex-1 flex flex-col gap-2">
                <label
                  className="text-[#1a0e0e] dark:text-gray-300 text-sm font-medium"
                  htmlFor="cuenta-origen"
                >
                  Cuenta Origen
                </label>
                <div className="relative">
                  <select
                    id="cuenta-origen"
                    className="appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1a0e0e] dark:text-white focus:outline-0 focus:ring-0 border-none bg-blue-light-bg dark:bg-blue-dark-bg h-12 p-3 text-base font-normal leading-normal"
                    value={fromAccount}
                    onChange={(e) => setFromAccount(e.target.value)}
                  >
                    <option>Principal</option>
                    <option>Ahorros</option>
                    <option
                      className="font-bold text-blue-accent"
                      value="nueva"
                    >
                      Añadir Nueva Cuenta
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute inset-y-0 right-0 flex items-center pr-3 text-blue-accent pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Flecha */}
              <div className="self-end pb-3">
                <span className="material-symbols-outlined text-blue-accent">
                  arrow_forward
                </span>
              </div>

              {/* Destino */}
              <div className="flex-1 flex flex-col gap-2">
                <label
                  className="text-[#1a0e0e] dark:text-gray-300 text-sm font-medium"
                  htmlFor="cuenta-destino"
                >
                  Cuenta Destino
                </label>
                <div className="relative">
                  <select
                    id="cuenta-destino"
                    className="appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1a0e0e] dark:text-white focus:outline-0 focus:ring-0 border-none bg-blue-light-bg dark:bg-blue-dark-bg h-12 p-3 text-base font-normal leading-normal"
                    value={toAccount}
                    onChange={(e) => setToAccount(e.target.value)}
                  >
                    <option>Ahorros</option>
                    <option>Principal</option>
                    <option
                      className="font-bold text-blue-accent"
                      value="nueva"
                    >
                      Añadir Nueva Cuenta
                    </option>
                  </select>
                  <span className="material-symbols-outlined absolute inset-y-0 right-0 flex items-center pr-3 text-blue-accent pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Fecha */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[#1a0e0e] dark:text-gray-300 text-sm font-medium"
                htmlFor="fecha"
              >
                Fecha
              </label>
              <div className="relative">
                <input
                  id="fecha"
                  type="text"
                  value={date}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1a0e0e] dark:text-white focus:outline-0 focus:ring-0 border-none bg-blue-light-bg dark:bg-blue-dark-bg h-12 placeholder:text-blue-accent p-3 text-base font-normal leading-normal"
                  onChange={(e) => setDate(e.target.value)}
                />
                <span className="material-symbols-outlined absolute inset-y-0 right-0 flex items-center pr-3 text-blue-accent pointer-events-none">
                  calendar_today
                </span>
              </div>
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[#1a0e0e] dark:text-gray-300 text-sm font-medium"
                htmlFor="descripcion"
              >
                Descripción (Opcional)
              </label>
              <input
                id="descripcion"
                type="text"
                placeholder="Ej. Ahorro mensual"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1a0e0e] dark:text-white focus:outline-0 focus:ring-0 border-none bg-blue-light-bg dark:bg-blue-dark-bg h-12 placeholder:text-blue-accent p-3 text-base font-normal leading-normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-stretch p-4">
            <div className="flex flex-1 gap-3 flex-wrap justify-between">
              <button className="flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-blue-light-bg dark:bg-blue-dark-bg text-[#1a0e0e] dark:text-white text-base font-bold leading-normal tracking-[0.015em]">
                Cancelar
              </button>
              <button className="flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-blue-primary text-[#1a0e0e] text-base font-bold leading-normal tracking-[0.015em]">
                Guardar Transferencia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTransfer;
