import { e as createComponent, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_xzqXscmh.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { u as useUser, U as UserProvider } from '../chunks/UserContext_yLHny9lX.mjs';
import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { Plus, Minus, ArrowLeftRight, IdCard, TrainFront, Sofa, Folder, Star, Heart, Wrench, Notebook, RefreshCw, Tickets, Smile, Baby, CreditCard, ShoppingCart, Wallet, PiggyBank, Apple, X, Tag, Check, Euro, Calendar, ChevronsUpDown, Menu, EyeOff, Receipt, Settings, LogOut } from 'lucide-react';
import { u as useSwipe } from '../chunks/useSwipe_CXu0HAZV.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

function ButtonsPanel({
  setShowTransactionForm,
  setTransactionType
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
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold tracking-[0.015em] flex-1 bg-[var(--income-light)] text-[var(--income-text)] border border-[var(--income-dark)]",
          onClick: handleAddIncome,
          children: [
            " ",
            /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: "Ingreso" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold tracking-[0.015em] flex-1 bg-[var(--expense-light)] text-[var(--expense-text)] border border-[var(--expense-dark)]",
          onClick: handleAddExpense,
          children: [
            " ",
            /* @__PURE__ */ jsx(Minus, { className: "w-6 h-6" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: "Gasto" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold tracking-[0.015em] w-full bg-[var(--light-gray)] text-[var(--dark-gray)] border border-[var(--medium-gray)]",
        onClick: handleTransfer,
        children: [
          /* @__PURE__ */ jsx(ArrowLeftRight, { className: "w-6 h-6" }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm", children: "Transferir" })
        ]
      }
    ) })
  ] });
}

function AccountItem({ account, transactions, onDelete }) {
  const { swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe();
  const accountTransactions = transactions.filter(
    (tx) => tx.account_id === account.id
  );
  const income = accountTransactions.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
  const expenses = accountTransactions.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);
  (account.saldo || 0) + income - expenses;
  const iconsMap = {
    PiggyBank: /* @__PURE__ */ jsx(PiggyBank, { className: "w-6 h-6", style: { color: account.color } }),
    Wallet: /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6", style: { color: account.color } }),
    ShoppingCart: /* @__PURE__ */ jsx(ShoppingCart, { className: "w-6 h-6", style: { color: account.color } }),
    CreditCard: /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6", style: { color: account.color } }),
    Baby: /* @__PURE__ */ jsx(Baby, { className: "w-6 h-6", style: { color: account.color } }),
    Smile: /* @__PURE__ */ jsx(Smile, { className: "w-6 h-6", style: { color: account.color } }),
    Tickets: /* @__PURE__ */ jsx(Tickets, { className: "w-6 h-6", style: { color: account.color } }),
    RefreshCw: /* @__PURE__ */ jsx(RefreshCw, { className: "w-6 h-6", style: { color: account.color } }),
    Notebook: /* @__PURE__ */ jsx(Notebook, { className: "w-6 h-6", style: { color: account.color } }),
    Wrench: /* @__PURE__ */ jsx(Wrench, { className: "w-6 h-6", style: { color: account.color } }),
    Heart: /* @__PURE__ */ jsx(Heart, { className: "w-6 h-6", style: { color: account.color } }),
    Star: /* @__PURE__ */ jsx(Star, { className: "w-6 h-6", style: { color: account.color } }),
    Folder: /* @__PURE__ */ jsx(Folder, { className: "w-6 h-6", style: { color: account.color } }),
    Sofa: /* @__PURE__ */ jsx(Sofa, { className: "w-6 h-6", style: { color: account.color } }),
    Apple: /* @__PURE__ */ jsx(Apple, { className: "w-6 h-6" }),
    TrainFront: /* @__PURE__ */ jsx(TrainFront, { className: "w-6 h-6", style: { color: account.color } }),
    IdCard: /* @__PURE__ */ jsx(IdCard, { className: "w-6 h-6", style: { color: account.color } })
  };
  const handleDelete = async () => {
    if (!confirm(`¿Seguro que quieres borrar la cuenta "${account.name}"?`))
      return;
    try {
      const res = await fetch("/api/accounts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: account.id })
      });
      const json = await res.json();
      if (!json.error) onDelete(account.id);
      else alert("Error borrando la cuenta: " + json.error);
    } catch (err) {
      console.error(err);
      alert("Error borrando la cuenta");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col gap-3 mb-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-full px-4 flex items-center justify-center bg-red-600 text-white font-bold rounded-2xl", children: /* @__PURE__ */ jsx("button", { onClick: handleDelete, children: "Borrar" }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col gap-4 bg-white rounded-xl p-4 border border-[var(--light-gray)]",
        style: {
          transform: `translateX(${swipeOffset}px)`,
          transition: swipeOffset === 0 || swipeOffset === -100 ? "transform 0.2s ease" : "none"
        },
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "flex items-center justify-center rounded-lg shrink-0 w-12 h-12 bg-red-100",
                style: { backgroundColor: `${account.color}30` },
                children: iconsMap[account.icon_name] || /* @__PURE__ */ jsx(
                  Wallet,
                  {
                    className: "text-red-600 w-6 h-6",
                    style: { color: account.color }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-center", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `/accounts/${account.id}`,
                  className: "text-[var(--text-light)] text-[var(--base)] font-medium",
                  children: account.name
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-[var(--dark-gray)] text-2xl font-bold", children: [
                account.saldo,
                " €"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-light-gray rounded-full h-3 flex overflow-hidden", children: [income, expenses, Math.max(income - expenses, 0)].map(
            (val, idx) => {
              const total = income + expenses;
              const width = total > 0 ? val / total * 100 : 0;
              const bgColors = [
                "bg-[var(--income-dark)]",
                "bg-[var(--expense-dark)]",
                "bg-[var(--benefit-dark)]"
              ];
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: bgColors[idx],
                  style: {
                    width: `${width}%`,
                    transition: "width 0.3s ease",
                    borderRadius: idx === 0 ? "9999px 0 0 9999px" : idx === 2 ? "0 9999px 9999px 0" : "0"
                  }
                },
                idx
              );
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-[var(--income-text)]", children: "Ingresos" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[var(--dark-gray)]", children: [
                income.toFixed(2),
                " €"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-[var(--expense-text)]", children: "Gastos" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[var(--dark-gray)]", children: [
                expenses.toFixed(2),
                " €"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-[var(--benefit-text)]", children: "Beneficios" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[var(--dark-gray)]", children: [
                (income - expenses).toFixed(2),
                " €"
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}

function AccountsList({ accounts, setAccounts, transactions }) {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [saldo, setSaldo] = useState("");
  const [color, setColor] = useState("#B77466");
  const [iconName, setIconName] = useState("Wallet");
  const icons = [
    { name: "PiggyBank", component: /* @__PURE__ */ jsx(PiggyBank, {}) },
    { name: "Wallet", component: /* @__PURE__ */ jsx(Wallet, {}) },
    { name: "ShoppingCart", component: /* @__PURE__ */ jsx(ShoppingCart, {}) },
    { name: "CreditCard", component: /* @__PURE__ */ jsx(CreditCard, {}) },
    { name: "Baby", component: /* @__PURE__ */ jsx(Baby, {}) },
    { name: "Smile", component: /* @__PURE__ */ jsx(Smile, {}) },
    { name: "Tickets", component: /* @__PURE__ */ jsx(Tickets, {}) },
    { name: "RefreshCw", component: /* @__PURE__ */ jsx(RefreshCw, {}) },
    { name: "Notebook", component: /* @__PURE__ */ jsx(Notebook, {}) },
    { name: "Wrench", component: /* @__PURE__ */ jsx(Wrench, {}) },
    { name: "Heart", component: /* @__PURE__ */ jsx(Heart, {}) },
    { name: "Star", component: /* @__PURE__ */ jsx(Star, {}) },
    { name: "Folder", component: /* @__PURE__ */ jsx(Folder, {}) },
    { name: "Sofa", component: /* @__PURE__ */ jsx(Sofa, {}) },
    { name: "Apple", component: /* @__PURE__ */ jsx(Apple, {}) },
    { name: "TrainFront", component: /* @__PURE__ */ jsx(TrainFront, {}) },
    { name: "IdCard", component: /* @__PURE__ */ jsx(IdCard, {}) }
  ];
  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!name) return alert("Rellena el nombre de la cuenta");
    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          color,
          saldo: parseFloat(saldo) || 0,
          iconName,
          userId: user.id
        })
      });
      const json = await res.json();
      if (!json.error) {
        setAccounts([...accounts, json.data[0]]);
        setName("");
        setSaldo("");
        setColor("#B77466");
        setIconName("Wallet");
        setShowForm(false);
      } else alert("Error: " + json.error);
    } catch (err) {
      console.error(err);
      alert("Error creando la cuenta");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-text-light text-[22px] font-bold", children: "Cuentas" }),
      !showForm && /* @__PURE__ */ jsxs(
        "button",
        {
          className: "flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold tracking-[0.015em] bg-[var(--light-gray)] text-[var(--dark-gray)] text-sm",
          onClick: () => setShowForm(true),
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
            "Añadir"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { children: accounts.map((account) => {
      const accountTx = transactions.filter(
        (tx) => tx.account_id === account.id
      );
      return /* @__PURE__ */ jsx(
        AccountItem,
        {
          account,
          transactions: accountTx
        },
        account.id
      );
    }) }),
    showForm && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "m-5 bg-white rounded-xl shadow-xl p-6 w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 pb-2 justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[#0e1a13] dark:text-white flex size-12 shrink-0 items-center" }),
        /* @__PURE__ */ jsx("h2", { className: "text-[#0e1a13] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center", children: "Crear cuenta" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowForm(false), children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleAddAccount, children: [
        /* @__PURE__ */ jsx("div", { className: "flex max-w-[480px] flex-wrap items-end gap-4 py-3", children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col min-w-40 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Nombre de la Cuenta" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Ahorros, Cartera...",
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex max-w-[480px] flex-wrap items-end gap-4 py-3", children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col min-w-40 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Saldo Inicial (opcional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              step: "0.01",
              value: saldo,
              onChange: (e) => setSaldo(e.target.value),
              className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal",
              placeholder: "0.00 €"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "py-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Color" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
            [
              "#fecaca",
              "#fed7aa",
              "#fef08a",
              "#d9f99d",
              "#bfdbfe",
              "#e9d5ff",
              "#fbcfe8"
            ].map((c) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                style: { backgroundColor: c },
                onClick: () => setColor(c),
                className: `w-8 h-8 rounded-full border-2 ${color === c ? "border-black" : "border-gray-300"}`
              },
              c
            )),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "color",
                value: color,
                onChange: (e) => setColor(e.target.value),
                className: "w-8 h-8 rounded-full border-2 border-[#aec0d6]/30 focus:border-[#475482] cursor-pointer"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-[#111827] mb-2", children: "Icono" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 gap-3", children: icons.map((i) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIconName(i.name),
              className: `flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white ${iconName === i.name ? "ring-2 ring-[var(--primary)]" : "border-gray-300"}`,
              children: i.component
            },
            i.name
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-stretch p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-1 gap-3 flex-wrap justify-between", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(false),
              className: "flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[#e8f2ec] dark:bg-gray-700 text-[#0e1a13] dark:text-white text-base font-bold leading-normal tracking-[0.015em]",
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[var(--primary)] text-[#0e1a13] text-base font-bold leading-normal tracking-[0.015em]",
              children: "Crear"
            }
          )
        ] }) })
      ] })
    ] }) })
  ] });
}

function TagsList({ tags, setTags, transactions }) {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#00FF00");
  const [goal, setGoal] = useState("");
  const [iconName, setIconName] = useState("Tag");
  const icons = [
    { name: "PiggyBank", component: /* @__PURE__ */ jsx(PiggyBank, {}) },
    { name: "Wallet", component: /* @__PURE__ */ jsx(Wallet, {}) },
    { name: "ShoppingCart", component: /* @__PURE__ */ jsx(ShoppingCart, {}) },
    { name: "CreditCard", component: /* @__PURE__ */ jsx(CreditCard, {}) },
    { name: "Baby", component: /* @__PURE__ */ jsx(Baby, {}) },
    { name: "Smile", component: /* @__PURE__ */ jsx(Smile, {}) },
    { name: "Tickets", component: /* @__PURE__ */ jsx(Tickets, {}) },
    { name: "RefreshCw", component: /* @__PURE__ */ jsx(RefreshCw, {}) },
    { name: "Notebook", component: /* @__PURE__ */ jsx(Notebook, {}) },
    { name: "Wrench", component: /* @__PURE__ */ jsx(Wrench, {}) },
    { name: "Heart", component: /* @__PURE__ */ jsx(Heart, {}) },
    { name: "Star", component: /* @__PURE__ */ jsx(Star, {}) },
    { name: "Folder", component: /* @__PURE__ */ jsx(Folder, {}) },
    { name: "Sofa", component: /* @__PURE__ */ jsx(Sofa, {}) },
    { name: "Apple", component: /* @__PURE__ */ jsx(Apple, {}) },
    { name: "TrainFront", component: /* @__PURE__ */ jsx(TrainFront, {}) },
    { name: "IdCard", component: /* @__PURE__ */ jsx(IdCard, {}) }
  ];
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
          iconName
        })
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
        body: JSON.stringify({ id })
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
    const iconsMap2 = {
      PiggyBank: /* @__PURE__ */ jsx(PiggyBank, { className: "w-6 h-6", style: { color: tag.color } }),
      Wallet: /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6", style: { color: tag.color } }),
      ShoppingCart: /* @__PURE__ */ jsx(ShoppingCart, { className: "w-6 h-6", style: { color: tag.color } }),
      CreditCard: /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6", style: { color: tag.color } }),
      Baby: /* @__PURE__ */ jsx(Baby, { className: "w-6 h-6", style: { color: tag.color } }),
      Smile: /* @__PURE__ */ jsx(Smile, { className: "w-6 h-6", style: { color: tag.color } }),
      Tickets: /* @__PURE__ */ jsx(Tickets, { className: "w-6 h-6", style: { color: tag.color } }),
      RefreshCw: /* @__PURE__ */ jsx(RefreshCw, { className: "w-6 h-6", style: { color: tag.color } }),
      Notebook: /* @__PURE__ */ jsx(Notebook, { className: "w-6 h-6", style: { color: tag.color } }),
      Wrench: /* @__PURE__ */ jsx(Wrench, { className: "w-6 h-6", style: { color: tag.color } }),
      Heart: /* @__PURE__ */ jsx(Heart, { className: "w-6 h-6", style: { color: tag.color } }),
      Star: /* @__PURE__ */ jsx(Star, { className: "w-6 h-6", style: { color: tag.color } }),
      Folder: /* @__PURE__ */ jsx(Folder, { className: "w-6 h-6", style: { color: tag.color } }),
      Sofa: /* @__PURE__ */ jsx(Sofa, { className: "w-6 h-6", style: { color: tag.color } }),
      Apple: /* @__PURE__ */ jsx(Apple, { className: "w-6 h-6" }),
      TrainFront: /* @__PURE__ */ jsx(TrainFront, { className: "w-6 h-6", style: { color: tag.color } }),
      IdCard: /* @__PURE__ */ jsx(IdCard, { className: "w-6 h-6", style: { color: tag.color } })
    };
    const { swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(-100, -50);
    const tagTx = transactions?.filter(
      (tx) => tx?.tag_id && tx.tag_id.toString() === tag.id.toString()
    ) || [];
    const income = tagTx.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
    const expense = tagTx.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);
    const progress = tag.objetivo ? Math.min(expense / tag.objetivo * 100, 100) : 0;
    return /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-full px-4 flex items-center justify-center bg-red-600 text-white font-bold rounded-2xl z-0", children: /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(tag.id), children: "Borrar" }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex flex-col gap-2 bg-white rounded-xl p-4 border border-[var(--light-gray)]",
          style: {
            transform: `translateX(${swipeOffset}px)`,
            transition: swipeOffset === 0 || swipeOffset === -100 ? "transform 0.2s ease" : "none"
          },
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex items-center justify-center rounded-lg shrink-0 size-12",
                  style: { backgroundColor: `${tag.color}25` },
                  children: /* @__PURE__ */ jsx("div", { children: iconsMap2[tag.icon_name] || /* @__PURE__ */ jsx(Tag, {}) })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-center", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/tags/${tag.id}`,
                    className: "text-[var(--text-light)] text-[var(--base)] font-medium",
                    children: tag.name
                  }
                ),
                tag.objetivo ? /* @__PURE__ */ jsxs("p", { className: "text-dark-gray text-sm font-normal leading-normal", children: [
                  "Objetivo: ",
                  tag.objetivo
                ] }) : /* @__PURE__ */ jsx("p", { className: "text-dark-gray text-sm font-normal leading-normal", children: "Sin objetivos" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-[var(--income-text)] font-semibold", children: [
                "Ingresos: ",
                income.toFixed(2),
                " €"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-[var(--expense-text)] font-semibold", children: [
                "Gastos: ",
                expense.toFixed(2),
                " €"
              ] })
            ] }),
            tag.objetivo > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "w-full bg-[var(--light-gray)] rounded-full h-2.5", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-2.5 rounded-full transition-all duration-300",
                  style: {
                    width: `${progress}%`,
                    backgroundColor: expense < tag.objetivo ? tag.color : "green"
                  }
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-end", children: expense < tag.objetivo ? /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
                "Te faltan",
                " ",
                /* @__PURE__ */ jsxs("span", { className: "text-bold text-[var(--income-text)]", children: [
                  (tag.objetivo - expense).toFixed(2),
                  " €",
                  " "
                ] }),
                "para llegar al objetivo"
              ] }) : /* @__PURE__ */ jsx("span", { className: "text-green-600 font-bold", children: "¡Objetivo superado!" }) })
            ] })
          ] })
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6 p-4", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-3 pt-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[var(--text-light)] text-[22px] font-bold", children: "Etiquetas" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "flex items-center justify-center gap-2 round h-12 px-4 font-bold text-[var(--base)] min-w-[84px] max-w-[480px] h-10 rounded-full bg-[var(--light-gray)] text-[var(--dark-gray)] text-sm",
          onClick: () => setShowForm(true),
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" }),
            " Añadir"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: tags?.length > 0 ? tags.map((tag) => /* @__PURE__ */ jsx(TagItem, { tag }, tag.id)) : /* @__PURE__ */ jsx("div", { children: "No hay etiquetas aún" }) }),
    showForm && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "m-5 bg-white round shadow-xl p-6 w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 pb-2 justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[#0e1a13] dark:text-white flex size-12 shrink-0 items-center" }),
        /* @__PURE__ */ jsx("h2", { className: "text-[#0e1a13] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center", children: "Crear etiqueta" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowForm(false), children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleAddTag, className: "space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex max-w-[480px] flex-wrap items-end gap-4 py-3", children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col min-w-40 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Nombre" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Comida, Transporte...",
              className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] focus:border-none h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Color" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
            [
              "#fecaca",
              "#fed7aa",
              "#fef08a",
              "#d9f99d",
              "#bfdbfe",
              "#e9d5ff",
              "#fbcfe8"
            ].map((c) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                style: { backgroundColor: c },
                onClick: () => setColor(c),
                className: `w-8 h-8 rounded-full border-2 ${color === c ? "border-black" : "border-gray-300"}`
              },
              c
            )),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "color",
                value: color,
                onChange: (e) => setColor(e.target.value),
                className: "w-8 h-8 rounded-full border-2 border-[#aec0d6]/30 focus:border-[#475482] cursor-pointer"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Icono" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 gap-3", children: icons.map((i) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIconName(i.name),
              className: `flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer ${iconName === i.name ? "ring-2 ring-[var(--primary)]" : "border-gray-300"} bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white`,
              children: i.component
            },
            i.name
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex max-w-[480px] flex-wrap items-end gap-4 py-3", children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col min-w-40 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Objetivo (Opcional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: goal,
              onChange: (e) => setGoal(e.target.value),
              placeholder: "€",
              className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] focus:border-none h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-stretch p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-1 gap-3 flex-wrap justify-between", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowForm(false),
              className: "flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[#e8f2ec] dark:bg-gray-700 text-[#0e1a13] dark:text-white text-base font-bold leading-normal tracking-[0.015em]",
              children: "Cancelar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[var(--primary)] text-[#0e1a13] text-base font-bold leading-normal tracking-[0.015em]",
              children: "Crear"
            }
          )
        ] }) })
      ] })
    ] }) })
  ] }) });
}

function FixedExpenseItem({
  expense,
  onDelete,
  handleGenerateTransaction
}) {
  const { swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe();
  const iconsMap = {
    PiggyBank: /* @__PURE__ */ jsx(PiggyBank, { className: "w-6 h-6" }),
    Wallet: /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6" }),
    ShoppingCart: /* @__PURE__ */ jsx(ShoppingCart, { className: "w-6 h-6" }),
    CreditCard: /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6" }),
    Baby: /* @__PURE__ */ jsx(Baby, { className: "w-6 h-6" }),
    Smile: /* @__PURE__ */ jsx(Smile, { className: "w-6 h-6" }),
    Tickets: /* @__PURE__ */ jsx(Tickets, { className: "w-6 h-6" }),
    RefreshCw: /* @__PURE__ */ jsx(RefreshCw, { className: "w-6 h-6" }),
    Notebook: /* @__PURE__ */ jsx(Notebook, { className: "w-6 h-6" }),
    Wrench: /* @__PURE__ */ jsx(Wrench, { className: "w-6 h-6" }),
    Heart: /* @__PURE__ */ jsx(Heart, { className: "w-6 h-6" }),
    Star: /* @__PURE__ */ jsx(Star, { className: "w-6 h-6" }),
    Folder: /* @__PURE__ */ jsx(Folder, { className: "w-6 h-6" }),
    Sofa: /* @__PURE__ */ jsx(Sofa, { className: "w-6 h-6" }),
    Apple: /* @__PURE__ */ jsx(Apple, { className: "w-6 h-6" }),
    TrainFront: /* @__PURE__ */ jsx(TrainFront, { className: "w-6 h-6" }),
    IdCard: /* @__PURE__ */ jsx(IdCard, { className: "w-6 h-6" })
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-full px-4 flex items-center justify-center bg-red-600 text-white font-bold rounded-2xl", children: /* @__PURE__ */ jsx("button", { onClick: () => onDelete(expense.id), children: "Borrar" }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex gap-4 bg-white rounded-xl p-4 justify-between items-center border border-[var(--light-gray)] mb-3",
        style: {
          transform: `translateX(${swipeOffset}px)`,
          transition: swipeOffset === 0 || swipeOffset === -100 ? "transform 0.2s ease" : "none"
        },
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[var(--expense-text)] flex items-center justify-center rounded-lg bg-[var(--expense-light)] shrink-0 size-12", children: iconsMap[expense.iconName] || /* @__PURE__ */ jsx(Tag, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[var(--text-light)] text-base font-medium", children: expense.name }),
              /* @__PURE__ */ jsx("p", { className: "text-[var(--dark-gray)] text-sm font-normal", children: new Date(expense.date).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short"
              }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs("p", { className: "text-[var(--expense-text)] text-base font-bold", children: [
              expense.amount,
              "€"
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleGenerateTransaction(expense),
              className: "p-1 bg-gray-100 rounded-full",
              children: /* @__PURE__ */ jsx(Check, { className: "w-6 h-6" })
            }
          )
        ]
      }
    )
  ] });
}

function FixedExpensesForm({
  accounts,
  fixedExpenses,
  setFixedExpenses,
  closeForm,
  fixedTag,
  setFixedTag,
  user
}) {
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState(
    (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  );
  const [selectedAccount, setSelectedAccount] = useState(accounts?.[0] || null);
  const [iconName, setIconName] = useState("Tag");
  const icons = [
    { name: "PiggyBank", component: /* @__PURE__ */ jsx(PiggyBank, {}) },
    { name: "Wallet", component: /* @__PURE__ */ jsx(Wallet, {}) },
    { name: "ShoppingCart", component: /* @__PURE__ */ jsx(ShoppingCart, {}) },
    { name: "CreditCard", component: /* @__PURE__ */ jsx(CreditCard, {}) },
    { name: "Baby", component: /* @__PURE__ */ jsx(Baby, {}) },
    { name: "Smile", component: /* @__PURE__ */ jsx(Smile, {}) },
    { name: "Tickets", component: /* @__PURE__ */ jsx(Tickets, {}) },
    { name: "RefreshCw", component: /* @__PURE__ */ jsx(RefreshCw, {}) },
    { name: "Notebook", component: /* @__PURE__ */ jsx(Notebook, {}) },
    { name: "Wrench", component: /* @__PURE__ */ jsx(Wrench, {}) },
    { name: "Heart", component: /* @__PURE__ */ jsx(Heart, {}) },
    { name: "Star", component: /* @__PURE__ */ jsx(Star, {}) },
    { name: "Folder", component: /* @__PURE__ */ jsx(Folder, {}) },
    { name: "Sofa", component: /* @__PURE__ */ jsx(Sofa, {}) },
    { name: "Apple", component: /* @__PURE__ */ jsx(Apple, {}) },
    { name: "TrainFront", component: /* @__PURE__ */ jsx(TrainFront, {}) },
    { name: "IdCard", component: /* @__PURE__ */ jsx(IdCard, {}) }
  ];
  useEffect(() => {
    if (accounts?.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts, selectedAccount]);
  const handleAddExpense = async () => {
    if (!newName || !newAmount || !newDate || !selectedAccount?.id || !user?.id) {
      alert("Rellena todos los campos obligatorios");
      return;
    }
    let tagId = fixedTag?.id;
    if (!tagId) {
      const createRes = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Gastos fijos", userId: user.id })
      });
      const createJson = await createRes.json();
      tagId = createJson.data[0]?.id;
      if (!tagId) {
        alert("No se pudo crear la etiqueta 'Gastos fijos'");
        return;
      }
      setFixedTag(createJson.data[0]);
    }
    try {
      const res = await fetch("/api/fixed-expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          amount: parseFloat(newAmount),
          date: newDate,
          account_id: selectedAccount.id,
          user_id: user.id,
          tag_id: tagId,
          iconName,
          paid: false
        })
      });
      const json = await res.json();
      if (json.error) return alert("Error: " + json.error);
      setFixedExpenses((prev) => [...prev, json.data[0]]);
      setNewName("");
      setNewAmount("");
      setNewDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
      setSelectedAccount(accounts[0]);
      setIconName("Tag");
      closeForm();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el gasto fijo");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "m-5 bg-white round shadow-xl p-6 w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 pb-2 justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[#0e1a13] dark:text-white flex size-12 shrink-0 items-center" }),
      /* @__PURE__ */ jsx("h2", { className: "text-[#0e1a13] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center", children: "Añadir gasto fijo" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: closeForm,
          className: "hover:bg-white/20 rounded-full p-2",
          children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: " space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex max-w-[480px] flex-wrap items-end gap-4", children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col min-w-40 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Nombre" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: newName,
            onChange: (e) => setNewName(e.target.value),
            placeholder: "Ej. Spotify, Netflix",
            className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] p-4 text-base font-normal leading-normal"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-end gap-4", children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col min-w-40 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Cantidad" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Euro, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#51946c]" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              step: "0.01",
              value: newAmount,
              onChange: (e) => setNewAmount(e.target.value),
              placeholder: " 0.00",
              className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] p-4 pl-8 text-base font-normal leading-normal"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col min-w-40 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Fecha de Vencimiento" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              value: newDate,
              onChange: (e) => setNewDate(e.target.value),
              className: "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 placeholder:text-[#51946c] text-base font-normal leading-normal"
            }
          ),
          /* @__PURE__ */ jsx(Calendar, { className: "absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5  text-[#51946c]" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex max-w-[480px] flex-wrap items-end gap-4", children: /* @__PURE__ */ jsxs("label", { className: "flex flex-col min-w-40 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Cuenta" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              value: selectedAccount?.id || "",
              onChange: (e) => setSelectedAccount(
                accounts.find((a) => a.id === e.target.value)
              ),
              className: "form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden round text-[#0e1a13] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e8f2ec] dark:bg-[#2a3f33] h-14 p-4 text-base font-normal leading-normal",
              children: accounts.map((acc) => /* @__PURE__ */ jsx("option", { value: acc.id, children: acc.name }, acc.id))
            }
          ),
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "absolute inset-y-4 right-4 flex items-center text-[#51946c] pointer-events-none w-6 h-6" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] dark:text-gray-300 text-base font-medium leading-normal pb-2", children: "Icono" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 gap-3", children: icons.map((i) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setIconName(i.name),
            className: `flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer ${iconName === i.name ? "ring-2 ring-[var(--primary)]" : "border-gray-300"} bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white`,
            children: i.component
          },
          i.name
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-stretch p-4 mt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-1 gap-3 flex-wrap justify-between", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: closeForm,
            className: "flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[#e8f2ec] dark:bg-gray-700 text-[#0e1a13] dark:text-white text-base font-bold leading-normal tracking-[0.015em]",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleAddExpense,
            className: "flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden round h-12 px-5 bg-[var(--primary)] text-[#0e1a13] text-base font-bold leading-normal tracking-[0.015em]",
            children: "Guardar"
          }
        )
      ] }) })
    ] })
  ] }) });
}

function FixedExpensesList({
  fixedExpenses,
  setFixedExpenses,
  accounts,
  showHeader = true
}) {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [fixedTag, setFixedTag] = useState(null);
  useEffect(() => {
    if (!user?.id) return;
    const fetchOrCreateFixedTag = async () => {
      const res = await fetch(`/api/tags?userId=${user.id}`);
      const json = await res.json();
      const existingTag = json.data.find(
        (t) => t.name.toLowerCase() === "gastos fijos"
      );
      if (existingTag) {
        setFixedTag(existingTag);
      } else {
        const createRes = await fetch("/api/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Gastos fijos", userId: user.id })
        });
        const createJson = await createRes.json();
        setFixedTag(createJson.data[0]);
      }
    };
    fetchOrCreateFixedTag();
  }, [user]);
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este gasto fijo?")) return;
    try {
      const res = await fetch(`/api/fixed-expenses/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const json = await res.json();
      if (!json.error) {
        setFixedExpenses((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert("Error al borrar: " + json.error);
      }
    } catch (err) {
      console.error("Error borrando gasto fijo:", err);
      alert("Error borrando gasto fijo");
    }
  };
  const handleGenerateTransaction = async (expense) => {
    if (!user?.id) return alert("Usuario no logueado");
    if (!expense.account_id || !expense.amount || !expense.name) {
      return alert(
        "Error: el gasto fijo tiene campos incompletos. Revisa que la cuenta, nombre y cantidad estén definidos."
      );
    }
    const nextDate = new Date(expense.date);
    nextDate.setMonth(nextDate.getMonth() + 1);
    const nextDateStr = nextDate.toISOString().split("T")[0];
    console.log("Generando transacción con:", {
      name: expense.name,
      amount: parseFloat(expense.amount),
      date: nextDateStr,
      account_id: expense.account_id,
      user_id: user.id,
      tag_id: expense.tag_id || null
    });
    try {
      const txRes = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: expense.name,
          // <--- antes era name
          amount: parseFloat(expense.amount),
          date: nextDateStr,
          type: "expense",
          // <--- obligatorio
          account_id: expense.account_id,
          user_id: user.id,
          tag_id: expense.tag_id || null
        })
      });
      const txJson = await txRes.json();
      if (txJson.error)
        return alert("Error al generar la transacción: " + txJson.error);
      const fixRes = await fetch(`/api/fixed-expenses/${expense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: nextDateStr })
      });
      const fixJson = await fixRes.json();
      if (fixJson.error)
        return alert(
          "Error al actualizar la fecha del gasto fijo: " + fixJson.error
        );
      setFixedExpenses(
        (prev) => prev.map((f) => f.id === expense.id ? { ...f, date: nextDateStr } : f)
      );
      alert("Transacción generada correctamente");
    } catch (err) {
      console.error("Error generando la transacción:", err);
      alert("Error generando la transacción");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 p-4", children: [
    showHeader && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-3 ", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[var(--text-light)] text-[22px] font-bold", children: "Gastos Fijos" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setShowForm(true),
          className: "min-w-[84px] max-w-[480px] h-10 rounded-full bg-[var(--light-gray)] text-[var(--dark-gray)] text-sm flex items-center justify-center gap-2 rounded-xl h-12 px-4 font-bold text-base ",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" }),
            " Añadir"
          ]
        }
      )
    ] }),
    !showForm ? /* @__PURE__ */ jsx("div", { children: fixedExpenses.length === 0 ? /* @__PURE__ */ jsx("p", { children: "No hay gastos fijos." }) : fixedExpenses.map((fe) => {
      console.log(fe.iconName);
      return /* @__PURE__ */ jsx(
        FixedExpenseItem,
        {
          expense: fe,
          onDelete: handleDelete,
          handleGenerateTransaction
        },
        fe.id
      );
    }) }) : /* @__PURE__ */ jsx(
      FixedExpensesForm,
      {
        accounts,
        fixedExpenses,
        setFixedExpenses,
        closeForm: () => setShowForm(false),
        fixedTag,
        user
      }
    )
  ] });
}

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
    fecha: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    etiquetaId: "",
    cuentaId: "",
    cuentaDestinoId: ""
  });
  useEffect(() => {
    const allowedTypes = ["income", "expense", "transfer"];
    setTransactionType(allowedTypes.includes(type) ? type : "income");
    setFormData({
      titulo: "",
      cantidad: "",
      fecha: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      etiquetaId: "",
      cuentaId: "",
      cuentaDestinoId: ""
    });
    const fetchTags = async () => {
      const res = await fetch(`/api/tags?userId=${user.id}`);
      const json = await res.json();
      setTags(json.data || []);
    };
    fetchTags();
  }, [type, user]);
  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });
  const handleAddTag = async () => {
    const tagName = newTag.trim();
    if (!tagName) return;
    const res = await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: tagName, userId: user.id })
    });
    const json = await res.json();
    if (json.error) return alert(json.error);
    setTags([...tags, json.data[0]]);
    setFormData({ ...formData, etiquetaId: json.data[0].id });
    setNewTag("");
    setShowNewTagInput(false);
  };
  const handleSubmit = async () => {
    const { titulo, cantidad, fecha, etiquetaId, cuentaId, cuentaDestinoId } = formData;
    if (!titulo || !cantidad || !fecha || !etiquetaId || !cuentaId || transactionType === "transfer" && !cuentaDestinoId) {
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
        const originTx = {
          description: titulo,
          amount,
          date: fecha,
          type: "expense",
          account_id: cuentaId,
          target_account_id: cuentaDestinoId,
          tag_id: etiquetaId,
          user_id: user.id
        };
        const destTx = {
          description: titulo,
          amount,
          date: fecha,
          type: "income",
          account_id: cuentaDestinoId,
          target_account_id: cuentaId,
          tag_id: etiquetaId,
          user_id: user.id
        };
        res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([originTx, destTx])
          // enviamos un array
        });
        json = await res.json();
        if (json.error) return alert(json.error);
        addTransaction(json.data);
      } else {
        res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: titulo,
            amount,
            date: fecha,
            type: transactionType,
            // "income" o "expense"
            account_id: cuentaId,
            target_account_id: null,
            tag_id: etiquetaId,
            user_id: user.id
          })
        });
        json = await res.json();
        if (json.error) return alert(json.error);
        addTransaction(json.data[0]);
      }
      setFormData({
        titulo: "",
        cantidad: "",
        fecha: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        etiquetaId: "",
        cuentaId: "",
        cuentaDestinoId: ""
      });
      closeForm();
    } catch (err) {
      console.error(err);
      alert("Error al guardar la transacción");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `m-5 rounded-xl bg-[var(--bg-light)] shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors duration-300
   `,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 pb-2 justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[#0e1a13] dark:text-white flex size-12 shrink-0 items-center" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center p-4 pb-2 justify-center relative", children: /* @__PURE__ */ jsx("h1", { className: "text-[#0e1a13] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]", children: transactionType === "income" ? "Nuevo Ingreso" : transactionType === "expense" ? "Nuevo Gasto" : "Transferencia" }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: closeForm,
              className: "hover:bg-white/20 rounded-full p-2",
              children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "text-[#0e1a13] dark:text-gray-300 text-sm font-medium",
                htmlFor: "titulo",
                children: "Título"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.titulo,
                onChange: (e) => handleChange("titulo", e.target.value),
                placeholder: "Ej: Compra supermercado",
                className: `form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg  focus:outline-0 focus:ring-0 border-none  h-12  p-3 text-base font-normal leading-normal ${transactionType === "income" ? "text-[#0e1a13] dark:text-white bg-[#e8f2ec] dark:bg-[#2a3f33] placeholder:text-[var(--green-accent)]" : transactionType === "expense" ? "text-[#1a0e0e] dark:text-white bg-[var(--red-light-bg)] dark:bg-[var(--red-dark-bg)] placeholder:text-[var(--red-accent)]" : "text-[var(--blue-primary)] bg-[var(--blue-light-bg)]  placeholder:text-[var(--blue-accent)]"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "text-[#0e1a13] dark:text-gray-300 text-sm font-medium",
                htmlFor: "cantidad",
                children: "Cantidad"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                Euro,
                {
                  className: `absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5   text-lg font-medium
                ${transactionType === "income" ? "text-[var(--green-accent)] " : transactionType === "expense" ? "text-[var(--red-accent)]" : "text-[var(--blue-accent)]"}
                `
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  step: "0.01",
                  value: formData.cantidad,
                  onChange: (e) => handleChange("cantidad", e.target.value),
                  placeholder: "0.00",
                  className: `form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg   focus:outline-0 focus:ring-0 border-none  h-12  p-3 pl-7 text-xl font-bold leading-normal ${transactionType === "income" ? "text-primary dark:text-[var(--primary)] bg-[#e8f2ec] dark:bg-[#2a3f33] placeholder:text-[var(--green-accent)] " : transactionType === "expense" ? "text-[var(--primary-expense)] dark:text-[var(--primary-expense)] bg-[var(--red-light-bg)] dark:bg-[var(--red-dark-bg)] placeholder:text-[var(--red-accent)]" : "text-[var(--blue-primary)] bg-[var(--blue-light-bg)]  placeholder:text-[var(--blue-accent)]"}`
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "text-[#0e1a13] dark:text-gray-300 text-sm font-medium",
                htmlFor: "fecha",
                children: "Fecha"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: formData.fecha,
                  onChange: (e) => handleChange("fecha", e.target.value),
                  className: `form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border-none  h-12  text-base font-normal leading-normal
                  ${transactionType === "income" ? "text-[#0e1a13] dark:text-white placeholder:text-[var(--green-accent)] bg-[#e8f2ec] dark:bg-[#2a3f33]" : transactionType === "expense" ? "text-[#1a0e0e] bg-[var(--red-light-bg)] placeholder:text-[var(--red-accent)]" : "text-[#1a0e0e] bg-[var(--blue-light-bg)]"}
                    `
                }
              ),
              /* @__PURE__ */ jsx(
                Calendar,
                {
                  className: `absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5  ${transactionType === "income" ? " text-[var(--green-accent)]" : transactionType === "expense" ? "text-[var(--red-accent)]" : "text-[var(--blue-accent)]"}`
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[#0e1a13] dark:text-gray-300 text-sm font-medium", children: "Etiqueta" }),
            !showNewTagInput ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: formData.etiquetaId,
                    onChange: (e) => handleChange("etiquetaId", e.target.value),
                    className: `appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg  focus:outline-0 focus:ring-0 border-none  h-12 p-3 text-base font-normal leading-normal ${transactionType === "income" ? " text-[#0e1a13] dark:text-white placeholder:text-[var(--green-accent)] bg-[#e8f2ec] dark:bg-[#2a3f33]" : transactionType === "expense" ? "bg-[var(--red-light-bg)] text-[#1a0e0e]" : "text-[var(--blue-primary)] bg-[var(--blue-light-bg)]  placeholder:text-[var(--blue-accent)]"}`,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona una etiqueta" }),
                      tags.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.name }, t.id))
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  ChevronsUpDown,
                  {
                    className: `absolute inset-y-3 right-3 flex items-center text-[#51946c] pointer-events-none w-6 h-6  ${transactionType === "income" ? " text-[var(--green-accent)]" : transactionType === "expense" ? "text-[var(--red-accent)]" : "text-[var(--blue-accent)]"}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setShowNewTagInput(true),
                  className: `flex-shrink-0 flex items-center justify-center rounded-lg h-12 w-12
                    ${transactionType === "income" ? " bg-[var(--primary)]" : transactionType === "expense" ? "bg-[var(--primary-expense)] text-[#1a0e0e]" : "bg-[var(--blue-primary)] text-[#1a0e0e]"}
                    `,
                  children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
                }
              )
            ] }) : /* @__PURE__ */ jsxs("div", { className: "flex gap-2 w-full items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: newTag,
                  onChange: (e) => setNewTag(e.target.value),
                  placeholder: "Nombre de la nueva etiqueta",
                  className: "flex-1 px-4 py-3 rounded-xl border-2 border-[#aec0d6]/30 focus:border-[#475482]"
                }
              ),
              " ",
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleAddTag,
                  className: `h-12 w-16 rounded-xl font-bold items-center justify-center ${transactionType === "income" ? "bg-[var(--primary)] text-[#0e1a13]" : transactionType === "expense" ? "bg-[var(--primary-expense)] text-[#1a0e0e]" : "bg-[var(--blue-primary)] text-[#1a0e0e]"}`,
                  children: /* @__PURE__ */ jsx(Plus, { className: "mx-auto w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setShowNewTagInput(false),
                  className: `h-12 w-16 rounded-xl font-bold items-center justify-center ${transactionType === "income" ? "bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white" : transactionType === "expense" ? "bg-[var(--red-light-bg)] text-[#1a0e0e]" : "bg-[var(--blue-light-bg)] text-[#1a0e0e]"}`,
                  children: /* @__PURE__ */ jsx(X, { className: "mx-auto w-5 h-5" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: transactionType === "transfer" ? (
            // Transfer: cuenta origen y destino en fila
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[#0e1a13] dark:text-gray-300 text-sm font-medium", children: "Cuenta de Origen" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: formData.cuentaId,
                    onChange: (e) => handleChange("cuentaId", e.target.value),
                    className: "appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1a0e0e] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[var(--blue-light-bg)] dark:bg-blue-dark-bg h-12 p-3 text-base font-normal leading-normal",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar" }),
                      accounts.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center text-[var(--blue-accent)]", children: /* @__PURE__ */ jsx(LucideIcons.ArrowRight, {}) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col gap-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[#0e1a13] dark:text-gray-300 text-sm font-medium", children: "Cuenta de Destino" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: formData.cuentaDestinoId,
                    onChange: (e) => handleChange("cuentaDestinoId", e.target.value),
                    className: "appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1a0e0e] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[var(--blue-light-bg)] dark:bg-blue-dark-bg h-12 p-3 text-base font-normal leading-normal",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona cuenta de destino" }),
                      accounts.filter((c) => c.id !== formData.cuentaId).map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
                    ]
                  }
                )
              ] })
            ] })
          ) : (
            // Income o expense: solo cuenta
            /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[#0e1a13] dark:text-gray-300 text-sm font-medium", children: transactionType === "income" ? "Cuenta" : "Cuenta" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: formData.cuentaId,
                  onChange: (e) => handleChange("cuentaId", e.target.value),
                  className: `appearance-none form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border-none h-12 p-3 text-base font-normal
          ${transactionType === "income" ? "text-[#0e1a13] dark:text-white bg-[#e8f2ec] dark:bg-[#2a3f33]" : "text-[#1a0e0e] bg-[var(--red-light-bg)]"}`,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona una cuenta" }),
                    accounts.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
                  ]
                }
              )
            ] })
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-stretch p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-1 gap-3 flex-wrap justify-between", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: closeForm,
                className: `flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5  text-base font-bold leading-normal tracking-[0.015em] ${transactionType === "income" ? "bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white" : transactionType === "expense" ? "bg-[var(--red-light-bg)] text-[#1a0e0e]" : "bg-[var(--blue-light-bg)] text-[#1a0e0e]"}`,
                children: "Cancelar"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSubmit,
                className: `flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5  text-base font-bold leading-normal tracking-[0.015em] ${transactionType === "income" ? "bg-[var(--primary)] text-[#0e1a13]" : transactionType === "expense" ? "bg-[var(--primary-expense)] text-[#1a0e0e]" : "bg-[var(--blue-primary)] text-[#1a0e0e]"}`,
                children: "Guardar"
              }
            )
          ] }) })
        ] })
      ]
    }
  ) });
};

function Dashboard() {
  const { user, loading, logout } = useUser();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [tags, setTags] = useState([]);
  const [showNextMonthExpenses, setShowNextMonthExpenses] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionType, setTransactionType] = useState("income");
  const [toggle, setToggle] = useState(false);
  const [visibleAccounts, setVisibleAccounts] = useState({});
  const [visibleTags, setVisibleTags] = useState({});
  const [visibleFixedExpenses, setVisibleFixedExpenses] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAccounts = localStorage.getItem("visibleAccounts");
      if (savedAccounts) setVisibleAccounts(JSON.parse(savedAccounts));
      const savedTags = localStorage.getItem("visibleTags");
      if (savedTags) setVisibleTags(JSON.parse(savedTags));
      const savedFE = localStorage.getItem("visibleFixedExpenses");
      if (savedFE) setVisibleFixedExpenses(JSON.parse(savedFE));
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("visibleAccounts", JSON.stringify(visibleAccounts));
      localStorage.setItem("visibleTags", JSON.stringify(visibleTags));
      localStorage.setItem(
        "visibleFixedExpenses",
        JSON.stringify(visibleFixedExpenses)
      );
    }
  }, [visibleAccounts, visibleTags, visibleFixedExpenses]);
  useEffect(() => {
    setVisibleAccounts((prev) => {
      const updated = { ...prev };
      accounts.forEach((acc) => {
        if (updated[acc.id] === void 0) updated[acc.id] = true;
      });
      return updated;
    });
    setVisibleTags((prev) => {
      const updated = { ...prev };
      tags.forEach((tag) => {
        if (updated[tag.id] === void 0) updated[tag.id] = true;
      });
      return updated;
    });
    setVisibleFixedExpenses((prev) => {
      const updated = { ...prev };
      fixedExpenses.forEach((fe) => {
        if (updated[fe.id] === void 0) updated[fe.id] = true;
      });
      return updated;
    });
  }, [accounts, tags, fixedExpenses]);
  const today = /* @__PURE__ */ new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const nextMonth = currentMonth + 1;
  const nextMonthYear = nextMonth === 12 ? currentYear + 1 : currentYear;
  const nextMonthFixedExpenses = fixedExpenses.filter((fe) => {
    const date = new Date(fe.date);
    return date.getMonth() === nextMonth % 12 && date.getFullYear() === nextMonthYear;
  });
  const thisMonthFixedExpenses = fixedExpenses.filter((fe) => {
    const date = new Date(fe.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  const iconsMap = {
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
    IdCard
  };
  const toggleNextMonthExpenses = () => {
    setShowNextMonthExpenses((prevState) => !prevState);
  };
  const sortedAccounts = [...accounts].sort(
    (a, b) => a.name.localeCompare(b.name)
  );
  const sortedTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));
  const sortedFixedExpenses = [...thisMonthFixedExpenses].sort(
    (a, b) => a.name.localeCompare(b.name)
  );
  const sortedNextMonthFixedExpenses = [...nextMonthFixedExpenses].sort(
    (a, b) => a.name.localeCompare(b.name)
  );
  useEffect(() => {
    if (!user?.id) return;
    const fetchAll = async () => {
      try {
        const [accRes, transRes, feRes, tagsRes] = await Promise.all([
          fetch(`/api/accounts?userId=${user.id}`),
          fetch(`/api/transactions?userId=${user.id}`),
          fetch(`/api/fixed-expenses?userId=${user.id}`),
          fetch(`/api/tags?userId=${user.id}`)
        ]);
        const [accJson, transJson, feJson, tagsJson] = await Promise.all([
          accRes.json(),
          transRes.json(),
          feRes.json(),
          tagsRes.json()
        ]);
        setAccounts(accJson.data || []);
        setTransactions(transJson.data || []);
        setFixedExpenses(feJson.data || []);
        setTags(tagsJson.data || []);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    fetchAll();
  }, [user]);
  if (loading) return /* @__PURE__ */ jsx("p", { children: "Cargando usuario..." });
  if (!user) return /* @__PURE__ */ jsx("p", { children: "No estás logueado." });
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col py-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-background-light p-4 pb-2 justify-between sticky top-0 z-10", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setToggle(true), children: /* @__PURE__ */ jsx(Menu, {}) }),
      /* @__PURE__ */ jsxs("h1", { className: "text-text-light text-lg font-bold flex-1 text-center", children: [
        "Bienvenid@",
        user?.name ? `, ${user.name}` : ""
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ButtonsPanel,
      {
        setShowTransactionForm,
        setTransactionType
      }
    ),
    showTransactionForm && /* @__PURE__ */ jsx(
      TransactionForm,
      {
        accounts,
        type: transactionType,
        addTransaction: (tx) => setTransactions((prev) => [...prev, tx]),
        closeForm: () => setShowTransactionForm(false)
      }
    ),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(
      AccountsList,
      {
        accounts: sortedAccounts.filter((acc) => visibleAccounts[acc.id]),
        setAccounts,
        transactions
      }
    ) }),
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(
      TagsList,
      {
        tags: sortedTags.filter((tag) => visibleTags[tag.id]),
        setTags,
        transactions
      }
    ) }),
    /* @__PURE__ */ jsxs("section", { className: "my-4", children: [
      /* @__PURE__ */ jsx(
        FixedExpensesList,
        {
          fixedExpenses: sortedFixedExpenses.filter(
            (fe) => visibleFixedExpenses[fe.id]
          ),
          setFixedExpenses,
          accounts
        }
      ),
      /* @__PURE__ */ jsxs("section", { className: "my-4", children: [
        /* @__PURE__ */ jsxs(
          "section",
          {
            className: "text-[var(--dark-gray)] flex gap-6 p-4 uppercase font-bold flex justify-between",
            onClick: toggleNextMonthExpenses,
            children: [
              /* @__PURE__ */ jsx("p", { children: "Mes siguiente" }),
              /* @__PURE__ */ jsx(Fragment, { children: !showNextMonthExpenses && /* @__PURE__ */ jsx(EyeOff, { className: "w-5 h-5 mr-5" }) })
            ]
          }
        ),
        showNextMonthExpenses && /* @__PURE__ */ jsx(
          FixedExpensesList,
          {
            fixedExpenses: sortedNextMonthFixedExpenses.filter(
              (fe) => visibleFixedExpenses[fe.id]
            ),
            setFixedExpenses,
            accounts,
            showHeader: false
          }
        )
      ] })
    ] }),
    toggle && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 bg-black/50 z-40",
          onClick: () => setToggle(false)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 p-4 overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between mb-8 space-y-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setToggle(false),
              className: "p-2 ms-auto m-0",
              children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center ", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: user.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: user.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("nav", { className: "flex-grow space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[var(--dark-gray)] text-sm font-semibold uppercase tracking-wider mb-3 px-4", children: "Cuentas" }),
            /* @__PURE__ */ jsx("ul", { className: "pl-4 space-y-1", children: sortedAccounts.map((acc) => {
              const Icon = iconsMap[acc.icon_name] || Wallet;
              const isVisible = visibleAccounts[acc.id];
              return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setVisibleAccounts((prev) => ({
                    ...prev,
                    [acc.id]: !prev[acc.id]
                  })),
                  className: `font-medium flex items-center py-3 px-4 ${isVisible ? "font-bold" : "text-gray-400"}`,
                  children: [
                    isVisible ? /* @__PURE__ */ jsx(
                      Icon,
                      {
                        className: "w-5 h-5 mr-4 shrink-0",
                        style: { color: acc.color }
                      }
                    ) : /* @__PURE__ */ jsx(EyeOff, { className: "w-5 h-5 text-gray-400 mr-4 shrink-0" }),
                    acc.name
                  ]
                }
              ) }, acc.id);
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[var(--dark-gray)] text-sm font-semibold uppercase tracking-wider mb-3 px-4", children: "Etiquetas" }),
            /* @__PURE__ */ jsx("ul", { className: "pl-4 space-y-1", children: sortedTags.map((tag) => {
              const Icon = iconsMap[tag.icon_name] || Tag;
              const isVisible = visibleTags[tag.id];
              return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setVisibleTags((prev) => ({
                    ...prev,
                    [tag.id]: !prev[tag.id]
                  })),
                  className: `font-medium flex items-center py-3 px-4 ${isVisible ? "font-bold" : "text-gray-400"}`,
                  children: [
                    isVisible ? /* @__PURE__ */ jsx(
                      Icon,
                      {
                        className: "w-5 h-5 mr-4 shrink-0",
                        style: { color: tag.color }
                      }
                    ) : /* @__PURE__ */ jsx(EyeOff, { className: "text-gray-400 mr-4 shrink-0" }),
                    tag.name
                  ]
                }
              ) }, tag.id);
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[var(--dark-gray)] text-sm font-semibold uppercase tracking-wider mb-3 px-4", children: "Gastos Fijos" }),
            /* @__PURE__ */ jsx("ul", { className: "pl-4 space-y-1", children: sortedFixedExpenses.map((fe) => {
              const Icon = iconsMap[fe.icon_name] || Receipt;
              const isVisible = visibleFixedExpenses[fe.id];
              return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setVisibleFixedExpenses((prev) => ({
                    ...prev,
                    [fe.id]: !prev[fe.id]
                  })),
                  className: `font-medium flex items-center py-3 px-4 ${isVisible ? "font-bold" : "text-gray-400"}`,
                  children: [
                    isVisible ? /* @__PURE__ */ jsx(
                      Icon,
                      {
                        className: "w-5 h-5 mr-4 shrink-0",
                        style: { color: fe.color }
                      }
                    ) : /* @__PURE__ */ jsx(EyeOff, { className: "text-gray-400 mr-4 shrink-0" }),
                    fe.name,
                    " - ",
                    fe.amount,
                    "€"
                  ]
                }
              ) }, fe.id);
            }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 my-4" }),
          /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg", children: [
            /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5" }),
            " Configuración"
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg", children: [
            /* @__PURE__ */ jsx(LogOut, { className: "w-5 h-5" }),
            " Cerrar Sesión"
          ] })
        ] })
      ] })
    ] })
  ] });
}

function DashboardWrapper() {
  return /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsx(Dashboard, {}) });
}

const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap" rel="stylesheet"><title>Dashboard</title>${renderHead()}</head> <body class="w-full min-h-screen"> <!-- IMPORTANTE: indicamos cómo se carga el componente React --> <div class="w-full max-w-screen-lg mx-auto"> ${renderComponent($$result, "DashboardWrapper", DashboardWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/cris/Desktop/jajaja/finance/src/components/DashboardWrapper.jsx", "client:component-export": "default" })} </div> </body></html>`;
}, "C:/Users/cris/Desktop/jajaja/finance/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/cris/Desktop/jajaja/finance/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
