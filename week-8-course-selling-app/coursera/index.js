const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());

app.post("/user/register", (req, res) => {
  res.json({
    message: "Signup Endpoint",
  });
});

app.post("/user/login", (req, res) => {
  res.json({
    message: "Signin Endpoint",
  });
});

app.post("/user/purchase", (req, res) => {
  res.json({
    message: "Purchase Endpoint",
  });
});

app.get("/course/purchases", (req, res) => {
  res.json({
    message: "See purchases Endpoint",
  });
});

app.get("/courses", (req, res) => {
  res.json({
    message: "See Courses Endpoint",
  });
});
