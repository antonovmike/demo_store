import type { Request, Response, NextFunction } from "express";

import userService from "../services/userService.js";
import sendPasswordResetEmail from "../services/email/sendPasswordReset.js";

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
    const { email, password } = req.body;
    const token = await userService.login(email, password);
    res.json({ token });
  } catch (err) {
    const error = err as Error;
    console.error("Error logging in user:", error.message);
    if (error.message === "Email and password are required") {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === "User not found or invalid email or password") {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
}

async function resetPassword(req: Request, res: Response) {
  const { email } = req.body;

  try {
    await userService.resetPassword(email);
    res.status(200).json({ success: true });
  } catch (err: any) {
    if (err.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default { getMe, register, login, resetPassword };
