import { NextRequest, NextResponse } from "next/server"
import { analyzeResumeText, type AnalysisResult } from "@/lib/resume-analyzer"

const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max size: 5MB" },
        { status: 400 }
      )
    }

    const ext = file.name.split(".").pop()?.toLowerCase()
    if (!["pdf", "docx"].includes(ext || "")) {
      return NextResponse.json(
        { error: "Invalid format. Use PDF or DOCX." },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    let text: string

    if (ext === "pdf") {
      const pdfParse = (await import("pdf-parse")).default
      const data = await pdfParse(buffer)
      text = data.text
    } else {
      const mammoth = await import("mammoth")
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    }

    const trimmed = text.trim()
    if (!trimmed || trimmed.length < 50) {
      return NextResponse.json(
        { error: "Could not extract enough text from the document. Ensure it contains readable content." },
        { status: 400 }
      )
    }

    const analysis: AnalysisResult = analyzeResumeText(trimmed)

    return NextResponse.json(analysis)
  } catch (err) {
    console.error("Resume analysis error:", err)
    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    )
  }
}
