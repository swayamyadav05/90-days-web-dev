import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import employeeService from "../../../services/employeeService";

const EditEmployeeModal = ({
  isOpen,
  onClose,
  employee,
  onEmployeeUpdated,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form when employee changes
  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
      });
      setErrors({});
    }
  }, [employee]);

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

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
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
      const result = await employeeService.updateEmployee(
        employee._id,
        {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
        }
      );

      if (result.success) {
        // Notify parent component
        onEmployeeUpdated && onEmployeeUpdated(result.employee);

        // Close modal
        onClose();
      }
    } catch (error) {
      console.error("Error updating employee:", error);
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

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-3 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">
                Edit Employee
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
            <p className="text-sm text-gray-600">
              Editing: {employee.firstName} {employee.lastName}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  First Name *
                </label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  disabled={loading}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  Last Name *
                </label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  disabled={loading}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  disabled={loading}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Info Note */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Password changes require
                  separate security verification.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
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
                  variant="success"
                  size="lg"
                  disabled={loading}
                  className="flex-1">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update Employee"
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

export default EditEmployeeModal;
