import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for handling Web Speech API speech recognition
 * @param {Object} options
 * @param {Function} options.onResult - Callback function called with transcript when speech is recognized
 * @param {Function} options.onError - Callback function called when an error occurs
 * @returns {Object} Speech recognition controls and state
 */
const useSpeechRecognition = ({ onResult, onError }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError?.(
        "Speech Recognition is not supported in your browser. Please try using Chrome or Edge."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      onResult?.(spokenText);
    };

    recognition.onerror = (event) => {
      setListening(false);
      onError?.(`Speech recognition error: ${event.error}. Please try again.`);
    };

    recognitionRef.current = recognition;
  }, [onResult, onError]);

  const startListening = () => {
    setTranscript("");
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return {
    listening,
    transcript,
    startListening,
    stopListening,
  };
};

export default useSpeechRecognition;
