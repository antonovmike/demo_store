import type { Request, Response, NextFunction } from "express";
// Middleware: 404 handler
function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "Not found" });
}
// Middleware: Error handler
interface HttpError extends Error {
  status?: number;
}

function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error("=== Error Handler ===");
  console.error("Time:", new Date().toISOString());
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("Request URL:", req.originalUrl);
  console.error("Method:", req.method);
  console.error("Headers:", req.headers);
  console.error("Body:", req.body);

  // Send error response to client
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    path: req.originalUrl,
    method: req.method,
  });
}

export { notFound, errorHandler };
export type { HttpError };
