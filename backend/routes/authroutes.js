import { Router } from "express";
import { registerUser, loginUser ,getMe , updateUserProfile } from "../controllers/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const authRouter = Router();

authRouter.post("/register" , registerUser);
authRouter.post("/login" , loginUser);
authRouter.get("/me" ,authMiddleware, getMe);
authRouter.put("/me" ,authMiddleware, updateUserProfile);

export default authRouter;