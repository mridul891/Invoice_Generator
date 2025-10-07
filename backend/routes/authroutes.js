import { Router } from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
  updateUserPassword,
  forgetPassword,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", authMiddleware, getMe);
authRouter.put("/me", authMiddleware, updateUserProfile);
authRouter.post("/update-password/:token", updateUserPassword);
authRouter.post("/forget", forgetPassword);

export default authRouter;
