import React, { useState } from "react";

const categories = [
  { name: "all", icon: "⭐" },
  { name: "Starters", icon: "🔥" },
  { name: "Main Course", icon: "🍛" },
  { name: "South Indian", icon: "🌱" },
  { name: "North Indian", icon: "🍚" },
  { name: "Biryani", icon: "🍕" },
  { name: "Desserts", icon: "🍰" },
  { name: "Drinks", icon: "🍸" },
  { name: "Fast Food", icon: "🍔" },
  { name: "Chinese", icon: "☕" },
];

const CategoryIcons = ({ onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleClick = (cat) => {
    setActiveCategory(cat);
    onSelectCategory(cat === "all" ? null : cat);
  };

  return (
    <nav
      aria-label="Category Navigation"
      className="flex overflow-x-auto space-x-4 py-3 px-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-full shadow-lg mb-8 scroll-pl-4 snap-x snap-mandatory"
    >
      {categories.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => handleClick(name)}
          className={`flex flex-col items-center justify-center min-w-[80px] snap-start cursor-pointer
            rounded-full px-4 py-3 transition-all duration-300
            ${
              activeCategory === name
                ? "bg-yellow-400 text-white shadow-lg scale-110"
                : "bg-white text-yellow-600 hover:bg-yellow-200 hover:text-yellow-700"
            }
          `}
          aria-pressed={activeCategory === name}
          aria-label={`Filter by ${name}`}
        >
          <span className="text-3xl mb-1">{icon}</span> {/* Custom Icon */}
          <span className="text-sm font-semibold capitalize">{name}</span>
        </button>
      ))}
    </nav>
  );
};

export default CategoryIcons;
