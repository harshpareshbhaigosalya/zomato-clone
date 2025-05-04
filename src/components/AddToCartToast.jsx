import React, { useEffect } from "react";

const AddToCartToast = ({ item, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded shadow-md animate-fade-in-out">
      Added "{item?.name}" to cart!
    </div>
  );
};

export default AddToCartToast;
