const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
  try {
    // Step 1: Get token from header
    const authHeader = req.headers.authorization;

    // Step 2: Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Step 3: Extract token
    const token = authHeader.substring(7); // Remove the 'Bearer ' prefix

    // Step 4: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 5: Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      });
    }

    // Step 6: Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account deactivated.",
      });
    }

    // Step 7: Add user to request object
    req.user = user;
    next(); // Continue to next middleware/controller
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Middleware to check if user is admin
exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }

  next();
};
