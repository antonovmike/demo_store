import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AuthContext } from "./AuthContext";
import { initCart, clearCart } from "../store/CartSlice";
import { fetchCurrentUser, setUser as setUserRedux } from "../store/userSlice";
import { logout as logoutRedux } from "../store/authSlice";
import store from "../store/store";

import type { ReactNode } from "react";
import type { User } from "../store/userSlice";
import type { AppDispatch } from "../store/store";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    console.log("AuthProvider useEffect triggered, user =", user);
    if (user) {
      console.log("AuthProvider: initCart for", user.email);
      // Load cart from localStorage for this user
      dispatch(initCart(user.email));
      // Update user in Redux store
      dispatch(setUserRedux(user));
    } else {
      console.log("AuthProvider: clearCart called");
      dispatch(setUserRedux(null));
      dispatch(clearCart());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user?.email) {
      console.log("Hydrating cart for", user.email);
      dispatch(initCart(user.email));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(setUserRedux(null));
      dispatch(clearCart());
    }
  }, [token, dispatch]);

  const logout = () => {
    if (user?.email) {
      const items = store.getState().cart.items;
      localStorage.setItem("Logout: cart_" + user.email, JSON.stringify(items));
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    dispatch(logoutRedux());
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, email, setEmail, token, setToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
