import expreess from "express";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

import { authCheck } from "../middlewares/authMiddlewares.js";
import {
  addInvoice,
  listInvoice,
  singleInvoice,
  totalInvoices,
  updateInvoice,
  deleteInvoice,
} from "../controlers/invoiceControler.js";

const router = expreess.Router();

router.get("/list", authCheck, listInvoice);
router.get("/totalinvoices", authCheck, totalInvoices);
router.post("/add", authCheck, addInvoice);
router.get("/:invoice_id", authCheck, singleInvoice);
router.put("/:invoice_id", authCheck, updateInvoice);
router.delete("/:invoice_id", authCheck, deleteInvoice);

export default router;
