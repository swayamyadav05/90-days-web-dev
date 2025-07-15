const express = require("express");
const adminRouter = express.Router();

adminRouter.use(express.json());

adminRouter.post("/register", (req, res) => {
  res.json({
    message: "Signup Endpoint",
    i,
  });
});

adminRouter.post("/login", (req, res) => {
  res.json({
    message: "Signin Endpoint",
    i,
  });
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
