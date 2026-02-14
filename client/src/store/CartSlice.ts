import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

// slice reads localStorage during initialization

interface CartItem {
  id: string;
  productname?: string;
  price?: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
}

const loadFromLocal = (username: string) => {
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
  initialState: { items: [] } as CartState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const payload = action.payload;
      const existing = state.items.find((i) => i.id === payload.id);
      if (existing) {
        existing.qty += payload.qty || 1;
      } else {
        state.items.push({ ...payload, qty: payload.qty || 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; qty: number }>) {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = qty;
    },
    clearCart(state) {
      state.items = [];
    },
    initCart(state, action: PayloadAction<string>) {
      const username = action.payload;
      state.items = loadFromLocal(username);
      const raw = localStorage.getItem("cart_" + username);
      console.log("initCart loading for", username, "raw =", raw);
      state.items = raw ? JSON.parse(raw) : [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, initCart } =
  cartSlice.actions;
export default cartSlice.reducer;
