import React, { useState } from "react";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    speak(`Added ${item} to your cart`);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-3 rounded-full shadow-lg z-40"
      >
        🛒 Cart ({cartItems.length})
      </button>

      {/* Sliding Drawer */}
      <div
        className={`fixed bottom-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold">Your Cart</h3>
          <button onClick={() => setIsOpen(false)} className="text-xl">
            &times;
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="border p-3 rounded flex justify-between items-center"
              >
                <span>{item}</span>
                <button
                  className="text-red-600"
                  onClick={() =>
                    setCartItems(cartItems.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t absolute bottom-0 left-0 w-full">
          <div className="font-semibold">Total Items: {cartItems.length}</div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={clearCart}
              className="w-full py-2 bg-gray-200 rounded"
            >
              Clear Cart
            </button>
            <button
              className="w-full py-2 bg-green-600 text-white rounded"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
