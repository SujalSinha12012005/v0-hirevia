"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react"

const mockMatch = {
  matchPercentage: 73,
  matchedKeywords: [
    "React",
    "JavaScript",
    "HTML/CSS",
    "REST APIs",
    "Git",
    "Agile",
  ],
  missingKeywords: [
    "TypeScript",
    "GraphQL",
    "Docker",
    "AWS",
    "Unit Testing",
  ],
  tips: [
    "Add TypeScript experience to your resume - it is highly demanded for this role",
    "Mention any experience with containerization tools like Docker",
    "Include cloud platform experience (AWS, GCP, or Azure)",
    "Highlight any testing frameworks you have used in projects",
    "Consider taking a GraphQL course to strengthen your API skills",
  ],
}

export default function JDMatchPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [isMatching, setIsMatching] = useState(false)

  function handleMatch() {
    if (!jobDescription.trim()) return
    setIsMatching(true)
    setTimeout(() => {
      setIsMatching(false)
      setShowResults(true)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          JD Match
        </h1>
        <p className="text-muted-foreground mt-1">
          Paste a job description to see how well your resume matches.
        </p>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="size-5 text-primary" />
            Job Description
          </CardTitle>
          <CardDescription>
            Paste the full job description below to get a match analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <textarea
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value)
              setShowResults(false)
            }}
            placeholder="Paste the job description here..."
            className="min-h-[180px] w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
          <Button
            onClick={handleMatch}
            disabled={!jobDescription.trim() || isMatching}
            className="w-full sm:w-auto sm:self-end"
          >
            <Sparkles className="size-4" />
            {isMatching ? "Matching..." : "Match Resume"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          {/* Match Score */}
          <Card>
            <CardHeader>
              <CardTitle>Match Result</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="relative flex items-center justify-center shrink-0">
                  <svg width={120} height={120} className="-rotate-90">
                    <circle
                      cx={60}
                      cy={60}
                      r={50}
                      fill="none"
                      strokeWidth={10}
                      className="stroke-muted"
                    />
                    <circle
                      cx={60}
                      cy={60}
                      r={50}
                      fill="none"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 50}
                      strokeDashoffset={
                        2 * Math.PI * 50 -
                        (mockMatch.matchPercentage / 100) * 2 * Math.PI * 50
                      }
                      className="stroke-primary transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">
                      {mockMatch.matchPercentage}%
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold text-foreground">
                    Good Match
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your resume matches {mockMatch.matchPercentage}% of the job
                    requirements. A few skill additions could boost this
                    significantly.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Match Progress</span>
                  <span className="font-medium text-foreground">
                    {mockMatch.matchPercentage}%
                  </span>
                </div>
                <Progress value={mockMatch.matchPercentage} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Matched Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-success" />
                  Matched Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockMatch.matchedKeywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="bg-success/10 text-success border-success/20"
                    >
                      <CheckCircle2 className="size-3" />
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Missing Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="size-5 text-destructive" />
                  Missing Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockMatch.missingKeywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="bg-destructive/10 text-destructive border-destructive/20"
                    >
                      <XCircle className="size-3" />
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Improvement Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="size-5 text-warning" />
                Improvement Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {mockMatch.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-xs font-semibold text-primary shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
