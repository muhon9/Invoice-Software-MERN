import expreess from "express";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { authCheck } from "../middlewares/authMiddlewares.js";
import {
  addClient,
  listClient,
  listQueryClient,
  totalClients,
} from "../controlers/clientControler.js";

const router = expreess.Router();

router.get("/list", authCheck, listClient);
router.get("/listquery", authCheck, listQueryClient);
router.get("/totalClients", authCheck, totalClients);
router.post("/add", authCheck, addClient);

export default router;
