"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgress } from "@/components/circular-progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Wallet, BarChart3, Check, Crown, Flame, CalendarDays, Sparkles, TrendingUp, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const plans = [
  { name: "1 Month", price: 100, per: "/mo", save: null, features: ["Resume Analysis", "10 JD Matches", "Basic Quizzes"] },
  { name: "4 Months", price: 350, per: "/4mo", save: "Save 12%", popular: true, features: ["Unlimited Analyses", "50 JD Matches", "All Quizzes", "Skill Roadmap"] },
  { name: "1 Year", price: 820, per: "/yr", save: "Save 32%", features: ["Everything in 4 Months", "Priority Support", "Admin Insights", "Placement Coaching"] },
]

export default function DashboardPage() {
  const resumeScore = 78
  const creditBalance = 145
  const readinessIndex = 72
  const [activePlan, setActivePlan] = useState(1)

  return (
    <div className="flex flex-col gap-8">
      {/* Header + Subscription */}
      <div className="flex items-start justify-between gap-8">
        <div className="pt-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome back, Arjun
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Here's how you're tracking today."}
          </p>
        </div>

        {/* Subscription Plan - pill toggle + card */}
        <div className="shrink-0 flex flex-col items-end gap-3">
          {/* Pill toggle for plans */}
          <div className="flex items-center rounded-full bg-muted/70 p-1">
            {plans.map((plan, i) => (
              <button
                key={plan.name}
                onClick={() => setActivePlan(i)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                  activePlan === i
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {plan.name}
                {plan.popular && activePlan !== i && (
                  <span className="absolute -top-1 -right-1 size-2 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Active plan card */}
          <div className="relative w-[260px] rounded-2xl border border-border bg-card p-5 shadow-sm">
            {/* Top accent bar */}
            <div className="absolute top-0 left-5 right-5 h-[2px] rounded-b-full bg-primary" />

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {plans[activePlan].name}
                  </span>
                  {plans[activePlan].popular && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-medium px-1.5 py-0 border-0">
                      Popular
                    </Badge>
                  )}
                </div>
                {plans[activePlan].save && (
                  <span className="text-[11px] font-medium text-primary mt-0.5 block">
                    {plans[activePlan].save}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">
                  {"₹"}{plans[activePlan].price}
                </span>
                <span className="text-xs text-muted-foreground">{plans[activePlan].per}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
              {plans[activePlan].features.map((f) => (
                <div key={f} className="flex items-center gap-1.5">
                  <div className="flex items-center justify-center size-4 rounded-full bg-primary/10">
                    <Check className="size-2.5 text-primary" />
                  </div>
                  <span className="text-[11px] text-muted-foreground leading-tight">{f}</span>
                </div>
              ))}
            </div>

            <Button
              size="sm"
              className="mt-4 h-8 text-xs font-medium w-full rounded-lg gap-1.5"
            >
              <Sparkles className="size-3" />
              Get {plans[activePlan].name} Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="rounded-xl border border-border bg-card px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Rank */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
              <Trophy className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Your Rank</p>
              <p className="text-lg font-bold text-foreground leading-tight">#12 <span className="text-xs font-medium text-success">+3</span></p>
            </div>
          </div>

          <div className="h-8 w-px bg-border" />

          {/* Progress bar */}
          <div className="flex-1 max-w-md px-6">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-muted-foreground">Overall Progress</p>
              <p className="text-xs font-semibold text-foreground">72%</p>
            </div>
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[72%] rounded-full bg-primary transition-all duration-500" />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">Beginner</span>
              <span className="text-[10px] text-muted-foreground">Placement Ready</span>
            </div>
          </div>

          <div className="h-8 w-px bg-border" />

          {/* XP */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-full bg-success/10">
              <TrendingUp className="size-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">This Week</p>
              <p className="text-lg font-bold text-foreground leading-tight">+250 <span className="text-xs font-medium text-success">XP</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Three Core Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Resume Score */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <FileText className="size-5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resume Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 pt-2 pb-6">
            <CircularProgress
              value={resumeScore}
              size={160}
              strokeWidth={12}
              label="out of 100"
            />
            <ScoreLabel score={resumeScore} />
          </CardContent>
        </Card>

        {/* Credit Balance */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Wallet className="size-5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Credit Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 pt-2 pb-6">
            <div className="flex flex-col items-center gap-1 py-6">
              <span className="text-5xl font-bold tracking-tight text-foreground">
                {creditBalance}
              </span>
              <span className="text-sm text-muted-foreground">credits available</span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Used this month</span>
                <span className="font-medium text-foreground">55 / 200</span>
              </div>
              <Progress value={27.5} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Readiness Index */}
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <BarChart3 className="size-5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Readiness Index
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 pt-2 pb-6">
            <CircularProgress
              value={readinessIndex}
              size={160}
              strokeWidth={12}
              label="ready"
            />
            <ReadinessLevel index={readinessIndex} />
          </CardContent>
        </Card>
      </div>

      {/* Activity Calendar */}
      <ActivityCalendar />
    </div>
  )
}

function ScoreLabel({ score }: { score: number }) {
  let text = "Needs Work"
  let colorClass = "text-destructive"

  if (score >= 85) {
    text = "Excellent"
    colorClass = "text-success"
  } else if (score >= 70) {
    text = "Good"
    colorClass = "text-primary"
  } else if (score >= 50) {
    text = "Fair"
    colorClass = "text-warning"
  }

  return (
    <span className={`text-sm font-semibold ${colorClass}`}>{text}</span>
  )
}

function ReadinessLevel({ index }: { index: number }) {
  let level = "Beginner"
  let colorClass = "text-destructive"

  if (index >= 85) {
    level = "Placement Ready"
    colorClass = "text-success"
  } else if (index >= 70) {
    level = "Intermediate"
    colorClass = "text-primary"
  } else if (index >= 50) {
    level = "Developing"
    colorClass = "text-warning"
  }

  return (
    <span className={`text-sm font-semibold ${colorClass}`}>{level}</span>
  )
}

function ActivityCalendar() {
  // Generate 16 weeks (approx 4 months) of mock activity data
  const today = new Date()
  const weeks = 16
  const dayNames = ["Mon", "", "Wed", "", "Fri", "", ""]
  const monthLabels: { label: string; col: number }[] = []

  const days: { date: Date; level: number }[] = []

  // Start from (weeks * 7) days ago, aligned to Monday
  const start = new Date(today)
  start.setDate(start.getDate() - weeks * 7 - start.getDay() + 1)

  let lastMonth = -1
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)

    // Track month labels
    if (d.getMonth() !== lastMonth) {
      lastMonth = d.getMonth()
      monthLabels.push({
        label: d.toLocaleString("default", { month: "short" }),
        col: Math.floor(i / 7),
      })
    }

    const isFuture = d > today
    // Deterministic pseudo-random based on date
    const seed = d.getFullYear() * 1000 + d.getMonth() * 40 + d.getDate()
    const rand = ((seed * 9301 + 49297) % 233280) / 233280
    let level = 0
    if (!isFuture) {
      if (rand > 0.85) level = 3
      else if (rand > 0.6) level = 2
      else if (rand > 0.35) level = 1
      else level = 0
    }

    days.push({ date: d, level: isFuture ? -1 : level })
  }

  // Grid: 7 rows (Mon-Sun), N columns (weeks)
  const grid: { date: Date; level: number }[][] = Array.from({ length: 7 }, () => [])
  days.forEach((day, i) => {
    grid[i % 7].push(day)
  })

  // Stats
  const activeDays = days.filter((d) => d.level > 0).length
  const totalPastDays = days.filter((d) => d.level >= 0).length

  // Current streak
  let streak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].level < 0) continue
    if (days[i].level > 0) streak++
    else break
  }

  const levelColors = [
    "bg-muted",
    "bg-primary/25",
    "bg-primary/50",
    "bg-primary",
  ]

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <CalendarDays className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-foreground">
                Activity
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeDays} active days out of {totalPastDays} in the last {weeks} weeks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-muted/60 rounded-lg px-3 py-2">
              <Flame className="size-4 text-primary" />
              <span className="text-sm font-bold text-foreground">{streak}</span>
              <span className="text-xs text-muted-foreground">day streak</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span>Less</span>
              {levelColors.map((c, i) => (
                <div key={i} className={`size-3 rounded-sm ${c}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-5">
        <TooltipProvider delayDuration={100}>
          <div className="overflow-x-auto">
            {/* Month labels */}
            <div className="flex mb-1.5 ml-8">
              {monthLabels.map((m, i) => {
                const nextCol = monthLabels[i + 1]?.col ?? weeks
                const span = nextCol - m.col
                return (
                  <span
                    key={`${m.label}-${m.col}`}
                    className="text-[11px] text-muted-foreground"
                    style={{ width: `${span * 16}px`, minWidth: `${span * 16}px` }}
                  >
                    {m.label}
                  </span>
                )
              })}
            </div>

            {/* Grid */}
            <div className="flex gap-0">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-2 pt-[1px]">
                {dayNames.map((name, i) => (
                  <div key={i} className="h-[13px] flex items-center">
                    <span className="text-[10px] text-muted-foreground w-5 text-right">
                      {name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cells */}
              <div className="flex gap-[3px]">
                {Array.from({ length: weeks }, (_, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }, (_, dayIdx) => {
                      const cell = grid[dayIdx]?.[weekIdx]
                      if (!cell || cell.level === -1) {
                        return (
                          <div
                            key={dayIdx}
                            className="size-[13px] rounded-sm bg-muted/40"
                          />
                        )
                      }
                      const dateStr = cell.date.toLocaleDateString("en-IN", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })
                      const activityLabel =
                        cell.level === 0
                          ? "No activity"
                          : cell.level === 1
                            ? "Light activity"
                            : cell.level === 2
                              ? "Moderate activity"
                              : "High activity"
                      return (
                        <Tooltip key={dayIdx}>
                          <TooltipTrigger asChild>
                            <div
                              className={`size-[13px] rounded-sm transition-colors ${
                                levelColors[cell.level]
                              } ${cell.level > 0 ? "hover:ring-2 hover:ring-primary/30" : ""}`}
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="text-xs"
                          >
                            <p className="font-medium">{activityLabel}</p>
                            <p className="text-muted-foreground">{dateStr}</p>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
