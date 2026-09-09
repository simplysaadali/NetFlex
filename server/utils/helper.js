import jwt from "jsonwebtoken"

export const cookieOption =() => ({
    httpOnly : true, //This means JavaScript running in the browser cannot directly read the cookie.
    secure : process.env.NODE_ENV === "production",

    // this equals to
        // let secure;
        // if (process.env.NODE_ENV === "production") {
        //     secure = true; only send when https (for production)
        // } else {
        //     secure = false; no send if http (for development)
        // }

    sameSite: "lax",
    // "Don't send my authentication cookie freely in cross-site requests, but allow it in some normal navigation situations."

    maxAge: 7 * 24 * 6 * 60 * 1000,
});

//this function creates jwt
export const signToken = (user) => jwt.sign (
    {
        id: user._id,
        // role: user.role
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
    // role: u.role
});