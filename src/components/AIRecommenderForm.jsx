import React, { useState } from "react";

const AIRecommenderForm = ({ onRecommend }) => {
  const [formData, setFormData] = useState({
    goal: "weight_loss",
    dietaryPreference: "veg",
    allergies: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRecommend(formData);
  };

  const handleAllergyChange = (allergy) => {
    const index = formData.allergies.indexOf(allergy);
    const newAllergies = [...formData.allergies];
    index === -1 ? newAllergies.push(allergy) : newAllergies.splice(index, 1);
    setFormData({ ...formData, allergies: newAllergies });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mb-10"
    >
      <h2 className="text-2xl font-bold mb-6">Smart Diet Recommender</h2>

      {/* Goal */}
      <div className="mb-4">
        <label className="block text-left text-gray-700 font-medium mb-1">
          Goal
        </label>
        <select
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="weight_loss">Weight Loss</option>
          <option value="muscle_gain">Muscle Gain</option>
          <option value="maintain">Maintain</option>
        </select>
      </div>

      {/* Dietary Preference */}
      <div className="mb-4">
        <label className="block text-left text-gray-700 font-medium mb-1">
          Dietary Preference
        </label>
        <select
          value={formData.dietaryPreference}
          onChange={(e) =>
            setFormData({ ...formData, dietaryPreference: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>

      {/* Allergies */}
      <div className="mb-4">
        <label className="block text-left text-gray-700 font-medium mb-2">
          Allergies
        </label>
        <div className="space-y-2">
          {["nuts", "dairy", "gluten", "seafood"].map((allergy) => (
            <label key={allergy} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.allergies.includes(allergy)}
                onChange={() => handleAllergyChange(allergy)}
                className="mr-2"
              />
              <span className="capitalize">{allergy}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Get Recommendations
      </button>
    </form>
  );
};

export default AIRecommenderForm;
