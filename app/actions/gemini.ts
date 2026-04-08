"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export async function generateResumeChatResponse(
  message: string,
  history: { role: "user" | "bot"; text: string }[],
  resumeContext?: string
) {
  if (!genAI) {
    return { success: false, message: "Gemini API key is missing or invalid." }
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are an expert career coach and technical recruiter. Act as a Resume Assistant for a user. Be concise, highly actionable, and encouraging. The user has just uploaded their resume." 
    })

    // Filter out the very first hardcoded greeting if it's from the bot to avoid leading with 'model' 
    // And ensure we don't have consecutive same roles just in case.
    let validHistory = [...history]
    if (validHistory.length > 0 && validHistory[0].role === "bot") {
      validHistory.shift()
    }

    const formattedHistory = validHistory.map((msg) => ({
      role: msg.role === "bot" ? "model" : "user",
      parts: [{ text: msg.text }],
    }))

    const chat = model.startChat({
      history: formattedHistory,
    })

    const result = await chat.sendMessage(message)
    const responseText = result.response.text()

    return { success: true, text: responseText }
  } catch (error: any) {
    console.error("Gemini API Error:", error)
    return { success: false, message: "Failed to generate response. Please try again." }
  }
}
