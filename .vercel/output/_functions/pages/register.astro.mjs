import { e as createComponent, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_xzqXscmh.mjs';
/* empty css                                       */
import { jsx, jsxs } from 'react/jsx-runtime';
import { u as useUser, U as UserProvider } from '../chunks/UserContext_BI7wIkIy.mjs';
import { useState, useEffect } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function Register() {
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const context = useUser();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return /* @__PURE__ */ jsx("div", { children: "Cargando..." });
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
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const { data, error: apiError } = await res.json();
      if (apiError) {
        setError(apiError);
      } else if (!data.user) {
        setError("Cuenta creada. Revisa tu correo para confirmar tu cuenta.");
      } else {
        login(data.user);
        window.location.href = "/dashboard";
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && password) {
      handleRegister();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen w-full flex-col items-center justify-center bg-[#f8fbfa] dark:bg-background-dark font-display p-4", children: [
    " ",
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[480px]", children: [
      " ",
      /* @__PURE__ */ jsxs("h1", { className: "text-[#0e1a13] text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6 dark:text-white", children: [
        "Crea tu Cuenta",
        " "
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 py-6", children: [
        error && /* @__PURE__ */ jsx("div", { className: "p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600", children: error }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] text-base font-medium pb-2 dark:text-gray-300", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              onKeyPress: handleKeyPress,
              placeholder: "tucorreo@ejemplo.com",
              className: "form-input w-full rounded-lg text-[#0e1a13] bg-[#e8f2ec] h-14 p-4 placeholder:text-[#51946c] dark:bg-[#1f2e25] dark:text-white dark:placeholder:text-gray-400 border-none focus:ring-0 outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] text-base font-medium pb-2 dark:text-gray-300", children: "Contraseña" }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-full items-stretch rounded-lg", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                onKeyPress: handleKeyPress,
                placeholder: "Mínimo 8 caracteres",
                className: "form-input flex w-full rounded-l-lg text-[#0e1a13] bg-[#e8f2ec] h-14 p-4 placeholder:text-[#51946c] dark:bg-[#1f2e25] dark:text-white dark:placeholder:text-gray-400 border-none focus:ring-0 outline-none"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "text-[#51946c] flex items-center justify-center px-4 bg-[#e8f2ec] rounded-r-lg dark:bg-[#1f2e25] cursor-pointer",
                onClick: () => setShowPassword(!showPassword),
                children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined dark:text-gray-400", children: showPassword ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeClosed, {}) })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#0e1a13] text-base font-medium pb-2 dark:text-gray-300", children: "Confirmar Contraseña" }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-full items-stretch rounded-lg", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: showConfirmPassword ? "text" : "password",
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
                onKeyPress: handleKeyPress,
                placeholder: "",
                className: "form-input flex w-full rounded-l-lg text-[#0e1a13] bg-[#e8f2ec] h-14 p-4 placeholder:text-[#51946c] dark:bg-[#1f2e25] dark:text-white dark:placeholder:text-gray-400 border-none focus:ring-0 outline-none"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "text-[#51946c] flex items-center justify-center px-4 bg-[#e8f2ec] rounded-r-lg dark:bg-[#1f2e25] cursor-pointer",
                onClick: () => setShowConfirmPassword(!showConfirmPassword),
                children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined dark:text-gray-400", children: showConfirmPassword ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeClosed, {}) })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleRegister,
          disabled: isLoading || !email || !password,
          className: "flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-center text-lg font-bold text-black dark:text-background-dark mt-4 disabled:opacity-70 disabled:cursor-not-allowed",
          children: isLoading ? "Creando cuenta..." : "Crear Cuenta"
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-[#51946c] pt-4 dark:text-gray-400", children: [
        "Al crear una cuenta, aceptas nuestros",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "font-medium text-primary dark:text-primary/80 hover:underline",
            href: "#",
            children: "Términos y Condiciones"
          }
        ),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 py-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-base text-[#0e1a13] dark:text-gray-300", children: "¿Ya tienes una cuenta?" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/",
            className: "text-base font-bold text-primary dark:text-primary/80 hover:underline",
            children: "Iniciar sesión"
          }
        )
      ] })
    ] })
  ] });
}

function RegisterWrapper() {
  return /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsx(Register, {}) });
}

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap" rel="stylesheet"><title>Registro</title>${renderHead()}</head> <body> ${renderComponent($$result, "RegisterWrapper", RegisterWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/cris/Desktop/jajaja/finance/src/components/RegisterWrapper.jsx", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/cris/Desktop/jajaja/finance/src/pages/register.astro", void 0);

const $$file = "C:/Users/cris/Desktop/jajaja/finance/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
