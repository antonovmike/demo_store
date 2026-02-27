import { configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

import cartReducer from "./CartSlice";
import productsReducer from "./ProductsSlice";
import profileReducer from "./profileSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";

const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  // Persist cart after reducers run
  const state = storeAPI.getState();
  const email = state.user.user?.email;
  console.log("Persisting cart for", email, state.cart.items);
  try {
    localStorage.setItem("cart_" + email, JSON.stringify(state.cart.items));
    console.log("Persisting cart for", email, state.cart.items);
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
    profile: profileReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  // preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
