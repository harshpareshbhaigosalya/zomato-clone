import React, { useState } from "react";

const SearchBar = ({ menu, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter by name or category
    const results = menu.filter(
      (dish) =>
        dish.name.toLowerCase().includes(term) ||
        dish.category.toLowerCase().includes(term)
    );

    onSearch(results);
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search dishes..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
};

export default SearchBar;