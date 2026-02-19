import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { addItem } from "../store/CartSlice";
import type { Product } from "../store/ProductsSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  if (!product) return null;

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold">{product.name}</h2>
      <p>${Number(product.price)}</p>
      <p className="text-sm text-gray-500">{product.description}</p>

      <Button
        onClick={() =>
          dispatch(
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              qty: 1,
            }),
          )
        }
        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
      >
        Add to cart
      </Button>
    </div>
  );
}
