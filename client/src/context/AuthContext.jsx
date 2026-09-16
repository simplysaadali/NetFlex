import { createContext, useState, useEffect } from "react";
import api from "../api/api.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, restore session using the httpOnly cookie
  // (sent automatically by the browser — no localStorage needed)
  useEffect(() => {
    api
      .get("/users/profile")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Returns server response so Register page can redirect to verify-email with email
  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data; // { success, message, userId }
  };

  // Called after OTP verification — server sets cookie and returns user
  const verifyEmail = async (email, otp) => {
    const res = await api.post("/auth/verify-email", { email, otp });
    setUser(res.data.user);
    return res.data.user;
  };

  // Login: server sets httpOnly cookie; response body has { user }
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
    return res.data.user;
  };

  // Logout: ask server to clear the cookie
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (_) {
      // ignore network errors on logout
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, verifyEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

