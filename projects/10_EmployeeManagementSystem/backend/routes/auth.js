const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyToken, requireAdmin } = require("../middlewares/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working!" });
});

router.post("/register", register);

router.post("/login", login);

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Access granted! Token is valid.",
    user: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

router.get("/admin-only", verifyToken, requireAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to admin area!",
    user: req.user.firstName,
  });
});

// Temporary route to see all users (for testing)
router.get("/users", verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find(
      {},
      "firstName lastName email role"
    );
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
