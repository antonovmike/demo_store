const express = require("express");
const { Product } = require("../models");

const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

// Everyone can view products
// GET /products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Only admin can create, update, delete products
// POST /products
router.post("/", auth, checkRole("admin"), async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }
    const product = await Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /products/:id
router.put("/:id", auth, checkRole("admin"), async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const { name, price, description } = req.body;
    await product.update({ name, price, description });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /products/:id
router.delete("/:id", auth, checkRole("admin"), async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;