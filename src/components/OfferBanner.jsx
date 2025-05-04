import React from "react";
import { BadgePercent, Truck, IndianRupee } from "lucide-react";

// Optionally, you can use food images/icons for more visual appeal
// import pizzaImg from "../assets/pizza.svg";

const offers = [
  {
    title: "Rs. 99 Full Thali",
    subtitle: "Upto 50% Off",
    icon: <IndianRupee className="w-8 h-8 text-yellow-400 drop-shadow-lg" />,
  },
  {
    title: "BOGO Pizza",
    subtitle: "Buy 1 Get 1 Free",
    icon: <BadgePercent className="w-8 h-8 text-yellow-400 drop-shadow-lg" />,
    // img: pizzaImg,
  },
  {
    title: "20% Off on Momos",
    subtitle: "On orders above ₹200",
    icon: <BadgePercent className="w-8 h-8 text-yellow-400 drop-shadow-lg" />,
  },
  {
    title: "Free Delivery",
    subtitle: "On orders over ₹149",
    icon: <Truck className="w-8 h-8 text-yellow-400 drop-shadow-lg" />,
  },
  {
    title: "Flat ₹100 Off",
    subtitle: "Use code: SAVE100",
    icon: <BadgePercent className="w-8 h-8 text-yellow-400 drop-shadow-lg" />,
  },
  {
    title: "Midnight Deals",
    subtitle: "Upto 40% Off post 10 PM",
    icon: <BadgePercent className="w-8 h-8 text-yellow-400 drop-shadow-lg" />,
  },
  {
    title: "Family Pack Combo",
    subtitle: "Starting at ₹299",
    icon: <IndianRupee className="w-8 h-8 text-yellow-400 drop-shadow-lg" />,
  },
  {
    title: "Healthy Bowls",
    subtitle: "Flat 30% Off",
    icon: <BadgePercent className="w-8 h-8 text-yellow-400 drop-shadow-lg" />,
  },
];

const OffersBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 rounded-3xl shadow-2xl mb-14 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             background: "url('https://www.transparenttextures.com/patterns/diamond-upholstery.png') repeat"
           }}></div>
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 text-yellow-400 drop-shadow-lg tracking-wide">
        🔥 Best Offer Zone
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-yellow-700/90 via-yellow-900/80 to-black/80 
                        rounded-2xl p-7 flex flex-col items-center shadow-xl border border-yellow-900
                        transition-transform duration-300 hover:scale-105 hover:shadow-yellow-400/30
                        relative overflow-hidden"
          >
            {/* Glowing animated ring */}
            <span className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition"></span>
            <div className="flex justify-center items-center mb-4 animate-fade-in">
              {offer.icon}
              {/* Optional food image: <img src={offer.img} alt="" className="w-10 h-10 ml-2" /> */}
            </div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-1 drop-shadow-sm text-center font-display">
              {offer.title}
            </h3>
            <p className="text-base text-yellow-100 mb-4 text-center">{offer.subtitle}</p>
            <button className="bg-black/80 border border-yellow-400 text-yellow-300 px-5 py-2 rounded-full font-semibold
                               shadow-md hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all duration-200
                               focus:outline-none focus:ring-2 focus:ring-yellow-300">
              Order Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OffersBanner;
