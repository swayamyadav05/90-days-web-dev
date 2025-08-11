const Task = require("../models/Task");
const User = require("../models/User");
const TaskHelpers = require("../utils/taskHelpers");

// 1. Add comment to task (Both admin and assigned employee)
exports.addTaskComment = async (req, res) => {
  try {
    console.log("Add comment to task:", req.params.id);
    console.log("User:", req.user.firstName);

    const { id } = req.params;
    const { comment } = req.body;

    // Validate comment
    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a comment",
      });
    }

    if (comment.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Comment must be at least 3 characters long",
      });
    }

    // Find task
    let task;
    try {
      task = await Task.findById(id);
    } catch (findError) {
      if (findError.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid task ID format",
        });
      }
      throw findError;
    }

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check permission (admin or assigned employee)
    const isAssignedEmployee =
      task.assignedTo.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAssignedEmployee && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You can only comment on your assigned tasks or you must be an admin",
      });
    }

    // Add comment
    task.comments.push({
      user: req.user._id,
      comment: comment.trim(),
      timestamp: new Date(),
    });

    await task.save();

    // Populate for response
    await task.populate(
      "comments.user",
      "firstName lastName email role"
    );

    // Get the newly added comment
    const newComment = task.comments[task.comments.length - 1];

    res.json({
      success: true,
      message: "Comment added succesfully",
      data: {
        comment: newComment,
        totalComments: task.comments.length,
      },
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 2. Delete comment (Comment owner or admin)
exports.deleteTaskComment = async (req, res) => {
  try {
    console.log(
      "Delete comment:",
      req.params.taskId,
      req.params.commentId
    );
    console.log("User:", req.user.firstName);

    const { taskId, commentId } = req.params;

    // Find task
    let task;
    try {
      task = await Task.findById(taskId);
    } catch (findError) {
      if (findError.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid task ID format",
        });
      }
      throw findError;
    }

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Find comment
    const comment = task.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check permissions (comment owner or admin)
    const isCommentOwner =
      comment.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isCommentOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own comments or you must be an admin",
      });
    }

    // Remove comment
    task.comments.pull(commentId);
    await task.save();

    res.json({
      success: true,
      message: "Comment deleted successfully",
      data: {
        remainingComments: task.comments.length,
      },
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get task comments (with pagination)
exports.getTaskComments = async (req, res) => {
  try {
    console.log("Get comments for task:", req.params.id);

    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Find task and populate comments
    let task;
    try {
      task = await Task.findById(id)
        .populate("comments.user", "firstName lastName email role")
        .select("title comments");
    } catch (findError) {
      if (findError.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid task ID format",
        });
      }
      throw findError;
    }

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check permissions (admin or assigned employee)
    const taskFull = await Task.findById(id).select("assignedTo");
    const isAssignedEmployee =
      taskFull.assignedTo.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAssignedEmployee && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You can only view comments on your assigned tasks or you must be an admin",
      });
    }

    // Pagination for comments
    const totalComments = task.comments.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedComments = task.comments
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Latest first
      .slice(startIndex, endIndex);

    res.json({
      success: true,
      message: `Found ${paginatedComments.length} comments`,
      data: {
        taskTitle: task.title,
        comments: paginatedComments,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalComments / limit),
          totalComments,
          hasNextPage: endIndex < totalComments,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
