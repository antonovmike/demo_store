import { Request, Response, NextFunction } from "express";

export function authorize(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role?.toLowerCase();

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }

    next();
  };
}
