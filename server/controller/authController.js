// import bcrypt from "bcryptjs";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { signToken, cookieOption, publicUser } from "../utils/helper.js";
import sendOTPEmail from "../utils/sendEmail.js"
import sendResetEmail from "../utils/sendResetEmail.js";
import crypto from "crypto";


export const register = async (req, res) => {
    try {
        const name = String(req.body.name ?? "").trim();
        const email = String(req.body.email ?? "").trim().toLowerCase();
        const password = String(req.body.password ?? "");

        if(!email || !name || !password ){
            return res.status(400).json({
                success: false,
                message: "All fields required!",
            });
        }

        const findUser = await User.findOne({ email });

        if(findUser){
            return res.status(409).json({
                message: "Email already registered!"
            })
        }

         // random otp generation
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hash,

            emailOTP: otp,
            emailOTPExpires: new Date(Date.now() + 10 * 60 * 1000),
            isEmailVerified: false,
        });

        try {
            await sendOTPEmail(email, otp);
        } catch (emailError) {
            await User.deleteOne({ _id: user._id });
            return res.status(503).json({
                success: false,
                message: emailError.message,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Registration successful. OTP sent to your email.",
            userId: user._id,
        });

    }   catch (error) {
            console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const login = async (req, res) => {
    try {
        const password = String(req.body.password ?? "");
        const email = String(req.body.email ?? "").trim().toLowerCase();
        const user = await User.findOne({ email }).select("+password");

        const ok = user && (await bcrypt.compare(password, user.password));
        // user && used as if there is no email, user is null, gives error

        if(!ok){
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in",
            });
        }

        res.cookie("token", signToken(user), cookieOption())
        .status(200).json({
            user: publicUser(user),
        });

    } catch (error) {
        console.error("Server Error: ", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", cookieOption());
        res.json({
            message: "User Logged Out",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error!",
            success: false,
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const email = String(req.body.email ?? "")
            .trim()
            .toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate random token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Save token in database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // Send email
        await sendResetEmail(user.email, resetToken);

        res.json({
            success: true,
            message: "Password reset link sent to your email"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword;

        // Remove reset token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};