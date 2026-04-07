import { Request, Response } from "express";

import models from "../models/index";

const { Product } = models;

// Create a new product (for editors only)
async function createProduct() {}

// Get a list of products (for everyone)
async function listProducts(req: Request, res: Response) {
  try {
    const products = await Product.findAll();
    return res.json(products);
  } catch (err) {
    const error = err as Error;
    console.error("Error fetching products:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default {
  createProduct,
  listProducts,
};
