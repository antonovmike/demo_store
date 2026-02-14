import { describe, test, expect } from "vitest";

import productsReducer, {
  setProducts,
  clearProducts,
  fetchProducts,
} from "../ProductsSlice.js";

import type { ProductsState } from "../ProductsSlice.js";

describe("products reducer", () => {
  test("setProducts and fetchProducts.fulfilled update state", () => {
    let state = productsReducer(undefined, { type: "@@INIT" });

    state = productsReducer(
      state,
      setProducts([{ id: "a", name: "A", price: 10 }]),
    );
    expect(state.items).toHaveLength(1);

    const loading: ProductsState = { ...state, status: "loading" };
    const fulfilledAction = {
      type: fetchProducts.fulfilled.type,
      payload: [{ id: "b", name: "B", price: 20 }],
    };
    state = productsReducer(loading, fulfilledAction);
    expect(state.status).toBe("succeeded");
    expect(state.items[0].id).toBe("b");

    state = productsReducer(state, clearProducts());
    expect(state.items).toHaveLength(0);
    expect(state.status).toBe("idle");
  });
});
