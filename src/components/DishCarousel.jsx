import React, { useRef } from "react";

const DishCarousel = ({ menu }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-8">
      {/* Carousel Title */}
      <h2 className="text-2xl font-bold mb-4">Top Dishes Today</h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
        aria-label="Scroll Left"
      ></button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
        aria-label="Scroll Right"
      ></button>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll hide-scrollbar gap-4 pb-4"
      >
        {menu.slice(0, 10).map((dish) => (
          <div key={dish.id} className="min-w-[200px] flex-shrink-0">
            <img
              src={
                dish.image ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={dish.name}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-3 bg-white rounded-b-lg shadow-sm">
              <h3 className="font-medium">{dish.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                ₹{dish.price} • {dish.calories} kcal
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Custom scrollbar styling */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default DishCarousel;
