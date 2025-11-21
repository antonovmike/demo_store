import cartReducer, {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from "../CartSlice.js";
import { describe, test, expect } from "vitest";

describe("cart reducer", () => {
  test("addItem adds new item and increments quantity", () => {
    let state = cartReducer(undefined, { type: "@@INIT" });

    state = cartReducer(
      state,
      addItem({ id: "p1", name: "Prod", price: 9.99 })
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0].qty).toBe(1);

    state = cartReducer(state, addItem({ id: "p1", qty: 2 }));
    expect(state.items[0].qty).toBe(3);
  });

  test("updateQuantity, removeItem and clearCart work", () => {
    let state = { items: [{ id: "p2", name: "X", price: 5, qty: 3 }] };

    state = cartReducer(state, updateQuantity({ id: "p2", qty: 2 }));
    expect(state.items[0].qty).toBe(2);

    state = cartReducer(state, removeItem("p2"));
    expect(state.items).toHaveLength(0);

    state = cartReducer(state, addItem({ id: "p3", name: "Y", price: 1 }));
    state = cartReducer(state, clearCart());
    expect(state.items).toHaveLength(0);
  });
});
