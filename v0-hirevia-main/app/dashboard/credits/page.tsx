"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Mic,
  TrendingUp,
} from "lucide-react"

const creditHistory = [
  { type: "earned" as const, description: "Resume Analysis", amount: 10, date: "Feb 21, 2026" },
  { type: "spent" as const, description: "Mock Interview Unlock", amount: -20, date: "Feb 20, 2026" },
  { type: "earned" as const, description: "Quiz Completed", amount: 5, date: "Feb 19, 2026" },
  { type: "earned" as const, description: "JD Match Analysis", amount: 8, date: "Feb 18, 2026" },
  { type: "spent" as const, description: "Career Counseling Session", amount: -30, date: "Feb 17, 2026" },
  { type: "earned" as const, description: "Resume Analysis", amount: 10, date: "Feb 16, 2026" },
  { type: "earned" as const, description: "Roadmap Week Completed", amount: 15, date: "Feb 15, 2026" },
  { type: "spent" as const, description: "Advanced Report", amount: -10, date: "Feb 14, 2026" },
]

export default function CreditsWalletPage() {
  const [balance] = useState(145)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Credits Wallet
        </h1>
        <p className="text-muted-foreground mt-1">
          Earn credits by completing activities and unlock premium features.
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="flex flex-col gap-2 pt-6">
            <div className="flex items-center gap-2">
              <Wallet className="size-5" />
              <span className="text-sm font-medium opacity-90">Current Balance</span>
            </div>
            <p className="text-4xl font-bold">{balance}</p>
            <p className="text-sm opacity-75">Credits available</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2 pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-success" />
              <span className="text-sm font-medium text-muted-foreground">
                Total Earned
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground">248</p>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2 pt-6">
            <div className="flex items-center gap-2">
              <Coins className="size-5 text-warning" />
              <span className="text-sm font-medium text-muted-foreground">
                Total Spent
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground">103</p>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Unlock Feature */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-5 text-primary" />
            Premium Features
          </CardTitle>
          <CardDescription>
            Use your credits to unlock premium features.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Mic}
              title="Mock Interview"
              cost={20}
              description="AI-powered mock interview with feedback"
              available={balance >= 20}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Advanced Report"
              cost={10}
              description="Detailed career path analysis"
              available={balance >= 10}
            />
            <FeatureCard
              icon={Lock}
              title="Career Counseling"
              cost={30}
              description="1-on-1 AI career counseling session"
              available={balance >= 30}
            />
          </div>
        </CardContent>
      </Card>

      {/* Credit History */}
      <Card>
        <CardHeader>
          <CardTitle>Credit History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col divide-y divide-border">
            {creditHistory.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center size-9 rounded-full ${
                      item.type === "earned"
                        ? "bg-success/10"
                        : "bg-destructive/10"
                    }`}
                  >
                    {item.type === "earned" ? (
                      <ArrowUpRight className="size-4 text-success" />
                    ) : (
                      <ArrowDownRight className="size-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-foreground">
                      {item.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    item.type === "earned"
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {item.type === "earned" ? "+" : ""}
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  cost,
  description,
  available,
}: {
  icon: React.ElementType
  title: string
  cost: number
  description: string
  available: boolean
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-card-foreground">{title}</p>
          <Badge variant="secondary" className="text-xs mt-0.5">
            {cost} Credits
          </Badge>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
      <Button
        size="sm"
        variant={available ? "default" : "outline"}
        disabled={!available}
        className="w-full"
      >
        {available ? (
          <>Unlock</>
        ) : (
          <>
            <Lock className="size-3" />
            Insufficient Credits
          </>
        )}
      </Button>
    </div>
  )
}
