import express from "express";
import authMiddleware from "../middleware/auth.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authMiddleware, authMiddleware, userController.getMe);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
