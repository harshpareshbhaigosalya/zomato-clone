import React, { useState, useRef } from "react";
import Header from "../components/Header";
import CartDrawer from "../components/CartDrawer";
import RecipeCard from "../components/RecipeCard";
import CategoryIcons from "../components/CategoryIcons";
import VegToggle from "../components/VegToggle";
import AIVoiceAssistant from "../components/AIVoiceAssistant";
import ErrorBoundary from "../components/ErrorBoundary";
import DishCarousel from "../components/DishCarousel";
import OffersBanner from "../components/OfferBanner";
import { mockMenu } from "../data/mockMenu";

const RestaurantPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState(mockMenu);
  const [addedItem, setAddedItem] = useState(null);
  const recipeSectionRef = useRef(null);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    setAddedItem(item);
    setTimeout(() => setAddedItem(null), 3000);
  };

  const handleCategoryChange = (category) => {
    if (!category || category === "all") {
      setFilteredMenu(mockMenu);
    } else {
      setFilteredMenu(mockMenu.filter((dish) => dish.category === category));
    }
    recipeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDietaryToggle = (isVeg) => {
    if (isVeg === "all") {
      setFilteredMenu(mockMenu);
    } else {
      setFilteredMenu(mockMenu.filter((dish) => dish.isVeg === isVeg));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans">
      <Header />
        <br/>
      {/* Floating Cart Drawer */}
      <CartDrawer cartItems={cartItems} setCartItems={setCartItems} />

      {/* Toast Notification */}
      {addedItem && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded-xl shadow-2xl z-50 font-bold text-lg animate-fade-in-out transition-all duration-500">
          Added "{addedItem.name}" to cart!
        </div>
      )}

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Header */}
        <section className="mb-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg mb-2 tracking-tight font-display">
            The Royal Feast
          </h1>
          <p className="text-lg text-yellow-100 mb-4">
            Experience the{" "}
            <span className="font-bold text-yellow-300">Finest Flavours</span>{" "}
            from Kitchen of India!
          </p>
        </section>

        {/* 💥 Best Offers Banner */}
        <OffersBanner />

        {/* ⭐ Hero Dish Carousel */}
        <section className="mb-12">
          <h2 className="text-4xl font-extrabold mb-6 text-center text-yellow-300">
            Top Dishes Today
          </h2>
          <ErrorBoundary>
            <DishCarousel menu={mockMenu} />
          </ErrorBoundary>
        </section>

        {/* 🥗 Dietary Toggle */}
        <div className="mb-8 flex justify-center">
          <VegToggle onToggle={handleDietaryToggle} />
        </div>

        {/* 🍱 Category Selection */}
        <div className="mb-8 flex justify-center">
          <CategoryIcons onSelectCategory={handleCategoryChange} />
        </div>

        {/* 🎙️ Voice Ordering Section */}
        <section className="mb-14 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 rounded-2xl shadow-xl border border-yellow-900 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
            <span role="img" aria-label="microphone">
              🎙️
            </span>{" "}
            Voice Ordering
          </h2>
          <p className="text-yellow-100 mb-6">
            Try saying:{" "}
            <span className="italic text-yellow-300">
              “Add paneer tikka to cart”
            </span>
          </p>
          <AIVoiceAssistant onAddToCart={handleAddToCart} menu={mockMenu} />
        </section>

        {/* 🍽️ Dish Grid Section */}
        <section
          ref={recipeSectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredMenu.length > 0 ? (
            filteredMenu.map((dish) => (
              <ErrorBoundary key={dish.id}>
                <RecipeCard dish={dish} onAddToCart={handleAddToCart} />
              </ErrorBoundary>
            ))
          ) : (
            <p className="col-span-full text-center text-yellow-200 text-xl py-12">
              No items found for this filter.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default RestaurantPage;
