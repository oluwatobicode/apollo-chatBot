// import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = "AIzaSyBu068Q-HLr_Oh5fxlcw00qnrrt_lDI5-U";

export const sendPromptToOpenAI = async (
  messages: { role: string; content: string }[]
) => {
  try {
    // Convert messages to a single prompt for Gemini
    let prompt = "";

    // Add conversation history context
    if (messages.length > 1) {
      const conversationHistory = messages
        .slice(0, -1)
        .map(
          (msg) =>
            `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}`
        )
        .join("\n");

      prompt = `Previous conversation:\n${conversationHistory}\n\nHuman: ${
        messages[messages.length - 1].content
      }`;
    } else {
      prompt = messages[messages.length - 1].content;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format from Gemini");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Sorry, I couldn't process your request right now.");
  }
};
