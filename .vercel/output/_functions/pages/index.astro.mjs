import { e as createComponent, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_xzqXscmh.mjs';
/* empty css                                       */
import { jsxs, jsx } from 'react/jsx-runtime';
import { u as useUser, U as UserProvider } from '../chunks/UserContext_BI7wIkIy.mjs';
import { useState } from 'react';
import { PiggyBank, Mail, Lock } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const context = useUser();
  if (!context) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center h-screen bg-red-50", children: [
      " ",
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [
        " ",
        /* @__PURE__ */ jsxs("p", { className: "text-red-600 font-semibold", children: [
          "Error: UserProvider no envuelve este componente",
          " "
        ] }),
        " "
      ] }),
      " "
    ] });
  }
  const { login } = context;
  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const { data, error: apiError } = await res.json();
      if (apiError) {
        setError(apiError);
      } else {
        login(data);
        window.location.href = "/dashboard";
      }
    } catch {
      setError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && password) {
      handleLogin();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-background-light text-text-light font-display min-h-screen flex flex-col items-center justify-center p-6 sm:p-8", children: [
    " ",
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center w-full max-w-md", children: [
      " ",
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-10 text-center", children: [
        " ",
        /* @__PURE__ */ jsx("div", { className: "bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center rounded-full size-20 mb-6", children: /* @__PURE__ */ jsx(PiggyBank, { className: "" }) }),
        " ",
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold tracking-tight text-text-light", children: [
          "¡Bienvenido de vuelta!",
          " "
        ] }),
        " ",
        /* @__PURE__ */ jsxs("p", { className: "text-[var(--secondary-text)] mt-2", children: [
          "Inicia sesión para gestionar tus finanzas.",
          " "
        ] }),
        " "
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-4", children: [
        error && /* @__PURE__ */ jsx("div", { className: "mb-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600", children: error }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "email",
              className: "text-sm font-medium text-secondary-text mb-2 block",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text", children: /* @__PURE__ */ jsx(Mail, {}) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "email",
                type: "email",
                placeholder: "tu@email.com",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                onKeyPress: handleKeyPress,
                className: "w-full h-14 pl-11 pr-4 bg-white border border-border-color rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary transition-all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "password",
              className: "text-sm font-medium text-secondary-text mb-2 block",
              children: "Contraseña"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text", children: /* @__PURE__ */ jsx(Lock, {}) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "password",
                type: "password",
                placeholder: "••••••••",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                onKeyPress: handleKeyPress,
                className: "w-full h-14 pl-11 pr-4 bg-white border border-border-color rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary transition-all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleLogin,
            disabled: isLoading || !email || !password,
            className: "flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-[var(--primary)] text-white text-base font-bold leading-normal tracking-wide mt-6 hover:bg-opacity-90 transition-all shadow-lg shadow-[var(--primary)]/20 disabled:bg-gray-300 disabled:cursor-not-allowed",
            children: isLoading ? "Iniciando sesión..." : "Iniciar Sesión"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-[var(--secondary-text)]", children: [
          "¿No tienes una cuenta?",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/register",
              className: "font-bold text-[var(--primary)] hover:underline",
              children: "Regístrate"
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}

function LoginWrapper() {
  return /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsx(Login, {}) });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap" rel="stylesheet"><title>Login</title>${renderHead()}</head> <body> ${renderComponent($$result, "LoginWrapper", LoginWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/cris/Desktop/jajaja/finance/src/components/LoginWrapper.jsx", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/cris/Desktop/jajaja/finance/src/pages/index.astro", void 0);

const $$file = "C:/Users/cris/Desktop/jajaja/finance/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
