import React, { useState } from "react";

const AIChatAssistant = ({ menu, onAddToCart }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = query.trim().toLowerCase();

    if (!input) return;

    if (input.includes("hello") || input.includes("hi")) {
      setResponse(
        "Hi! I'm your food assistant. Ask me about the menu or say 'Add paneer tikka'"
      );
    } else if (input.includes("menu") || input.includes("food")) {
      setResponse(
        `We have ${menu.length}+ items including Paneer Tikka, Chicken Wings, Masala Dosa, and more.`
      );
    } else if (input.includes("healthy")) {
      const healthy = menu.filter((dish) => dish.calories <= 300);
      setResponse(
        `Try these low-calorie options: ${healthy
          .map((d) => d.name)
          .join(", ")}`
      );
    } else if (input.includes("paneer") || input.includes("chicken")) {
      const matches = menu.filter((dish) =>
        dish.name.toLowerCase().includes(input)
      );
      setResponse(
        matches.length > 0
          ? `Found ${matches.length} items: ${matches
              .map((d) => d.name)
              .join(", ")}`
          : "No match found."
      );
    } else if (input.includes("add ")) {
      const dishName = input.replace("add ", "").trim();
      const matchedItem = menu.find((dish) =>
        dish.name.toLowerCase().includes(dishName)
      );

      if (matchedItem) {
        onAddToCart(matchedItem);
        setResponse(`Added "${matchedItem.name}" to cart`);
      } else {
        setResponse("No such dish available");
      }
    } else {
      setResponse("Ask about food, order, or ask for recommendations.");
    }

    setTimeout(() => setResponse(""), 6000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold mb-4">Need Help?</h3>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Ask anything about the menu or diet"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-r hover:bg-red-700"
        >
          Ask
        </button>
      </form>

      {response && <p className="mt-4 text-blue-600">{response}</p>}
    </div>
  );
};

export default AIChatAssistant;
