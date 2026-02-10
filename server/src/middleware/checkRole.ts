import type { Request, Response, NextFunction } from "express";

function checkRole(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
}

export default checkRole;
