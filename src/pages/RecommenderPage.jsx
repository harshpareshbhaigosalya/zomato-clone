import React, { useState, useRef } from "react";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import ErrorBoundary from "../components/ErrorBoundary";
import AIRecommenderForm from "../components/AIRecommenderForm"; // your existing form
import AIDietPlannerForm from "../components/AIDietPlannerForm"; // new form for Gemini input
import { mockMenu } from "../data/mockMenu";
import { fetchGeminiDietPlan } from "../components/utils/geminiApi"; // your existing API function

const RecommenderPage = () => {
  const [activeTab, setActiveTab] = useState("recommender"); // toggles between "recommender" and "aiPlanner"
  const [recommendations, setRecommendations] = useState([]);
  const [aiPlan, setAiPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const relatedRecipesRef = useRef(null);

  // Existing filter-based recommender handler
  const handleRecommend = (preferences) => {
    let result = [...mockMenu];
    if (preferences.dietaryPreference === "veg")
      result = result.filter((d) => d.isVeg);
    else if (preferences.dietaryPreference === "non-veg")
      result = result.filter((d) => !d.isVeg);
    if (preferences.allergies.length > 0) {
      result = result.filter(
        (d) => !d.allergens.some((a) => preferences.allergies.includes(a))
      );
    }
    if (preferences.goal === "weight_loss")
      result = result.filter((d) => d.calories <= 300);
    else if (preferences.goal === "muscle_gain")
      result = result.filter((d) => d.protein >= 15 && d.calories >= 350);
    setRecommendations(result);
  };

  // New Gemini AI planner handler
  const handleAiPlan = async (preferences) => {
    setLoading(true);
    setAiPlan(null);
    try {
      const response = await fetchGeminiDietPlan(preferences);
      setAiPlan(response);
      // Scroll to related recipes
      setTimeout(
        () => relatedRecipesRef.current?.scrollIntoView({ behavior: "smooth" }),
        300
      );
    } catch {
      setAiPlan({
        error: "Failed to generate AI diet plan. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter related recipes based on AI recommended dishes
  const relatedRecipes = aiPlan?.recommendedDishes
    ? mockMenu.filter((d) => aiPlan.recommendedDishes.includes(d.name))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-black font-sans">
      <Header />
      <main className="container mx-auto px-6 py-12 space-y-16">
        {/* Toggle Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {["recommender", "aiPlanner"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeTab === tab
                  ? "bg-amber-400 text-black shadow-lg"
                  : "bg-gray-700 text-amber-300 hover:bg-amber-500 hover:text-black"
              }`}
            >
              {tab === "recommender"
                ? "Smart Diet Recommender"
                : "AI Diet Planner"}
            </button>
          ))}
        </div>

        {/* Section 1: Smart Diet Recommender */}
        {activeTab === "recommender" && (
          <section className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 shadow-2xl">
            <h1 className="text-4xl font-extrabold text-amber-400 mb-8 text-center drop-shadow-lg">
              Smart Diet Recommender
            </h1>
            <AIRecommenderForm onRecommend={handleRecommend} />
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
                {recommendations.map((meal) => (
                  <ErrorBoundary key={meal.id}>
                    <RecipeCard dish={meal} onAddToCart={() => {}} />
                  </ErrorBoundary>
                ))}
              </div>
            ) : (
              <p className="mt-10 text-gray-400 text-center">
                No recommendations yet. Try adjusting your filters.
              </p>
            )}
          </section>
        )}

        {/* Section 2: AI-Based Diet Planner */}
        {activeTab === "aiPlanner" && (
          <section className="bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-3xl p-10 shadow-2xl">
            <h1 className="text-4xl font-extrabold text-amber-400 mb-6 text-center drop-shadow-lg">
              AI-Based Diet Planner
            </h1>
            <AIDietPlannerForm onSubmit={handleAiPlan} loading={loading} />

            {loading && (
              <p className="text-yellow-400 text-center mt-8 animate-pulse">
                Generating your personalized diet plan...
              </p>
            )}

            {aiPlan?.error && (
              <p className="text-red-500 text-center mt-8">{aiPlan.error}</p>
            )}

            {aiPlan?.plan && (
              <>
                <div className="bg-gray-900 rounded-xl p-6 mt-8 shadow-inner text-yellow-200 max-w-3xl mx-auto whitespace-pre-line leading-relaxed text-left text-lg">
                  {aiPlan.plan}
                </div>

                <h2
                  ref={relatedRecipesRef}
                  className="text-3xl font-semibold text-amber-400 mt-14 mb-6 text-center drop-shadow-md"
                >
                  Related Recipes
                </h2>

                {relatedRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {relatedRecipes.map((dish) => (
                      <ErrorBoundary key={dish.id}>
                        <RecipeCard dish={dish} onAddToCart={() => {}} />
                      </ErrorBoundary>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">
                    No related recipes found.
                  </p>
                )}
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default RecommenderPage;
