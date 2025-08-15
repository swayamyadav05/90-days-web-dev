import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/ui/Button";
import employeeService from "../../services/employeeService";
import taskService from "../../services/taskService";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeTasks: 0,
    pendingReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch employees count
      const employeesResult = await employeeService.getAllEmployees();
      const totalEmployees = employeesResult.success
        ? employeesResult.employees.length
        : 0;

      // Fetch tasks stats
      const tasksResult = await taskService.getAllTasks();
      const tasks = tasksResult.success ? tasksResult.tasks : [];
      const activeTasks = tasks.filter(
        (task) =>
          task.status === "pending" || task.status === "in-progress"
      ).length;
      const pendingReviews = tasks.filter(
        (task) => task.status === "completed"
      ).length;

      setStats({
        totalEmployees,
        activeTasks,
        pendingReviews,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black border-b-4 border-black pb-2">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-lg mt-2 text-gray-700">
              Hello, {user?.firstName} {user?.lastName}! 👋
            </p>
          </div>

          <Button onClick={logout} variant="danger" size="lg">
            Logout
          </Button>
        </div>

        {/* Admin Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">
              Total Employees
            </h3>
            <p className="text-3xl font-bold">
              {loading ? "..." : stats.totalEmployees}
            </p>
          </div>

          <div className="bg-green-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">Active Tasks</h3>
            <p className="text-3xl font-bold">
              {loading ? "..." : stats.activeTasks}
            </p>
          </div>

          <div className="bg-yellow-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">
              Pending Reviews
            </h3>
            <p className="text-3xl font-bold">
              {loading ? "..." : stats.pendingReviews}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/admin/employees")}>
              👥 Manage Employees
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={() => navigate("/admin/tasks")}>
              📋 Manage Tasks
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                alert("View Reports feature coming soon!")
              }>
              📊 View Reports
            </Button>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <h3 className="text-lg font-bold mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 border-2 border-gray-200 rounded-sm">
                <span className="text-sm">
                  📝 New task created: "Complete project
                  documentation"
                </span>
                <span className="text-xs text-gray-500">
                  2 hours ago
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 border-2 border-gray-200 rounded-sm">
                <span className="text-sm">
                  👤 Employee John Doe completed task
                </span>
                <span className="text-xs text-gray-500">
                  5 hours ago
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 border-2 border-gray-200 rounded-sm">
                <span className="text-sm">
                  ✅ Task "Fix login bug" marked as completed
                </span>
                <span className="text-xs text-gray-500">
                  1 day ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
