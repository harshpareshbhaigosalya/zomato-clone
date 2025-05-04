import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Directly paste your API key if skipping .env for now
// ✅ Correct for Vite
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;


const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function fetchGeminiDietPlan(preferences) {
    const prompt = `
    You are an expert AI dietician.
    
    Create a detailed, personalized, strict vegetarian diet plan for ${preferences.days} days for a ${preferences.age}-year-old ${preferences.gender} whose goal is ${preferences.goal.replace("_", " ")}.
    
    ⚠️ Very Important Instructions:
    - ❗ Only return raw JSON (no markdown, no description, no code blocks)
    - ✅ Each day must include the following keys:
      - "breakfast": [2 vegetarian items]
      - "midMorningSnack": [1 vegetarian item]
      - "lunch": [2 vegetarian items]
      - "eveningSnack": [1 vegetarian item]
      - "dinner": [2 vegetarian items]
    - 🚫 No text, summaries, or intro — only return a pure JSON object like this:
    
    {
      "plan": "Short 2-line explanation.",
      "mealPlan": {
        "Day 1": {
          "breakfast": ["Item A", "Item B"],
          "midMorningSnack": ["Item C"],
          "lunch": ["Item D", "Item E"],
          "eveningSnack": ["Item F"],
          "dinner": ["Item G", "Item H"]
        },
        ...
      },
      "summary": "5 motivational tips for diet and consistency."
    }
    
    ⚠️ No explanation or preface. No markdown code blocks like \`\`\`json. Just valid raw JSON.
    `;
    

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      });
      
      const text = await result.response.text();
      
      // ✅ Debug log: see raw response
      console.log("RAW GEMINI RESPONSE:", text);
      
      // ✅ Clean the response thoroughly
      const cleanedText = text
        .replace(/```json|```/g, "")       // Remove code block tags
        .replace(/^[^{]+/, "")             // Remove anything before first {
        .replace(/}[^}]*$/, "}");          // Remove anything after last }
      
      // ✅ Parse
      const response = JSON.parse(cleanedText);
      return response;
      
}
