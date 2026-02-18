import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../models/user.js";
import userService from "../services/userService.js";

import type { Request, Response, NextFunction } from "express";

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

async function verifyResetToken(req: Request, res: Response) {
  const { token } = req.body;
  console.log("Received token:", token);

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    res.status(200).json({ message: "Token valid" });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export async function confirmResetPassword(req: Request, res: Response) {
  const { token, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findOne({ where: { email: payload.userEmail } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password_hash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully reset" });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export default {
  getMe,
  register,
  login,
  resetPassword,
  verifyResetToken,
  confirmResetPassword,
};
