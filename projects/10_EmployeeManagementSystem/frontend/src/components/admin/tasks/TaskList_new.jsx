import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import Dropdown from "../../ui/Dropdown";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import taskService from "../../../services/taskService";
import useAuth from "../../../hooks/useAuth";

// Status and Priority options for dropdowns
const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

// Priority and status color mappings
const getPriorityColor = (priority) => {
  const colors = {
    low: "bg-blue-400",
    medium: "bg-yellow-400",
    high: "bg-red-400",
  };
  return colors[priority] || "bg-gray-400";
};

const getStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-400",
    in_progress: "bg-blue-400",
    completed: "bg-green-400",
    failed: "bg-red-400",
  };
  return colors[status] || "bg-gray-400";
};

const TaskList = ({
  tasks = [],
  loading = false,
  onCreateTask,
  onEditTask,
  onViewTask,
  onTaskUpdate,
}) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Filter tasks based on search and filters (no API calls here)
  useEffect(() => {
    let filtered = tasks;

    // Search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          task.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          task.category
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          task.assignedTo?.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          task.assignedTo?.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (task) => task.status === statusFilter
      );
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (task) => task.priority === priorityFilter
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Check if task is overdue
  const isOverdue = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  // Handle status update
  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const result = await taskService.updateTaskStatus(
        taskId,
        newStatus
      );
      if (result.success) {
        onTaskUpdate && onTaskUpdate();
      } else {
        alert("Failed to update status: " + result.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating task status");
    }
  };

  // Handle priority update
  const handlePriorityUpdate = async (taskId, newPriority) => {
    try {
      const result = await taskService.updateTaskPriority(
        taskId,
        newPriority
      );
      if (result.success) {
        onTaskUpdate && onTaskUpdate();
      } else {
        alert("Failed to update priority: " + result.message);
      }
    } catch (error) {
      console.error("Error updating priority:", error);
      alert("Error updating task priority");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <CardTitle className="text-2xl font-bold">
            📋 Task Management
          </CardTitle>
          {user?.role === "admin" && (
            <Button
              variant="primary"
              size="lg"
              onClick={onCreateTask}
              className="w-full md:w-auto">
              ➕ Create New Task
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded-sm">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded-sm">
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-2">No Tasks Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ||
              statusFilter !== "all" ||
              priorityFilter !== "all"
                ? "No tasks match your current filters."
                : user?.role === "admin"
                ? "Start by creating your first task to assign to employees."
                : "No tasks have been assigned to you yet."}
            </p>
            {user?.role === "admin" &&
              !searchTerm &&
              statusFilter === "all" &&
              priorityFilter === "all" && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onCreateTask}>
                  Create First Task
                </Button>
              )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Modern Card View - Single Column Full Width */}
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`w-full bg-white border-3 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                  isOverdue(task.dueDate) &&
                  task.status !== "completed"
                    ? "border-red-500 bg-red-50"
                    : ""
                }`}>
                {/* Task Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-col items-end space-y-2">
                    <span
                      className={`px-3 py-1 text-xs font-bold border-2 border-black rounded-sm ${getPriorityColor(
                        task.priority
                      )}`}>
                      {task.priority.toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-bold border-2 border-black rounded-sm ${getStatusColor(
                        task.status
                      )}`}>
                      {task.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Task Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Assignee */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-400 border-2 border-black rounded-sm text-white font-bold">
                      {task.assignedTo?.firstName?.charAt(0) || "?"}
                      {task.assignedTo?.lastName?.charAt(0) || ""}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Assignee
                      </p>
                      <p className="font-semibold text-gray-900">
                        {task.assignedTo ? (
                          `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
                        ) : (
                          <span className="text-gray-400 italic">
                            Not Assigned
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Due Date
                    </p>
                    <p
                      className={`font-semibold flex items-center ${
                        isOverdue(task.dueDate) &&
                        task.status !== "completed"
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}>
                      📅 {formatDate(task.dueDate)}
                      {isOverdue(task.dueDate) &&
                        task.status !== "completed" && (
                          <span className="ml-2 text-red-500">
                            ⚠️ OVERDUE
                          </span>
                        )}
                    </p>
                  </div>

                  {/* Category */}
                  {task.category && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Category
                      </p>
                      <span className="inline-block bg-gray-200 border-2 border-gray-400 px-3 py-1 rounded-sm text-sm font-medium">
                        {task.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between pt-4 border-t-2 border-gray-200">
                  <div className="flex space-x-3 mb-2 md:mb-0">
                    {user?.role === "admin" && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            onEditTask && onEditTask(task)
                          }
                          className="flex items-center space-x-1">
                          <span>✏️</span>
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="neutral"
                          size="sm"
                          onClick={() => {
                            alert(
                              `💬 Comments for "${task.title}":\n\n` +
                                `John: "Working on this task, will update by EOD"\n` +
                                `Admin: "Please update by EOD"\n` +
                                `You: "Almost done!" \n\n` +
                                `(Comments feature coming in next phase)`
                            );
                          }}
                          className="flex items-center space-x-1">
                          <span>💬</span>
                          <span>Comments</span>
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Status/Priority Dropdowns for Admin */}
                  {user?.role === "admin" && (
                    <div className="flex space-x-3">
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                          Status
                        </label>
                        <Dropdown
                          options={STATUS_OPTIONS}
                          value={task.status}
                          onChange={(newStatus) =>
                            handleStatusUpdate(task._id, newStatus)
                          }
                          className="min-w-[120px]"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                          Priority
                        </label>
                        <Dropdown
                          options={PRIORITY_OPTIONS}
                          value={task.priority}
                          onChange={(newPriority) =>
                            handlePriorityUpdate(
                              task._id,
                              newPriority
                            )
                          }
                          className="min-w-[100px]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Status Update for Employees */}
                  {user?.role === "employee" &&
                    task.assignedTo?._id === user.userId &&
                    task.status !== "completed" && (
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                          Update Status
                        </label>
                        <Dropdown
                          options={STATUS_OPTIONS}
                          value={task.status}
                          onChange={(newStatus) =>
                            handleStatusUpdate(task._id, newStatus)
                          }
                          className="min-w-[120px]"
                        />
                      </div>
                    )}
                </div>

                {/* Demo Comment Section */}
                <div className="mt-4 pt-4 border-t-2 border-gray-200">
                  <div className="bg-gray-50 border-2 border-gray-300 rounded-sm p-4">
                    <h4 className="font-bold text-sm mb-3 text-gray-700 flex items-center">
                      💬 Recent Comments (Demo)
                    </h4>
                    <div className="space-y-2 mb-3 max-h-24 overflow-y-auto">
                      <div className="text-xs bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                        <span className="font-semibold text-blue-600">
                          John Doe:
                        </span>
                        <span className="text-gray-600 ml-1">
                          "Working on this task, will update by EOD"
                        </span>
                        <span className="text-gray-400 ml-2">
                          2h ago
                        </span>
                      </div>
                      <div className="text-xs bg-green-50 p-2 rounded border-l-4 border-green-400">
                        <span className="font-semibold text-green-600">
                          Admin:
                        </span>
                        <span className="text-gray-600 ml-1">
                          "Please prioritize this task"
                        </span>
                        <span className="text-gray-400 ml-2">
                          1h ago
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded text-sm focus:border-blue-400 focus:outline-none"
                        disabled
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          alert(
                            "💬 Comment feature coming in next phase!\n\nFeatures planned:\n- Real-time messaging\n- File attachments\n- @mentions\n- Comment history"
                          )
                        }
                        className="px-4">
                        Send
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">
                      🚧 Demo feature - Full comment system coming in
                      next phase
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
