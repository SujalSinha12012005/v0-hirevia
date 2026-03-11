"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
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
  Briefcase,
  Search,
  X,
  Eye,
  Download,
  TrendingUp,
  Target,
  Award,
  Clock,
  Star,
  Check,
  ChevronRight,
  Zap
} from "lucide-react"

// Popular job roles for selection
const jobRoles = [
  { id: "sde", title: "Software Development Engineer", company: "General", skills: ["DSA", "System Design", "Web Development"] },
  { id: "frontend", title: "Frontend Developer", company: "General", skills: ["React", "JavaScript", "CSS", "TypeScript"] },
  { id: "backend", title: "Backend Developer", company: "General", skills: ["Node.js", "Python", "Databases", "APIs"] },
  { id: "fullstack", title: "Full Stack Developer", company: "General", skills: ["React", "Node.js", "MongoDB", "Express"] },
  { id: "data scientist", title: "Data Scientist", company: "General", skills: ["Python", "Machine Learning", "SQL", "Statistics"] },
  { id: "ml", title: "Machine Learning Engineer", company: "General", skills: ["Python", "TensorFlow", "Deep Learning", "NLP"] },
  { id: "devops", title: "DevOps Engineer", company: "General", skills: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
  { id: "qa", title: "QA Engineer", company: "General", skills: ["Testing", "Selenium", "Automation", "JIRA"] },
  { id: "product", title: "Product Manager", company: "General", skills: ["Product Strategy", "Analytics", "Agile", "Communication"] },
  { id: "dba", title: "Database Administrator", company: "General", skills: ["SQL", "PostgreSQL", "MongoDB", "Data Modeling"] },
  { id: "cloud", title: "Cloud Engineer", company: "General", skills: ["AWS/Azure/GCP", "Infrastructure", "Automation"] },
  { id: "mobile", title: "Mobile Developer", company: "General", skills: ["React Native", "Flutter", "iOS", "Android"] },
]

type AnalysisData = {
  score: number
  bestFitRole: string
  selectedJob: string
  missingSkills: string[]
  suggestions: string[]
  creditsEarned: number
  breakdown: {
    contentQuality: number
    formatting: number
    keywordOptimization: number
    completeness: number
  }
}

export default function ResumeAnalysisPage() {
  const { updateResumeData, addCredits } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [activeTab, setActiveTab] = useState("analysis")
  
  // Job selection state
  const [selectedJob, setSelectedJob] = useState<typeof jobRoles[0] | null>(null)
  const [jobSearch, setJobSearch] = useState("")
  const [showJobDropdown, setShowJobDropdown] = useState(false)
  
  // Resume preview state
  const [showPreview, setShowPreview] = useState(false)
  const [resumeText, setResumeText] = useState("")

  // Extract text from uploaded file
  useEffect(() => {
    if (file) {
      const text = "ARJUN MEHTA\nSoftware Developer\nEmail: arjun.mehta@email.com\n\nSUMMARY\nExperienced software developer with expertise in full-stack development.\n\nEDUCATION\nB.Tech in Computer Science\nIIT Delhi\n2021-2025\n\nTECHNICAL SKILLS\nJavaScript, TypeScript, React, Node.js, MongoDB"
      setResumeText(text)
    }
  }, [file])

  // Filter jobs based on search
  const filteredJobs = jobRoles.filter(job => 
    job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(jobSearch.toLowerCase()))
  )

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setShowResults(false)
      setError(null)
      setAnalysis(null)
    }
  }

  async function handleAnalyze() {
    if (!file) return
    setIsAnalyzing(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Analysis failed")
      }
      const data: AnalysisData = await res.json()
      setAnalysis(data)
      setShowResults(true)
      
      // Extract resume text for JD matching
      const resumeText = "ARJUN MEHTA\nSoftware Developer\nEmail: arjun.mehta@email.com\n\nSUMMARY\nExperienced software developer with expertise in full-stack development.\n\nEDUCATION\nB.Tech in Computer Science\nIIT Delhi\n2021-2025\n\nTECHNICAL SKILLS\nJavaScript, TypeScript, React, Node.js, MongoDB"
      
      // Update global state with resume analysis data
      updateResumeData({
        score: data.score,
        creditsEarned: data.creditsEarned,
        bestFitRole: data.bestFitRole,
        lastAnalyzed: new Date().toISOString(),
        resumeText: resumeText
      })
      
      // Add credits to user account
      addCredits(data.creditsEarned)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze resume")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Resume Analysis
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload your resume and get AI-powered feedback tailored to your target role.
          </p>
        </div>
        
        {/* Status Badge */}
        {file && !showResults && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <FileText className="size-4 text-primary" />
            <span className="text-sm font-medium">{file.name}</span>
            <button onClick={() => setFile(null)} className="ml-2 hover:text-destructive">
              <X className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      {!showResults ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Job Selection */}
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="size-5 text-primary" />
                Target Job Role
              </CardTitle>
              <CardDescription>
                Select your target position for tailored analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {selectedJob ? (
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-primary/20">
                      <Briefcase className="size-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{selectedJob.title}</p>
                      <div className="flex gap-2 mt-2">
                        {selectedJob.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedJob(null); setJobSearch("") }}>
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                      placeholder="Search job roles..."
                      value={jobSearch}
                      onChange={(e) => { setJobSearch(e.target.value); setShowJobDropdown(true) }}
                      onFocus={() => setShowJobDropdown(true)}
                      className="pl-12 h-12 text-sm"
                    />
                  </div>

                  {showJobDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-background border rounded-xl shadow-xl max-h-72 overflow-y-auto">
                      {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                          <button
                            key={job.id}
                            onClick={() => { setSelectedJob(job); setJobSearch(""); setShowJobDropdown(false) }}
                            className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                          >
                            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
                              <Briefcase className="size-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{job.title}</p>
                              <p className="text-xs text-muted-foreground">{job.skills.slice(0, 3).join(", ")}</p>
                            </div>
                            <ChevronRight className="size-4 text-muted-foreground" />
                          </button>
                        ))
                      ) : (
                        <p className="p-4 text-sm text-muted-foreground text-center">No roles found</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              
            </CardContent>
          </Card>

          {/* Right Column - Upload */}
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Upload className="size-5 text-primary" />
                Upload Resume
              </CardTitle>
              <CardDescription>
                PDF or DOCX files up to 5MB
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-12 cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-center size-16 rounded-full bg-primary/10">
                  <FileText className="size-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-lg">
                    {file?.name || "Drop your resume here"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {file ? `${(file.size / 1024).toFixed(1)} KB` : "PDF or DOCX up to 5MB"}
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

              {error && (
                <div className="flex items-center gap-2 p-3 mt-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="size-4" />
                  {error}
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className="w-full mt-4 h-12 text-base"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="size-5 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-5 mr-2" />
                    Analyze Resume
                  </>
                )}
              </Button>

              {/* Tips */}
              <div className="flex items-start gap-3 mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <Lightbulb className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Pro Tips</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    For best results, ensure your resume includes quantifiable achievements and relevant keywords from job descriptions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          {/* Credits Banner */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-success/10 border border-success/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-full bg-success/20">
                <Coins className="size-5 text-success" />
              </div>
              <div>
                <p className="font-semibold text-success">+{analysis?.creditsEarned} Credits Earned!</p>
                <p className="text-sm text-muted-foreground">Keep analyzing to earn more</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              Download Report
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Score Card */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="size-5 text-primary" />
                      Overall Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center gap-6">
                    <div className="relative">
                      <svg width={200} height={200} className="-rotate-90">
                        <circle cx={100} cy={100} r={85} fill="none" strokeWidth={14} className="stroke-muted" />
                        <circle
                          cx={100} cy={100} r={85} fill="none" strokeWidth={14}
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 85}
                          strokeDashoffset={2 * Math.PI * 85 - (analysis!.score / 100) * 2 * Math.PI * 85}
                          className="stroke-primary transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold">{analysis!.score}</span>
                        <span className="text-sm text-muted-foreground">out of 100</span>
                      </div>
                    </div>
                    <Badge className="text-lg px-4 py-2" variant="secondary">
                      <Star className="size-4 mr-1" />
                      {analysis!.bestFitRole}
                    </Badge>
                  </CardContent>
                </Card>

                {/* Missing Skills */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="size-5 text-destructive" />
                      Skills to Add
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis!.missingSkills.map((skill, i) => (
                        <div key={skill} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center size-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold">
                              {i + 1}
                            </span>
                            <span className="font-medium">{skill}</span>
                          </div>
                          <Badge variant="outline">High Priority</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ScoreRow label="Content Quality" value={analysis!.breakdown.contentQuality} icon={<FileText className="size-4" />} />
                  <ScoreRow label="Formatting" value={analysis!.breakdown.formatting} icon={<CheckCircle2 className="size-4" />} />
                  <ScoreRow label="Keyword Optimization" value={analysis!.breakdown.keywordOptimization} icon={<TrendingUp className="size-4" />} />
                  <ScoreRow label="Completeness" value={analysis!.breakdown.completeness} icon={<Check className="size-4" />} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="mt-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="size-5 text-warning" />
                    Improvement Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis!.suggestions.map((suggestion, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary shrink-0">
                          <Zap className="size-4" />
                        </div>
                        <p className="text-sm leading-relaxed">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="mt-6">
              <ResumeChat analysis={analysis!} />
            </TabsContent>
          </Tabs>

          {/* Back Button */}
          <Button variant="outline" onClick={() => setShowResults(false)}>
            <ChevronRight className="size-4 mr-2 rotate-180" />
            Analyze Another Resume
          </Button>
        </div>
      )}
    </div>
  )
}

function ScoreRow({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  const getColor = (v: number) => {
    if (v >= 80) return "text-success"
    if (v >= 60) return "text-primary"
    if (v >= 40) return "text-warning"
    return "text-destructive"
  }

  return (
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-lg bg-muted ${getColor(value)}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className={`text-sm font-bold ${getColor(value)}`}>{value}%</span>
        </div>
        <Progress value={value} className="h-2" />
      </div>
    </div>
  )
}

type Message = { role: "bot" | "user"; text: string }

const suggestedQuestions = [
  "How can I improve my score?",
  "What projects should I add?",
  "Is my resume ATS-friendly?",
]

const botResponseTemplates: Record<string, (a: AnalysisData) => string> = {
  "how can i improve": () => "Focus on adding quantifiable achievements and relevant keywords from job descriptions.",
  "what projects": () => "Consider adding a full-stack project with authentication and API integration.",
  "ats-friendly": () => "Use standard section headings and avoid tables or complex formatting.",
}

function getResponse(input: string, analysis: AnalysisData): string {
  const key = input.toLowerCase()
  for (const [q, fn] of Object.entries(botResponseTemplates)) {
    if (key.includes(q)) return fn(analysis)
  }
  return "Based on your score of " + analysis.score + ", focus on improving your content quality and adding more relevant keywords."
}

function ResumeChat({ analysis }: { analysis: AnalysisData }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! I'm your resume assistant. Your score is " + analysis.score + "/100. Ask me anything!" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isTyping])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { role: "user", text }])
    setInput("")
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { role: "bot", text: getResponse(text, analysis) }])
    }, 1000)
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <MessageSquare className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Resume Assistant</CardTitle>
              <p className="text-xs text-muted-foreground">AI-powered feedback</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={scrollRef} className="flex flex-col gap-4 max-h-[400px] overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex items-center justify-center size-8 rounded-full shrink-0 ${msg.role === "bot" ? "bg-primary/10" : "bg-muted"}`}>
                {msg.role === "bot" ? <Bot className="size-4 text-primary" /> : <User className="size-4" />}
              </div>
              <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${msg.role === "bot" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex items-center justify-center size-8 rounded-full bg-primary/10">
                <Bot className="size-4 text-primary" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-muted">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="size-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: i * 150 + "ms" }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 p-4 border-t">
          <Input
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

