import React from "react";
import { BUS_TYPES } from "../../../lib/utils/constants";
import { FaEdit } from "react-icons/fa";

const formatTime = (timeStr) => {
  const [hours, minutes] = timeStr.trim().split(".");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes || "00"} ${ampm}`;
};

const RouteCard = ({ route, onEdit }) => {
  const typeStyle = BUS_TYPES[route.type] || BUS_TYPES.DEFAULT;

  return (
    <div className="bg-gray-700 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow p-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-medium">
              {route.route_no}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}
            >
              {route.type}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {route.route_length} km
            </span>
            {onEdit && (
              <button
                onClick={() => onEdit(route)}
                className="p-1.5 text-gray-400 hover:text-yellow-500 rounded-full hover:bg-gray-600 transition-colors"
                title="Edit route"
              >
                <FaEdit size={16} />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-300 gap-2">
          <span>{route.from}</span>
          <svg
            className="w-3 h-3 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <span>{route.to}</span>
        </div>
      </div>
      {route.departure_timings && (
        <div className="flex flex-wrap gap-1 mt-1">
          {route.departure_timings
            .split(",")
            .slice(0, 3)
            .map((time, i) => (
              <span
                key={i}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded"
              >
                {formatTime(time)}
              </span>
            ))}
          {route.departure_timings.split(",").length > 3 && (
            <span className="text-xs text-gray-400">
              +{route.departure_timings.split(",").length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default RouteCard;
