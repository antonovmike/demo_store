import express from "express";
import models from "../models/index.js";

import auth from "../middleware/authenticate.js";
import authMiddleware from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import productController from "../controllers/productController.js";
import checkRole from "../middleware/checkRole.js";
import type { HttpError } from "../middleware/errorHandler.js";

const { Product } = models;

const router = express.Router();

// Everyone can view products
// GET /products
router.get("/", productController.listProducts);

// GET /products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    next(err);
  }
});

// Only admin can create, update, delete products
// POST /products
router.post(
  "/",
  authMiddleware,
  authorize(["editor", "admin"]), // 2 - "admin", 3 - "editor"
  productController.createProduct,
);

// PUT /products/:id
router.put("/:id", auth, checkRole("admin"), async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const { name, price, description } = req.body;
    await product.update({ name, price, description });
    res.json(product);
  } catch (err) {
    const error = err as HttpError;
    console.error("Error updating product:", error.message);
    next(error);
  }
});

// DELETE /products/:id
router.delete("/:id", auth, checkRole("admin"), async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    const error = err as HttpError;
    console.error("Error deleting product:", error.message);
    next(error);
  }
});

export default router;
