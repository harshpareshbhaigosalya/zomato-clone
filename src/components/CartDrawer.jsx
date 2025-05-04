import React, { useState } from "react";

const CartDrawer = ({ cartItems, setCartItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const removeItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-yellow-500 text-black font-bold px-4 py-3 rounded-full shadow-lg z-40 hover:bg-yellow-400 transition-colors"
      >
        🛒 Cart ({cartItems.length})
      </button>

      {/* Sliding Drawer */}
      <div
        className={`fixed bottom-0 right-0 w-full sm:w-96 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-yellow-400">Your Cart</h3>
          <button onClick={() => setIsOpen(false)} className="text-xl text-white hover:text-yellow-400">
            &times;
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-400">Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-700 p-3 rounded flex justify-between items-center bg-gray-800"
              >
                <div className="flex flex-col">
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-yellow-400">${item.price.toFixed(2)}</span>
                </div>
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-gray-700 absolute bottom-0 left-0 w-full bg-gray-900">
          <div className="font-semibold text-white">
            Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={clearCart}
              className="w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear Cart
            </button>
            <button
              className="w-full py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition-colors"
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