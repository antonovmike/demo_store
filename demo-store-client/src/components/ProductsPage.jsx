import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
} from "../store/ProductsSlice";
import ProductCard from "./ProductCard";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {status === "loading" && <div>Loading products...</div>}
      {status === "failed" && (
        <div className="text-red-600">Error loading products: {error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
