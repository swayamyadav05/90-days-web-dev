const Task = require("../models/Task");
const User = require("../models/User");

// 1. Create task (Admin only)
exports.createTask = async (req, res) => {
  try {
    console.log("Create task request:", req.body);
    console.log("Admin user:", req.user.firstName);

    // Step 1: Extract data
    const {
      title,
      description,
      assignedTo,
      priority,
      category,
      dueDate,
    } = req.body;

    // Step 2: Validate required fields
    if (!title || !description || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, and assignedTo",
      });
    }

    // Step 3: Check if assigned user exists
    let assignedUser;
    try {
      assignedUser = await User.findById(assignedTo);
    } catch (userFindError) {
      console.error("User find error:", userFindError.message);

      // Handle invalid ObjectId format
      if (userFindError.name === "CastError") {
        return res.status(400).json({
          success: false,
          message:
            "Invalid user ID format. Please provide a valid user ID.",
        });
      }

      // Handle other database errors
      throw userFindError;
    }

    // Check if user exists
    if (!assignedUser) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found.",
      });
    }

    // Check if user is active
    if (!assignedUser.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot assign task to inactive user.",
      });
    }

    console.log("Assigned User found:", assignedUser.firstName);

    // Step 4: Create task
    const newTask = new Task({
      title,
      description,
      assignedTo,
      assignedBy: req.user._id,
      priority: priority || "medium",
      category,
      dueDate,
    });

    const savedTask = await newTask.save();

    // Step 5: Populate user details
    await savedTask.populate(
      "assignedTo",
      "firstName lastName email"
    );
    await savedTask.populate(
      "assignedBy",
      "firstName lastName email"
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: savedTask,
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 2. Get User's tasks (Employee)
exports.getMyTasks = async (req, res) => {
  try {
    console.log("Get my tasks for user:", req.user.firstName);

    // Get query parameter for filtering
    const { status, priority, category } = req.query;

    // Build filter objec
    const filter = { assignedTo: req.user._id };

    // Add optional filters
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category)
      filter.category = { $regex: category, $options: "i" };

    // Get tasks with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Find tasks and populate user details
    const tasks = await Task.find(filter)
      .populate("assignedBy", "firstName lastName email")
      .populate("assignedTo", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalTasks = await Task.countDocuments(filter);

    // Group tasks by status for dashboard
    const taskStats = await Task.aggregate([
      { $match: { assignedTo: req.user._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const stats = {
      pending: 0,
      in_progress: 0,
      completed: 0,
      failed: 0,
    };

    taskStats.forEach((stat) => {
      stats[stat._id] = stat.count;
    });

    res.json({
      success: true,
      message: `Found ${tasks.length} tasks`,
      data: {
        tasks,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalTasks / limit),
          totalTasks,
          hasNextPage: page < Math.ceil(totalTasks / limit),
          hasPrevPage: page > 1,
        },
        stats,
      },
    });
  } catch (error) {
    console.error("Get my tasks error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 3. Get all tasks (Admin only)
exports.getAllTasks = async (req, res) => {
  try {
    console.log(
      "Get all tasks request by admin:",
      req.user.firstName
    );

    // Get query parameters for filtering
    const { status, priority, category, assignedTo, assignedBy } =
      req.query;

    // Build filter object
    const filter = {};

    // Add optional filters
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category)
      filter.category = { $regex: category, $options: "i" };
    if (assignedTo) filter.assignedTo = assignedTo;
    if (assignedBy) filter.assignedBy = assignedBy;

    // Get pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Find all tasks with population
    const tasks = await Task.find(filter)
      .populate("assignedBy", "firstName lastName email")
      .populate("assignedTo", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalTasks = await Task.countDocuments(filter);

    // Get comprehensive statistis
    const overallStats = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const priorityStats = await Task.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    const employeeStats = await Task.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          totalTasks: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          inProgress: {
            $sum: {
              $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0],
            },
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
          failed: {
            $sum: { $cond: [{ $eq: ["$status", "failed"] }, 1, 0] },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $project: {
          employeeName: {
            $concat: [
              "$employee.firstName",
              " ",
              "$employee.lastName",
            ],
          },
          employeeEmail: "$employee.email",
          totalTasks: 1,
          pending: 1,
          inProgress: 1,
          completed: 1,
          failed: 1,
          completionRate: {
            $multiply: [
              { $divide: ["$completed", "$totalTasks"] },
              100,
            ],
          },
        },
      },
    ]);

    // Format overall stats
    const stats = {
      pending: 0,
      in_progress: 0,
      completed: 0,
      failed: 0,
    };

    overallStats.forEach((stat) => {
      stats[stat._id] = stat.count;
    });

    // Format priority stats
    const priorities = {
      low: 0,
      medium: 0,
      high: 0,
      urgent: 0,
    };

    priorities.forEach((stat) => {
      priorities[stat._id] = stat.count;
    });

    res.json({
      success: true,
      message: `Found ${tasks.length} tasks`,
      data: {
        tasks,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalTasks / limit),
          totalTasks,
          hasNextPage: page < Math.ceil(totalTasks / limit),
          hasPrevPage: page > 1,
        },
        analytics: {
          overallStats: stats,
          priorityBreakdown: priorities,
          employeePerformance: employeeStats,
          totalEmployeesWithTasks: employeeStats.length,
        },
      },
    });
  } catch (error) {
    console.error("Get all tasks error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 4. Update tasks status (Employee)
exports.updateTaskStatus = async (req, res) => {
  try {
    console.log("Update task status:", req.params.id, req.body);
    console.log("User:", req.user.firstName);

    const { id } = req.params;
    const { status, comment } = req.body;

    // Validate required fields
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide status",
      });
    }

    // Validate status value
    const validStatuses = [
      "pending",
      "in_progress",
      "completed",
      "failed",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(
          ", "
        )}`,
      });
    }

    // Find the task with better error handling
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

    // Check if user can update this task
    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update tasks assigned to you",
      });
    }

    // Update task status
    task.status = status;

    // Add comment if provided
    if (comment && comment.trim()) {
      task.comments.push({
        user: req.user._id,
        comment: comment.trim(),
        timestamp: new Date(),
      });
    }

    // Save the task
    const updatedTask = await task.save();

    // Populate for response
    await updatedTask.populate(
      "assignedTo",
      "firstName lastName email"
    );
    await updatedTask.populate(
      "assignedBy",
      "firstName lastName email"
    );
    await updatedTask.populate(
      "comments.user",
      "firstName lastName email"
    );

    res.json({
      success: true,
      message: `Task status updated to ${status}`,
      data: updatedTask,
    });
  } catch (error) {
    console.error("Update task status error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 5. Delete task (Admin only)
exports.deleteTask = async (req, res) => {
  try {
    console.log("Delete task request:", req.params.id);
    console.log("Admin user:", req.user.firstName);

    const { id } = req.params;

    // Find the task with better error handling
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

    // Populate task details
    await task.populate("assignedTo", "firstName lastName email");
    await task.populate("assignedBy", "firstName lastName email");

    // Hard Delete
    await Task.findByIdAndDelete(id);

    console.log(
      `✅ Task deleted: "${task.title}" assigned to ${task.assignedTo.firstName} ${task.assignedTo.lastName}`
    );

    res.json({
      success: true,
      message: "Task deleted successfully",
      data: {
        deletedTask: {
          id: task._id,
          title: task.title,
          assignedTo: `${task.assignedTo.firstName} ${task.assignedTo.lastName}
          }`,
          status: task.status,
        },
      },
    });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
