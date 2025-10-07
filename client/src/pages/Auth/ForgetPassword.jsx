import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { motion } from "motion/react";
import { API_PATHS } from "../../utils/apiPaths";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      const response = await axiosInstance.post(
        API_PATHS.AUTH.FORGOT_PASSWORD,
        {
          email,
        }
      );
      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to send reset email");
      }
      setIsEmailSent(true);
    } catch {
      setIsLoading(false);
      setError("Failed to send reset email. Please try again.");
    }
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
    setEmail("");
    setError("");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          variants={successVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Check Your Email
            </h1>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <br />
              <span className="font-medium text-gray-800">{email}</span>
            </p>

         
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(""); // Clear error on input change
                  }}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email address"
                />
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center text-red-600 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </motion.div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading || !email.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending Reset Link...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Send Reset Link
                  <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              )}
            </motion.button>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </motion.div>

            {/* Back to Login */}
            <motion.div variants={itemVariants}>
              <Link
                to="/login"
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium group"
              >
                <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </Link>
            </motion.div>
          </form>



          {/* Additional Help */}
          <motion.div
            variants={itemVariants}
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <p className="text-xs text-gray-600 text-center">
              <strong>Need help?</strong> Contact our support team if you're
              having trouble accessing your account.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
