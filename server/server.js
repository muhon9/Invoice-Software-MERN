import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";

dotenv.config();
const app = express();

//connecting Db
connectDB();

//using the middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// using route
app.use("/api/user", userRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/payment", paymentRoutes);

// middlewares for handling error
app.use(notFound);
app.use(errorHandler);

//fs.readdirSync("./routes").map((r) => app.use("/api", import("./routes/" + r)));

app.listen(process.env.PORT, () => {
  console.log("server started in port 8000");
});
