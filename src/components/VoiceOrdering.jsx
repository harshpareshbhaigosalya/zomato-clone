import React, { useState } from "react";

const VoiceOrdering = ({ onAddToCart }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onresult = (event) => {
      const transcriptText = event.results[0][0].transcript.toLowerCase().trim();
      setTranscript(transcriptText);

      const matchedItem = mockMenu.find(dish =>
        dish.name.toLowerCase().includes(transcriptText)
      );

      if (matchedItem) {
        onAddToCart(matchedItem);
        alert(`Added ${matchedItem.name} to cart`);
      } else {
        alert("Couldn't find dish: " + transcriptText);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="text-center p-4 bg-transparent rounded-lg shadow-md">
      <button
        onClick={startListening}
        disabled={isListening}
        className={`px-6 py-2 rounded-full ${
          isListening ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
        } text-white transition`}
      >
        {isListening ? "Listening..." : "Start Voice Input"}
      </button>
      {transcript && <p className="mt-4 text-gray-700">You said: <strong>{transcript}</strong></p>}
    </div>
  );
};

export default VoiceOrdering;