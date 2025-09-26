import jwt from "jsonwebtoken";
import User from "../models/user.js";

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
    }else{
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

export const getMe = (req, res) => {
  res.send("Get User Profile");
};

// @desc   Update user profile
// @route  PUT /api/auth/me
// @access Private
export const updateUserProfile = (req, res) => {
  res.send("Update User Profile");
};
