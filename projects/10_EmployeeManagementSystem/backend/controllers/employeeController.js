const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all employees (Admin only)
exports.getAllEmployees = async (req, res) => {
  try {
    console.log("📋 Getting all employees...");

    const employees = await User.find(
      { role: "employee" },
      "firstName lastName email role createdAt updatedAt"
    ).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: {
        employees,
        total: employees.length,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

// Get single employee (Admin only)
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`👤 Getting employee with ID: ${id}`);

    const employee = await User.findOne(
      { _id: id, role: "employee" },
      "firstName lastName email role createdAt updatedAt"
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      data: { employee },
    });
  } catch (error) {
    console.error("❌ Error fetching employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee",
    });
  }
};

// Create new employee (Admin only)
exports.createEmployee = async (req, res) => {
  try {
    console.log("➕ Creating new employee:", req.body);

    const { firstName, lastName, email, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide firstName, lastName, email and password",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new employee
    const newEmployee = new User({
      firstName,
      lastName,
      email,
      password,
      role: "employee", // Force role to employee
    });

    const savedEmployee = await newEmployee.save();
    console.log("✅ Employee created successfully");

    // Return employee without password
    const employeeData = await User.findById(
      savedEmployee._id,
      "firstName lastName email role createdAt"
    );

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: { employee: employeeData },
    });
  } catch (error) {
    console.error("❌ Error creating employee:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create employee",
    });
  }
};

// Update employee (Admin only)
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📝 Updating employee with ID: ${id}`);

    const { firstName, lastName, email } = req.body;

    // Check if employee exists
    const employee = await User.findOne({
      _id: id,
      role: "employee",
    });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== employee.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    // Update employee
    const updatedEmployee = await User.findByIdAndUpdate(
      id,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
      },
      { new: true, runValidators: true }
    ).select("firstName lastName email role createdAt updatedAt");

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: { employee: updatedEmployee },
    });
  } catch (error) {
    console.error("❌ Error updating employee:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update employee",
    });
  }
};

// Delete employee (Admin only)
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ Deleting employee with ID: ${id}`);

    // Check if employee exists
    const employee = await User.findOne({
      _id: id,
      role: "employee",
    });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Delete employee
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete employee",
    });
  }
};

// Search employees (Admin only)
exports.searchEmployees = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    console.log(`🔍 Searching employees with query: ${search}`);

    let query = { role: "employee" };

    // Add search filter if provided
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const employees = await User.find(
      query,
      "firstName lastName email role createdAt updatedAt"
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Employees searched successfully",
      data: {
        employees,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error searching employees:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search employees",
    });
  }
};
