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

export const publicUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
  };
};