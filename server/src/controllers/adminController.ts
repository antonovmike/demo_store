import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/user.js";
import { Role } from "../models/role.js";

// Admin can change user's password
async function changeUserPassword(req: Request, res: Response) {
  try {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
      return res
        .status(400)
        .json({ error: "User ID and new password are required" });
    }
    // Admins are not working with their own profile, but with another user whose password
    // they want to change.
    // In this case, req.user contains the admin’s own data, while userId is included in the
    // request body and points to the target user. Therefore, a separate database query is
    // needed to find the specific user for whom the admin is changing the password.
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password_hash = passwordHash;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    const error = err as Error;
    console.error("Error changing user password:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function listUsers(req: Request, res: Response) {
  const users = await User.findAll({ include: [{ model: Role, as: "role" }] });
  res.json(users);
}

export default {
  changeUserPassword,
};
