const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
} = require("../controllers/employeeController");

// Admin middleware - checks if user is admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};

// All routes require authentication and admin privileges
router.use(verifyToken);
router.use(adminMiddleware);

// GET /api/employees - Get all employees
router.get("/", getAllEmployees);

// GET /api/employees/search - Search employees
router.get("/search", searchEmployees);

// GET /api/employees/:id - Get single employee
router.get("/:id", getEmployeeById);

// POST /api/employees - Create new employee
router.post("/", createEmployee);

// PUT /api/employees/:id - Update employee
router.put("/:id", updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete("/:id", deleteEmployee);

module.exports = router;
