import expreess from "express";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const router = expreess.Router();

router.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

router.get(
  "/user/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
