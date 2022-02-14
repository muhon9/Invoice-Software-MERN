import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
import user from "./data/user.js";

dotenv.config();
const app = express();

connectDB();

const importDb = async () => {
  try {
    await User.insertMany(user);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyDb = async () => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyDb();
} else {
  importDb();
}
