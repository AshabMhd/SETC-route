import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const RouteModal = ({ route, onClose, onSubmit, onChange, error }) => {
  const handleChange = ({ target: { name, value } }) => {
    onChange({
      ...route,
      [name]: name.match(/route_length|no_of_service/) ? Number(value) : value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <form onSubmit={onSubmit} className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">
            {route._id ? "Edit Route" : "Add New Route"}
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border-l-4 border-red-500 rounded text-red-300 text-sm flex items-start">
              <FaExclamationCircle className="h-5 w-5 mr-2 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Depot
              </label>
              <input
                type="text"
                name="depot"
                value={route.depot}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter depot name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Route Number
              </label>
              <input
                type="text"
                name="route_no"
                value={route.route_no}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter route number"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  From
                </label>
                <input
                  type="text"
                  name="from"
                  value={route.from}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Start location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  To
                </label>
                <input
                  type="text"
                  name="to"
                  value={route.to}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="End location"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Route Type
              </label>
              <select
                name="type"
                value={route.type}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select type</option>
                <option value="ULTRA">Ultra</option>
                <option value="VOLVO">Volvo</option>
                <option value="AC">AC</option>
                <option value="NON-AC">Non-AC</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Route Length (km)
                </label>
                <input
                  type="number"
                  name="route_length"
                  value={route.route_length}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter distance"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Number of Services
                </label>
                <input
                  type="number"
                  name="no_of_service"
                  value={route.no_of_service}
                  onChange={handleChange}
                  min="1"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Number of buses"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Departure Times
              </label>
              <input
                type="text"
                name="departure_timings"
                value={route.departure_timings}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter times (comma-separated, e.g., 10.30, 14.15)"
              />
              <p className="mt-1 text-xs text-gray-400">
                Use 24-hour format, separated by commas (e.g., 10.30, 14.15,
                18.45)
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {route._id ? "Update Route" : "Add Route"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteModal;
