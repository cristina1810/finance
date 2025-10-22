import React from "react";

const Sidebar = () => {
  return (
    <div className="absolute inset-y-0 left-0 z-20 w-80 bg-background-drawer p-6 flex flex-col shadow-lg">
      <div className="flex flex-col items-center mb-8 space-y-4">
        <div className="w-24 h-24 rounded-full bg-pastel-pink flex items-center justify-center">
          <span className="material-symbols-outlined text-pink-400 text-5xl">
            person
          </span>
        </div>
        <p className="text-text-light text-xl font-bold">Olivia Rodriguez</p>
      </div>

      <nav className="flex-grow space-y-6">
        <div>
          <h3 className="text-dark-gray text-sm font-semibold uppercase tracking-wider mb-3 px-4">
            Cuentas
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                className="flex items-center py-3 px-4 rounded-lg text-text-light hover:bg-pastel-green transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-income-text mr-4">
                  account_balance_wallet
                </span>
                <span className="font-medium">Banco Principal</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center py-3 px-4 rounded-lg text-text-light hover:bg-pastel-green transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-income-text mr-4">
                  payments
                </span>
                <span className="font-medium">Efectivo</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center py-3 px-4 rounded-lg text-dark-gray/70 hover:bg-hover-light transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined mr-4">
                  visibility_off
                </span>
                <span className="font-medium">Ahorros (Oculta)</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-dark-gray text-sm font-semibold uppercase tracking-wider mb-3 px-4">
            Etiquetas
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                className="flex items-center py-3 px-4 rounded-lg text-text-light hover:bg-pastel-yellow transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-expense-text mr-4">
                  restaurant
                </span>
                <span className="font-medium">Comida</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center py-3 px-4 rounded-lg text-text-light hover:bg-pastel-yellow transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-expense-text mr-4">
                  directions_car
                </span>
                <span className="font-medium">Transporte</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center py-3 px-4 rounded-lg text-dark-gray/70 hover:bg-hover-light transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined mr-4">
                  visibility_off
                </span>
                <span className="font-medium">Regalos (Oculta)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-light-gray">
        <ul className="space-y-2">
          <li>
            <a
              className="flex items-center py-3 px-4 rounded-lg text-text-light hover:bg-pastel-blue transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-dark-gray mr-4">
                settings
              </span>
              <span className="font-medium">Configuración</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center py-3 px-4 rounded-lg text-text-light hover:bg-pastel-blue transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-dark-gray mr-4">
                logout
              </span>
              <span className="font-medium">Cerrar Sesión</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Header = () => (
  <div className="flex items-center bg-background-light p-4 pb-2 justify-between sticky top-0 z-0">
    <div className="text-dark-gray flex size-12 shrink-0 items-center">
      <span className="material-symbols-outlined text-3xl cursor-pointer">
        menu
      </span>
    </div>
    <h1 className="text-text-light text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
      Bienvenido, Usuario
    </h1>
    <div className="flex w-12 items-center justify-end">
      <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-dark-gray gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
        <span className="material-symbols-outlined text-3xl">
          notifications
        </span>
      </button>
    </div>
  </div>
);

const Actions = () => (
  <div className="flex flex-col gap-4 p-4">
    <div className="flex gap-4">
      <button className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-income-light text-income-text border border-income-dark text-base font-bold leading-normal tracking-[0.015em] gap-2">
        <span className="material-symbols-outlined">add_circle</span>
        <span className="truncate">Ingresos</span>
      </button>
      <button className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-expense-light text-expense-text border border-expense-dark text-base font-bold leading-normal tracking-[0.015em] gap-2">
        <span className="material-symbols-outlined">remove_circle</span>
        <span className="truncate">Gastos</span>
      </button>
    </div>
    <div className="flex justify-center">
      <button className="flex w-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-light-gray text-dark-gray border border-medium-gray text-base font-bold leading-normal tracking-[0.015em] gap-2">
        <span className="material-symbols-outlined">swap_horiz</span>
        <span className="truncate">Transferencia</span>
      </button>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
    <div className="fixed inset-0 bg-black/30 z-10 backdrop-blur-sm"></div>
    <Sidebar />
    <div className="flex-1 opacity-50 blur-sm pointer-events-none">
      <Header />
      <Actions />
      {/* Aquí se pueden agregar más secciones como Accounts, Tags, FixedExpenses */}
    </div>
  </div>
);

export default Dashboard;
