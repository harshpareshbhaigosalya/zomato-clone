import React, { useState } from "react";

const SimpleVoiceAssistant = ({ onAddToCart, menu }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [lastMatched, setLastMatched] = useState("");

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    setResponse(text);
    setTimeout(() => setResponse(""), 3000);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    let hasMatched = false; // Prevent re-matching same item

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      setResponse("Ready to listen...");
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const current = result[0].transcript.toLowerCase().trim();

        if (result.isFinal && !hasMatched) {
          setTranscript(current);

          const matchedItem = menu.find(
            (dish) =>
              dish.name.toLowerCase().includes(current) ||
              current.includes(dish.name.toLowerCase())
          );

          if (matchedItem && matchedItem.name !== lastMatched) {
            onAddToCart(matchedItem);
            speak(`Added ${matchedItem.name} to cart. Thank you!`);
            setLastMatched(matchedItem.name);
            hasMatched = true;

            setTimeout(() => {
              hasMatched = false;
            }, 5000); // Allow next match after 5 seconds

            recognition.stop(); // ✅ Stop recognition after match
          } else {
            speak("No such dish available");
            recognition.stop();
          }
        }
      }
    };

    recognition.onerror = (e) => {
      console.error("Voice Recognition Error:", e.error);
      speak("Oops! There was an issue with voice input.");
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
          isListening ? "bg-gray-400" : "bg-yellow-600 hover:bg-yellow-700"
        } text-white transition`}
      >
        {isListening ? "Listening..." : "Start Voice Input"}
      </button>

      {transcript && (
        <p className="mt-4 text-yellow-700">
          You said: <strong>{transcript}</strong>
        </p>
      )}

      {response && response !== "Ready to listen..." && (
        <p className="mt-2 text-yellow-600">{response}</p>
      )}
    </div>
  );
};

export default SimpleVoiceAssistant;
