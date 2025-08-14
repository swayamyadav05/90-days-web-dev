import toast from "react-hot-toast";
import api, { resetSessionExpiredFlag } from "./api";

export const login = async ({ email, password }) => {
  try {
    // API request
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    // Destructure from backend response
    const { token, user } = response.data.data[0];

    // Save token and user in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Reset session expired flag on successful login
    resetSessionExpiredFlag();

    // Give feedback
    toast.success(response.data.message || "Login successful");

    // Return for caller usage
    return { token, user };
  } catch (error) {
    // Login-specific handling
    if (
      error.response?.status === 400 ||
      error.response?.status === 401
    ) {
      toast.error("Invalid email or password");
    }
    // Let component handle everything else
    throw error;
  }
};

export const register = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  try {
    const response = await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      role,
    });

    const { token, user } = response.data.data[0];

    // Save token and user in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Reset session expired flag on successful registration
    resetSessionExpiredFlag();

    toast.success(response.data.message || "Registration successful");

    return { token, user };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        // Show the specific validation message from backend
        const message =
          error.response.data?.message ||
          "Please provide all required fields.";
        toast.error(message);
      } else if (error.response.status === 409) {
        toast.error("Email already exists. Try logging in.");
      }
    }
    throw error; // let component handle any other errors
  }
};

export const logout = () => {
  // Clear stored token and user
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Success message
  toast.success("Logged out successfully.");

  // Redirect to login page
  window.location.href = "/login";
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");

    if (!user) return null;

    return JSON.parse(user);
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

export const isAuthenticated = async () => {
  try {
    await api.get("/auth/profile");
    return true;
  } catch {
    return false;
  }
};

export const getUserProfile = async (options = {}) => {
  try {
    const response = await api.get("/auth/profile");

    return response.data.user;
  } catch (error) {
    if (
      !options.silent &&
      error.response?.status !== 401 &&
      !error.request
    ) {
      toast.error(
        error.response?.data?.message || "Failed to get profile"
      );
    }
    throw error;
  }
};
