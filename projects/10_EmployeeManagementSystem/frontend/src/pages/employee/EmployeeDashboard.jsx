import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/ui/Button";
import EmployeeTaskDashboard from "../../components/employee/EmployeeTaskDashboard";
import taskService from "../../services/taskService";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    myTasks: 0,
    completed: 0,
    inProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const result = await taskService.getMyTasks();
      if (result.success) {
        const tasks = result.tasks;
        setStats({
          myTasks: tasks.length,
          completed: tasks.filter(
            (task) => task.status === "completed"
          ).length,
          inProgress: tasks.filter(
            (task) => task.status === "in-progress"
          ).length,
        });
      }
    } catch (error) {
      console.error("Error fetching employee stats:", error);
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
              Welcome to Employee Dashboard
            </h1>
            <p className="text-lg mt-2 text-gray-700">
              Hello, {user?.firstName} {user?.lastName}! 👋
            </p>
          </div>

          <Button onClick={logout} variant="danger" size="lg">
            Logout
          </Button>
        </div>

        {/* Employee Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-orange-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">My Tasks</h3>
            <p className="text-3xl font-bold">
              {loading ? "..." : stats.myTasks}
            </p>
          </div>

          <div className="bg-pink-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">Completed</h3>
            <p className="text-3xl font-bold">
              {loading ? "..." : stats.completed}
            </p>
          </div>

          <div className="bg-cyan-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">In Progress</h3>
            <p className="text-3xl font-bold">
              {loading ? "..." : stats.inProgress}
            </p>
          </div>
        </div>

        {/* Employee Task Dashboard */}
        <EmployeeTaskDashboard />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
