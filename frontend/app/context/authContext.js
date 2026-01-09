/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token) {
      setUser({ token, ...(user ? JSON.parse(user) : {}) });
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    setUser({ token, ...userData });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
