import { jsx } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(void 0);
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error al cargar usuario:", error);
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
    loading
  };
  return /* @__PURE__ */ jsx(UserContext.Provider, { value, children });
}
function useUser() {
  const context = useContext(UserContext);
  if (context === void 0) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
}

export { UserProvider as U, useUser as u };
