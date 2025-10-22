import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { EyeClosed, Eye } from "lucide-react";

export default function Register() {
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

  if (!mounted) return <div>Cargando...</div>;

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
        body: JSON.stringify({ username, email, password }),
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

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#f8fbfa] dark:bg-background-dark font-display p-4">
      {" "}
      <div className="w-full max-w-[480px]">
        {" "}
        <h1 className="text-[#0e1a13] text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6 dark:text-white">
          Crea tu Cuenta{" "}
        </h1>
        <div className="flex flex-col gap-4 py-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <label className="flex flex-col">
            <p className="text-[#0e1a13] text-base font-medium pb-2 dark:text-gray-300">
              Email
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="tucorreo@ejemplo.com"
              className="form-input w-full rounded-lg text-[#0e1a13] bg-[#e8f2ec] h-14 p-4 placeholder:text-[#51946c] dark:bg-[#1f2e25] dark:text-white dark:placeholder:text-gray-400 border-none focus:ring-0 outline-none"
            />
          </label>

          {/* Contraseña */}
          <label className="flex flex-col">
            <p className="text-[#0e1a13] text-base font-medium pb-2 dark:text-gray-300">
              Contraseña
            </p>
            <div className="flex w-full items-stretch rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Mínimo 8 caracteres"
                className="form-input flex w-full rounded-l-lg text-[#0e1a13] bg-[#e8f2ec] h-14 p-4 placeholder:text-[#51946c] dark:bg-[#1f2e25] dark:text-white dark:placeholder:text-gray-400 border-none focus:ring-0 outline-none"
              />
              <div
                className="text-[#51946c] flex items-center justify-center px-4 bg-[#e8f2ec] rounded-r-lg dark:bg-[#1f2e25] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined dark:text-gray-400">
                  {showPassword ? <Eye /> : <EyeClosed />}
                </span>
              </div>
            </div>
          </label>

          {/* Confirmar contraseña */}
          <label className="flex flex-col">
            <p className="text-[#0e1a13] text-base font-medium pb-2 dark:text-gray-300">
              Confirmar Contraseña
            </p>
            <div className="flex w-full items-stretch rounded-lg">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder=""
                className="form-input flex w-full rounded-l-lg text-[#0e1a13] bg-[#e8f2ec] h-14 p-4 placeholder:text-[#51946c] dark:bg-[#1f2e25] dark:text-white dark:placeholder:text-gray-400 border-none focus:ring-0 outline-none"
              />
              <div
                className="text-[#51946c] flex items-center justify-center px-4 bg-[#e8f2ec] rounded-r-lg dark:bg-[#1f2e25] cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <span className="material-symbols-outlined dark:text-gray-400">
                  {showConfirmPassword ? <Eye /> : <EyeClosed />}
                </span>
              </div>
            </div>
          </label>
        </div>
        <button
          onClick={handleRegister}
          disabled={isLoading || !email || !password}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-center text-lg font-bold text-black dark:text-background-dark mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
        </button>
        <p className="text-center text-sm text-[#51946c] pt-4 dark:text-gray-400">
          Al crear una cuenta, aceptas nuestros{" "}
          <a
            className="font-medium text-primary dark:text-primary/80 hover:underline"
            href="#"
          >
            Términos y Condiciones
          </a>
          .
        </p>
        <div className="flex items-center justify-center gap-2 py-6">
          <p className="text-base text-[#0e1a13] dark:text-gray-300">
            ¿Ya tienes una cuenta?
          </p>
          <a
            href="/"
            className="text-base font-bold text-primary dark:text-primary/80 hover:underline"
          >
            Iniciar sesión
          </a>
        </div>
      </div>
    </div>
  );
}
