import React from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/ui/Button";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

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
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-green-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">Active Tasks</h3>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-yellow-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">
              Pending Reviews
            </h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                alert("Add Employee feature coming soon!")
              }>
              Add Employee
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={() =>
                alert("Create Task feature coming soon!")
              }>
              Create Task
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                alert("View Reports feature coming soon!")
              }>
              View Reports
            </Button>
          </div>

          {/* Demo section for all button variants */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <h3 className="text-lg font-bold mb-4">
              Button Variants Demo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button variant="primary" size="sm">
                Primary Small
              </Button>
              <Button variant="secondary" size="md">
                Secondary Medium
              </Button>
              <Button variant="success" size="lg">
                Success Large
              </Button>
              <Button variant="danger" size="sm">
                Danger Small
              </Button>
              <Button variant="neutral" size="md">
                Neutral Medium
              </Button>
              <Button variant="outline" size="lg">
                Outline Large
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
