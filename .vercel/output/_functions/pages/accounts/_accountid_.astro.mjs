import { e as createComponent, f as createAstro, k as renderHead, l as renderComponent, r as renderTemplate } from '../../chunks/astro/server_xzqXscmh.mjs';
/* empty css                                          */
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { u as useUser, U as UserProvider } from '../../chunks/UserContext_BI7wIkIy.mjs';
import { IdCard, TrainFront, Sofa, Folder, Star, Heart, Wrench, Notebook, RefreshCw, Tickets, Smile, Baby, CreditCard, ShoppingCart, Wallet, PiggyBank, ArrowLeft, Edit2, Apple } from 'lucide-react';
import { T as TransactionItem } from '../../chunks/TransactionItem_C3hq7KfM.mjs';
export { renderers } from '../../renderers.mjs';

function AccountDetail({ accountId, closePage }) {
  const { user, loadingUser } = useUser();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedColor, setEditedColor] = useState("#B77466");
  const [editedIconName, setEditedIconName] = useState("Wallet");
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
    if (!user?.id || !accountId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const resAcc = await fetch(`/api/accounts?userId=${user.id}`);
        const accJson = await resAcc.json();
        const found = accJson.data.find((acc) => acc.id === accountId);
        setAccount(found);
        if (found) {
          setEditedName(found.name);
          setEditedColor(found.color);
          setEditedIconName(found.icon_name || "Wallet");
        }
        const resTrans = await fetch(`/api/transactions?userId=${user.id}`);
        const transJson = await resTrans.json();
        if (!transJson.error) {
          const filtered = transJson.data.filter((t) => t.account_id === accountId).sort((a, b) => new Date(b.date) - new Date(a.date));
          const grouped = filtered.reduce((acc, tx) => {
            const dateKey = new Date(tx.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short"
            });
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(tx);
            return acc;
          }, {});
          setTransactions(grouped);
        }
        const resTags = await fetch(`/api/tags?userId=${user.id}`);
        const tagsJson = await resTags.json();
        if (!tagsJson.error) setTags(tagsJson.data);
      } catch (err) {
        console.error("Error cargando cuenta o transacciones:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [accountId, user]);
  if (loadingUser) return /* @__PURE__ */ jsx("p", { children: "Cargando usuario..." });
  if (!user) return /* @__PURE__ */ jsx("p", { children: "No estás logueado." });
  if (loading) return /* @__PURE__ */ jsx("p", { children: "Cargando cuenta y transacciones..." });
  if (!account) return /* @__PURE__ */ jsx("p", { children: "Cuenta no encontrada." });
  const allTransactions = Object.values(transactions).flat();
  const totalIncome = allTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = allTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;
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
  const handleSave = async () => {
    try {
      const res = await fetch("/api/accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: account.id,
          name: editedName,
          color: editedColor,
          iconName: editedIconName,
          // <-- CAMBIO AQUI
          userId: user.id
          // opcional si tu backend lo necesita
        })
      });
      const json = await res.json();
      if (!json.error) {
        setAccount((prev) => ({
          ...prev,
          name: editedName,
          color: editedColor,
          icon_name: editedIconName
          // mantén icon_name aquí para renderizar correctamente
        }));
        setIsEditing(false);
      } else {
        console.error("Error al actualizar la cuenta:", json.error);
      }
    } catch (err) {
      console.error("Error guardando cambios:", err);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[var(--background-light)] text-text-light font-display", children: [
    isEditing ? /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsx("div", { className: "m-5 bg-white round shadow-xl p-6 w-full max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Nombre de la cuenta" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: editedName,
            onChange: (e) => setEditedName(e.target.value),
            placeholder: "Ej: Cuenta Principal",
            className: "w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Color" }),
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
              onClick: () => setEditedColor(c),
              className: `w-8 h-8 rounded-full border-2 ${editedColor === c ? "border-black" : "border-gray-300"}`
            },
            c
          )),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "color",
              value: editedColor,
              onChange: (e) => setEditedColor(e.target.value),
              className: "w-8 h-8 rounded-full border-2 border-[#aec0d6]/30 focus:border-[#475482] cursor-pointer"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Selecciona un icono" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 gap-2", children: icons.map((i) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setEditedIconName(i.name),
            className: `flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer ${editedIconName === i.name ? "ring-2 ring-[var(--primary)]" : "border-gray-300"} bg-[#e8f2ec] dark:bg-[#2a3f33] text-[#0e1a13] dark:text-white`,
            children: i.component
          },
          i.name
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsEditing(false),
            className: "w-full bg-[var(--blue-light-bg)] hover:bg-green-600 text-[var(--text-light)] font-semibold py-3 round shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSave,
            className: "w-full bg-[var(--primary)] hover:bg-green-600 text-gray-800 font-semibold py-3 round shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2",
            children: "Guardar cambios"
          }
        )
      ] })
    ] }) }) }) : /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-20 bg-background-light px-4 pt-4 pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsx("button", { className: "flex items-center justify-center p-2 text-dark-gray", children: /* @__PURE__ */ jsx(ArrowLeft, { onClick: closePage }) }),
      /* @__PURE__ */ jsxs("h1", { className: "text-[28px] font-bold leading-tight tracking-[-0.015em] text-center flex-1 flex items-center justify-center gap-2", children: [
        iconsMap[account.icon_name] || /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6", style: { color: account.color } }),
        account.name
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsEditing(true),
          className: "flex items-center gap-1 text-blue-500",
          children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex  flex-col gap-4 p-4 ", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 rounded-xl border border-[var(--light-gray)] bg-white p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-base font-medium leading-normal text-[var(--dark-gray)]", children: "Saldo Actual" }),
        /* @__PURE__ */ jsxs("p", { className: "text-4xl font-bold leading-tight", children: [
          balance.toFixed(2),
          " €"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-3 text-center text-sm", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-[var(--income-text)]", children: "Ingresos" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[var(--dark-gray)]", children: [
            totalIncome.toFixed(2),
            " €"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-[var(--expense-text)]", children: "Gastos" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[var(--dark-gray)]", children: [
            totalExpenses.toFixed(2),
            " €"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-[var(--benefit-text)]", children: "Beneficios" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[var(--dark-gray)]", children: [
            balance.toFixed(2),
            " €"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex  flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "Transacciones Recientes" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: Object.keys(transactions).length === 0 ? /* @__PURE__ */ jsx("p", { children: "No hay transacciones para esta cuenta." }) : Object.keys(transactions).map((date) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-[var(--dark-gray)] mb-3", children: date }),
        transactions[date].map((t) => /* @__PURE__ */ jsx(
          TransactionItem,
          {
            transaction: t,
            tags,
            account,
            mode: "account",
            accountId: account.id,
            onDelete: async (id) => {
              try {
                const res = await fetch("/api/transactions", {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id })
                });
                const json = await res.json();
                if (!json.error) {
                  setTransactions((prev) => {
                    const newGroup = { ...prev };
                    newGroup[date] = newGroup[date].filter(
                      (tr) => tr.id !== id
                    );
                    return newGroup;
                  });
                }
              } catch (err) {
                console.error("Error borrando transacción:", err);
              }
            }
          },
          t.id
        ))
      ] }, date)) })
    ] })
  ] });
}

function AccountDetailWrapper({ accountId }) {
  const [showAccount, setShowAccount] = useState(true);
  if (!showAccount) return null;
  return /* @__PURE__ */ jsx(
    AccountDetail,
    {
      accountId,
      closePage: () => setShowAccount(false)
    }
  );
}

function AccountPage({ accountId }) {
  return /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsx(AccountDetailWrapper, { accountId }) });
}

const $$Astro = createAstro();
const $$accountId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$accountId;
  const { accountId } = Astro2.params;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap" rel="stylesheet"><title>Cuenta ${accountId}</title>${renderHead()}</head> <body> ${renderComponent($$result, "AccountPage", AccountPage, { "client:load": true, "accountId": accountId, "client:component-hydration": "load", "client:component-path": "C:/Users/cris/Desktop/jajaja/finance/src/components/AccountPage.jsx", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/cris/Desktop/jajaja/finance/src/pages/accounts/[accountId].astro", void 0);

const $$file = "C:/Users/cris/Desktop/jajaja/finance/src/pages/accounts/[accountId].astro";
const $$url = "/accounts/[accountId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$accountId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
