import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const localStorageMiddleware = storeAPI => next => action => {
  const result = next(action);
  // Persist cart after reducers run
  const state = storeAPI.getState();
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart.items));
  } catch { 
    /* ignore */
  }
  return result;
};

// const preloadedState = {};
// hydrate is already done in slice initialState using localStorage, 
// so preloadedState is optional
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
    // preloadedState,
});

export default store;