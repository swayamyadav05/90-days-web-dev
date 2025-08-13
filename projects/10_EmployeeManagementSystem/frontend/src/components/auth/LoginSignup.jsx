import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import useAuth from "../../hooks/useAuth";

const LoginSignup = () => {
  // State for toggling between login and signup
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Use the custom Auth hook
  const { login, register } = useAuth();

  // Navigation hook
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  // Toggle between login and signup modes
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Signup-specific validations
    if (!isLoginMode) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
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

    setIsLoading(true);

    try {
      let result;

      if (isLoginMode) {
        // Login API call
        result = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Register API call - Split the name into firstName and lastName
        const nameParts = formData.name.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        result = await register({
          firstName,
          lastName,
          email: formData.email,
          password: formData.password,
          role: "employee", // Default role
        });
      }

      // Handle successful result
      if (result.success) {
        // Success! User is now logged in and context is updated
        console.log("Auth successful!");

        // Clear the form fields
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Clear any errors
        setErrors({});

        // If it was registration, switch to login mode or redirect
        if (!isLoginMode) {
          // Option 1: Switch to login mode to let user know they can now login
          setIsLoginMode(true);
        } else {
          // For login, redirect to appropriate dashboard based on role
          console.log("User logged in successfully!");

          // Navigate based on user role from the login result
          if (result.user?.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
          } else if (result.user?.role === "employee") {
            navigate("/employee/dashboard", { replace: true });
          } else {
            navigate("/", { replace: true }); // Fallback to home
          }
        }

        // The toast notifications are already handled in the auth service
      } else {
        // Handle any specific errors from the result
        setErrors({
          general: result.error || "Authentication failed",
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrors({
        general: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-start leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {isLoginMode
              ? "Login to your account"
              : "Create your account"}
          </CardTitle>
          <CardDescription className="text-sm text-start leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {isLoginMode
              ? "Enter your credentials below to login"
              : "Enter your details below to create account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Name field - only show in signup mode */}
              {!isLoginMode && (
                <div className="grid gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-start leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name..."
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required={!isLoginMode}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm m-0">
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              {/* Email field */}
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-start leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email..."
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm m-0">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  {isLoginMode && (
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password..."
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm m-0">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password field - only show in signup mode */}
              {!isLoginMode && (
                <div className="grid gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-start leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password..."
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required={!isLoginMode}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm m-0">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* General error message */}
              {errors.general && (
                <p className="text-red-500 text-sm text-center m-0">
                  {errors.general}
                </p>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
            onClick={handleSubmit}>
            {isLoading
              ? isLoginMode
                ? "Signing in..."
                : "Creating account..."
              : isLoginMode
              ? "Login"
              : "Create Account"}
          </Button>

          <div className="mt-4 text-center text-sm">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}
              className="underline underline-offset-4">
              {isLoginMode ? (
                <Button variant="secondary">Sign up</Button>
              ) : (
                <Button variant="secondary">Login</Button>
              )}
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginSignup;
