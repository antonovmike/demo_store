const express = require("express");
const { Product } = require("../models");

const router = express.Router();

// GET /products
router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// GET /products/:id
router.get("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// POST /products
router.post("/", async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  const product = await Product.create({ name, price, description });
  res.status(201).json(product);
});

// PUT /products/:id
router.put("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  const { name, price, description } = req.body;
  await product.update({ name, price, description });
  res.json(product);
});

// DELETE /products/:id
router.delete("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  await product.destroy();
  res.json({ message: "Product deleted" });
});

module.exports = router;