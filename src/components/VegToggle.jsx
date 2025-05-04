import React, { useState } from "react";

const VegToggle = ({ onToggle }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleToggle = (filter) => {
    setActiveFilter(filter);
    onToggle(filter);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Dietary Preference</h3>
      <div className="flex space-x-4">
        <button
          onClick={() => handleToggle("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeFilter === "all"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          All
        </button>

        <button
          onClick={() => handleToggle(true)}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
            activeFilter === true
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Veg Only
        </button>

        <button
          onClick={() => handleToggle(false)}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
            activeFilter === false
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
          Non-Veg
        </button>
      </div>
    </div>
  );
};

export default VegToggle;