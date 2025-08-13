import React from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/ui/Button";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();

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
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-pink-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">Completed</h3>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-cyan-400 p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-bold mb-2">In Progress</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        {/* My Tasks Section */}
        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
          <h2 className="text-2xl font-bold mb-4">My Recent Tasks</h2>
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No tasks assigned yet.
            </p>
            <p className="text-gray-400 mb-4">
              Check back later for new assignments!
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => alert("Refresh feature coming soon!")}>
              Refresh Tasks
            </Button>
          </div>
        </div>

        {/* Employee Actions */}
        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-4">
            Employee Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="neutral"
              size="lg"
              onClick={() =>
                alert("View Profile feature coming soon!")
              }>
              View Profile
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={() =>
                alert("Submit Report feature coming soon!")
              }>
              Submit Report
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                alert("Request Leave feature coming soon!")
              }>
              Request Leave
            </Button>
          </div>

          {/* Demo section showing task status buttons */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <h3 className="text-lg font-bold mb-4">
              Task Status Demo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="primary" size="sm">
                Pending Task
              </Button>
              <Button variant="neutral" size="sm">
                In Progress
              </Button>
              <Button variant="success" size="sm">
                Completed
              </Button>
              <Button variant="danger" size="sm">
                Cancelled
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
