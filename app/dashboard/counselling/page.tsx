"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Lock,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Compass,
  Target,
  BookOpen,
  X,
} from "lucide-react"

const CREDIT_BALANCE = 145
const REQUIRED_CREDITS = 150

const sessions = [
  {
    id: 1,
    title: "Career Path Discovery",
    description: "AI analyzes your skills, interests, and market trends to recommend the best career paths for you.",
    icon: Compass,
    duration: "25 min",
    topics: ["Strength mapping", "Industry fit analysis", "Role recommendations", "Salary benchmarks"],
  },
  {
    id: 2,
    title: "Resume Strategy Session",
    description: "Deep-dive into optimizing your resume for your target roles with personalized action items.",
    icon: Target,
    duration: "20 min",
    topics: ["ATS optimization", "Impact statements", "Skills positioning", "Project highlights"],
  },
  {
    id: 3,
    title: "Skill Gap Analysis",
    description: "Identify exactly what skills you need to develop and get a structured learning plan.",
    icon: BookOpen,
    duration: "20 min",
    topics: ["Current vs required skills", "Learning resources", "Timeline planning", "Certification advice"],
  },
  {
    id: 4,
    title: "1-on-1 Career Chat",
    description: "Open-ended career counselling session to discuss any career doubts, plans, or guidance you need.",
    icon: MessageSquare,
    duration: "30 min",
    topics: ["Career doubts", "Higher studies vs job", "Startup vs MNC", "Freelance guidance"],
  },
]

export default function CounsellingPage() {
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
          Career Counselling
        </h1>
        <p className="text-muted-foreground mt-1">
          Get AI-powered career guidance tailored to your profile and goals.
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

      {/* Sessions Grid - shown as locked/blurred */}
      <div className={`grid gap-5 sm:grid-cols-2 ${!canAccess ? "pointer-events-none" : ""}`}>
        {sessions.map((session) => {
          const Icon = session.icon
          return (
            <Card
              key={session.id}
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
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{session.title}</CardTitle>
                      <Badge variant="secondary" className="text-[10px] mt-1 bg-muted border-0">
                        {session.duration}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <p className="text-xs text-muted-foreground leading-relaxed">{session.description}</p>
                <div className="flex flex-col gap-1.5">
                  {session.topics.map((topic) => (
                    <div key={topic} className="flex items-center gap-2">
                      <CheckCircle2 className="size-3 text-primary shrink-0" />
                      <span className="text-xs text-muted-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
                <Button size="sm" className="mt-1 w-full" disabled={!canAccess}>
                  Start Session
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
                  You need <span className="font-semibold text-foreground">{REQUIRED_CREDITS} credits</span> to unlock Career Counselling.
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
