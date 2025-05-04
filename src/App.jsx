import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import RestaurantPage from "./pages/RestaurantPage";
import RecommenderPage from "./pages/RecommenderPage";
import ProfilePage from "./pages/UserProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
      <Route path="/recommender" element={<RecommenderPage />} /> 
      <Route path="/profile/:hashId?" element={<ProfilePage />} />
    </Routes>
  );
};

export default App;