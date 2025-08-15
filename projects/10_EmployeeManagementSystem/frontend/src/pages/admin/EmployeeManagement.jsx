import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import EmployeeList from "../../components/admin/employees/EmployeeList";
import AddEmployeeModal from "../../components/admin/employees/AddEmployeeModal";
import EditEmployeeModal from "../../components/admin/employees/EditEmployeeModal";

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handle opening add employee modal
  const handleAddEmployee = useCallback(() => {
    setShowAddModal(true);
  }, []);

  // Handle opening edit employee modal
  const handleEditEmployee = useCallback((employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  }, []);

  // Handle employee added
  const handleEmployeeAdded = useCallback((newEmployee) => {
    console.log("✅ Employee added:", newEmployee);
    // Trigger refresh of employee list
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  // Handle employee updated
  const handleEmployeeUpdated = useCallback((updatedEmployee) => {
    console.log("✅ Employee updated:", updatedEmployee);
    // Trigger refresh of employee list
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  // Handle employee deleted
  const handleEmployeeDeleted = useCallback((deletedEmployeeId) => {
    console.log("✅ Employee deleted:", deletedEmployeeId);
    // Employee list handles its own state update for deletions
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-black border-b-4 border-black pb-2">
                Employee Management
              </h1>
              <p className="text-lg mt-2 text-gray-700">
                Manage your organization's employees
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/admin/dashboard")}>
              ← Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Employee List */}
        <EmployeeList
          key={refreshTrigger} // Force re-render when refreshTrigger changes
          onAddEmployee={handleAddEmployee}
          onEditEmployee={handleEditEmployee}
          onDeleteEmployee={handleEmployeeDeleted}
        />

        {/* Add Employee Modal */}
        <AddEmployeeModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onEmployeeAdded={handleEmployeeAdded}
        />

        {/* Edit Employee Modal */}
        <EditEmployeeModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEmployee(null);
          }}
          employee={selectedEmployee}
          onEmployeeUpdated={handleEmployeeUpdated}
        />
      </div>
    </div>
  );
};

export default EmployeeManagement;
