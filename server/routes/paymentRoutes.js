import express from "express";
import { authCheck } from "../middlewares/authMiddlewares.js";
import {
  listPayment,
  addPayment,
  singleInvoicePayment,
} from "../controlers/paymentControler.js";

const router = express.Router();

router.get("/list", authCheck, listPayment);
router.get("/list/:invoice_id", authCheck, singleInvoicePayment);
router.post("/add", authCheck, addPayment);

export default router;
