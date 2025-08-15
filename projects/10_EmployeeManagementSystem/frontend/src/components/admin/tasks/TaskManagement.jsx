import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import TaskList from "./TaskList";
import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
import taskService from "../../../services/taskService";

const TaskManagement = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks on component mount only once
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await taskService.getAllTasks();
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

  // Handle task creation
  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    setShowCreateModal(false);
  };

  // Handle task update
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    setSelectedTask(null);
    setShowEditModal(false);
  };

  // Handle task deletion
  const handleTaskDeleted = (deletedTaskId) => {
    setTasks((prev) =>
      prev.filter((task) => task._id !== deletedTaskId)
    );
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  // Handle status/priority updates from TaskList
  const handleTaskUpdate = (taskId, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  // Calculate task statistics
  const taskStats = tasks.reduce(
    (stats, task) => {
      stats[task.status] = (stats[task.status] || 0) + 1;
      return stats;
    },
    { pending: 0, in_progress: 0, completed: 0, cancelled: 0 }
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">
              Task Management
            </h1>
            <p className="text-gray-600">
              Manage and track all tasks across your organization
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/dashboard")}
              className="text-black border-black hover:bg-gray-100">
              ← Back to Dashboard
            </Button>
            <Button
              variant="success"
              onClick={() => setShowCreateModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white">
              + Create New Task
            </Button>
          </div>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Tasks
                </p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-sm">
                <svg
                  className="h-6 w-6 text-blue-600"
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
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {taskStats.pending}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-sm">
                <svg
                  className="h-6 w-6 text-yellow-600"
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
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {taskStats["in_progress"]}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-sm">
                <svg
                  className="h-6 w-6 text-blue-600"
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
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {taskStats.completed}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-sm">
                <svg
                  className="h-6 w-6 text-green-600"
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

      {/* Task List */}
      {error && (
        <Card className="border-3 border-red-500 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] mb-6">
          <CardContent className="p-6">
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
            <Button
              variant="outline"
              size="sm"
              onClick={fetchTasks}
              className="mt-3 border-red-500 text-red-500 hover:bg-red-50">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tasks Display */}
      <Card className="border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            All Tasks
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
          ) : (
            <TaskList
              tasks={tasks}
              loading={loading}
              onCreateTask={() => setShowCreateModal(true)}
              onEditTask={handleEditTask}
              onTaskUpdate={handleTaskUpdate}
            />
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTaskCreated={handleTaskCreated}
      />

      <EditTaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onTaskUpdated={handleTaskUpdated}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskManagement;
