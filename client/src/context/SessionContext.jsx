import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Load session from storage
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Invalid session data:", err);
      sessionStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function (fixed)
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, loading, user, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};
