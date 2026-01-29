import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart_" + user?.username);
    if (stored) setItems(JSON.parse(stored));
  }, [user]);

  // Save cart to localStorage on items change
  useEffect(() => {
    localStorage.setItem("cart_" + user?.username, JSON.stringify(items));
  }, [items, user]);

  // Add to cart
  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Increment quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Add new product
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove 1 item from cart
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Change quantity of an item
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const clearCart = () => setItems([]);

  // Total price
  const getTotal = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
