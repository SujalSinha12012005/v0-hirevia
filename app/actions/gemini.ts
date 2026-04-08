"use server"

import { GoogleGenAI } from "@google/genai"
import { getLatestResumeAnalysis } from "@/app/actions/resume"

const apiKey = process.env.GEMINI_API_KEY
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null

export async function generateResumeChatResponse(
  message: string,
  history: { role: "user" | "bot"; text: string }[],
  resumeContext?: string
) {
  if (!ai) {
    return { success: false, message: "Gemini API key is missing or invalid." }
  }

  try {
    const analysis = await getLatestResumeAnalysis();
    let baseInstruction = "You are an expert career coach and technical recruiter. Act as a Resume Assistant for a user. Be concise, highly actionable, and encouraging. The user has just uploaded their resume."
    
    if (analysis) {
      baseInstruction += `\n\nHere is the user's latest resume analysis data you MUST base your advice on:\n- Overall Match/Score: ${analysis.score}/100\n- Best Fit Role: ${analysis.best_fit_role}\n- Missing Skills: ${analysis.missing_skills.join(", ")}\n- Areas for improvement: ${analysis.suggestions.join(" | ")}`
    }

    let validHistory = [...history]
    if (validHistory.length > 0 && validHistory[0].role === "bot") {
      validHistory.shift()
    }

    const contents = validHistory.map((msg) => ({
      role: msg.role === "bot" ? "model" : "user",
      parts: [{ text: msg.text }],
    }))
    
    // Add the newest message
    contents.push({ role: "user", parts: [{ text: message }] })

    const modelsToTry = [
      "gemini-3-flash-preview",
      "gemini-2.5-pro",
      "gemini-2.5-flash", 
      "gemini-2.0-flash-001"
    ];

    let lastError: any = null;
    
    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: baseInstruction
          }
        });
        
        // If successful, return immediately
        return { success: true, text: response.text }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed, attempting next fallback. Error: ${err.message || 'Unknown'}`);
        // Only continue if the error is 503 (Unavailable) or 429 (Quota limit)
        if (err.status !== 503 && err.status !== 429 && !err.message?.includes("503") && !err.message?.includes("429")) {
            throw err; // For anything else like 400 Bad Request, immediately throw to client
        }
      }
    }

    // If all models failed
    console.error("All Gemini models exhausted. Last error:", lastError)
    return { success: false, message: `API Error: Google's Servers are severely overloaded across all models right now. Please try again in 5 minutes.` }
  } catch (error: any) {
    console.error("Gemini API Error:", error)
    return { success: false, message: `API Error: ${error.message || JSON.stringify(error)}` }
  }
}
