import React from "react";
import { FaBusAlt, FaArrowRight } from "react-icons/fa";
import { BUS_TYPES } from "../../../lib/utils/constants";
import RouteCard from "./RouteCard";

const RouteResults = ({ routes }) => {
  if (!routes?.length) return null;

  // Get unique from/to places
  const from = routes[0].from;
  const to = routes[0].to;

  // Group and sort routes by type
  const routesByType = routes.reduce((acc, route) => {
    const type = route.type || "OTHER";
    if (!acc[type]) acc[type] = [];
    acc[type].push(route);
    return acc;
  }, {});

  const sortedTypes = Object.keys(routesByType).sort((a, b) => {
    const priority = { ULTRA: 1, VOLVO: 2, AC: 3, "NON-AC": 4, OTHER: 5 };
    return (priority[a] || 999) - (priority[b] || 999);
  });

  return (
    <div className="mt-6">
      {/* Route Summary */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
        <div className="flex items-center justify-center text-lg text-white space-x-3">
          <span className="font-medium">{from}</span>
          <FaArrowRight className="text-yellow-500" />
          <span className="font-medium">{to}</span>
        </div>
        <div className="text-center mt-2 text-sm text-gray-400">
          Found {routes.length} {routes.length === 1 ? "route" : "routes"}
        </div>
      </div>

      {/* Routes by Type */}
      <div className="space-y-6">
        {sortedTypes.map((type) => (
          <div key={type}>
            <div className="flex items-center mb-3">
              <h3 className="text-base font-medium text-white flex items-center">
                <FaBusAlt className="text-yellow-500 mr-2" />
                {type}
              </h3>
              <span className="ml-2 text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                {routesByType[type].length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {routesByType[type].map((route, index) => (
                <RouteCard key={route.id || index} route={route} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteResults;
