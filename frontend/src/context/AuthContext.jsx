import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        const currentTime = Date.now();
        const twoHours = 2 * 60 * 60 * 1000;

        if (currentTime - parseInt(token, 10) >= twoHours) {
          logout();
        } else {
          setUser(storedUser);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
    const authInterval = setInterval(checkAuth, 60 * 1000); // Check every minute
    const clearStorageInterval = setInterval(() => {
      localStorage.clear();
      setUser(null);
    },30 * 60 * 1000 ); //storage will clear in 10 mins

    return () => {
      clearInterval(authInterval);
      clearInterval(clearStorageInterval);
    };
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", userData);
    localStorage.setItem("token", Date.now().toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
