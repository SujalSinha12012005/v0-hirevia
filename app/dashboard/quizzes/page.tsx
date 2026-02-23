"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  CheckCircle2,
  Clock,
  ArrowRight,
  Trophy,
} from "lucide-react"

const quizzes = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    questions: 15,
    duration: "20 min",
    difficulty: "Medium",
    completed: true,
    score: 82,
  },
  {
    id: 2,
    title: "React Core Concepts",
    questions: 12,
    duration: "15 min",
    difficulty: "Medium",
    completed: true,
    score: 75,
  },
  {
    id: 3,
    title: "Data Structures Basics",
    questions: 20,
    duration: "30 min",
    difficulty: "Hard",
    completed: false,
    score: null,
  },
  {
    id: 4,
    title: "HTML & CSS Mastery",
    questions: 10,
    duration: "12 min",
    difficulty: "Easy",
    completed: false,
    score: null,
  },
  {
    id: 5,
    title: "TypeScript Essentials",
    questions: 15,
    duration: "20 min",
    difficulty: "Medium",
    completed: false,
    score: null,
  },
  {
    id: 6,
    title: "System Design Intro",
    questions: 8,
    duration: "25 min",
    difficulty: "Hard",
    completed: false,
    score: null,
  },
]

export default function QuizzesPage() {
  const completedCount = quizzes.filter((q) => q.completed).length
  const avgScore = Math.round(
    quizzes
      .filter((q) => q.completed && q.score !== null)
      .reduce((sum, q) => sum + (q.score ?? 0), 0) /
      (completedCount || 1)
  )

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Quizzes
        </h1>
        <p className="text-muted-foreground mt-1">
          Test your knowledge and earn credits by completing quizzes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <Brain className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {completedCount}/{quizzes.length}
              </p>
              <p className="text-sm text-muted-foreground">Quizzes Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-success/10">
              <Trophy className="size-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{avgScore}%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-warning/10">
              <Clock className="size-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {quizzes.length - completedCount}
              </p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}

function QuizCard({
  quiz,
}: {
  quiz: (typeof quizzes)[number]
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-1">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className={
              quiz.difficulty === "Easy"
                ? "bg-success/10 text-success border-success/20"
                : quiz.difficulty === "Hard"
                ? "bg-destructive/10 text-destructive border-destructive/20"
                : "bg-warning/10 text-warning border-warning/20"
            }
          >
            {quiz.difficulty}
          </Badge>
          {quiz.completed && (
            <CheckCircle2 className="size-5 text-success" />
          )}
        </div>
        <CardTitle className="text-base mt-2">{quiz.title}</CardTitle>
        <CardDescription className="flex items-center gap-3 mt-1">
          <span>{quiz.questions} questions</span>
          <span className="text-border">|</span>
          <span>{quiz.duration}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {quiz.completed && quiz.score !== null ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your Score</span>
              <span className="font-semibold text-foreground">
                {quiz.score}%
              </span>
            </div>
            <Progress value={quiz.score} className="h-2" />
            <Button variant="outline" size="sm" className="w-full mt-1">
              Retake Quiz
            </Button>
          </div>
        ) : (
          <Button size="sm" className="w-full">
            Start Quiz
            <ArrowRight className="size-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
