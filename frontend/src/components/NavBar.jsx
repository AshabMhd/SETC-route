import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaBusAlt, FaUserCog } from "react-icons/fa";

const NavLink = ({ to, children, onClick, className }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`hover:text-yellow-500 transition ${className || ""}`}
  >
    {children}
  </Link>
);

const AdminButton = ({ onClick, className }) => (
  <button
    onClick={onClick}
    className={`
      bg-yellow-500 text-gray-900 px-4 py-2 rounded-md 
      hover:bg-yellow-600 transition text-sm font-medium 
      flex items-center shadow-sm ${className || ""}
    `}
  >
    <FaUserCog className="mr-2" /> Admin Panel
  </button>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    setIsOpen(false);
    navigate("/admin");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-wide flex items-center"
        >
          <FaBusAlt className="mr-3 text-yellow-500" />
          SETC Route Finder
        </NavLink>

        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/">Home</NavLink>
          <AdminButton onClick={handleAdminClick} />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-yellow-500"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4 bg-gray-800 rounded-md py-3">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-gray-200 py-2 px-3"
          >
            Home
          </NavLink>
          <AdminButton onClick={handleAdminClick} className="w-max" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
