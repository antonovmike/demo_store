import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

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
          </div>
        ))}
      </div>
    </div>
  );
}