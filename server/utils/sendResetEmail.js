import nodemailer from "nodemailer";

const sendResetEmail = async (email, token) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Your Password",

        html: `
            <h2>Password Reset</h2>

            <p>You requested to reset your password.</p>

            <p>Click the button below:</p>

            <a href="${resetLink}"
               style="
                   display:inline-block;
                   padding:10px 20px;
                   background:#007bff;
                   color:white;
                   text-decoration:none;
                   border-radius:5px;
               ">
                Reset Password
            </a>

            <p>This link will expire in 10 minutes.</p>
        `
    });
};

export default sendResetEmail;