import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
  } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded p-4 flex justify-between">
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p>${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-semibold">
          Total: ${getTotal().toFixed(2)}
        </p>
        <button
          onClick={clearCart}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}