import api from "./api";
import toast from "react-hot-toast";

// Employee Service - handles all employee-related API calls
const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      console.log("📋 Fetching all employees...");
      const response = await api.get("/employees");

      if (response.data.success) {
        console.log(
          "✅ Employees fetched successfully:",
          response.data.data
        );
        return {
          success: true,
          employees: response.data.data.employees,
          total: response.data.data.total,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
      const message =
        error.response?.data?.message || "Failed to fetch employees";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },

  // Get single employee by ID
  getEmployeeById: async (id) => {
    try {
      console.log(`👤 Fetching employee with ID: ${id}`);
      const response = await api.get(`/employees/${id}`);

      if (response.data.success) {
        console.log(
          "✅ Employee fetched successfully:",
          response.data.data
        );
        return {
          success: true,
          employee: response.data.data.employee,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error fetching employee:", error);
      const message =
        error.response?.data?.message || "Failed to fetch employee";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      console.log("➕ Creating new employee:", employeeData);
      const response = await api.post("/employees", employeeData);

      if (response.data.success) {
        console.log(
          "✅ Employee created successfully:",
          response.data.data
        );
        toast.success("Employee created successfully!");
        return {
          success: true,
          employee: response.data.data.employee,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error creating employee:", error);
      const message =
        error.response?.data?.message || "Failed to create employee";

      // Handle validation errors
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(message);
      }

      return {
        success: false,
        error: message,
        errors: error.response?.data?.errors,
      };
    }
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      console.log(
        `📝 Updating employee with ID: ${id}`,
        employeeData
      );
      const response = await api.put(
        `/employees/${id}`,
        employeeData
      );

      if (response.data.success) {
        console.log(
          "✅ Employee updated successfully:",
          response.data.data
        );
        toast.success("Employee updated successfully!");
        return {
          success: true,
          employee: response.data.data.employee,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error updating employee:", error);
      const message =
        error.response?.data?.message || "Failed to update employee";

      // Handle validation errors
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(message);
      }

      return {
        success: false,
        error: message,
        errors: error.response?.data?.errors,
      };
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      console.log(`🗑️ Deleting employee with ID: ${id}`);
      const response = await api.delete(`/employees/${id}`);

      if (response.data.success) {
        console.log("✅ Employee deleted successfully");
        toast.success("Employee deleted successfully!");
        return {
          success: true,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error deleting employee:", error);
      const message =
        error.response?.data?.message || "Failed to delete employee";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },

  // Search employees
  searchEmployees: async (searchQuery = "", page = 1, limit = 10) => {
    try {
      console.log(
        `🔍 Searching employees with query: "${searchQuery}"`
      );
      const params = { search: searchQuery, page, limit };
      const response = await api.get("/employees/search", { params });

      if (response.data.success) {
        console.log(
          "✅ Employees searched successfully:",
          response.data.data
        );
        return {
          success: true,
          employees: response.data.data.employees,
          total: response.data.data.total,
          page: response.data.data.page,
          totalPages: response.data.data.totalPages,
        };
      }

      throw new Error(response.data.message);
    } catch (error) {
      console.error("❌ Error searching employees:", error);
      const message =
        error.response?.data?.message || "Failed to search employees";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    }
  },
};

export default employeeService;
