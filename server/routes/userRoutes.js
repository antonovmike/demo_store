import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js";
import { createUser, findUserByUsername } from "../db/userModel.js";
import { SECRET_KEY } from "../serverConfig.js";

const router = express.Router();

// Secure route
router.get("/me", authMiddleware, (req, res) => {
  try {
    const user = req.user;
    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user info" });
    throw err;
  }
});

// Registration
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const existing = await findUserByUsername(username);
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(username, passwordHash, role || "user");

    res
      .status(201)
      .json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    console.error("Error registering user:", err.message);
    next(err);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await findUserByUsername(username);

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res
        .status(401)
        .json({ error: "User not found or invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" },
    );

    res.json({ token });
  } catch (err) {
    console.error("Error logging in user:", err.message);
    next(err);
  }
});

export default router;
