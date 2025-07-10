import { useState } from "react";
import { FaBusAlt, FaExclamationTriangle } from "react-icons/fa";
import { setcRouteService } from "../../lib/services/setcRouteService";
import VoiceSearchSection from "../route-management/components/VoiceSearchSection";
import TextSearchSection from "../route-management/components/TextSearchSection";
import RouteResults from "../route-management/components/RouteResults";
import useSpeechRecognition from "../../lib/hooks/useSpeechRecognition";

/**
 * Dashboard component with voice-enabled SETC bus route search functionality
 * This is the main interface where users can search for bus routes using voice commands
 * or text input. The component uses the Web Speech API for voice recognition.
 */
const Dashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [textQuery, setTextQuery] = useState("");
  const [activeTab, setActiveTab] = useState("voice");

  const handleQuery = async (query) => {
    if (!query?.trim()) {
      setError("Please enter a search query");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setRoutes([]);

      const foundRoutes = await setcRouteService.getRoutes(query);
      setRoutes(foundRoutes || []);

      if (!foundRoutes?.length) {
        setError(
          "No routes found for your query. Please try different locations or check your input."
        );
      }
    } catch (err) {
      setError(
        err.message ||
          "No routes found for your search. Please try different locations or check if the service is available."
      );
    } finally {
      setLoading(false);
    }
  };

  const { listening, transcript, startListening, stopListening } =
    useSpeechRecognition({
      onResult: handleQuery,
      onError: (message) => setError(message),
    });

  const handleTextSubmit = (e) => {
    e.preventDefault();
    handleQuery(textQuery);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-5xl mx-auto px-5 py-10">
        <section className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
          {/* Hero section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center">
              <FaBusAlt className="mr-3 text-yellow-500" />
              SETC Route Finder
            </h1>
            <p className="text-gray-300 text-md max-w-2xl">
              Search for bus routes between cities using voice or text input
            </p>
          </div>

          {/* Search interface */}
          <div className="flex flex-col mb-8">
            <div className="flex mb-4">
              {["voice", "text"].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-5 mr-2 rounded-t-lg transition-colors capitalize ${
                    activeTab === tab
                      ? "bg-gray-700 text-white font-medium"
                      : "bg-gray-900 text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={activeTab === tab}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "voice" ? (
              <VoiceSearchSection
                listening={listening}
                onStart={startListening}
                onStop={stopListening}
                loading={loading}
                transcript={transcript}
              />
            ) : (
              <TextSearchSection
                loading={loading}
                textQuery={textQuery}
                setTextQuery={setTextQuery}
                handleSubmit={handleTextSubmit}
              />
            )}
          </div>

          {/* Results or Error */}
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-600 border-t-yellow-500"></div>
              <p className="mt-3 text-gray-300 font-medium">
                Finding bus routes...
              </p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-900 bg-opacity-30 border-l-4 border-red-500 rounded-md text-red-300 flex items-start">
              <FaExclamationTriangle className="h-5 w-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-medium">No Routes Found</p>
                <p className="mt-1 text-sm">{error}</p>
              </div>
            </div>
          ) : routes.length > 0 ? (
            <RouteResults routes={routes} />
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>Search for bus routes using voice or text input above</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
