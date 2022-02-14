import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const authCheck = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("user", decoded.id);
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      res.status(401);
      throw new Error("You are not authorized to access this");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("You are not authorized to access this");
  }
  next();
});

export { authCheck };
