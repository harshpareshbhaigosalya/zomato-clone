import React, { useState } from "react";

const AIDietPlannerForm = ({ onSubmit, loading }) => {
  const [days, setDays] = useState(1);
  const [diet, setDiet] = useState("veg");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [goal, setGoal] = useState("weight_loss");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ days, diet, age, gender, goal });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        AI Diet Planner
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        {/* Number of Days */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Number of Days
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            required
            className="w-full rounded px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300"
            disabled={loading}
          />
        </div>

        {/* Dietary Preference */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Dietary Preference
          </label>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full rounded px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300"
            disabled={loading}
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Age</label>
          <input
            type="number"
            min={1}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full rounded px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300"
            disabled={loading}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300"
            disabled={loading}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Goal */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full rounded px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300"
            disabled={loading}
          >
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Diet Plan"}
        </button>
      </form>
    </div>
  );
};

export default AIDietPlannerForm;
