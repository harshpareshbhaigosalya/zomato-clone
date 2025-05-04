import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import ErrorBoundary from "../components/ErrorBoundary";
import AIRecommenderForm from "../components/AIRecommenderForm";
import AIDietPlannerForm from "../components/AIDietPlannerForm";
import { mockMenu } from "../data/mockMenu";
import { fetchGeminiDietPlan } from "../components/utils/geminiApi";

const RecommenderPage = () => {
  const [activeTab, setActiveTab] = useState("recommender");
  const [recommendations, setRecommendations] = useState([]);
  const [aiPlan, setAiPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const relatedRecipesRef = useRef(null);
  const [showFeatureInfo, setShowFeatureInfo] = useState(true);
  
  // Auto-hide feature info after 10 seconds
  useEffect(() => {
    if (showFeatureInfo) {
      const timer = setTimeout(() => {
        setShowFeatureInfo(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showFeatureInfo]);

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

  // Get meal items from plan
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
      <br /><br/><br/><br/>
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Enhanced Toggle Tabs with Info Cards */}
        <div className="relative max-w-4xl mx-auto">
          {/* Feature Info Cards */}
          {showFeatureInfo && (
            <div className="absolute -top-20 left-0 right-0 flex justify-center gap-80 mb-6 animate-fade-in">
              <div className={`bg-gray-800 p-4 rounded-lg shadow-lg max-w-md text-center transition-all duration-300 ${activeTab === "recommender" ? "opacity-100 scale-100" : "opacity-60 scale-95"}`}>
                <h3 className="text-amber-400 font-semibold mb-1">Smart Diet Recommender</h3>
                <p className="text-gray-300 text-sm">Quick recommendations based on your preferences and dietary restrictions</p>
              </div>
              <div className={`bg-gray-800 p-4 rounded-lg shadow-lg max-w-md text-center transition-all duration-300 ${activeTab === "aiPlanner" ? "opacity-100 scale-100" : "opacity-60 scale-95"}`}>
                <h3 className="text-amber-400 font-semibold mb-1">AI Diet Planner <span className="bg-amber-500 text-black text-xs py-0.5 px-2 rounded-full ml-1">NEW</span></h3>
                <p className="text-gray-300 text-sm">Advanced AI-powered complete meal plans customized to your goals</p>
              </div>
              <button 
                onClick={() => setShowFeatureInfo(false)}
                className="absolute -top-2 -right-2 bg-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-gray-300 hover:bg-gray-600"
              >
                ×
              </button>
            </div>
          )}

          {/* New Toggle Switch Design */}
          <div className="bg-gray-800 p-2 rounded-full flex relative shadow-lg mx-auto max-w-md">
            <div 
              className={`absolute top-2 bottom-2 ${activeTab === "recommender" ? "left-2" : "left-1/2"} w-1/2 bg-amber-400 rounded-full transition-all duration-500 ease-in-out -z-0`}
            ></div>
            
            {["recommender", "aiPlanner"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 flex-1 py-3 px-4 rounded-full font-semibold text-center transition duration-300 ${
                  activeTab === tab
                    ? "text-black"
                    : "text-amber-300 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-center">
                  {tab === "recommender" ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>Diet Recommender</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>AI Diet Planner</span>
                      <span className="ml-1 bg-amber-600 text-xs px-1.5 py-0.5 rounded-full text-white">NEW</span>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Info button to show features again */}
          {!showFeatureInfo && (
            <button 
              onClick={() => setShowFeatureInfo(true)}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center absolute -right-8 top-3"
              aria-label="Show feature information"
            >
              ?
            </button>
          )}
        </div>

        {/* Section 1: Smart Diet Recommender */}
        {activeTab === "recommender" && (
          <section className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 shadow-2xl transition-all duration-500 ease-in-out">
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
          <section className="bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-3xl p-10 shadow-2xl transition-all duration-500 ease-in-out">
            <div className="flex justify-center items-center mb-8">
              <h1 className="text-4xl font-extrabold text-amber-400 text-center drop-shadow-lg">
                AI-Based Diet Planner
              </h1>
              <span className="ml-4 bg-amber-500 text-black text-sm py-1 px-3 rounded-full">NEW</span>
            </div>
            
            <AIDietPlannerForm onSubmit={handleAiPlan} loading={loading} />

            {loading && (
              <div className="text-center mt-8">
                <div className="flex justify-center mb-3">
                  <div className="loader"></div>
                </div>
                <p className="text-yellow-400 animate-pulse">
                  Generating your personalized diet plan...
                </p>
              </div>
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

      {/* CSS for loading animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .loader {
          border: 3px solid rgba(255, 193, 7, 0.3);
          border-radius: 50%;
          border-top: 3px solid #ffc107;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RecommenderPage;