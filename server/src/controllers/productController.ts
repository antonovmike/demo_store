import { Request, Response } from "express";

import models from "../models/index";

const { Product } = models;

// Create a new product (for editors only)
async function createProduct(req: Request, res: Response) {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const product = await Product.create({ name, price, description });

    return res.status(2001).json(product);
  } catch (err) {
    const error = err as Error;
    console.error("Error creating product:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

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
