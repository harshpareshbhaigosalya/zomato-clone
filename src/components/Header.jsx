import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-800 bg-opacity-70 shadow-lg fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-white cursor-pointer hover:text-red-600 transition duration-300">
          Zomato
        </h1>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8 text-white text-lg">
            <li>
              <Link
                to="/"
                className="hover:text-red-600 hover:underline transition duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/restaurant"
                className="hover:text-red-600 hover:underline transition duration-300 ease-in-out"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/recommender"
                className="hover:text-red-600 hover:underline transition duration-300 ease-in-out"
              >
                Recommender
              </Link>
            </li>
            <li>
              <Link
                to="/profile/reviews"
                className="flex items-center hover:text-red-600 hover:underline transition duration-300 ease-in-out"
              >
                <FaUserCircle className="mr-1 text-xl" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
