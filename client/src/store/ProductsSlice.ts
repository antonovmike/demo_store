import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import api from "../api/axios";

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const loadFromLocal = () => {
  try {
    const raw = localStorage.getItem("products");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const initialState: ProductsState = {
  items: loadFromLocal(),
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

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
      } catch (err) {
        console.log("Failed to persist products:", err);
      }
    },
    clearProducts(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
      try {
        localStorage.removeItem("products");
      } catch (err) {
        console.log("Failed to remove products from localStorage:", err);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
          try {
            localStorage.setItem("products", JSON.stringify(state.items));
          } catch (err) {
            console.log("Failed to persist products:", err);
          }
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || action.error.message || null;
      });
  },
});

export const { addProduct, setProducts, clearProducts } = productsSlice.actions;
export const selectAllProducts = (state: { products: ProductsState }) =>
  state.products.items;
export const selectProductsStatus = (state: { products: ProductsState }) =>
  state.products.status;
export const selectProductsError = (state: { products: ProductsState }) =>
  state.products.error;

export default productsSlice.reducer;
