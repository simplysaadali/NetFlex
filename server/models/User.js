import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    isEmailVerified: {
        type: Boolean,
        default: false,
    },

    emailOTP: {
        type: String,
    },

    emailOTPExpires: {
        type: Date,
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

export default mongoose.model("User", userSchema);