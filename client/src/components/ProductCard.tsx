import { useDispatch } from "react-redux";
import { Box, Button, Typography } from "@mui/material";

import { addItem } from "../store/CartSlice";
import type { Product } from "../store/ProductsSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  if (!product) return null;

  return (
    <Box className="border rounded p-4">
      <Typography variant="h6" fontWeight="bold">
        {product.name}
      </Typography>
      <Typography>${Number(product.price)}</Typography>
      <Typography className="text-sm text-gray-500">
        {product.description}
      </Typography>

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
    </Box>
  );
}
