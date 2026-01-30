import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useDispatch } from "react-redux";
import { initCart, clearCart } from "../store/CartSlice";
import { setUser as setUserRedux } from "../store/userSlice";
import { logout as logoutRedux } from "../store/authSlice";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    console.log("AuthProvider useEffect triggered, user =", user);
    if (user) {
      console.log("AuthProvider: initCart for", user.username);
      dispatch(setUserRedux(user));
      dispatch(initCart(user.username));
    } else {
      console.log("AuthProvider: clearCart called");
      dispatch(setUserRedux(null));
      dispatch(clearCart());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    dispatch(logoutRedux());
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
