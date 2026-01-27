import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../serverConfig.js";
import models from "../models/index.js";
const { User, Role } = models;

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({ error: "Authorization header missing" });

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token)
      return res.status(401).json({ error: "Invalid Authorization format" });

    let payload;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return res
        .status(401)
        .json({ error: "Invalid or expired token: " + err.message });
    }

    if (!payload?.id)
      return res.status(401).json({ error: "Invalid token payload" });

    const user = await User.findByPk(payload.id, {
      include: [{ model: Role, as: "role" }],
    });

    if (!user) return res.status(401).json({ error: "User not found" });

    const roleName =
      user.role?.name ??
      (user.roleId ? (await Role.findByPk(user.roleId))?.name : null);

    req.user = { id: user.id, username: user.username, role: roleName };

    console.log("checkRole req.user:", req.user);
    return next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default authMiddleware;
