import { createSlice } from "@reduxjs/toolkit";

// slice reads localStorage during initialization

const loadFromLocal = (username) => {
  if (!username) return [];
  try {
    const raw = localStorage.getItem("cart_" + username);
    console.log("loadFromLocal for", username, "raw =", raw);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const payload = action.payload; // { id, name, price, qty? }
      const existing = state.items.find((i) => i.id === payload.id);
      if (existing) {
        existing.qty = (existing.qty || 1) + (payload.qty || 1);
      } else {
        state.items.push({ ...payload, qty: payload.qty || 1 });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    updateQuantity(state, action) {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = qty;
    },
    clearCart(state) {
      state.items = [];
    },
    setItems(state, action) {
      state.items = action.payload;
    },
    initCart(state, action) {
      const username = action.payload;
      state.items = loadFromLocal(username);
      const raw = localStorage.getItem("cart_" + username);
      console.log("initCart loading for", username, "raw =", raw);
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setItems,
  initCart,
} = cartSlice.actions;
export default cartSlice.reducer;
