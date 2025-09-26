import { Link } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = false; // Replace with actual authentication logic

  const user = { name: "John Doe", email: "john@gmail.com" }; // Replace with actual user data

  const logout = () => {};

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-gray-100  ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white/0"
      } `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-15 lg:h-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">AI InVoice App</span>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-6 ">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0  after:w-0 after:h-0.5 after:bg-black after:transition-all hover:after:w-full"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              FAQ
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-black hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-900 to-blue-950 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg "
            >
              Sign Up
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 shadow-lg">
              <a
                href="#features"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block mx-3 my-2 bg-gradient-to-r from-blue-900 to-blue-950 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
