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
        select: false, //It tells Mongoose: (add in controller like "+password")
            // Don't return the password field when querying users by default. password is hidden but this query helps to show
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
});

export default mongoose.model("User", userSchema);