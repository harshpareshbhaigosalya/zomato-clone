import React from "react";

// SVG for Veg (Leaf) and Non-Veg (Drumstick)
const VegIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-green-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C12 2 8 6 8 9C8 12 12 15 12 18C12 21 16 22 16 18C16 14 12 12 12 9C12 6 16 2 16 2C16 2 12 2 12 2Z" />
  </svg>
);

const NonVegIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-red-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C10.343 2 9 3.343 9 5C9 6.657 10.343 8 12 8C13.657 8 15 6.657 15 5C15 3.343 13.657 2 12 2ZM12 8C7.029 8 4 12 4 12V15H20V12C20 12 16.971 8 12 8ZM12 18C13.104 18 14 18.896 14 20C14 21.104 13.104 22 12 22C10.896 22 10 21.104 10 20C10 18.896 10.896 18 12 18Z" />
  </svg>
);

const RecipeCard = ({ dish, onAddToCart }) => {
  if (!dish?.name) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer relative flex flex-col h-full">
      <img
        src={dish.image || "https://via.placeholder.com/400x250?text=No+Image"}
        alt={dish.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x250?text=No+Image";
        }}
        className="w-full h-56 object-cover"
      />

      {/* Veg/Non-Veg Badge */}
      <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white bg-opacity-80 rounded-full px-3 py-1 shadow-md">
        {dish.isVeg ? <VegIcon /> : <NonVegIcon />}
        <span className={`text-sm font-semibold ${dish.isVeg ? "text-green-700" : "text-red-700"}`}>
          {dish.isVeg ? "Veg" : "Non-Veg"}
        </span>
      </div>

      <div className="p-5 flex flex-col space-y-3 flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 truncate">{dish.name}</h3>

        <p className="text-gray-600 text-sm">
          {dish.calories} kcal •{" "}
          <span className="font-semibold text-amber-600">₹{dish.price}</span>
        </p>

        {dish.allergens?.length > 0 && (
          <p className="text-xs text-red-500 font-medium">
            Allergens: {dish.allergens.join(", ")}
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(dish)}
          className="mt-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-5 py-2 shadow-md transition transform active:scale-95"
          aria-label={`Add ${dish.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
