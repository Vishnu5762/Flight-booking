import express from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/userController.js";
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

/* ======================================
   🟢 USER AUTH ROUTES (REGISTER / LOGIN)
====================================== */
router.post("/register", registerUser);
router.post("/login", loginUser);

/* ======================================
   🔐 FORGOT PASSWORD
====================================== */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Store token in DB
    user.resetToken = resetToken;
    await user.save();

    // ⚙️ Setup email transport (use your Gmail App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pakanati.vishnuvardhanreddie@gmail.com",
         pass: process.env.GMAIL_APP_PASS,// ✅ your Gmail address
                           // ✅ your App Password
      },
    });

    const mailOptions = {
      from: "pakanati.vishnuvardhanreddie@gmail.com",  // must match the auth user
      to: email,
      subject: "Password Reset - Flight Booking App",
      text: `Hello ${user.name || ""},\n\nYour password reset token is:\n${resetToken}\n\nUse this token to reset your password.\n\nIf you did not request this, please ignore this email.`,
    };

    // Send reset token email
    await transporter.sendMail(mailOptions);

    res.json({ message: "Reset token sent to your email" });
  } catch (error) {
    console.error("❌ Error sending reset token:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================================
   🟢 RESET PASSWORD
====================================== */
router.post("/reset-password", async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    // Validate email & token
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      resetToken: token.trim(),
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid token or email" });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined; // clear token after use
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("❌ Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
