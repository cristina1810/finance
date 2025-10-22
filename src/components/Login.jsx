import { useState } from "react";
import { useUser } from "../context/UserContext";
import { Mail, Lock, PiggyBank } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const context = useUser();

  if (!context) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        {" "}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {" "}
          <p className="text-red-600 font-semibold">
            Error: UserProvider no envuelve este componente{" "}
          </p>{" "}
        </div>{" "}
      </div>
    );
  }

  const { login } = context;

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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

  return (
    <div className="bg-background-light text-text-light font-display min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
      {" "}
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        {/* Icono superior */}{" "}
        <div className="flex flex-col items-center mb-10 text-center">
          {" "}
          <div className="bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center rounded-full size-20 mb-6">
            <PiggyBank className="" />
          </div>{" "}
          <h1 className="text-3xl font-bold tracking-tight text-text-light">
            ¡Bienvenido de vuelta!{" "}
          </h1>{" "}
          <p className="text-[var(--secondary-text)] mt-2">
            Inicia sesión para gestionar tus finanzas.{" "}
          </p>{" "}
        </div>
        <div className="w-full flex flex-col gap-4">
          {error && (
            <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Campo email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-secondary-text mb-2 block"
            >
              Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text">
                <Mail />
              </span>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-14 pl-11 pr-4 bg-white border border-border-color rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Campo contraseña */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-secondary-text mb-2 block"
            >
              Contraseña
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text">
                <Lock />
              </span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-14 pl-11 pr-4 bg-white border border-border-color rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Botón de login */}
          <button
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-[var(--primary)] text-white text-base font-bold leading-normal tracking-wide mt-6 hover:bg-opacity-90 transition-all shadow-lg shadow-[var(--primary)]/20 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-[var(--secondary-text)]">
              ¿No tienes una cuenta?{" "}
              <a
                href="/register"
                className="font-bold text-[var(--primary)] hover:underline"
              >
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
