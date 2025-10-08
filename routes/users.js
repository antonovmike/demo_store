const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");
const { createUser, findUserByUsername } = require("../db/users");

const router = express.Router();

const { SECRET_KEY } = require("../config");

// Secure route
router.get("/me", authMiddleware, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

// Registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Check if user exists
  const existing = await findUserByUsername(username); // <--- Added await
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(username, passwordHash);

  res.status(201).json({ id: user.id, username: user.username });
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

module.exports = router;
