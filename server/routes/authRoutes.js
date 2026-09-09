import express from "express";
import { login, logout, register } from "../controller/authController.js";
import { verifyEmail } from "../controller/OtpVerificationController.js";
// import User from "./models/User.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail)

export default router;
