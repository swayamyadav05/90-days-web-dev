const express = require("express");
const {
  createTask,
  getMyTasks,
  getAllTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");
const { verifyToken, requireAdmin } = require("../middlewares/auth");
const {
  addTaskComment,
  getTaskComments,
  deleteTaskComment,
} = require("../controllers/commentController");

const router = express.Router();

// Test route
router.get("/test", verifyToken, (req, res) => {
  res.json({
    message: "Task routes working",
    user: req.user.firstName,
  });
});

// Admin only routes
router.post("/create", verifyToken, requireAdmin, createTask);
router.get("/all", verifyToken, requireAdmin, getAllTasks);

// Employee routes (any authenticated user)
router.get("/my-tasks", verifyToken, getMyTasks);
router.patch("/:id/status", verifyToken, updateTaskStatus);

// Task deltetion (Admin only)
router.delete("/:id", verifyToken, requireAdmin, deleteTask);

// Comment management routes
router.post("/:id/comments", verifyToken, addTaskComment);
router.get("/:id/comments", verifyToken, getTaskComments);
router.delete(
  "/:taskId/comments/:commentId",
  verifyToken,
  deleteTaskComment
);

module.exports = router;
