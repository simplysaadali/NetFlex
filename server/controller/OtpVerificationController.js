import User from "../models/User.js";
import { signToken, cookieOption, publicUser } from "../utils/helper.js";

export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check required fields
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required!",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        // Check if already verified
        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified!",
            });
        }

        // Check if OTP exists
        if (!user.emailOTP || !user.emailOTPExpires) {
            return res.status(400).json({
                success: false,
                message: "No OTP found. Please request a new OTP!",
            });
        }

        // Check OTP expiry
        if (user.emailOTPExpires < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new OTP!",
            });
        }

        // Check OTP
        if (user.emailOTP !== String(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP!",
            });
        }

        // Verify email
        user.isEmailVerified = true;

        // Remove OTP after successful verification
        user.emailOTP = undefined;
        user.emailOTPExpires = undefined;

        await user.save();

        // Create JWT after email verification

        // Set authentication cookie
        res.cookie("token", signToken(user), cookieOption());

        return res.status(200).json({
            success: true,
            message: "Email verified successfully!",
            user: publicUser(user),
        });

    } catch (error) {
        console.error("Email verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};