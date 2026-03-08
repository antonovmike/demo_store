import express from "express";

import authMiddleware from "../middleware/auth.js";
import userController from "../controllers/userController.js";
import { upload } from "../multipart/form-data.js";

const router = express.Router();

router.get("/me", authMiddleware, userController.getMe);
router.post("/register", upload.single("avatar"), userController.register);
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);
router.post("/verify-reset-token", userController.verifyResetToken);
router.post("/confirm-reset-password", userController.confirmResetPassword);

router.put(
  "/me/avatar",
  authMiddleware,
  upload.single("avatar"),
  userController.updateAvatar,
);

export default router;
