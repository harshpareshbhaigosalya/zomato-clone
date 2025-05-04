const mockMeals = [
    { id: 1, name: "Grilled Chicken Salad", category: "Lunch", isVeg: false, calories: 300, allergens: ["nuts"] },
    { id: 2, name: "Vegan Buddha Bowl", category: "Lunch", isVeg: true, calories: 400, allergens: [] },
    { id: 3, name: "Paneer Tikka", category: "Dinner", isVeg: true, calories: 250, allergens: ["dairy"] },
  ];
  
  export const recommendMeals = (preferences) => {
    return mockMeals.filter((meal) => {
      // Filter by dietary preference
      if (preferences.dietaryPreference === "veg" && !meal.isVeg) return false;
  
      // Filter by allergies
      if (preferences.allergies.some((allergy) => meal.allergens.includes(allergy))) return false;
  
      return true;
    });
  };