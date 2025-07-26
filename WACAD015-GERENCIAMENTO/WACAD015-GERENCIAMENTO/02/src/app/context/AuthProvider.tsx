"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  userEmail: string | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userEmail, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("user");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const login = async (userEmail: string) => {
    setEmail(userEmail);
    localStorage.setItem("user", userEmail);
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem("user");
  };

  const value = {
    userEmail,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
