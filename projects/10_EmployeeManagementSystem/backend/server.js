const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Employee Management System API",
    version: "1.0.0",
    status: "Server is running successfully! 🚀",
  });
});

// Routes (we'll add these later)
app.use("/api/auth", require("./routes/auth"));
// app.use('/api/users', require('./routes/users'));
app.use("/api/tasks", require("./routes/tasks"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
