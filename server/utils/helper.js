import jwt from "jsonwebtoken"

export const cookieOption =() => ({
    httpOnly : true, 
    secure : process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 6 * 60 * 1000,
});

export const signToken = (user) => jwt.sign (
    {
        id: user._id,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d",
    }
);

export const publicUser = (u) => ({
    _id: u._id,
    name: u.name,
    email: u.email,
});