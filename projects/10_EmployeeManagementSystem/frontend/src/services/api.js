import axios from "axios";
import toast from "react-hot-toast";

const baseConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(baseConfig);

// Track if session expiration toast has already been shown
let sessionExpiredToastShown = false;
// Track if we're in the initial app load phase
let isInitializing = true;

// After 3 seconds, consider initialization complete
setTimeout(() => {
  isInitializing = false;
}, 3000);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          localStorage.removeItem("token");
          // Only show session expired toast once
          if (!sessionExpiredToastShown) {
            sessionExpiredToastShown = true;
            toast.error(
              "Your session has expired. Please log in again."
            );
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          }
          break;

        case 403:
          toast.error(
            "You do not have permission to perform this action."
          );
          break;

        case 404:
          toast.error("The requested resource was not found.");
          break;

        case 500:
          toast.error(
            "Something went wrong on our end. Please try again later."
          );
          console.log(error.response.data);
          break;

        default:
          // Don't show toasts for errors that specific services handle:
          // 400: Validation errors (handled by userService, etc.)
          // 409: Conflict errors (handled by userService, etc.)
          // 422: Unprocessable entity (usually validation - let services handle)
          if (![400, 409, 422].includes(status)) {
            toast.error(
              data?.message || "An unexpected error occurred."
            );
          }
          break;
      }
    }
    // No response from server — could be network or server down
    else if (error.request) {
      // Don't show network error toasts during initial app load
      if (!isInitializing) {
        toast.error("Server is unreachable. Please try again later.");
      }
    }
    // Request was never sent — likely network issue
    else {
      // Don't show network error toasts during initial app load
      if (!isInitializing) {
        toast.error(
          "No internet connection. Check your network and try again."
        );
      }
    }
    return Promise.reject(error);
  }
);

// Function to reset the session expired toast flag (useful for testing or after successful login)
export const resetSessionExpiredFlag = () => {
  sessionExpiredToastShown = false;
};

// Function to mark initialization as complete
export const setInitializationComplete = () => {
  isInitializing = false;
};

export default api;
