"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  Lock,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Code2,
  Users,
  Brain,
  MessageSquare,
  Video,
  X,
} from "lucide-react"

const CREDIT_BALANCE = 145
const REQUIRED_CREDITS = 150

const interviewModules = [
  {
    id: 1,
    title: "Technical Round",
    description: "Practice DSA, system design, and coding questions typically asked in technical interviews.",
    icon: Code2,
    duration: "45 min",
    difficulty: "Hard",
    questions: 15,
    topics: ["Data Structures & Algorithms", "System Design Basics", "Code optimization", "Time & Space complexity"],
  },
  {
    id: 2,
    title: "HR / Behavioural Round",
    description: "Practice answering common HR questions using the STAR method with AI feedback.",
    icon: Users,
    duration: "30 min",
    difficulty: "Medium",
    questions: 12,
    topics: ["Tell me about yourself", "Strengths & weaknesses", "Conflict resolution", "Why this company?"],
  },
  {
    id: 3,
    title: "Aptitude & Reasoning",
    description: "Sharpen your logical reasoning, quantitative aptitude, and verbal ability for placement rounds.",
    icon: Brain,
    duration: "35 min",
    difficulty: "Medium",
    questions: 20,
    topics: ["Logical reasoning", "Quantitative aptitude", "Verbal ability", "Data interpretation"],
  },
  {
    id: 4,
    title: "Group Discussion Prep",
    description: "Learn GD strategies, practice with AI-simulated discussions, and get feedback on your arguments.",
    icon: MessageSquare,
    duration: "25 min",
    difficulty: "Medium",
    questions: 8,
    topics: ["Current affairs topics", "Argument structuring", "Body language tips", "Summarization skills"],
  },
  {
    id: 5,
    title: "Mock Video Interview",
    description: "Full simulated video interview with AI evaluating your confidence, clarity, and content.",
    icon: Video,
    duration: "40 min",
    difficulty: "Hard",
    questions: 10,
    topics: ["Presentation skills", "Eye contact & posture", "Answer clarity", "Confidence scoring"],
  },
  {
    id: 6,
    title: "Rapid Fire Round",
    description: "Quick-fire technical and HR questions to test your speed and accuracy under pressure.",
    icon: Mic,
    duration: "15 min",
    difficulty: "Easy",
    questions: 25,
    topics: ["Quick recall", "Core concepts", "One-line answers", "Pressure handling"],
  },
]

function getDifficultyColor(d: string) {
  if (d === "Hard") return "bg-destructive/10 text-destructive"
  if (d === "Medium") return "bg-warning/10 text-warning-foreground"
  return "bg-success/10 text-success"
}

export default function InterviewPage() {
  const [showInsufficientModal, setShowInsufficientModal] = useState(false)
  const canAccess = CREDIT_BALANCE >= REQUIRED_CREDITS

  function handleUnlock() {
    if (!canAccess) {
      setShowInsufficientModal(true)
    }
  }

  return (
    <div className="relative flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Interview Prep
        </h1>
        <p className="text-muted-foreground mt-1">
          Practice mock interviews and get AI-powered feedback to ace your placements.
        </p>
      </div>

      {/* Credit Gate Banner */}
      <Card className="border-primary/20 bg-primary/[0.03]">
        <CardContent className="flex items-center justify-between py-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10">
              <Lock className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Premium Feature - {REQUIRED_CREDITS} Credits Required</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your balance: <span className={canAccess ? "text-success font-medium" : "text-destructive font-medium"}>{CREDIT_BALANCE} credits</span>
                {" "}&middot;{" "}
                {canAccess ? "You can unlock this feature" : `You need ${REQUIRED_CREDITS - CREDIT_BALANCE} more credits`}
              </p>
            </div>
          </div>
          <Button
            onClick={handleUnlock}
            variant={canAccess ? "default" : "outline"}
            className={!canAccess ? "border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive" : ""}
          >
            {canAccess ? (
              <>
                <CheckCircle2 className="size-4 mr-1.5" />
                Unlock Now
              </>
            ) : (
              <>
                <Lock className="size-4 mr-1.5" />
                Unlock ({REQUIRED_CREDITS} Credits)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Interview Modules */}
      <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${!canAccess ? "pointer-events-none" : ""}`}>
        {interviewModules.map((mod) => {
          const Icon = mod.icon
          return (
            <Card
              key={mod.id}
              className={`relative overflow-hidden transition-all ${!canAccess ? "opacity-50 grayscale-[30%]" : "hover:shadow-md hover:border-primary/20"}`}
            >
              {!canAccess && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
                  <div className="flex flex-col items-center gap-2">
                    <Lock className="size-8 text-muted-foreground/60" />
                    <span className="text-xs font-medium text-muted-foreground">Locked</span>
                  </div>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 shrink-0">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm">{mod.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <Badge variant="secondary" className={`text-[10px] border-0 ${getDifficultyColor(mod.difficulty)}`}>
                        {mod.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="size-3" />
                        {mod.duration}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {mod.questions} Qs
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <p className="text-xs text-muted-foreground leading-relaxed">{mod.description}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {mod.topics.map((topic) => (
                    <div key={topic} className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3 text-primary shrink-0" />
                      <span className="text-[11px] text-muted-foreground truncate">{topic}</span>
                    </div>
                  ))}
                </div>
                <Button size="sm" className="mt-1 w-full" disabled={!canAccess}>
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Insufficient Balance Modal */}
      {showInsufficientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl border-destructive/20">
            <CardContent className="pt-6 flex flex-col items-center gap-4 text-center">
              <button
                onClick={() => setShowInsufficientModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </button>
              <div className="flex items-center justify-center size-16 rounded-full bg-destructive/10">
                <AlertTriangle className="size-8 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Insufficient Balance</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  You need <span className="font-semibold text-foreground">{REQUIRED_CREDITS} credits</span> to unlock Interview Prep.
                  Your current balance is <span className="font-semibold text-destructive">{CREDIT_BALANCE} credits</span>.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  You need <span className="font-semibold text-foreground">{REQUIRED_CREDITS - CREDIT_BALANCE} more credits</span> to access this feature.
                </p>
              </div>
              <div className="flex gap-3 w-full mt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowInsufficientModal(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" asChild>
                  <a href="/dashboard/credits">
                    <Wallet className="size-4 mr-1.5" />
                    Buy Credits
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
