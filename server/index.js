import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
const apiLimiter = require("./middleware/rateLimit");

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import watchListRoutes from "./routes/watchListRoutes.js";
import moviesRoutes from "./routes/movieRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT;

const code = express();
code.use(express.json());
code.use(cookieParser());
app.use("/api", apiLimiter);

connectDB();

code.get("/", (req, res)=> console.log("API is running, DW"));
code.use("/api/auth", authRoutes);
code.use("/api/users", userRoutes);
code.use("/api/watchlist", watchListRoutes);
code.use("/api/movies", moviesRoutes);

code.use(notFound);
code.use(errorHandler);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB connected");
    code.listen(PORT, () => console.log("Server running on port " + PORT));
  })
  .catch((err) => console.log("MongoDB error:", err.message));
