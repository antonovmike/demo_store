import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../serverConfig.js";
import userRepository from "../repositories/userRepository.js";

async function register(
  username: string,
  email: string,
  password: string,
  role?: string,
) {
  if (!username || !password) {
    throw new Error("Username, email and password are required");
  }

  const existing = await userRepository.findUserByUsername(username);
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(
    username,
    passwordHash,
    role || "user",
  );

  return user;
}

async function login(username: string, password: string) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const user = await userRepository.findUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error("User not found or invalid username or password");
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
}

export default { register, login };
