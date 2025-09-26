import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-800">
            <div className="w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">AI InVoice App</span>
          </div>

          <nav className="flex items-center gap-5 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#testimonials" className="hover:text-gray-900">Testimonials</a>
            <a href="#faq" className="hover:text-gray-900">FAQ</a>
            <Link to="/signup" className="hover:text-gray-900">Get started</Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} AI InVoice App. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;


