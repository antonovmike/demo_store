import { createSlice } from '@reduxjs/toolkit';

// slice reads localStorage during initialization

const loadFromLocal = () => {
  try {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const initialState = {
  items: loadFromLocal(), // array of { id, name, price, qty, ... }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const payload = action.payload; // { id, name, price, qty? }
      const existing = state.items.find(i => i.id === payload.id);
      if (existing) {
        existing.qty = (existing.qty || 1) + (payload.qty || 1);
      } else {
        state.items.push({ ...payload, qty: payload.qty || 1 });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    },
    updateQuantity(state, action) {
      const { id, qty } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.qty = qty;
    },
    clearCart(state) {
      state.items = [];
    },
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setItems } = cartSlice.actions;
export default cartSlice.reducer;