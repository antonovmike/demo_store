import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Divider, Button, TextField, Typography } from "@mui/material";

import {
  fetchProducts,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
} from "../store/ProductsSlice";
import ProductCard from "./ProductCard";
import type { AppDispatch } from "../store/store";

export default function ProductsPage() {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <Box className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {status === "loading" && <Divider>Loading products...</Divider>}
      {status === "failed" && (
        <Divider className="text-red-600">
          Error loading products: {error}
        </Divider>
      )}

      <Box className="grid grid-cols-2 gap-4">
        {Array.isArray(products) ? (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <Divider className="text-red-600">Invalid products response</Divider>
        )}
      </Box>
    </Box>
  );
}
