import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intentar cargar el usuario desde el estado
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error al cargar usuario:", error);
      // Limpiar si hay datos corruptos
      sessionStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    if (userData) {
      setUser(userData);
      try {
        sessionStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error al guardar usuario:", error);
      }
    }
  };

  const logout = () => {
    setUser(null);
    try {
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }

  return context;
}
