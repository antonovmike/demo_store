import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

const loadFromLocal = () => {
  try {
    const raw = localStorage.getItem("products");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadFromLocal(),
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
      try {
        localStorage.setItem("products", JSON.stringify(state.items));
      } catch (err) {
        console.error("Failed to persist products:", err);
      }
    },
    setProducts(state, action) {
      state.items = action.payload;
      try {
        localStorage.setItem("products", JSON.stringify(state.items));
      } catch {
        /* ignore */
      }
    },
    clearProducts(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
      try {
        localStorage.removeItem("products");
      } catch {
        /* ignore */
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        try {
          localStorage.setItem("products", JSON.stringify(state.items));
        } catch {
          /* ignore */
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { addProduct, setProducts, clearProducts } = productsSlice.actions;
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
