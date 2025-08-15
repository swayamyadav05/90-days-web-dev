import api from "./api";
import toast from "react-hot-toast";

// Task Service - handles all task-related API calls
const taskService = {
  // Get all tasks (admin gets all, employee gets assigned tasks)
  getAllTasks: async () => {
    try {
      console.log("📋 Fetching tasks...");
      const response = await api.get("/tasks");

      if (response.data.success) {
        console.log(
          "✅ Tasks fetched successfully:",
          response.data.data
        );
        return {
          success: true,
          tasks: response.data.data.tasks,
          total: response.data.data.total,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
      const message =
        error.response?.data?.message || "Failed to fetch tasks";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },

  // Get tasks assigned to current user (Employee only)
  getMyTasks: async () => {
    try {
      console.log("📋 Fetching my assigned tasks...");
      const response = await api.get("/tasks/my-tasks");

      if (response.data.success) {
        console.log(
          "✅ My tasks fetched successfully:",
          response.data.data
        );
        return {
          success: true,
          tasks: response.data.data.tasks,
          total: response.data.data.total,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error fetching my tasks:", error);
      const message =
        error.response?.data?.message || "Failed to fetch tasks";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },

  // Get single task by ID
  getTaskById: async (id) => {
    try {
      console.log(`📋 Fetching task with ID: ${id}`);
      const response = await api.get(`/tasks/${id}`);

      if (response.data.success) {
        console.log(
          "✅ Task fetched successfully:",
          response.data.data
        );
        return {
          success: true,
          task: response.data.data.task,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error fetching task:", error);
      const message =
        error.response?.data?.message || "Failed to fetch task";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },

  // Create new task (Admin only)
  createTask: async (taskData) => {
    try {
      console.log("➕ Creating new task:", taskData);
      const response = await api.post("/tasks/create", taskData);

      if (response.data.success) {
        console.log(
          "✅ Task created successfully:",
          response.data.data
        );
        toast.success("Task created successfully!");
        return {
          success: true,
          task: response.data.data.task,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error creating task:", error);
      const message =
        error.response?.data?.message || "Failed to create task";

      // Handle validation errors
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(message);
      }

      return {
        success: false,
        error: message,
        errors: error.response?.data?.errors,
      };
    }
  },

  // Update task status (Employee can update their tasks)
  updateTaskStatus: async (id, status) => {
    try {
      console.log(`📝 Updating task ${id} status to: ${status}`);
      const response = await api.patch(`/tasks/${id}/status`, {
        status,
      });

      if (response.data.success) {
        console.log(
          "✅ Task status updated successfully:",
          response.data.data
        );
        toast.success("Task status updated successfully!");
        return {
          success: true,
          task: response.data.data.task,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error updating task status:", error);
      const message =
        error.response?.data?.message ||
        "Failed to update task status";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },

  // Update task priority (Employee can suggest priority changes)
  updateTaskPriority: async (id, priority) => {
    try {
      console.log(`📝 Updating task ${id} priority to: ${priority}`);
      const response = await api.put(`/tasks/${id}`, {
        priority,
      });

      if (response.data.success) {
        console.log(
          "✅ Task priority updated successfully:",
          response.data.data
        );
        toast.success("Task priority updated successfully!");
        return {
          success: true,
          task: response.data.data.task,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error updating task priority:", error);
      const message =
        error.response?.data?.message ||
        "Failed to update task priority";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },

  // Update task details (Admin only)
  updateTask: async (id, taskData) => {
    try {
      console.log(`📝 Updating task with ID: ${id}`, taskData);
      const response = await api.put(`/tasks/${id}`, taskData);

      if (response.data.success) {
        console.log(
          "✅ Task updated successfully:",
          response.data.data
        );
        toast.success("Task updated successfully!");
        return {
          success: true,
          task: response.data.data.task,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error updating task:", error);
      const message =
        error.response?.data?.message || "Failed to update task";

      // Handle validation errors
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(message);
      }

      return {
        success: false,
        error: message,
        errors: error.response?.data?.errors,
      };
    }
  },

  // Delete task (Admin only)
  deleteTask: async (id) => {
    try {
      console.log(`🗑️ Deleting task with ID: ${id}`);
      const response = await api.delete(`/tasks/${id}`);

      if (response.data.success) {
        console.log("✅ Task deleted successfully");
        toast.success("Task deleted successfully!");
        return {
          success: true,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error deleting task:", error);
      const message =
        error.response?.data?.message || "Failed to delete task";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },

  // Search/Filter tasks
  searchTasks: async (filters = {}) => {
    try {
      console.log(`🔍 Searching tasks with filters:`, filters);
      const params = new URLSearchParams(filters).toString();
      const response = await api.get(`/tasks/search?${params}`);

      if (response.data.success) {
        console.log(
          "✅ Tasks searched successfully:",
          response.data.data
        );
        return {
          success: true,
          tasks: response.data.data.tasks,
          total: response.data.data.total,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error searching tasks:", error);
      const message =
        error.response?.data?.message || "Failed to search tasks";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },
};

export default taskService;
