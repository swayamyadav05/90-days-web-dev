import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as userService from "../services/userService";
import { setInitializationComplete } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial auth check
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if token exists before making API call
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setLoading(false);
          // Mark initialization as complete
          setInitializationComplete();
          return;
        }

        // Only make API call if token exists, and do it silently
        const profile = await userService.getUserProfile({
          silent: true,
        });
        setUser(profile);
      } catch (error) {
        console.error("Auth initialization failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
        // Mark initialization as complete regardless of success/failure
        setInitializationComplete();
      }
    };

    initializeAuth();
  }, []);

  // Login action
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await userService.login(credentials);
      setUser(user);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login Failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Register action
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const { user } = await userService.register(userData);
      setUser(user);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to register";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout action
  const logout = useCallback(() => {
    userService.logout();
    setUser(null);
    setError(null);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value will include state and actions later
  const value = {
    // State
    user,
    loading,
    error,
    isAuthenticated: !!user,

    // Action
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
