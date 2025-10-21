import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="border rounded p-4">
            <h2 className="font-semibold">{p.name}</h2>
            <p>${p.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{p.description}</p>

            <button
              onClick={() => addToCart(p)}
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}