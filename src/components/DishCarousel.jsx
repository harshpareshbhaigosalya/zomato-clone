import React, { useRef, useEffect, useState } from "react";

const DishCarousel = ({ menu }) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  // Auto-scroll effect
  useEffect(() => {
    let scrollInterval;
    
    // Only auto-scroll if not paused and not hovered
    if (!isPaused && !isHovered && scrollRef.current) {
      scrollInterval = setInterval(() => {
        const scrollElement = scrollRef.current;
        const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
        
        // If we're at the end, go back to the beginning
        if (scrollElement.scrollLeft >= maxScrollLeft - 10) {
          scrollElement.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Otherwise, scroll a little bit to the right
          scrollElement.scrollBy({ left: 2, behavior: "auto" });
        }
      }, 50); // Speed control - lower number = faster scroll
    }

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isPaused, isHovered]);

  return (
    <div className="relative mb-8">
      {/* Carousel Title */}
      <h2 className="text-2xl font-bold mb-4">Top Dishes Today</h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
        aria-label="Scroll Left"
      >
        ◀
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
        aria-label="Scroll Right"
      >
        ▶
      </button>

      {/* Pause/Play Button */}
      {/* <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute right-12 top-0 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
        aria-label={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? "▶" : "⏸"}
      </button> */}

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll hide-scrollbar gap-4 pb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {menu.slice(0, 10).map((dish) => (
          <div key={dish.id} className="min-w-[200px] flex-shrink-0">
            <img
              src={
                dish.image ||
                "/api/placeholder/300/200"
              }
              alt={dish.name}
              onError={(e) => {
                e.target.src =
                  "/api/placeholder/300/200";
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