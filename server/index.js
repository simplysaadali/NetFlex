import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"

const PORT = process.env.PORT;

const code = express();
code.use(express.json());
code.use(cookieParser());

connectDB();

code.get("/", (req, res)=> console.log("API is running, DW"));
code.use("/users", userRoutes)
code.use("/auth", authRoutes)

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB connected");
    code.listen(PORT, () => console.log("Server running on port " + PORT));
  })
  .catch((err) => console.log("MongoDB error:", err.message));
