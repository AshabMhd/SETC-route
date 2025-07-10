import React from "react";
import { FaBusAlt } from "react-icons/fa";

/**
 * @param {Object} props
 * @param {boolean} props.loading - Whether the search is in progress
 * @param {string} props.textQuery - The current search query
 * @param {(query: string) => void} props.setTextQuery - Function to update the search query
 * @param {(e: React.FormEvent) => void} props.handleSubmit - Function to handle search submission
 */
const TextSearchSection = ({
  loading,
  textQuery,
  setTextQuery,
  handleSubmit,
}) => {
  return (
    <div className="bg-gray-700 p-6 rounded-lg mb-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="search-query"
            className="block text-white mb-2 font-medium"
          >
            Enter your search
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                id="search-query"
                type="text"
                value={textQuery}
                onChange={(e) => setTextQuery(e.target.value)}
                placeholder="Where do you want to go?"
                className="w-full px-4 py-3 bg-gray-800 border-0 rounded-md text-white placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !textQuery.trim()}
              className="bg-yellow-500 text-gray-900 font-medium px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <FaBusAlt className="mr-2" />
              <span>Find Routes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TextSearchSection;
