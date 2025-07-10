import { FaBusAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-5 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-3 sm:mb-0">
          <FaBusAlt className="mr-3 text-yellow-500" />
          <span className="font-semibold">SETC Route Finder</span>
        </div>
        <div className="text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Voice-Based Transport Enquiry System
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
