const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../serverConfig.js");

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
  
    const [scheme, token] = authHeader.split(" ");
  
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Invalid Authorization format" });
    }
  
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      req.user = { id: payload.id, username: payload.username }; // добавляем в req.user
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  }
  
  module.exports = authMiddleware;