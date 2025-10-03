import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import taskService from "../../../services/taskService";
import employeeService from "../../../services/employeeService";

const EditTaskModal = ({ isOpen, onClose, onTaskUpdated, task }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    category: "",
    dueDate: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize form data when task changes
  useEffect(() => {
    if (task && isOpen) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        assignedTo: task.assignedTo?._id || "",
        priority: task.priority || "medium",
        category: task.category || "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
        status: task.status || "pending",
      });
    }
  }, [task, isOpen]);

  // Fetch employees when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const result = await employeeService.getAllEmployees();
      if (result.success) {
        setEmployees(result.employees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    // Assigned to validation
    if (!formData.assignedTo) {
      newErrors.assignedTo = "Please select an employee";
    }

    // Due date validation
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Allow past dates for existing tasks
      if (!task && selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        assignedTo: formData.assignedTo,
        priority: formData.priority,
        category: formData.category.trim() || undefined,
        dueDate: formData.dueDate || undefined,
        status: formData.status,
      };

      const result = await taskService.updateTask(
        task._id,
        updateData
      );

      if (result.success) {
        // Notify parent component
        onTaskUpdated && onTaskUpdated(result.task);

        // Close modal
        onClose();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!loading) {
      setErrors({});
      onClose();
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-3 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">
                Edit Task
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                disabled={loading}
                className="text-black hover:bg-gray-100">
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  Task Title *
                </label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  disabled={loading}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter task description"
                  disabled={loading}
                  rows={4}
                  className={`w-full px-3 py-2 border-3 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all resize-none ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Three Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Assign To */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Assign To *
                  </label>
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    disabled={loading || loadingEmployees}
                    className={`w-full px-3 py-2 border-3 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${
                      errors.assignedTo ? "border-red-500" : ""
                    }`}>
                    <option value="">Select an employee...</option>
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.firstName} {employee.lastName}
                      </option>
                    ))}
                  </select>
                  {loadingEmployees && (
                    <p className="text-sm text-gray-600 mt-1">
                      Loading...
                    </p>
                  )}
                  {errors.assignedTo && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.assignedTo}
                    </p>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border-3 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border-3 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Category
                  </label>
                  <Input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Development, Marketing, Support"
                    disabled={loading}
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    disabled={loading}
                    className={errors.dueDate ? "border-red-500" : ""}
                  />
                  {errors.dueDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dueDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Task Info */}
              <div className="bg-gray-50 p-4 rounded border-2 border-gray-200">
                <h4 className="font-bold text-sm mb-2">
                  Task Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span>{" "}
                    {new Date(task.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading || loadingEmployees}
                  className="flex-1">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update Task"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditTaskModal;
