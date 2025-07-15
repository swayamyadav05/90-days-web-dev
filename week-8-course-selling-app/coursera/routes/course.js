const express = require("express");
const courseRouter = express.Router();

courseRouter.use(express.json());

courseRouter.get("/purchases", (req, res) => {
  res.json({
    message: "See purchases Endpoint",
  });
});

courseRouter.get("/previews", (req, res) => {
  res.json({
    message: "See Courses Endpoint",
  });
});

module.exports = { courseRouter: courseRouter };
