import { configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

import cartReducer from "./CartSlice";
import productsReducer from "./ProductsSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";

const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  // Persist cart after reducers run
  const state = storeAPI.getState();
  const username = state.user.user?.username;
  console.log("Persisting cart for", username, state.cart.items);
  try {
    localStorage.setItem("cart_" + username, JSON.stringify(state.cart.items));
    console.log("Persisting cart for", username, state.cart.items);
  } catch (err) {
    console.error("Failed to persist cart:", err);
  }
  return result;
};

// const preloadedState = {};
// hydrate is already done in slice initialState using localStorage,
// so preloadedState is optional
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  // preloadedState,
});

export default store;
