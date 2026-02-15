import { describe, test, expect, beforeEach } from "vitest";

import cartReducer, {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  initCart,
} from "../CartSlice.js";

describe("cart reducer basic operations", () => {
  test("addItem adds new item and increments quantity", () => {
    let state = cartReducer(undefined, { type: "@@INIT" });

    state = cartReducer(
      state,
      addItem({ id: "p1", name: "Prod", price: 9.99, qty: 1 }),
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0].qty).toBe(1);

    state = cartReducer(state, addItem({ id: "p1", qty: 2 }));
    expect(state.items[0].qty).toBe(3);
  });

  test("updateQuantity, removeItem and clearCart work", () => {
    let state = cartReducer(undefined, { type: "@@INIT" });

    state = { items: [{ id: "p2", name: "X", price: 5, qty: 3 }] };

    state = cartReducer(state, updateQuantity({ id: "p2", qty: 2 }));
    expect(state.items[0].qty).toBe(2);

    state = cartReducer(state, removeItem("p2"));
    expect(state.items).toHaveLength(0);

    state = cartReducer(
      state,
      addItem({ id: "p3", name: "Y", price: 1, qty: 4 }),
    );
    state = cartReducer(state, clearCart());
    expect(state.items).toHaveLength(0);
  });
});

describe("cart reducer with localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("initCart loads items for specific user", () => {
    // Setup localStorage for two users
    localStorage.setItem(
      "cart_alice@mail.com",
      JSON.stringify([{ id: "a1", name: "Apple", price: 1, qty: 2 }]),
    );
    localStorage.setItem(
      "cart_bob@mail.com",
      JSON.stringify([{ id: "b1", name: "Banana", price: 2, qty: 5 }]),
    );

    let state = cartReducer(undefined, { type: "@@INIT" });
    expect(state.items).toHaveLength(0);

    // Init cart for Alice
    state = cartReducer(state, initCart("alice@mail.com"));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe("Apple");

    // Switch to Bob
    state = cartReducer(state, initCart("bob@mail.com"));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe("Banana");
    expect(state.items[0].qty).toBe(5);
  });

  test("clearCart empties items when user logs out", () => {
    localStorage.setItem(
      "cart_alice@mail.com",
      JSON.stringify([{ id: "a1", name: "Apple", price: 1, qty: 2 }]),
    );

    let state = cartReducer(undefined, initCart("alice@mail.com"));
    expect(state.items).toHaveLength(1);

    state = cartReducer(state, clearCart());
    expect(state.items).toHaveLength(0);
  });
});
