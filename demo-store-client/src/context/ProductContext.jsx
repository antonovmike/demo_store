import { useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products from API on mount
  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Add new product
  const addNewProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addNewProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};