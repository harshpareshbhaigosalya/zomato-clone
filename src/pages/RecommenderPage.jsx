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
        () => relatedRecipesRef.current && relatedRecipesRef.current.scrollIntoView({ behavior: "smooth" }),
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
  // Use a flattened array of all meal items from the mealPlan
  const getMealItemsFromPlan = (plan) => {
    if (!plan?.mealPlan) return [];
    
    const allItems = [];
    
    // Go through each day
    Object.values(plan.mealPlan).forEach(day => {
      // For each meal type (breakfast, lunch, etc.)
      Object.values(day).forEach(mealItems => {
        // Add all items from this meal to our list
        if (Array.isArray(mealItems)) {
          allItems.push(...mealItems);
        }
      });
    });
    
    return allItems;
  };

  // Get all meal items to match against recipes
  const allMealItems = aiPlan ? getMealItemsFromPlan(aiPlan) : [];
  
  // Find related recipes based on meal item names (simplistic matching)
  const relatedRecipes = allMealItems.length > 0
    ? mockMenu.filter(d => 
        allMealItems.some(item => 
          d.name.toLowerCase().includes(item.toLowerCase()) ||
          item.toLowerCase().includes(d.name.toLowerCase())
        )
      )
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
                {/* Overview */}
                <div className="bg-gray-900 rounded-xl p-6 mt-8 shadow-inner text-yellow-200 max-w-3xl mx-auto whitespace-pre-line leading-relaxed text-left text-lg">
                  <h2 className="text-2xl font-bold text-amber-400 mb-4">Diet Plan Overview</h2>
                  <p>{aiPlan.plan}</p>
                </div>

                {/* Meal Plan */}
                {aiPlan.mealPlan && (
                  <div className="bg-gray-900 rounded-xl p-6 mt-8 shadow-inner text-gray-100 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-amber-400 mb-4">Your Meal Plan</h2>
                    
                    {Object.entries(aiPlan.mealPlan).map(([day, meals], index) => (
                      <div key={day} className={`mb-6 pb-6 ${index !== Object.keys(aiPlan.mealPlan).length - 1 ? 'border-b border-gray-700' : ''}`}>
                        <h3 className="text-xl font-semibold text-amber-300 mb-3">{day}</h3>
                        
                        <div className="space-y-4">
                          {meals.breakfast && (
                            <div>
                              <h4 className="text-md font-medium text-amber-200">Breakfast</h4>
                              <ul className="list-disc list-inside pl-2 text-gray-300">
                                {meals.breakfast.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {meals.midMorningSnack && (
                            <div>
                              <h4 className="text-md font-medium text-amber-200">Mid-Morning Snack</h4>
                              <ul className="list-disc list-inside pl-2 text-gray-300">
                                {meals.midMorningSnack.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {meals.lunch && (
                            <div>
                              <h4 className="text-md font-medium text-amber-200">Lunch</h4>
                              <ul className="list-disc list-inside pl-2 text-gray-300">
                                {meals.lunch.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {meals.eveningSnack && (
                            <div>
                              <h4 className="text-md font-medium text-amber-200">Evening Snack</h4>
                              <ul className="list-disc list-inside pl-2 text-gray-300">
                                {meals.eveningSnack.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {meals.dinner && (
                            <div>
                              <h4 className="text-md font-medium text-amber-200">Dinner</h4>
                              <ul className="list-disc list-inside pl-2 text-gray-300">
                                {meals.dinner.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tips Section */}
                {aiPlan.summary && (
                  <div className="bg-gray-900 rounded-xl p-6 mt-8 shadow-inner text-gray-100 max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-amber-400 mb-4">Tips for Success</h2>
                    <ul className="list-disc list-inside pl-2 text-gray-300 space-y-2">
                      {Array.isArray(aiPlan.summary) ? (
                        aiPlan.summary.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))
                      ) : (
                        <li>{aiPlan.summary}</li>
                      )}
                    </ul>
                  </div>
                )}

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