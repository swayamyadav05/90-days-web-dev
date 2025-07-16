const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminRouter = express.Router();
const { AdminModel } = require("../db");
const { JWT_ADMIN_SECRET } = require("../config");
const { registerSchema, loginSchema } = require("../validators/authZod");

adminRouter.use(express.json());

adminRouter.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(statusCode).json({ error: message });
});

adminRouter.post("/register", async (req, res, next) => {
  try {
    const parsedDataWithSuccess = registerSchema.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
      return res.status(400).json({
        message: "Incorrect format",
        error: parsedDataWithSuccess.error.flatten(),
      });
    }

    const { email, password, firstName, lastName } = parsedDataWithSuccess.data;

    const existing = await AdminModel.findOne({ email });
    if (existing) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await AdminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(201).json({
      message: "Admin registered successfully",
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/login", async (req, res, next) => {
  try {
    const parsedDataWithSuccess = loginSchema.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
      return res.status(400).json({
        message: "Invalid format",
        error: parsedDataWithSuccess.error.flatten(),
      });
    }

    const { email, password } = parsedDataWithSuccess.data;

    const user = await AdminModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Admin not found. Please register",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_ADMIN_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      message: "Admin logged in successful",
      token,
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/course", (req, res) => {
  res.json({
    message: "Admin Course Endpoint",
  });
});

adminRouter.post("/course", (req, res) => {
  res.json({
    message: "Admin Course Endpoint",
  });
});

adminRouter.put("/course", (req, res) => {
  res.json({
    message: "Admin Course Endpoint",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message: "Admin Course Endpoint",
  });
});

module.exports = { adminRouter: adminRouter };
