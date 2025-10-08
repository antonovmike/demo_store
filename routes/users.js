const express = require("express");
const bcrypt = require("bcrypt");
const { createUser, findUserByUsername } = require("../models/userModel");

const router = express.Router();

// Registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Check if user exists
  if (findUserByUsername(username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser(username, passwordHash);

  res.status(201).json({ id: user.id, username: user.username });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const user = findUserByUsername(username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({ message: "Login successful (JWT will be added later)" });
});

module.exports = router;
