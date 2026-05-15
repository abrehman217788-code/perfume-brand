"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import jwt from "jsonwebtoken";

interface AuthUser {
  email: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((c) => c.startsWith("auth-token="))
          ?.split("=")[1];
        if (token) {
          const decoded = jwt.decode(token) as AuthUser | null;
          if (decoded?.email) {
            setUser({ email: decoded.email, name: decoded.name || "Admin" });
          }
        }
      } catch { }
      setLoading(false);
    };
    check();
  }, []);

  const logout = useCallback(() => {
    document.cookie = "auth-token=; path=/; max-age=0; Secure; SameSite=Strict";
    document.cookie = "refresh-token=; path=/api/auth; max-age=0; Secure; SameSite=Strict";
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) return { user: null, loading: false, logout: () => {} };
  return ctx;
}
