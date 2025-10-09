import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { containerVariants, itemVariants } from "../../utils/variants";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import { validatePassword } from "../../utils/validation";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");

      if (validatePassword(formData.password).isValid === false) {
        setError(validatePassword(formData.password).errors[0]);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      setIsLoading(true);
      // Add your signup logic here
      console.log("Signup data:", formData);

      // Simulate API call
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        formData
      );

      if (response.status !== 201) {
        setIsLoading(false);
        setError(response.data.message || "Signup failed. Please try again.");
        return;
      }

      const { token } = response.data;
      if (token) {
        login(response.data, token);
      }

      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      setError("An unexpected error occurred. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join us to start generating beautiful invoices
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            variants={itemVariants}
            className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {error}
          </motion.div>
        )}

        {/* Signup Form */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-1">
                <p
                  className={`text-sm  ${
                    formData.password.length > 8
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <Check className={`inline w-4 h-4 mr-1 `} />
                  Password Length should be greater than 8 characters
                </p>
                <p
                  className={`text-sm  ${
                    !/[a-z]/.test(formData.password)
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <Check className={`inline w-4 h-4 mr-1 `} />
                  Password must contain at least one lowercase letter
                </p>
                <p
                  className={`text-sm ${
                    !/[A-Z]/.test(formData.password)
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <Check className={`inline w-4 h-4 mr-1 `} />
                  Password must contain at least one upperCase letter
                </p>{" "}
                <p
                  className={`text-sm ${
                    !/[0-9]/.test(formData.password)
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <Check className={`inline w-4 h-4 mr-1 `} />
                  Password must contain at least one Number letter
                </p>{" "}
                <p
                  className={`text-sm ${
                    !/[^A-Za-z0-9]/.test(formData.password)
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <Check className={`inline w-4 h-4 mr-1 `} />
                  Password must contain at least one special character
                </p>
              </div>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              )}
            </motion.button>

            {/* Login Link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
