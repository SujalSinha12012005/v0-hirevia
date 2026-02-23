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
  Shield,
  Brain,
  Database,
  Code2,
  Cloud,
  BarChart3,
} from "lucide-react"

const suggestedRoles = [
  {
    title: "Cyber Security Analyst",
    icon: Shield,
    jd: "We are looking for a Cyber Security Analyst to monitor, detect, and respond to security threats. Responsibilities include vulnerability assessments, penetration testing, SIEM monitoring, incident response, and ensuring compliance with security standards. Required skills: network security, firewalls, IDS/IPS, OWASP, Python scripting, ISO 27001, NIST framework, risk assessment, and security auditing.",
  },
  {
    title: "AI/ML Engineer",
    icon: Brain,
    jd: "Seeking an AI/ML Engineer to design and deploy machine learning models for production systems. You will work on data pipelines, model training, and optimization. Required skills: Python, TensorFlow, PyTorch, scikit-learn, NLP, computer vision, MLOps, Docker, AWS SageMaker, data preprocessing, and experience with large-scale datasets.",
  },
  {
    title: "MERN Stack Developer",
    icon: Code2,
    jd: "Hiring a MERN Stack Developer to build and maintain full-stack web applications. You will develop RESTful APIs, design responsive UIs, and manage databases. Required skills: MongoDB, Express.js, React.js, Node.js, TypeScript, Redux, REST APIs, Git, Agile methodology, JWT authentication, and deployment on AWS or Vercel.",
  },
  {
    title: "Data Analyst",
    icon: BarChart3,
    jd: "Looking for a Data Analyst to interpret complex datasets and deliver actionable business insights. Responsibilities include data cleaning, visualization, reporting, and building dashboards. Required skills: SQL, Python, Excel, Tableau, Power BI, statistics, data modeling, ETL processes, and experience with A/B testing.",
  },
  {
    title: "Cloud Engineer",
    icon: Cloud,
    jd: "We need a Cloud Engineer to architect, deploy, and manage scalable cloud infrastructure. You will work on CI/CD pipelines, containerization, and cloud-native services. Required skills: AWS, Azure, GCP, Terraform, Docker, Kubernetes, Linux, networking, serverless architecture, monitoring tools, and infrastructure-as-code.",
  },
  {
    title: "Database Administrator",
    icon: Database,
    jd: "Hiring a Database Administrator to manage, optimize, and secure our database systems. Duties include performance tuning, backup/recovery, migration, and query optimization. Required skills: MySQL, PostgreSQL, MongoDB, Redis, database indexing, replication, sharding, stored procedures, SQL proficiency, and cloud database management.",
  },
]

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
          {/* Suggested Roles */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2.5">Quick select a role</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {suggestedRoles.map((role) => {
                const Icon = role.icon
                const isSelected = jobDescription === role.jd
                return (
                  <button
                    key={role.title}
                    onClick={() => {
                      setJobDescription(role.jd)
                      setShowResults(false)
                    }}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/[0.06] shadow-sm"
                        : "border-border bg-card hover:border-primary/30 hover:bg-muted/40"
                    }`}
                  >
                    <div className={`flex items-center justify-center size-8 rounded-lg shrink-0 ${
                      isSelected ? "bg-primary/15" : "bg-muted"
                    }`}>
                      <Icon className={`size-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <span className={`text-xs font-medium leading-tight ${
                      isSelected ? "text-primary" : "text-foreground"
                    }`}>
                      {role.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground">or paste your own</span>
            <div className="flex-1 h-px bg-border" />
          </div>

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
