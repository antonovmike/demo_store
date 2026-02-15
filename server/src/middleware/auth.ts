import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../serverConfig.js";
import models from "../models/index.js";
const { User, Role } = models;

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      console.warn(
        `Unauthorized access attempt to ${req.originalUrl} — no Authorization header`,
      );
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      console.warn(
        `Unauthorized access attempt to ${req.originalUrl} — invalid format`,
      );
      return res.status(401).json({ error: "Invalid Authorization format" });
    }

    let payload;

    try {
      payload = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    } catch (err) {
      console.warn(
        `Unauthorized access attempt to ${req.originalUrl} — invalid/expired token`,
      );
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const user = await User.findByPk(payload.id, {
      include: [{ model: Role, as: "role" }],
    });

    if (!user) {
      console.warn(
        `Unauthorized access attempt to ${req.originalUrl} — user not found`,
      );
      return res.status(401).json({ error: "User not found" });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role?.name,
    };

    return next();
  } catch (err) {
    const error = err as Error;
    console.error("Unexpected authMiddleware error:", error.message);
    console.error(error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default authMiddleware;
