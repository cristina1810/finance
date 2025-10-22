import { e as createComponent, f as createAstro, k as renderHead, l as renderComponent, r as renderTemplate } from '../../chunks/astro/server_xzqXscmh.mjs';
/* empty css                                          */
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { u as useUser, U as UserProvider } from '../../chunks/UserContext_yLHny9lX.mjs';
import { PiggyBank, Wallet, ShoppingCart, CreditCard, Baby, Smile, Tickets, RefreshCw, Notebook, Wrench, Heart, Star, Folder, Sofa, Apple, TrainFront, IdCard, ArrowLeft, Edit2 } from 'lucide-react';
import { T as TransactionItem } from '../../chunks/TransactionItem_C3hq7KfM.mjs';
export { renderers } from '../../renderers.mjs';

function TagDetail({ tagId, closePage }) {
  const { user, loadingUser } = useUser();
  const [tag, setTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedColor, setEditedColor] = useState("#B77466");
  const [editedGoal, setEditedGoal] = useState(0);
  const [editedIconName, setEditedIconName] = useState("Wallet");
  useEffect(() => {
    if (!user?.id || !tagId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const resTags = await fetch(`/api/tags?userId=${user.id}`);
        const tagsJson = await resTags.json();
        const allTags = tagsJson.data || [];
        setTags(allTags);
        const found = allTags.find((t) => t.id === tagId);
        setTag(found);
        if (found) {
          setEditedName(found.name);
          setEditedColor(found.color);
          setEditedGoal(found.goal ?? 0);
          setEditedIconName(found.icon_name || "Wallet");
        }
        const resTrans = await fetch(`/api/transactions?userId=${user.id}`);
        const userTransactions = (await resTrans.json()).data || [];
        setTransactions(userTransactions.filter((t) => t.tag_id === tagId));
        const resAcc = await fetch(`/api/accounts?userId=${user.id}`);
        const accJson = await resAcc.json();
        setAccounts(accJson.data || []);
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tagId, user]);
  if (loadingUser) return /* @__PURE__ */ jsx("p", { children: "Cargando usuario..." });
  if (!user) return /* @__PURE__ */ jsx("p", { children: "No estás logueado." });
  if (loading) return /* @__PURE__ */ jsx("p", { children: "Cargando etiqueta y transacciones..." });
  if (!tag) return /* @__PURE__ */ jsx("p", { children: "Etiqueta no encontrada." });
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const handleSave = async () => {
    try {
      const res = await fetch("/api/tags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: tag.id,
          name: editedName,
          color: editedColor,
          objetivo: editedGoal,
          iconName: editedIconName
          // <-- enviamos icono al backend
        })
      });
      const json = await res.json();
      if (!json.error) {
        setTag((prev) => ({
          ...prev,
          name: editedName,
          color: editedColor,
          objetivo: editedGoal,
          icon_name: editedIconName
          // <-- actualizamos localmente
        }));
        setIsEditing(false);
      } else {
        console.error("Error al actualizar la etiqueta:", json.error);
      }
    } catch (err) {
      console.error("Error guardando cambios:", err);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta transacción?")) return;
    try {
      const res = await fetch("/api/transactions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (!json.error) {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      } else {
        console.error("Error borrando transacción:", json.error);
      }
    } catch (err) {
      console.error("Error borrando transacción:", err);
    }
  };
  const icons = [
    {
      name: "PiggyBank",
      component: /* @__PURE__ */ jsx(PiggyBank, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Wallet",
      component: /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "ShoppingCart",
      component: /* @__PURE__ */ jsx(ShoppingCart, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "CreditCard",
      component: /* @__PURE__ */ jsx(CreditCard, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Baby",
      component: /* @__PURE__ */ jsx(Baby, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Smile",
      component: /* @__PURE__ */ jsx(Smile, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Tickets",
      component: /* @__PURE__ */ jsx(Tickets, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "RefreshCw",
      component: /* @__PURE__ */ jsx(RefreshCw, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Notebook",
      component: /* @__PURE__ */ jsx(Notebook, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Wrench",
      component: /* @__PURE__ */ jsx(Wrench, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Heart",
      component: /* @__PURE__ */ jsx(Heart, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Star",
      component: /* @__PURE__ */ jsx(Star, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Folder",
      component: /* @__PURE__ */ jsx(Folder, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Sofa",
      component: /* @__PURE__ */ jsx(Sofa, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "Apple",
      component: /* @__PURE__ */ jsx(Apple, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "TrainFront",
      component: /* @__PURE__ */ jsx(TrainFront, { className: "w-6 h-6", style: { color: tag.color } })
    },
    {
      name: "IdCard",
      component: /* @__PURE__ */ jsx(IdCard, { className: "w-6 h-6", style: { color: tag.color } })
    }
  ];
  ({
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
    Apple: /* @__PURE__ */ jsx(Apple, { className: "w-6 h-6", style: { color: tag.color } }),
    TrainFront: /* @__PURE__ */ jsx(TrainFront, { className: "w-6 h-6", style: { color: tag.color } }),
    IdCard: /* @__PURE__ */ jsx(IdCard, { className: "w-6 h-6", style: { color: tag.color } })
  });
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("div", { className: "relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[var(--background-light)] text-[var(--text-light)] font-display", children: [
    isEditing ? /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsx("div", { className: "m-5 bg-white rounded-xl shadow-xl p-6 w-full max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
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
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Objetivo" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: editedGoal,
            onChange: (e) => setEditedGoal(Number(e.target.value)),
            placeholder: "Ej: 100",
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
            className: "w-full bg-[var(--blue-light-bg)] hover:bg-green-600 text-[var(--text-light)] font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSave,
            className: "w-full bg-[var(--primary)] hover:bg-green-600 text-gray-800 font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2",
            children: "Guardar cambios"
          }
        )
      ] })
    ] }) }) }) : /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-20 bg-[var(--background-light)] px-4 pt-4 pb-2 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("button", { onClick: closePage, children: /* @__PURE__ */ jsx(ArrowLeft, {}) }),
      /* @__PURE__ */ jsxs("h1", { className: `text-[28px] font-bold flex items-center gap-2 `, children: [
        icons.find((i) => i.name === tag.icon_name)?.component || /* @__PURE__ */ jsx(Wallet, { style: { color: tag.color } }),
        tag.name
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsEditing(true),
          className: "flex items-center gap-1 ",
          children: /* @__PURE__ */ jsx(Edit2, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 rounded-xl border border-[var(--light-gray)] bg-white p-4", children: [
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
        ] }),
        /* @__PURE__ */ jsx("div", { children: tag.objetivo != null && tag.objetivo > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-[#aec0d6]/30", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-[#475482] font-medium", children: "Objetivo mensual" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-[#111827]", children: [
              totalExpenses.toFixed(2),
              " / ",
              tag.objetivo,
              " €"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-[#aec0d6]/20 rounded-full h-2", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-2 rounded-full transition-all duration-300",
              style: {
                width: `${Math.min(
                  totalExpenses / tag.objetivo * 100,
                  100
                )}%`,
                backgroundColor: totalExpenses < tag.objetivo ? tag.color : "green"
              }
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium", children: totalExpenses < tag.objetivo ? /* @__PURE__ */ jsxs("span", { className: "text-gray-700", children: [
            "Te faltan ",
            (tag.objetivo - totalExpenses).toFixed(2),
            " € para llegar al objetivo"
          ] }) : /* @__PURE__ */ jsx("span", { className: "text-green-600 font-bold", children: "¡Objetivo superado! 🎉" }) })
        ] }) })
      ] }),
      transactions.length === 0 ? /* @__PURE__ */ jsx("p", { children: "No hay transacciones para esta etiqueta." }) : /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: transactions.map((t) => {
        const account = accounts.find((a) => a.id === t.account_id);
        return /* @__PURE__ */ jsx(
          TransactionItem,
          {
            transaction: t,
            tags,
            account,
            onDelete: handleDelete,
            mode: "tag"
          },
          t.id
        );
      }) })
    ] })
  ] }) });
}

function TagDetailWrapper({ tagId }) {
  return /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsx(TagDetail, { tagId }) });
}

const $$Astro = createAstro();
const $$tagId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tagId;
  const tagId = Astro2.params.tagId;
  if (!tagId) {
    throw new Error("tagId no definido en la URL");
  }
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap" rel="stylesheet"><title>Etiqueta ${tagId}</title>${renderHead()}</head> <body> ${renderComponent($$result, "TagDetailWrapper", TagDetailWrapper, { "client:load": true, "tagId": tagId, "client:component-hydration": "load", "client:component-path": "C:/Users/cris/Desktop/jajaja/finance/src/components/TagDetailWrapper.jsx", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/cris/Desktop/jajaja/finance/src/pages/tags/[tagId].astro", void 0);

const $$file = "C:/Users/cris/Desktop/jajaja/finance/src/pages/tags/[tagId].astro";
const $$url = "/tags/[tagId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tagId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
