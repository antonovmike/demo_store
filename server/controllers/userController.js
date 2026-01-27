import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../serverConfig.js";
import userRepository from "../repositories/userRepository.js";

async function getMe(req, res, next) {
  try {
    const user = req.user;
    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    console.error("Error fetching user info:", err.message);
    next(err);
  }
}

async function register(req, res, next) {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const existing = await userRepository.findUserByUsername(username);
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(
      username,
      passwordHash,
      role || "user",
    );

    res.status(201).json(user);
  } catch (err) {
    console.error("Error registering user:", err.message);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await userRepository.findUserByUsername(username);
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
}

export default { getMe, register, login };
