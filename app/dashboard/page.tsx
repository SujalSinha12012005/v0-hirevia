"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgress } from "@/components/circular-progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Wallet, BarChart3, Check, Crown } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const resumeScore = 78
  const creditBalance = 145
  const readinessIndex = 72

  const plans = [
    { name: "1 Month", price: 100, per: "/mo", save: null, features: ["Resume Analysis", "10 JD Matches", "Basic Quizzes"] },
    { name: "4 Months", price: 350, per: "/4mo", save: "Save 12%", popular: true, features: ["Unlimited Analyses", "50 JD Matches", "All Quizzes", "Skill Roadmap"] },
    { name: "1 Year", price: 820, per: "/yr", save: "Save 32%", features: ["Everything in 4 Months", "Priority Support", "Admin Insights", "Placement Coaching"] },
  ]

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

        {/* Subscription Plans - top right */}
        <div className="shrink-0 flex gap-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col rounded-2xl border-2 p-5 w-[180px] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                plan.popular
                  ? "border-primary bg-primary/[0.04] shadow-md shadow-primary/10"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground text-[10px] font-semibold px-3 py-0.5 shadow-sm shadow-primary/20">
                    <Crown className="size-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}

              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {plan.name}
              </span>

              <div className="flex items-baseline gap-1 mt-3">
                <span className="text-2xl font-bold text-foreground">
                  {"₹"}{plan.price}
                </span>
                <span className="text-xs text-muted-foreground">{plan.per}</span>
              </div>

              {plan.save && (
                <span className="inline-block mt-1.5 text-[11px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5 w-fit">
                  {plan.save}
                </span>
              )}

              <div className="my-4 h-px bg-border" />

              <ul className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px] text-muted-foreground leading-tight">
                    <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                size="sm"
                variant={plan.popular ? "default" : "outline"}
                className={`mt-auto pt-4 h-8 text-xs font-medium w-full rounded-lg ${
                  plan.popular
                    ? "shadow-sm shadow-primary/20"
                    : "hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
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
