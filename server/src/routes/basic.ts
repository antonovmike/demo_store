import express from "express";
import type { Request, Response } from "express";
const router = express.Router();

// GET /ping
router.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

// GET /hello
router.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello");
});

// GET /status
router.get("/status", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptime: process.uptime().toFixed(2), // Uptime in seconds, rounded to 2 decimal places.
  });
});

export default router;
