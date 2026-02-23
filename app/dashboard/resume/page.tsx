"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  FileText,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Coins,
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
