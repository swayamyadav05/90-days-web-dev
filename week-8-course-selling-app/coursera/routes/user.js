const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const { UserModel, PurchaseModel, CourseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
const { registerSchema, loginSchema } = require("../validators/authZod");
const course = require("./course");
const { userMiddleware } = require("../middlewares/user");

userRouter.use(express.json());

userRouter.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(statusCode).json({ error: message });
});

userRouter.post("/register", async (req, res, next) => {
  try {
    const parsedDataWithSuccess = registerSchema.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
      return res.status(400).json({
        message: "Incorrect format",
        error: parsedDataWithSuccess.error.flatten(),
      });
    }

    const { email, password, firstName, lastName } = parsedDataWithSuccess.data;

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const parsedDataWithSuccess = loginSchema.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
      return res.status(400).json({
        message: "Invalid format",
        error: parsedDataWithSuccess.error.flatten(),
      });
    }

    const { email, password } = parsedDataWithSuccess.data;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found. Please register",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_USER_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.use(userMiddleware);

userRouter.post("/purchase", async (req, res) => {
  const userId = req.userId;

  const purchases = await PurchaseModel.find({
    userId,
  });

  let purchaseCourseIds = [];

  for (let i = 0; i < purchases.length; i++) {
    purchaseCourseIds.push(purchases[i].courseId);
  }

  const coursesData = await CourseModel.find({
    _id: { $in: purchaseCourseIds },
  });

  res.json({
    purchases,
    coursesData,
  });
});

module.exports = { userRouter: userRouter };
