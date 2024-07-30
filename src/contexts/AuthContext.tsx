// src/contexts/AuthContext.js
import api from "@/api/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authenticate } from "../api/auth";

const AuthContext = createContext({
  isAuthenticated: true,
  login: (email: string, password: string) => Promise.resolve(false),
  logout: () => {},
}); // src/contexts/AuthContext.js

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check for a token in localStorage and update the state accordingly
    const token = localStorage.getItem("authToken");
    api
      .get("/platform/test-token")
      .then((response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { token } = await authenticate(email, password);
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      alert("Credenciais Inválidas" + error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
