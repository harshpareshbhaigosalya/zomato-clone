import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Directly paste your API key if skipping .env for now
// ✅ Correct for Vite
// const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const geminiApiKey = "AIzaSyA6KnKBbP7h9coZznB40BlECDuNFSxfvz4";

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
    
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });
        
        const text = await result.response.text();
        
        // ✅ Debug log: see raw response
        console.log("RAW GEMINI RESPONSE:", text);
        
        // Better approach to extract valid JSON
        let jsonStart = text.indexOf('{');
        let jsonEnd = text.lastIndexOf('}');
        
        if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
            throw new Error("Could not find valid JSON in response");
        }
        
        const jsonText = text.substring(jsonStart, jsonEnd + 1);
        
        // Additional safety check - try parsing
        try {
            const response = JSON.parse(jsonText);
            return response;
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            
            // Fallback: Try more aggressive cleaning if standard approach fails
            const cleanedText = text
                .replace(/```json|```/g, "")  // Remove code block tags
                .trim();
                
            // Find the first { and last } for a more aggressive extraction
            const firstBrace = cleanedText.indexOf('{');
            const lastBrace = cleanedText.lastIndexOf('}');
            
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                const extractedJson = cleanedText.substring(firstBrace, lastBrace + 1);
                return JSON.parse(extractedJson);
            }
            
            throw new Error("Failed to parse JSON from Gemini response");
        }
    } catch (error) {
        console.error("Error fetching diet plan from Gemini:", error);
        throw error;
    }
}