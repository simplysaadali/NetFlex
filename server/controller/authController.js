// import bcrypt from "bcryptjs";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { signToken, cookieOption, publicUser } from "../utils/helper.js";
import sendOTPEmail from "../utils/sendEmail.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!email || !name || !password ){
            return res.status(400).json({
                success: false,
                message: "All fields required!",
            });
        }

        const findUser = await User.findOne({ email });

        if(findUser){
            return res.json({
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

        await sendOTPEmail(email, otp);

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
        const { password } =  req.body;
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