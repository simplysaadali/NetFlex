import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiLimiter from "./middleware/rateLimitMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";
import moviesRoutes from "./routes/movieRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT;

const code = express();
code.use(express.json());
code.use(cookieParser());
code.use(cors({ origin: "http://localhost:5173", credentials: true }));
code.use("/api", apiLimiter);

connectDB();

code.get("/", (req, res) => res.send("API is running"));
code.use("/api/auth", authRoutes);
code.use("/api/users", userRoutes);
code.use("/api/watchlist", watchListRoutes);
code.use("/api/movies", moviesRoutes);

code.use(notFound);
code.use(errorHandler);

code.listen(PORT || 5000, () => {
  console.log("Server running on port " + (PORT || 5000));
});
