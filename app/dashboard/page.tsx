"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgress } from "@/components/circular-progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  FileText, 
  Wallet, 
  BarChart3, 
  Flame, 
  CalendarDays, 
  Trophy, 
  Clock,
  TrendingUp,
  Target,
  Zap,
  Award,
  Activity,
  ArrowRight,
  Sparkles,
  LineChart,
  CheckCircle2,
  BookOpen,
  Code2
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/context/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  
  // Get resume score from user data, fallback to 0 if not analyzed yet
  const resumeScore = user?.resumeData?.score ?? 0
  const creditBalance = user?.credits ?? 100
  const jdMatchScore = user?.resumeData?.lastJDMatch ?? 63
  
  // Calculate readiness index from available data
  const readinessIndex = resumeScore > 0 
    ? Math.round((resumeScore + jdMatchScore + 65 + 82) / 4)
    : 72
  
  // Format last updated date
  const lastUpdated = user?.resumeData?.lastAnalyzed 
    ? new Date(user.resumeData.lastAnalyzed).toLocaleDateString()
    : "Never"

  // Quick actions data
  const quickActions = [
    { label: "Analyze Resume", href: "/dashboard/resume", icon: FileText, color: "bg-blue-500/10 text-blue-600", border: "border-blue-500/20" },
    { label: "JD Match", href: "/dashboard/jd-match", icon: Target, color: "bg-emerald-500/10 text-emerald-600", border: "border-emerald-500/20" },
    { label: "Analytics", href: "/dashboard/analytics", icon: LineChart, color: "bg-purple-500/10 text-purple-600", border: "border-purple-500/20" },
    { label: "Practice Coding", href: "/dashboard/coding", icon: Code2, color: "bg-orange-500/10 text-orange-600", border: "border-orange-500/20" },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, <span className="text-primary">Arjun</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Here's your placement preparation overview for today.
          </p>
        </div>
        
        {/* Quick Stats Row */}
        <div className="flex items-center gap-3 animate-fade-in-up delay-200">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20 hover:shadow-md transition-shadow">
            <TrendingUp className="size-4 text-success animate-bounce-gentle" />
            <span className="text-sm font-medium text-success">+12%</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border hover:shadow-md transition-shadow">
            <Activity className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Active</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up delay-300">
        {quickActions.map((action, index) => (
          <Link key={action.label} href={action.href}>
            <Card className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 ${action.border}`}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`flex items-center justify-center size-12 rounded-xl ${action.color}`}>
                  <action.icon className="size-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">Get started</p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Three Core Metrics - Enterprise Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Resume Score */}
        <Card className="relative overflow-hidden border-l-4 border-l-primary shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-11 rounded-xl bg-primary/10 border border-primary/20">
                <FileText className="size-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Resume Score
                </CardTitle>
                <p className="text-xs text-muted-foreground/70 mt-0.5">Last updated: {lastUpdated}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Target className="size-3 mr-1" />
              Target: 90
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-6 pt-2">
            <CircularProgress
              value={resumeScore}
              size={140}
              strokeWidth={10}
              label="score"
            />
            <div className="flex flex-col gap-3 flex-1">
              <ScoreLabel score={resumeScore} />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress to target</span>
                  <span className="font-medium text-foreground">{Math.round((resumeScore / 90) * 100)}%</span>
                </div>
                <Progress value={(resumeScore / 90) * 100} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Balance */}
        <Card className="relative overflow-hidden border-l-4 border-l-success shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-11 rounded-xl bg-success/10 border border-success/20">
                <Wallet className="size-5 text-success" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Credit Balance
                </CardTitle>
                <p className="text-xs text-muted-foreground/70 mt-0.5">{creditBalance} credits available</p>
              </div>
            </div>
            <Badge variant="outline" className="border-success/30 text-success">
              Premium
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 pt-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-5xl font-bold tracking-tight text-foreground">
                {creditBalance}
              </span>
              <span className="text-sm text-muted-foreground">total credits</span>
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Used this month</span>
                <span className="font-medium text-foreground">55 / 200</span>
              </div>
              <Progress value={27.5} className="h-2 bg-muted" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Recharge to continue</span>
                <span className="text-primary font-medium">+145 credits</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Readiness Index */}
        <Card className="relative overflow-hidden border-l-4 border-l-warning shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-11 rounded-xl bg-warning/10 border border-warning/20">
                <BarChart3 className="size-5 text-warning" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Readiness Index
                </CardTitle>
                <p className="text-xs text-muted-foreground/70 mt-0.5">Placement readiness</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-warning/10 text-warning">
              <Zap className="size-3 mr-1" />
              Improving
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-6 pt-2">
            <CircularProgress
              value={readinessIndex}
              size={140}
              strokeWidth={10}
              label="ready"
            />
            <div className="flex flex-col gap-3 flex-1">
              <ReadinessLevel index={readinessIndex} />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Weekly improvement</span>
                  <span className="font-medium text-success">+8%</span>
                </div>
                <Progress value={readinessIndex} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      

      {/* Bottom Stats Row */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Trophy className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Campus Rank</p>
              <p className="text-xl font-bold">#12</p>
            </div>
            <Badge variant="secondary" className="ml-auto text-success bg-success/10">+3</Badge>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-orange-500/10">
              <Flame className="size-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
              <p className="text-xl font-bold">5 days</p>
            </div>
            <Badge variant="secondary" className="ml-auto bg-orange-500/10 text-orange-500">Hot</Badge>
          </div>
        </Card>
        
        {/* Profile Score - Shows user's best fit role from resume analysis */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-warning/10">
              <Target className="size-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Best Fit Role</p>
              <p className="text-xl font-bold">{user?.resumeData?.bestFitRole || "Not analyzed"}</p>
            </div>
            <Badge variant="secondary" className="ml-auto bg-warning/10 text-warning">
              {user?.resumeData?.score ? `${user.resumeData.score}%` : "-"}
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}

function ScoreLabel({ score }: { score: number }) {
  let text = "Needs Work"
  let colorClass = "text-destructive"
  let bgClass = "bg-destructive/10"

  if (score >= 85) {
    text = "Excellent"
    colorClass = "text-success"
    bgClass = "bg-success/10"
  } else if (score >= 70) {
    text = "Good"
    colorClass = "text-primary"
    bgClass = "bg-primary/10"
  } else if (score >= 50) {
    text = "Fair"
    colorClass = "text-warning"
    bgClass = "bg-warning/10"
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${bgClass}`}>
      <span className={`text-sm font-semibold ${colorClass}`}>{text}</span>
    </div>
  )
}

function ReadinessLevel({ index }: { index: number }) {
  let level = "Beginner"
  let colorClass = "text-destructive"
  let bgClass = "bg-destructive/10"

  if (index >= 85) {
    level = "Placement Ready"
    colorClass = "text-success"
    bgClass = "bg-success/10"
  } else if (index >= 70) {
    level = "Intermediate"
    colorClass = "text-primary"
    bgClass = "bg-primary/10"
  } else if (index >= 50) {
    level = "Developing"
    colorClass = "text-warning"
    bgClass = "bg-warning/10"
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${bgClass}`}>
      <span className={`text-sm font-semibold ${colorClass}`}>{level}</span>
    </div>
  )
}

function ActivityCalendar() {
  const today = new Date()
  const weeks = 16
  const dayNames = ["Mon", "", "Wed", "", "Fri", "", ""]
  const monthLabels: { label: string; col: number }[] = []

  const days: { date: Date; level: number }[] = []

  const start = new Date(today)
  start.setDate(start.getDate() - weeks * 7 - start.getDay() + 1)

  let lastMonth = -1
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)

    if (d.getMonth() !== lastMonth) {
      lastMonth = d.getMonth()
      monthLabels.push({
        label: d.toLocaleString("default", { month: "short" }),
        col: Math.floor(i / 7),
      })
    }

    const isFuture = d > today
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

  const grid: { date: Date; level: number }[][] = Array.from({ length: 7 }, () => [])
  days.forEach((day, i) => {
    grid[i % 7].push(day)
  })

  const activeDays = days.filter((d) => d.level > 0).length
  const totalPastDays = days.filter((d) => d.level >= 0).length

  let streak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].level < 0) continue
    if (days[i].level > 0) streak++
    else break
  }

  const levelColors = [
    "bg-muted/50",
    "bg-primary/30",
    "bg-primary/60",
    "bg-primary",
  ]

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-11 rounded-xl bg-primary/10 border border-primary/20">
              <CalendarDays className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Activity Overview</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeDays} active days out of {totalPastDays} in the last {weeks} weeks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <span>Less</span>
            <div className="flex gap-0.5 mx-1">
              {levelColors.map((c, i) => (
                <div key={i} className={`size-3 rounded-sm ${c}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-5">
        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-4 py-2.5 border border-border">
            <Trophy className="size-4 text-primary" />
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-foreground">#12</span>
              <span className="text-xs text-muted-foreground">Rank</span>
            </div>
            <span className="text-xs font-medium text-success ml-1">+3</span>
          </div>

          <div className="h-8 w-px bg-border" />

          <div className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-4 py-2.5 border border-border">
            <Flame className="size-4 text-orange-500" />
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-foreground">{streak} days</span>
              <span className="text-xs text-muted-foreground">Streak</span>
            </div>
          </div>

          <div className="h-8 w-px bg-border" />

          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Weekly Progress</span>
              <span className="text-xs font-semibold text-foreground">72%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[72%] rounded-full bg-primary" />
            </div>
          </div>
        </div>

        <TooltipProvider delayDuration={100}>
          <div className="overflow-x-auto pb-2">
            {/* Month labels */}
            <div className="flex mb-2 ml-10">
              {monthLabels.map((m, i) => {
                const nextCol = monthLabels[i + 1]?.col ?? weeks
                const span = nextCol - m.col
                return (
                  <span
                    key={`${m.label}-${m.col}`}
                    className="text-xs text-muted-foreground"
                    style={{ width: `${span * 18}px`, minWidth: `${span * 18}px` }}
                  >
                    {m.label}
                  </span>
                )
              })}
            </div>

            {/* Grid */}
            <div className="flex gap-0">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-3 pt-[1px]">
                {dayNames.map((name, i) => (
                  <div key={i} className="h-[14px] flex items-center">
                    <span className="text-xs text-muted-foreground w-6 text-right">
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
                            className="size-[14px] rounded-sm bg-muted/30"
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
                              className={`size-[14px] rounded-sm transition-all cursor-pointer ${
                                levelColors[cell.level]
                              } ${cell.level > 0 ? "hover:ring-2 hover:ring-primary/40" : ""}`}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
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

