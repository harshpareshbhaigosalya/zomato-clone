import React, { useState } from "react";

const RecipeDetailModal = ({ item, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">×</button>
        <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-4 rounded" />
        <h2 className="text-2xl font-bold">{item.name}</h2>
        <p className="text-gray-700 my-2">{item.category} • ₹{item.price}</p>
        <p className="text-gray-600 mb-4">Calories: {item.calories}</p>
        <p className="text-gray-600 mb-4">Allergens: {item.allergens.join(", ") || "None"}</p>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecipeDetailModal;