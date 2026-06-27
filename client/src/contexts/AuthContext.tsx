import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  providers: string[];
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function parseAuthResponse(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "账号请求失败。");
  }
  return data as { user: AuthUser | null };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/auth/me", { credentials: "include" });
    const data = await parseAuthResponse(response);
    setUser(data.user);
  }, []);

  useEffect(() => {
    refresh()
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await parseAuthResponse(response);
    setUser(data.user);
  }, []);

  const register = useCallback(async (payload: { email: string; password: string; name: string }) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await parseAuthResponse(response);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refresh }),
    [user, loading, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
