import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import VegToggle from "./VegToggle"; // ✅ Make sure this path is correct

const RecipeList = ({ menu, onAddToCart }) => {
  const [filteredMenu, setFilteredMenu] = useState(menu);

  const handleCategoryChange = (category) => {
    if (category === "all") {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(menu.filter((item) => item.category === category));
    }
  };

  const handleVegToggle = (isVeg) => {
    if (isVeg === "all") {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(menu.filter((item) => item.isVeg === isVeg));
    }
  };

  return (
    <div>
      {/* Veg/Non-Veg Toggle */}
      <VegToggle onToggle={handleVegToggle} />

      {/* Categories */}
      <div className="mb-8 flex overflow-x-auto space-x-4 justify-center pb-2">
        {["all", "Starters", "Main Course", "Biryani", "South Indian", "Desserts", "Fast Food", "Chinese"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className="whitespace-nowrap px-4 py-2 bg-gray-200 rounded-full hover:bg-red-100 transition"
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <RecipeCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p>No items found for this filter.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;