"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Upload,
  FileText,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Coins,
  MessageSquare,
  Send,
  Bot,
  User,
} from "lucide-react"

const mockAnalysis = {
  score: 78,
  bestFitRole: "MERN Stack Developer",
  missingSkills: [
    "TypeScript advanced patterns",
    "System Design basics",
    "Testing (Jest/Vitest)",
    "CI/CD fundamentals",
  ],
  suggestions: [
    "Add a professional summary at the top of your resume",
    "Quantify your project achievements (e.g., improved load time by 40%)",
    "Include links to your GitHub and portfolio",
    "List relevant certifications",
  ],
  creditsEarned: 10,
}

export default function ResumeAnalysisPage() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setShowResults(false)
    }
  }

  function handleAnalyze() {
    if (!fileName) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Resume Analysis
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload your resume to get AI-powered feedback and scoring.
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="size-5 text-primary" />
            Upload Resume
          </CardTitle>
          <CardDescription>
            Supported formats: PDF, DOCX. Max size: 5MB.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <label
            htmlFor="resume-upload"
            className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-10 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <FileText className="size-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                {fileName || "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF or DOCX up to 5MB
              </p>
            </div>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.docx"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>

          <Button
            onClick={handleAnalyze}
            disabled={!fileName || isAnalyzing}
            className="w-full sm:w-auto sm:self-end"
          >
            <Sparkles className="size-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          {/* Credits Earned Banner */}
          <div className="flex items-center gap-3 rounded-xl bg-success/10 border border-success/20 px-4 py-3">
            <Coins className="size-5 text-success" />
            <p className="text-sm font-medium text-foreground">
              You earned{" "}
              <span className="font-bold text-success">
                {mockAnalysis.creditsEarned} credits
              </span>{" "}
              for analyzing your resume!
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Score Card */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="relative flex items-center justify-center">
                  <svg width={160} height={160} className="-rotate-90">
                    <circle
                      cx={80}
                      cy={80}
                      r={65}
                      fill="none"
                      strokeWidth={12}
                      className="stroke-muted"
                    />
                    <circle
                      cx={80}
                      cy={80}
                      r={65}
                      fill="none"
                      strokeWidth={12}
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 65}
                      strokeDashoffset={
                        2 * Math.PI * 65 -
                        (mockAnalysis.score / 100) * 2 * Math.PI * 65
                      }
                      className="stroke-primary transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">
                      {mockAnalysis.score}
                    </span>
                    <span className="text-xs text-muted-foreground">out of 100</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Best Fit Role</p>
                  <Badge className="mt-1">{mockAnalysis.bestFitRole}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Missing Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-destructive" />
                  Missing Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {mockAnalysis.missingSkills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-6 rounded-full bg-destructive/10">
                        <AlertCircle className="size-3.5 text-destructive" />
                      </div>
                      <span className="text-sm text-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Improvement Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="size-5 text-warning" />
                Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {mockAnalysis.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 mt-0.5 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ScoreRow label="Content Quality" value={82} />
              <ScoreRow label="Formatting" value={90} />
              <ScoreRow label="Keyword Optimization" value={65} />
              <ScoreRow label="Completeness" value={75} />
            </CardContent>
          </Card>

          {/* Resume Chatbot */}
          <ResumeChat />
        </div>
      )}
    </div>
  )
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}

type Message = { role: "bot" | "user"; text: string }

const suggestedQuestions = [
  "How can I improve my resume score?",
  "What projects should I add?",
  "Is my resume ATS-friendly?",
  "How do I highlight MERN skills?",
]

const botResponses: Record<string, string> = {
  "how can i improve my resume score?":
    "Focus on three areas: 1) Add quantifiable achievements to each project (e.g., 'Reduced API response time by 40%'). 2) Include keywords from job descriptions like TypeScript, REST APIs, and CI/CD. 3) Add a concise professional summary at the top highlighting your MERN stack expertise.",
  "what projects should i add?":
    "For a MERN Stack Developer role, include: 1) A full-stack CRUD app with authentication (shows end-to-end ability). 2) A real-time feature using Socket.io or WebSockets. 3) A project deployed on AWS/Vercel with CI/CD pipeline. Make sure each project lists the tech stack and your specific contributions.",
  "is my resume ats-friendly?":
    "Your formatting score is 90%, which is good. However, your keyword optimization is at 65%. To improve ATS compatibility: use standard section headings (Experience, Education, Skills), avoid tables or columns, spell out acronyms at least once, and mirror exact phrases from the job description.",
  "how do i highlight mern skills?":
    "Create a dedicated 'Technical Skills' section with clear categories: Frontend (React, Redux, HTML/CSS, Tailwind), Backend (Node.js, Express.js), Database (MongoDB, Mongoose), and Tools (Git, Docker, Postman). In your project descriptions, specifically mention how you used each part of the MERN stack.",
}

function getResponse(input: string): string {
  const key = input.toLowerCase().trim()
  for (const [q, a] of Object.entries(botResponses)) {
    if (key.includes(q.split(" ").slice(0, 3).join(" ")) || q.includes(key.split(" ").slice(0, 3).join(" "))) {
      return a
    }
  }
  return "That's a great question! Based on your resume analysis, I'd suggest focusing on the missing skills flagged above -- TypeScript patterns, testing, and system design basics. Adding these to your resume with relevant project examples would significantly boost your score. Want me to elaborate on any of these?"
}

function ResumeChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I've reviewed your resume. Your score is 78/100 -- solid foundation but room to grow. Ask me anything about improving your CV, what skills to highlight, or how to tailor it for MERN roles.",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(text) }])
    }, 1000 + Math.random() * 800)
  }

  function handleSuggestion(q: string) {
    setMessages((prev) => [...prev, { role: "user", text: q }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(q) }])
    }, 1000 + Math.random() * 800)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
            <MessageSquare className="size-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Resume Assistant</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Ask questions about your CV and get instant feedback
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            <span className="text-[11px] text-muted-foreground">Online</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex flex-col gap-3 max-h-[360px] overflow-y-auto rounded-xl bg-muted/30 border border-border p-4"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex items-center justify-center size-7 rounded-full shrink-0 mt-0.5 ${
                  msg.role === "bot"
                    ? "bg-primary/10"
                    : "bg-foreground/10"
                }`}
              >
                {msg.role === "bot" ? (
                  <Bot className="size-3.5 text-primary" />
                ) : (
                  <User className="size-3.5 text-foreground" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-2.5 max-w-[80%] ${
                  msg.role === "bot"
                    ? "bg-card border border-border"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className={`text-sm leading-relaxed ${msg.role === "bot" ? "text-foreground" : ""}`}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5">
              <div className="flex items-center justify-center size-7 rounded-full shrink-0 bg-primary/10">
                <Bot className="size-3.5 text-primary" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-card border border-border">
                <div className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSuggestion(q)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your resume..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
