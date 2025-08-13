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

    const { firstName, lastName, email, password, role } = req.body;

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
          },
        },
      ],
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    console.error("Error details:", error.message);
    console.error("Error name:", error.name);
    if (error.errors) {
      console.error("Validation errors:", error.errors);
    }

    // Handle MongoDB validation errors
    if (error.name === "ValidationError") {
      const validationErrors = [];

      // Create user-friendly, secure error messages
      for (const field in error.errors) {
        const err = error.errors[field];

        if (field === "password") {
          if (err.kind === "minlength") {
            validationErrors.push(
              "Password must be at least 8 characters long."
            );
          } else if (err.kind === "user defined") {
            validationErrors.push(
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            );
          } else {
            validationErrors.push("Password is invalid.");
          }
        } else if (field === "email") {
          if (err.kind === "user defined") {
            validationErrors.push(
              "Please enter a valid email address."
            );
          } else {
            validationErrors.push("Email is required.");
          }
        } else if (field === "firstName") {
          validationErrors.push("First name is required.");
        } else if (field === "lastName") {
          validationErrors.push("Last name is required.");
        } else {
          // Generic fallback that doesn't expose data
          validationErrors.push(`${field} is invalid.`);
        }
      }

      return res.status(400).json({
        success: false,
        message: validationErrors[0], // Send the first validation error message
        errors: validationErrors, // Optionally send all errors
      });
    }

    // Handle MongoDB duplicate key errors (like duplicate email)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Handle other server errors
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
