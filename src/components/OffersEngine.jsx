import React, { useEffect, useState } from "react";

const OffersEngine = () => {
  const [offer, setOffer] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    let selected = "";
    if (hour < 12) {
      selected = "Morning Deal: Rs. 99 Thali • Free delivery above ₹149";
    } else if (hour < 18) {
      selected = "Lunch Offer: BOGO Pizza • 50% Off on Desserts";
    } else {
      selected = "Evening Special: 40% Off on Biryani • Upto Rs. 200 off";
    }

    setOffer(selected);
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-500 to-orange-400 text-white p-6 rounded-lg shadow-md mb-8 text-center">
      <h3 className="text-xl font-bold">🔥 Today’s Best Offer</h3>
      <p className="mt-2">{offer}</p>
    </div>
  );
};

export default OffersEngine;