import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaBusAlt,
  FaExclamationTriangle,
  FaSignOutAlt,
} from "react-icons/fa";
import { setcRouteService } from "../../lib/services/setcRouteService";
import { authService } from "../../lib/services/auth";
import RouteCard from "./components/RouteCard";
import RouteModal from "./components/RouteModal";

/**
 * Admin component for managing SETC bus routes
 * Provides CRUD functionality for creating, reading, updating, and deleting custom routes
 * These custom routes will appear in search results alongside official API routes
 */
const ManageSETCRoutes = () => {
  // State management
  const [routes, setRoutes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [currentRoute, setCurrentRoute] = useState({
    depot: "",
    route_no: "",
    from: "",
    to: "",
    route_length: 0,
    type: "",
    no_of_service: 1,
    departure_timings: "",
  });

  // Reset form to initial state
  const resetForm = () => {
    setCurrentRoute({
      depot: "",
      route_no: "",
      from: "",
      to: "",
      route_length: 0,
      type: "",
      no_of_service: 1,
      departure_timings: "",
    });
    setIsModalOpen(false);
    setError(null);
  };

  // Validate form data
  const validateForm = () => {
    if (
      !currentRoute.depot ||
      !currentRoute.route_no ||
      !currentRoute.from ||
      !currentRoute.to ||
      !currentRoute.type ||
      !currentRoute.departure_timings
    ) {
      setError("Please fill in all required fields");
      return false;
    }

    if (isNaN(currentRoute.route_length) || currentRoute.route_length <= 0) {
      setError("Route length must be a positive number");
      return false;
    }

    if (isNaN(currentRoute.no_of_service) || currentRoute.no_of_service <= 0) {
      setError("Number of services must be a positive number");
      return false;
    }

    return true;
  };

  // Fetch routes on component mount
  useEffect(() => {
    fetchRoutes();
  }, []);

  // Fetch all custom SETC routes
  const fetchRoutes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await setcRouteService.getRoutes();
      setRoutes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching SETC routes:", err);
      setError("Failed to load SETC routes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setError(null);
      const isUpdate = Boolean(currentRoute._id);
      let response;

      if (isUpdate) {
        response = await setcRouteService.updateRoute(
          currentRoute._id,
          currentRoute
        );
        setRoutes((prevRoutes) =>
          prevRoutes.map((route) =>
            route._id === currentRoute._id ? response : route
          )
        );
      } else {
        response = await setcRouteService.addRoute(currentRoute);
        setRoutes((prevRoutes) => [...prevRoutes, response]);
      }

      resetForm();
    } catch (err) {
      console.error("Error saving route:", err);
      setError(
        err.message ||
          `Failed to ${
            currentRoute._id ? "update" : "create"
          } route. Please try again.`
      );
    }
  };

  // Handle edit route
  const handleEdit = (route) => {
    setCurrentRoute({ ...route }); // Ensure we clone the route object
    setIsModalOpen(true);
    setError(null);
  };

  // Handle delete route
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this route?")) return;

    try {
      await setcRouteService.deleteRoute(_id);
      setRoutes((prevRoutes) =>
        prevRoutes.filter((route) => route._id !== _id)
      );
      setError(null);
    } catch (err) {
      console.error("Error deleting route:", err);
      setError(err.message || "Failed to delete route. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FaBusAlt className="text-yellow-500 mr-3" />
          Manage SETC Routes
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-yellow-500 text-gray-900 px-5 py-2 rounded-md hover:bg-yellow-600 transition-colors focus:outline-none font-medium flex items-center shadow-sm"
          >
            <FaPlus className="mr-2" /> Add New Route
          </button>
          <button
            onClick={() => authService.signout()}
            className="bg-gray-700 text-gray-300 px-5 py-2 rounded-md hover:bg-gray-600 hover:text-white transition-colors focus:outline-none font-medium flex items-center shadow-sm"
          >
            <FaSignOutAlt className="mr-2" /> Sign Out
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border-l-4 border-red-500 rounded-md text-red-300 flex items-start">
          <FaExclamationTriangle className="h-5 w-5 mr-3 mt-0.5 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-white py-16 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-yellow-500 mr-4"></div>
          <span className="text-lg">Loading SETC routes...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {routes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {routes.map((route) => (
                <RouteCard
                  key={route._id}
                  route={route}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 text-center p-12 rounded-lg border border-gray-700">
              <div className="text-gray-400 mb-3">
                No custom SETC routes found
              </div>
              <p className="text-gray-500 mb-4">
                Add your first route using the button above!
              </p>
              <FaBusAlt className="text-yellow-500 mx-auto h-10 w-10 opacity-50" />
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <RouteModal
          route={currentRoute}
          onClose={resetForm}
          onSubmit={handleSubmit}
          onChange={setCurrentRoute}
          error={error}
        />
      )}
    </div>
  );
};

export default ManageSETCRoutes;
