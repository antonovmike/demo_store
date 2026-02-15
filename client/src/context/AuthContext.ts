import { createContext } from "react";

import type { User } from "../store/userSlice";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
