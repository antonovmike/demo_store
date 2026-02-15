import type { Request, Response, NextFunction } from "express";

import userService from "../services/userService.js";

async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    const error = err as Error;
    console.error("Error fetching user info:", error.message);
    next(error);
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password, role } = req.body;
    const user = await userService.register(username, email, password, role);
    res.status(201).json(user);
  } catch (err) {
    const error = err as Error;
    console.error("Error registering user:", error.message);
    if (error.message === "Username and password are required") {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === "User already exists") {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.json({ token });
  } catch (err) {
    const error = err as Error;
    console.error("Error logging in user:", error.message);
    if (error.message === "Username and password are required") {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === "User not found or invalid username or password") {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
}

export default { getMe, register, login };
