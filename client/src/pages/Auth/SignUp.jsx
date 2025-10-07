import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (!agreedToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }
        
        setIsLoading(true);
        // Add your signup logic here
        console.log('Signup data:', formData);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const passwordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const getPasswordStrengthColor = (strength) => {
        switch (strength) {
            case 0:
            case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-yellow-500';
            case 4:
            case 5: return 'bg-green-500';
            default: return 'bg-gray-200';
        }
    };

    const getPasswordStrengthText = (strength) => {
        switch (strength) {
            case 0:
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4:
            case 5: return 'Strong';
            default: return '';
        }
    };

    const currentPasswordStrength = passwordStrength(formData.password);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-lg"
            >
                {/* Logo Section */}
                <motion.div 
                    variants={itemVariants}
                    className="text-center mb-8"
                >
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-white text-2xl font-bold">AI</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join us to start generating beautiful invoices</p>
                </motion.div>

                {/* Signup Form */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/50"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="John"
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Doe"
                                    />
                                </div>
                            </motion.div>
                        </div>

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
                                    placeholder="john@example.com"
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
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(currentPasswordStrength)}`}
                                                style={{ width: `${(currentPasswordStrength / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {getPasswordStrengthText(currentPasswordStrength)}
                                        </span>
                                    </div>
                                </div>
                            )}
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
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                            )}
                            {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <p className="text-green-500 text-sm mt-1 flex items-center">
                                    <Check className="w-4 h-4 mr-1" />
                                    Passwords match
                                </p>
                            )}
                        </motion.div>

                        {/* Terms Agreement */}
                        <motion.div variants={itemVariants} className="flex items-start">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-1"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                I agree to the{' '}
                                <Link to="/terms" className="text-purple-600 hover:text-purple-800 font-medium">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">
                                    Privacy Policy
                                </Link>
                            </label>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            variants={itemVariants}
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
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

                        {/* Divider */}
                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </motion.div>

                        {/* Social Login */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.197.233.225.437.166.675-.402 1.58-.402 1.58-.402 1.58-.116.465-.361.233-.361.233-1.293-.465-2.101-1.806-2.101-2.906 0-3.545 2.57-6.806 7.405-6.806 3.896 0 6.92 2.777 6.92 6.481 0 3.86-2.43 6.967-5.805 6.967-1.133 0-2.199-.588-2.563-1.368 0 0-.561 2.139-.698 2.66-.252.937-.937 2.11-1.394 2.83 1.051.324 2.16.5 3.32.5 6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001 12.017.001z"/>
                                </svg>
                                GitHub
                            </motion.button>
                        </motion.div>
                    </form>

                    {/* Login Link */}
                    <motion.div variants={itemVariants} className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SignUp;