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
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        textAlign={"center"}
      >
        Products
      </Typography>

      {status === "loading" && <Divider>Loading products...</Divider>}
      {status === "failed" && (
        <Divider>Error loading products: {error}</Divider>
      )}

      <Box
        sx={{
          display: "grid",
          // Choose the variant later
          gridTemplateColumns: "repeat(2, 400px)", // 2 columns 400px max
          // gridTemplateColumns: "repeat(2, minmax(350px, 1fr))", // 2 columns 350px min
          // gridTemplateColumns: {
          //   xs: "1fr", // 1 column on smartphone
          //   sm: "repeat(2, minmax(350px, 1fr))", // 2 columns on tablet
          //   md: "repeat(3, minmax(350px, 1fr))", // 3 columns on desctop
          // },
          justifyContent: "center",
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
