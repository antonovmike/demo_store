import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { items } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  // Implementation for displaying cart items
}