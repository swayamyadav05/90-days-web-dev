const express = require("express");
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/register", (req, res) => {
  res.json({
    message: "Signup Endpoint",
  });
});

userRouter.post("/login", (req, res) => {
  res.json({
    message: "Signin Endpoint",
  });
});

userRouter.post("/purchase", (req, res) => {
  res.json({
    message: "Purchase Endpoint",
  });
});

module.exports = { userRouter: userRouter };
