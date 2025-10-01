import Router from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { createInvoice, deleteInvoice, getInvoiceById, getInvoices, updateInvoice } from "../controllers/invoiceControllers.js";

const invoiceRouter = Router();

invoiceRouter.route("/").get(authMiddleware, getInvoices).post(authMiddleware, createInvoice);
invoiceRouter
  .route("/:id")
  .get(authMiddleware, getInvoiceById)
  .put(authMiddleware, updateInvoice)
  .delete(authMiddleware, deleteInvoice);

export default invoiceRouter;
