import { GoogleGenAI, Type } from "@google/genai";
import { AI_PROMPT } from "../constants/options";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key is missing. Check your .env.local file.");
}

const ai = new GoogleGenAI({
  apiKey,
});

export { AI_PROMPT };

async function callGemini(model, prompt) {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",

        responseJsonSchema: {
          type: Type.OBJECT,
          properties: {
            tripName: {
              type: Type.STRING,
            },

            hotels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hotelName: { type: Type.STRING },
                  hotelAddress: { type: Type.STRING },
                  price: { type: Type.STRING },
                  rating: { type: Type.STRING },
                },
                required: ["hotelName", "hotelAddress", "price", "rating"],
              },
            },

            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },

                  places: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        placeName: { type: Type.STRING },
                        placeDetails: { type: Type.STRING },
                        placeImageUrl: { type: Type.STRING },
                        geoCoordinates: { type: Type.STRING },
                        ticketPricing: { type: Type.STRING },
                        timeToTravel: { type: Type.STRING },
                      },
                      required: [
                        "time",
                        "placeName",
                        "placeDetails",
                        "placeImageUrl",
                        "geoCoordinates",
                        "ticketPricing",
                        "timeToTravel",
                      ],
                    },
                  },
                },
                required: ["day", "places"],
              },
            },
          },

          required: ["tripName", "hotels", "itinerary"],
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}
// Models to try in order. If the first is overloaded, we fall back to the next.
const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-2.5-flash"];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 503 = overloaded, 429 = rate limited, 500 = temporary server error
const isRetryable = (error) => {
  const status = error?.status ?? error?.code;
  const text = String(error?.message || "");
  return (
    [429, 500, 503].includes(status) ||
    text.includes("UNAVAILABLE") ||
    text.includes("RESOURCE_EXHAUSTED")
  );
};

export async function generateAIResponse(prompt) {
  let lastError;

  for (const model of MODELS) {
    // 2 attempts per model, with a short pause between them
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`Trying ${model} (attempt ${attempt})`);
        return await callGemini(model, prompt);
      } catch (error) {
        lastError = error;
        if (!isRetryable(error)) throw error; // a real bug, don't retry
        await sleep(1500 * attempt);
      }
    }
  }

  throw lastError;
}