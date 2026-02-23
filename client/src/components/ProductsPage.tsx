import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";

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
    <>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Products
      </Typography>

      {status === "loading" && <Divider>Loading products...</Divider>}
      {status === "failed" && (
        <Divider>Error loading products: {error}</Divider>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        {" "}
        {Array.isArray(products) ? (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <Divider sx={{ color: "error.main" }}>
            Invalid products response
          </Divider>
        )}{" "}
      </Box>
    </>
  );
}
