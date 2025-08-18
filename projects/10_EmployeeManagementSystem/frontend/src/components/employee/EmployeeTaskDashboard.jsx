import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Input from "../ui/input";
import taskService from "../../services/taskService";

// Status options for dropdowns (no priority dropdown for employees)
const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const EmployeeTaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    fetchMyTasks();
  }, []);

  // Fetch tasks assigned to current user
  const fetchMyTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await taskService.getMyTasks();
      if (result.success) {
        setTasks(result.tasks);
      } else {
        setError(result.message || "Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("An error occurred while fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const result = await taskService.updateTaskStatus(
        taskId,
        newStatus
      );
      if (result.success) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId
              ? { ...task, status: newStatus }
              : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Filter and search tasks
  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    const statusMatch = filter === "all" || task.status === filter;

    // Filter by search term
    const searchMatch =
      !searchTerm ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (task.category &&
        task.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    return statusMatch && searchMatch;
  });

  // Calculate task statistics
  const taskStats = tasks.reduce(
    (stats, task) => {
      stats[task.status] = (stats[task.status] || 0) + 1;
      stats.total = (stats.total || 0) + 1;
      return stats;
    },
    {
      pending: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
      total: 0,
    }
  );

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-black mb-2">
          My Tasks
        </h2>
        <p className="text-gray-600">
          Manage your assigned tasks and track your progress
        </p>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Tasks
                </p>
                <p className="text-xl font-bold">{taskStats.total}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-sm">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending
                </p>
                <p className="text-xl font-bold text-yellow-600">
                  {taskStats.pending}
                </p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-sm">
                <svg
                  className="h-5 w-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  In Progress
                </p>
                <p className="text-xl font-bold text-blue-600">
                  {taskStats["in_progress"]}
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-sm">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completed
                </p>
                <p className="text-xl font-bold text-green-600">
                  {taskStats.completed}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-sm">
                <svg
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border-3 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Refresh Button */}
            <Button
              variant="outline"
              onClick={fetchMyTasks}
              disabled={loading}
              className="border-black text-black hover:bg-gray-100">
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-3 border-red-500 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <svg
                className="h-5 w-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <Card className="border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            {filteredTasks.length} Task
            {filteredTasks.length !== 1 ? "s" : ""}
            {filter !== "all" && ` (${filter})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
              <span className="ml-3 text-gray-600">
                Loading tasks...
              </span>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No tasks found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === "all"
                  ? "You don't have any tasks assigned yet."
                  : `No ${filter} tasks found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg text-black truncate">
                          {task.title}
                        </h3>
                        <div className="flex gap-2 ml-4">
                          {/* Show priority as a badge, not editable for employees */}
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-sm border-2 border-black ${getPriorityColor(
                              task.priority
                            )}`}>
                            {task.priority
                              ? task.priority
                                  .charAt(0)
                                  .toUpperCase() +
                                task.priority.slice(1)
                              : "Medium"}
                          </span>
                          {/* Status dropdown - employees can update */}
                          <Dropdown
                            value={task.status}
                            options={STATUS_OPTIONS}
                            onChange={(newStatus) =>
                              handleStatusUpdate(task._id, newStatus)
                            }
                            variant="status"
                            size="xs"
                          />
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3 line-clamp-2">
                        {task.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        {task.category && (
                          <span className="flex items-center">
                            <svg
                              className="h-4 w-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              />
                            </svg>
                            {task.category}
                          </span>
                        )}
                        <span className="flex items-center">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Due: {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </div>

                    {/* Quick Actions - Demo Comment Section */}
                    <div className="flex flex-col gap-2 sm:w-40">
                      <div className="text-xs text-gray-500 font-semibold mb-1">
                        Quick Actions
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Demo comment functionality
                          alert(
                            `Comments for "${task.title}":\n\n💬 John: "Working on this task"\n💬 Admin: "Please update by EOD"\n💬 You: "Almost done!"\n\n(Comments feature coming in next phase)`
                          );
                        }}
                        className="w-full text-xs">
                        💬 Comments (
                        {Math.floor(Math.random() * 5) + 1})
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          alert(
                            `Task History for "${task.title}":\n\n📝 Created: 2 days ago\n⏰ Started: 1 day ago\n🔄 Updated: 2 hours ago\n\n(Full history feature coming soon)`
                          );
                        }}
                        className="w-full text-xs">
                        📋 History
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeTaskDashboard;
