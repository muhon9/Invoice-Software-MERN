import expreess from "express";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import {
  authUser,
  regUser,
  getUserProfile,
  updateUserProfile,
  listUsers,
} from "../controlers/userControler.js";
import { authCheck } from "../middlewares/authMiddlewares.js";

const router = expreess.Router();

router.post("/login", authUser);
router.post("/", regUser);
router.get("/profile", authCheck, getUserProfile);
router.get("/list", authCheck, listUsers);
router.put("/profile", authCheck, updateUserProfile);

export default router;
