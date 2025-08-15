import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import employeeService from "../../../services/employeeService";

const EmployeeList = ({
  onAddEmployee,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employee.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employee.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [employees, searchTerm]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const result = await employeeService.getAllEmployees();
      if (result.success) {
        setEmployees(result.employees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId, employeeName) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${employeeName}?`
      )
    ) {
      const result = await employeeService.deleteEmployee(employeeId);
      if (result.success) {
        // Remove employee from local state
        setEmployees(
          employees.filter((emp) => emp._id !== employeeId)
        );
        onDeleteEmployee && onDeleteEmployee(employeeId);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <span className="ml-2 text-gray-600">
              Loading employees...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Employee Management ({employees.length})
          </CardTitle>
          <Button variant="primary" size="lg" onClick={onAddEmployee}>
            ➕ Add Employee
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search employees by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-3 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          />
        </div>
      </CardHeader>

      <CardContent>
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">
              No Employees Found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? `No employees match "${searchTerm}"`
                : "Start by adding your first employee to the system."}
            </p>
            {!searchTerm && (
              <Button
                variant="primary"
                size="lg"
                onClick={onAddEmployee}>
                Add First Employee
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full border-3 border-black">
                  <thead>
                    <tr className="bg-gray-100 border-b-3 border-black">
                      <th className="text-left p-4 font-bold border-r-3 border-black">
                        Employee
                      </th>
                      <th className="text-left p-4 font-bold border-r-3 border-black">
                        Email
                      </th>
                      <th className="text-left p-4 font-bold border-r-3 border-black">
                        Join Date
                      </th>
                      <th className="text-left p-4 font-bold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, index) => (
                      <tr
                        key={employee._id}
                        className={`border-b-3 border-black ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}>
                        <td className="p-4 border-r-3 border-black">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-400 border-2 border-black rounded-sm flex items-center justify-center font-bold text-black">
                              {employee.firstName.charAt(0)}
                              {employee.lastName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold">
                                {employee.firstName}{" "}
                                {employee.lastName}
                              </div>
                              <div className="text-sm text-gray-600 capitalize">
                                {employee.role}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-r-3 border-black">
                          {employee.email}
                        </td>
                        <td className="p-4 border-r-3 border-black">
                          {formatDate(employee.createdAt)}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="neutral"
                              size="sm"
                              onClick={() =>
                                onEditEmployee &&
                                onEditEmployee(employee)
                              }>
                              ✏️ Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() =>
                                handleDeleteEmployee(
                                  employee._id,
                                  `${employee.firstName} ${employee.lastName}`
                                )
                              }>
                              🗑️ Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee._id}
                  className="bg-white border-3 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-400 border-2 border-black rounded-sm flex items-center justify-center font-bold text-black">
                      {employee.firstName.charAt(0)}
                      {employee.lastName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">
                        {employee.firstName} {employee.lastName}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {employee.role}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="font-semibold">Email: </span>
                      {employee.email}
                    </div>
                    <div>
                      <span className="font-semibold">Joined: </span>
                      {formatDate(employee.createdAt)}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="neutral"
                      size="sm"
                      onClick={() =>
                        onEditEmployee && onEditEmployee(employee)
                      }
                      className="flex-1">
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        handleDeleteEmployee(
                          employee._id,
                          `${employee.firstName} ${employee.lastName}`
                        )
                      }
                      className="flex-1">
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeList;
