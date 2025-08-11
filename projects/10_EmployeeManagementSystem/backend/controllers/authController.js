const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  try {
    console.log("Register request received:", req.body);

    const {
      firstName,
      lastName,
      email,
      password,
      department,
      position,
      role,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide firstName, lastName, email and password",
      });
    }

    console.log("✅ Basic validation passed");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    console.log("✅ Email is unique");

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || "employee",
      department,
      position,
    });

    const savedUser = await newUser.save();
    console.log("✅ User saved to database");

    const token = generateToken(savedUser._id);

    res.status(201).json({
      success: true,
      data: [
        {
          token,
          user: {
            id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            role: savedUser.role,
            department: savedUser.department,
            position: savedUser.position,
          },
        },
      ],
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Login requrest received:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    console.log("✅ Basic validation passed");

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("✅ User found");

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("✅ Password verified");

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "Account is deactivated. Please contact administrator.",
      });
    }

    console.log("✅ User is active");

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      data: [
        {
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            department: user.department,
            position: user.position,
          },
        },
      ],
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
