import transporter from "./transporter";
import jwt from "jsonwebtoken";

export default async function sendPasswordResetEmail(userEmail: string) {
  const token = jwt.sign({ userEmail }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  const resetUrl = `https://example.com/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Password Reset Request",
    text: `Click the following link to reset your password: ${resetUrl}`,
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
  });
}
