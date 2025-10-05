import { Router } from "express";
import {
  parseInvoiceFromText,
  generateReminderEmail,
  getDashboardSummary,
} from "../controllers/aiControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const aiRouter = Router();

aiRouter.post("/parse-text", authMiddleware, parseInvoiceFromText);
aiRouter.post("/generate-reminder", authMiddleware, generateReminderEmail);
aiRouter.get("/dashboard-summary", authMiddleware, getDashboardSummary);

export default aiRouter;
