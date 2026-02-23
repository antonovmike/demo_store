import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material";

import { addItem } from "../store/CartSlice";
import type { Product } from "../store/ProductsSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  if (!product) return null;

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardMedia
        component="img"
        image={`/images/products/${product.id}.webp`}
        alt={product.name}
        sx={{ height: 200, objectFit: "cover" }}
      />

      <Typography variant="h6" fontWeight="bold">
        {product.name}
      </Typography>
      <Typography>${Number(product.price)}</Typography>
      <Typography>{product.description}</Typography>

      <CardActions sx={{ mt: "auto" }}>
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
      </CardActions>
    </Card>
  );
}
