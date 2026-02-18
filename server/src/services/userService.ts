import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../serverConfig.js";
import userRepository from "../repositories/userRepository.js";
import { send } from "node:process";
import sendPasswordResetEmail from "./email/sendPasswordReset.js";

async function register(
  username: string,
  email: string,
  password: string,
  role?: string,
) {
  if (!username || !email || !password) {
    throw new Error("Username, email and password are required");
  }

  const existing = await userRepository.findUserByEmail(email);
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(
    username,
    email,
    passwordHash,
    role || "user",
  );

  return user;
}

async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("User not found or invalid email or password");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
}

async function resetPassword(email: string) {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  await sendPasswordResetEmail(email);

  // Verify the token from the email and then update the password

  return true;
}

export default { register, login, resetPassword };
