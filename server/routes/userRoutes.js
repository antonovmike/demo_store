import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js";
import { createUser, findUserByUsername } from "../db/userModel.js";
import { SECRET_KEY } from "../serverConfig.js";

const router = express.Router();

// Secure route
router.get("/me", authMiddleware, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

// Registration
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Check if user exists
  const existing = await findUserByUsername(username);
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(username, passwordHash, role || 'user');

  res.status(201).json({ id: user.id, username: user.username, role: user.role });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Generate token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" } // The token lives for 1 hour
  );

  res.json({ token });
});

export default router;