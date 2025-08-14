import useAuth from "../hooks/useAuth";
import LoginSignup from "../components/auth/LoginSignup";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login
  if (!isAuthenticated || !user) {
    return <LoginSignup />;
  }

  // If authenticated but wrong role, show error
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500">
            Your role:{" "}
            <span className="font-semibold">{user.role}</span>
          </p>
        </div>
      </div>
    );
  }

  // If everything checks out, render the protected content
  return children;
};

export default ProtectedRoute;
