import { useDispatch } from "react-redux";
import { Box, Button, Typography } from "@mui/material";

import { addItem } from "../store/CartSlice";
import type { Product } from "../store/ProductsSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  if (!product) return null;

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold">
        {product.name}
      </Typography>
      <Typography>${Number(product.price)}</Typography>
      <Typography>{product.description}</Typography>

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
      >
        Add to cart
      </Button>
    </Box>
  );
}
