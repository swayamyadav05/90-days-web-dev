import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import LoginSignup from "./components/auth/LoginSignup";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import TaskManagement from "./components/admin/tasks/TaskManagement";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

// Auth Hook
import useAuth from "./hooks/useAuth";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          {/* Public Route - Login */}
          <Route path="/login" element={<LoginSignup />} />

          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EmployeeManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tasks"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <TaskManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/* Smart Redirect Route */}
          <Route path="/" element={<SmartRedirect />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

// Smart redirect component based on user role
const SmartRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user.role === "employee") {
    return <Navigate to="/employee/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default App;
