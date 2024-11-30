import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false); // Loading completed
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
