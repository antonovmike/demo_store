import { Request, Response } from "express";

import models from "../models/index";

const { Product } = models;

// Create a new product (for editors only)
async function createProduct() {}

// Get a list of products (for everyone)
async function listProducts() {}

export default {
  createProduct,
  listProducts,
};
