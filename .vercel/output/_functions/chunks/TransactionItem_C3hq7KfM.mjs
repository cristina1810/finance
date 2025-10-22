import { jsxs, jsx } from 'react/jsx-runtime';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { u as useSwipe } from './useSwipe_CXu0HAZV.mjs';

function TransactionItem({
  transaction,
  tags,
  account,
  onDelete,
  mode = "tag"
}) {
  const { swipeOffset, handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe();
  const sign = transaction.type === "income" ? "+" : "-";
  const tag = tags.find((tag2) => tag2.id === transaction.tag_id);
  const handleDelete = async () => {
    if (!window.confirm("¿Eliminar esta transacción?")) return;
    await onDelete(transaction.id);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl flex flex-col gap-3 mb-3", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-full px-4 flex items-center justify-center bg-red-600 text-white font-bold rounded-2xl", children: /* @__PURE__ */ jsx("button", { onClick: handleDelete, children: "Borrar" }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center justify-between rounded-lg bg-white p-3 shadow-sm",
        style: {
          transform: `translateX(${swipeOffset}px)`,
          transition: swipeOffset === 0 || swipeOffset === -100 ? "transform 0.2s ease" : "none"
        },
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `flex h-10 w-10 items-center justify-center rounded-full ${transaction.type === "income" ? "bg-[var(--income-light)] text-[var(--income-text)]" : "bg-[var(--expense-light)] text-[var(--expense-text)]"}`,
                children: transaction.type === "income" ? /* @__PURE__ */ jsx(ArrowUp, {}) : /* @__PURE__ */ jsx(ArrowDown, {})
              }
            ),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: transaction.description }),
              mode === "tag" && account && /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--dark-gray)]", children: account.name }),
              mode === "account" && tag && /* @__PURE__ */ jsx("p", { className: "text-sm text-[var(--dark-gray)]", children: tag.name })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `font-semibold ${transaction.type === "income" ? "text-[var(--income-text)]" : "text-[var(--expense-text)]"}`,
              children: [
                sign,
                " ",
                transaction.amount,
                " €"
              ]
            }
          )
        ]
      }
    )
  ] });
}

export { TransactionItem as T };
