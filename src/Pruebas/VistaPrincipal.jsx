// App.jsx
import React, { useState } from "react";

const Button = ({ children, className }) => (
  <button
    className={`flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold text-base ${className}`}
  >
    {children}
  </button>
);

const AccountCard = ({
  icon,
  title,
  amount,
  income,
  expense,
  benefit,
  progress,
}) => (
  <div className="flex flex-col gap-4 bg-white rounded-xl p-4 border border-light-gray">
    <div className="flex items-center gap-4">
      <div
        className={`flex items-center justify-center rounded-lg shrink-0 size-12 ${progress.bgColor} ${progress.iconColor}`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <p className="text-text-light text-base font-medium">{title}</p>
        <p className="text-dark-gray text-2xl font-bold">{amount.toFixed(2)}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-full bg-light-gray rounded-full h-2 flex overflow-hidden">
        <div
          className="bg-income-dark h-2"
          style={{ width: `${progress.income}%` }}
        ></div>
        <div
          className="bg-expense-dark h-2"
          style={{ width: `${progress.expense}%` }}
        ></div>
        <div
          className="bg-benefit-dark h-2"
          style={{ width: `${progress.benefit}%` }}
        ></div>
      </div>
    </div>
    <div className="flex justify-between text-sm">
      <div className="text-center">
        <p className="text-income-text font-semibold">Ingresos</p>
        <p className="text-dark-gray">{income}</p>
      </div>
      <div className="text-center">
        <p className="text-expense-text font-semibold">Gastos</p>
        <p className="text-dark-gray">{expense}</p>
      </div>
      <div className="text-center">
        <p className="text-benefit-text font-semibold">Beneficios</p>
        <p className="text-dark-gray">{benefit}</p>
      </div>
    </div>
  </div>
);

const TagCard = ({
  icon,
  title,
  objective,
  income,
  expense,
  progressWidth,
}) => (
  <div className="flex flex-col gap-4 bg-white rounded-xl p-4 border border-light-gray">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="text-expense-text flex items-center justify-center rounded-lg bg-expense-light shrink-0 size-12">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-text-light text-base font-medium">{title}</p>
          <p className="text-dark-gray text-sm font-normal leading-normal">
            Objetivo: {objective}
          </p>
        </div>
      </div>
    </div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-income-text font-semibold">Ingresos: {income}</span>
      <span className="text-expense-text font-semibold">Gastos: {expense}</span>
    </div>
    <div className="w-full bg-light-gray rounded-full h-2.5">
      <div
        className="bg-expense-dark h-2.5 rounded-full"
        style={{ width: `${progressWidth}%` }}
      ></div>
    </div>
  </div>
);

const FixedExpenseItem = ({
  icon,
  title,
  date,
  amount,
  initialChecked = false,
}) => {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <div className="relative flex gap-4 bg-white rounded-xl p-4 justify-between items-center border border-light-gray">
      <input
        type="checkbox"
        className="absolute opacity-0 w-full h-full cursor-pointer peer"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <div
        className={`flex items-center gap-4 flex-1 ${
          checked ? "opacity-50" : ""
        }`}
      >
        <div className="text-expense-text flex items-center justify-center rounded-lg bg-expense-light shrink-0 size-12">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-text-light text-base font-medium">{title}</p>
          <p className="text-dark-gray text-sm font-normal">{date}</p>
        </div>
      </div>
      <div className={`flex items-center gap-2 ${checked ? "opacity-50" : ""}`}>
        <div className="text-expense-text text-base font-bold">{amount}</div>
        <label
          className={`cursor-pointer text-dark-gray ${
            checked ? "text-income-text" : ""
          }`}
          onClick={() => setChecked(!checked)}
        >
          <span className="material-symbols-outlined text-3xl">
            check_circle
          </span>
        </label>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="bg-background-light text-text-light font-display min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex items-center bg-background-light p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="text-dark-gray flex size-12 shrink-0 items-center">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </div>
        <h1 className="text-text-light text-lg font-bold text-center flex-1">
          Bienvenido, Usuario
        </h1>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center h-12 bg-transparent text-dark-gray text-base font-bold">
            <span className="material-symbols-outlined text-3xl">
              notifications
            </span>
          </button>
        </div>
      </div>

      {/* Botones principales */}
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-4">
          <Button className="flex-1 bg-income-light text-income-text border border-income-dark">
            <span className="material-symbols-outlined">add_circle</span>
            Ingresos
          </Button>
          <Button className="flex-1 bg-expense-light text-expense-text border border-expense-dark">
            <span className="material-symbols-outlined">remove_circle</span>
            Gastos
          </Button>
        </div>
        <div className="flex justify-center">
          <Button className="w-1/2 bg-light-gray text-dark-gray border border-medium-gray">
            <span className="material-symbols-outlined">swap_horiz</span>
            Transferencia
          </Button>
        </div>
      </div>

      {/* Cuentas */}
      <div className="flex flex-col gap-6 p-4">
        <div>
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-text-light text-[22px] font-bold">Cuentas</h2>
            <Button className="min-w-[84px] max-w-[480px] h-10 rounded-full bg-light-gray text-dark-gray text-sm">
              <span className="material-symbols-outlined text-xl">add</span>
              Añadir
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <AccountCard
              icon="account_balance_wallet"
              title="Banco Principal"
              amount="$12,350.00"
              income="$5,000.00"
              expense="$1,200.00"
              benefit="$3,800.00"
              progress={{
                income: 50,
                expense: 12,
                benefit: 38,
                bgColor: "bg-income-light",
                iconColor: "text-income-text",
              }}
            />
            <AccountCard
              icon="payments"
              title="Efectivo"
              amount="$850.00"
              income="$500.00"
              expense="$350.00"
              benefit="$150.00"
              progress={{
                income: 58,
                expense: 42,
                bgColor: "bg-income-light",
                iconColor: "text-income-text",
              }}
            />
          </div>
        </div>

        {/* Etiquetas */}
        <div>
          <div className="flex items-center justify-between pb-3 pt-5">
            <h2 className="text-text-light text-[22px] font-bold">Etiquetas</h2>
            <Button className="min-w-[84px] max-w-[480px] h-10 rounded-full bg-light-gray text-dark-gray text-sm">
              <span className="material-symbols-outlined text-xl">add</span>
              Añadir
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <TagCard
              icon="restaurant"
              title="Comida"
              objective="$600.00"
              income="$50.00"
              expense="$450.00"
              progressWidth={75}
            />
            <TagCard
              icon="directions_car"
              title="Transporte"
              objective="$200.00"
              income="$0.00"
              expense="$120.00"
              progressWidth={60}
            />
          </div>
        </div>

        {/* Gastos Fijos */}
        <div>
          <div className="flex items-center justify-between pb-3 pt-5">
            <h2 className="text-text-light text-[22px] font-bold">
              Gastos Fijos
            </h2>
            <Button className="min-w-[84px] max-w-[480px] h-10 rounded-full bg-light-gray text-dark-gray text-sm">
              <span className="material-symbols-outlined text-xl">add</span>
              Añadir
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <FixedExpenseItem
              icon="home"
              title="Alquiler"
              date="1 de Junio"
              amount="$1,500.00"
            />
            <FixedExpenseItem
              icon="live_tv"
              title="Suscripción a Netflix"
              date="15 de Junio"
              amount="$15.99"
              initialChecked
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
