import express from "express";

import authMiddleware from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import adminController from "../controllers/adminController.js";

const router = express.Router();

// Only admin users can change passwords
router.post("/change-password", authMiddleware, authorize(["admin"]), adminController.changeUserPassword);

export default router;