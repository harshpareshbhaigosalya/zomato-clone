import React, { useState } from "react";

// Mock Recommender Logic
const recommendMeals = (preferences) => {
  const meals = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      category: "Lunch",
      isVeg: false,
      calories: 300,
      allergens: ["nuts"],
    },
    {
      id: 2,
      name: "Vegan Buddha Bowl",
      category: "Lunch",
      isVeg: true,
      calories: 400,
      allergens: [],
    },
    {
      id: 3,
      name: "Paneer Tikka",
      category: "Dinner",
      isVeg: true,
      calories: 250,
      allergens: ["dairy"],
    },
  ];

  return meals.filter((meal) => {
    if (preferences.dietaryPreference === "veg" && !meal.isVeg) return false;
    if (
      preferences.allergies.some((allergy) => meal.allergens.includes(allergy))
    )
      return false;
    return true;
  });
};

const Recommender = () => {
  const [formData, setFormData] = useState({
    fitnessGoal: "maintain",
    dietaryPreference: "veg",
    allergies: [],
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecommendations(recommendMeals(formData));
  };

  const handleAllergyChange = (allergy) => {
    const index = formData.allergies.indexOf(allergy);
    const newAllergies = [...formData.allergies];
    index === -1 ? newAllergies.push(allergy) : newAllergies.splice(index, 1);
    setFormData({ ...formData, allergies: newAllergies });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Smart Diet Recommender
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fitness Goal */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Fitness Goal
          </label>
          <select
            value={formData.fitnessGoal}
            onChange={(e) =>
              setFormData({ ...formData, fitnessGoal: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintain">Maintain</option>
          </select>
        </div>

        {/* Dietary Preference */}
        <div>
          <label className="block text-black-700 font-medium mb-1">
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
        <div>
          <label className="block text-black-700 font-medium mb-2">
            Allergies
          </label>
          <div className="space-y-2 text-black-700">
            {["nuts", "dairy", "gluten", "seafood"].map((allergy) => (
              <label key={allergy} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.allergies.includes(allergy)}
                  onChange={() => handleAllergyChange(allergy)}
                  className="mr-2"
                />
                <span className="text-clack-700 capitalize">{allergy}</span>
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

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-3">Recommended Meals</h3>
          <ul className="space-y-2">
            {recommendations.map((meal) => (
              <li key={meal.id} className="p-3 border rounded hover:bg-gray-50">
                <div className="font-medium">{meal.name}</div>
                <div className="text-sm text-gray-600">
                  Calories: {meal.calories}
                </div>
                {meal.allergens.length > 0 && (
                  <div className="text-sm text-red-500">
                    Allergens: {meal.allergens.join(", ")}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recommender;
