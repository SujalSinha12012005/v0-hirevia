import { NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""

export async function POST(request: NextRequest) {
  try {
    const { role, skills } = await request.json()
    
    if (!GEMINI_API_KEY) {
      // Return mock roadmap when no API key
      return NextResponse.json({ 
        roadmap: skills.map((skill: string, i: number) => ({
          skill,
          topic: `Advanced ${skill} concepts for ${role}`,
          duration: `${(i + 1) * 3} days`,
          resources: [
            `${skill} Official Documentation`,
            "Online Course Platform",
            "Practice Project"
          ],
          status: "not_started"
        }))
      })
    }

    const prompt = `Generate a learning roadmap for ${role} position focusing on these skills: ${skills.join(", ")}. Return a JSON array where each item has: skill, topic, duration (in days), resources (array of 3 items). Be specific and practical.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { 
            temperature: 0.7, 
            maxOutputTokens: 2048,
            responseMimeType: "application/json"
          },
        }),
      }
    )

    // Replace your lines 44-46 with this:
if (!response.ok) {
  const errorText = await response.text(); // Get the raw error message
  console.error("Google API Error Details:", errorText);
  return new Response(JSON.stringify({ error: "Gemini API failed", details: errorText }), {
    status: response.status,
  });
}
    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!text) {
      throw new Error("No response from Gemini")
    }

    // Parse the JSON response
    let roadmap = JSON.parse(text)
    
    // Add default status to each item
    roadmap = roadmap.map((item: any) => ({
      ...item,
      status: "not_started"
    }))

    return NextResponse.json({ roadmap })
  } catch (error) {
    console.error("Roadmap generation error:", error)
    return NextResponse.json({ 
      error: "Failed to generate roadmap",
      roadmap: []
    }, { status: 500 })
  }
}
