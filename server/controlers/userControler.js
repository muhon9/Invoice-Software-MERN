import expreess from "express";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

//@description check user login
//@route POST/user/login
//@access public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("User Name or Password Wrong");
  }
});

//@description register new user
//@route POST/user
//@access public

export const regUser = asyncHandler(async (req, res) => {
  console.log("Data Received", req.body);
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error("User Already Registered with this Email");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Couldn't create user");
  }
});

//@description get the logged in user profile
//@route GET/user/profile
//@access protected

export const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

//@description POST update the user profile
//@route PUT/user/profile
//@access protected

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log("user", req.body);
  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@description GET list of the users
//@route GET/user/list
//@access protected

export const listUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    //.sort([[sort, order]]);

    res.json(users);
  } catch (error) {
    res.status(401);
    throw new Error("No users found");
  }
});
