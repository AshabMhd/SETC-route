import React from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

/**
 * VoiceSearchSection component for handling voice input
 * @param {Object} props
 * @param {boolean} props.listening - Whether voice input is active
 * @param {() => void} props.onStart - Function to start voice input
 * @param {() => void} props.onStop - Function to stop voice input
 * @param {boolean} props.loading - Whether a search is in progress
 */
const VoiceSearchSection = ({ listening, onStart, onStop, loading }) => {
  return (
    <div className="bg-gray-700 p-8 rounded-lg mb-6">
      <div className="flex flex-col items-center">
        <button
          onClick={listening ? onStop : onStart}
          className={`rounded-full w-24 h-24 transition-all focus:outline-none ${
            listening
              ? "bg-red-500 hover:bg-red-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
          aria-label={listening ? "Stop listening" : "Start voice input"}
          disabled={loading}
        >
          {listening ? (
            <FaStop className="h-10 w-10 text-white mx-auto" />
          ) : (
            <FaMicrophone className="h-10 w-10 text-gray-900 mx-auto" />
          )}
        </button>
        <p className="mt-4 text-white text-lg font-medium">
          {listening ? "Listening... Speak Now" : "Tap to Speak"}
        </p>
      </div>
    </div>
  );
};

export default VoiceSearchSection;
