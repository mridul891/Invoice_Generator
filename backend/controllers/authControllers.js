import jwt from "jsonwebtoken";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
const GenerateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
};

// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    //   Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //   create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const token = GenerateToken(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Authenticate a user
// @route  POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (user && (await user.matchPassword(password))) {
      const token = GenerateToken(user._id);
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        businessName: user.businessName || "",
        address: user.address || "",
        phone: user.phone || "",
        token: token,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get user profile
// @route  GET /api/auth/me
// @access Private

export const getMe = async (req, res) => {
  try {
    console.log(req);
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        businessName: user.businessName || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update user profile
// @route  PUT /api/auth/me
// @access Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.businessName = req.body.businessName || user.businessName;
      user.address = req.body.address || user.address;
      user.phone = req.body.phone || user.phone;

      const updateUser = await user.save();
      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        businessName: updateUser.businessName || "",
        address: updateUser.address || "",
        phone: updateUser.phone || "",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = await req.params["token"];
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const user = await User.findByIdAndUpdate(decoded.id, {
      password: bcrypt.hashSync(newPassword, 10),
    });
    if (user) {
      res
        .status(200)
        .json({ message: "Password updated successfully", token: token });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Here you would typically generate a password reset token and send an email to the user
    const token = GenerateToken(user._id);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "pandeym891@gmail.com",
      to: req.body.email,
      subject: "Hello ✔",
      text: "Hello world?", // plain‑text body
      html: `<p>${`http://localhost:5173/reset-password/${token}`}</p>`, // HTML body
    });

    console.log("Message sent:", info.messageId);

    // For simplicity, we'll just return a success message
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
