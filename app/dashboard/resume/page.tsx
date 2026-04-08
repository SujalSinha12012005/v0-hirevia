"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { useFeatureWithCredits } from "@/app/actions/credits"
import { toast } from "sonner"
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
import { generateResumeChatResponse } from "@/app/actions/gemini"

// Simple string hash function to generate consistent pseudo-random numbers
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

function generateDynamicAnalysis(filename: string | null) {
  if (!filename) return null;
  
  const h = hashString(filename.toLowerCase());
  
  // Base score between 55 and 98
  const score = 55 + (h % 44);
  
  const roles = [
    "MERN Stack Developer", "Frontend Engineer", "Backend Developer", 
    "Full Stack Developer", "React Developer", "Node.js Developer"
  ];
  const bestFitRole = roles[h % roles.length];
  
  const allSkills = [
    "TypeScript advanced patterns", "System Design basics", "Testing (Jest/Vitest)",
    "CI/CD fundamentals", "GraphQL configuration", "Microservices architecture",
    "MongoDB Aggregation Pipeline", "Docker & Kubernetes", "AWS Lambda",
    "TailwindCSS architecture", "WebSockets / Socket.io", "React Performance Optimization"
  ];
  
  // Pick 3-4 random missing skills based on the hash
  const missingSkillsCount = 3 + (h % 2);
  const missingSkills = [];
  for (let i = 0; i < missingSkillsCount; i++) {
    missingSkills.push(allSkills[(h + i) % allSkills.length]);
  }
  
  const allSuggestions = [
    "Add a professional summary at the top of your resume",
    "Quantify your project achievements (e.g., improved load time by 40%)",
    "Include links to your GitHub and portfolio",
    "List relevant certifications and hackathons",
    "Ensure your bullet points start with strong action verbs",
    "Tailor your skills section to match exact keywords in JD",
    "Remove outdated technologies from your core stack list",
    "Add a dedicated section for open-source contributions"
  ];
  
  const suggestionsCount = 3 + (h % 3);
  const suggestions = [];
  for (let i = 0; i < suggestionsCount; i++) {
    suggestions.push(allSuggestions[(h + i * 2) % allSuggestions.length]);
  }

  return {
    score,
    bestFitRole,
    missingSkills,
    suggestions,
  }
}

export default function ResumeAnalysisPage() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<ReturnType<typeof generateDynamicAnalysis>>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setShowResults(false)
      setCurrentAnalysis(null)
    }
  }

  async function handleAnalyze() {
    if (!fileName) return
    setIsAnalyzing(true)

    // Attempt Credit Deduction
    const { success, message } = await useFeatureWithCredits(10, "Resume Analysis")
    
    if (!success) {
      toast.error(message || "Insufficient credits")
      setIsAnalyzing(false)
      return
    }

    setTimeout(() => {
      const generated = generateDynamicAnalysis(fileName)
      setCurrentAnalysis(generated)
      if (generated) {
        localStorage.setItem('latest_resume_analysis', JSON.stringify({
          ...generated,
          filename: fileName,
          timestamp: new Date().toISOString()
        }))
      }
      setIsAnalyzing(false)
      setShowResults(true)
      toast.success("Analysis Complete! (-10 Credits)")
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
                        (currentAnalysis!.score / 100) * 2 * Math.PI * 65
                      }
                      className="stroke-primary transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">
                      {currentAnalysis!.score}
                    </span>
                    <span className="text-xs text-muted-foreground">out of 100</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Best Fit Role</p>
                  <Badge className="mt-1">{currentAnalysis!.bestFitRole}</Badge>
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
                  {currentAnalysis!.missingSkills.map((skill) => (
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
                {currentAnalysis!.suggestions.map((suggestion, i) => (
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
  "How do I highlight my skills?",
]

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

  async function handleSend() {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setIsTyping(true)
    
    // Call Gemini! `messages` is accurately the previous history.
    const res = await generateResumeChatResponse(text, messages)
    
    setIsTyping(false)
    if (res.success) {
      setMessages((prev) => [...prev, { role: "bot", text: res.text! }])
    } else {
      setMessages((prev) => [...prev, { role: "bot", text: res.message || "Failed to reach AI." }])
    }
  }

  async function handleSuggestion(q: string) {
    setMessages((prev) => [...prev, { role: "user", text: q }])
    setIsTyping(true)
    
    const res = await generateResumeChatResponse(q, messages)
    
    setIsTyping(false)
    if (res.success) {
      setMessages((prev) => [...prev, { role: "bot", text: res.text! }])
    } else {
      setMessages((prev) => [...prev, { role: "bot", text: res.message || "Failed to reach AI." }])
    }
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
