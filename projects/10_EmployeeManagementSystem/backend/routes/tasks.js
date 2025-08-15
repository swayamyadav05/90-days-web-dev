const express = require("express");
const {
  createTask,
  getMyTasks,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
  updateTask,
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

// Get tasks (admin gets all, employee gets own)
router.get("/", verifyToken, getAllTasks);

// Get single task (accessible to admin or assigned employee)
router.get("/:id", verifyToken, getTaskById);

router.patch("/:id/status", verifyToken, updateTaskStatus);

// Update task details (Admin only)
router.put("/:id", verifyToken, requireAdmin, updateTask);

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
