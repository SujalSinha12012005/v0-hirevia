"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  TrendingUp,
  Plus,
  Sparkles,
} from "lucide-react"

const recentlyCompleted = [
  { skill: "ES6+ Advanced Topics", date: "2 days ago", xp: 50 },
  { skill: "TypeScript Generics", date: "3 days ago", xp: 60 },
  { skill: "Async Patterns", date: "5 days ago", xp: 45 },
  { skill: "Advanced Hooks", date: "1 week ago", xp: 55 },
  { skill: "State Management", date: "1 week ago", xp: 50 },
]

const remainingSkills = [
  { skill: "Performance Optimization", week: 2, priority: "High" },
  { skill: "REST API Design", week: 3, priority: "High" },
  { skill: "Node.js & Express", week: 3, priority: "High" },
  { skill: "Database Fundamentals", week: 3, priority: "Medium" },
  { skill: "Git Workflow", week: 4, priority: "Medium" },
  { skill: "Unit Testing", week: 4, priority: "Medium" },
  { skill: "CI/CD Pipelines", week: 4, priority: "Low" },
  { skill: "Mock Interviews", week: 4, priority: "Low" },
]

const trendingSkills = [
  { skill: "Next.js App Router", demand: "Very High", learners: "12.4k", tag: "Hot" },
  { skill: "Docker & Containers", demand: "High", learners: "9.8k", tag: "Trending" },
  { skill: "System Design", demand: "Very High", learners: "15.1k", tag: "Hot" },
  { skill: "GraphQL", demand: "Medium", learners: "6.2k", tag: "New" },
  { skill: "Redis & Caching", demand: "High", learners: "5.7k", tag: null },
  { skill: "Tailwind CSS", demand: "High", learners: "11.3k", tag: "Popular" },
]

interface Task {
  id: string
  label: string
  completed: boolean
}

interface Week {
  week: number
  title: string
  description: string
  tasks: Task[]
}

const initialWeeks: Week[] = [
  {
    week: 1,
    title: "JavaScript & TypeScript Mastery",
    description: "Deep dive into advanced JS concepts and TypeScript fundamentals",
    tasks: [
      { id: "w1t1", label: "Complete ES6+ advanced topics", completed: true },
      { id: "w1t2", label: "TypeScript generics & utility types", completed: true },
      { id: "w1t3", label: "Async patterns & error handling", completed: true },
      { id: "w1t4", label: "Practice 5 coding challenges", completed: false },
    ],
  },
  {
    week: 2,
    title: "React & Component Architecture",
    description: "Build reusable components with best practices",
    tasks: [
      { id: "w2t1", label: "Advanced hooks patterns", completed: true },
      { id: "w2t2", label: "State management deep dive", completed: true },
      { id: "w2t3", label: "Performance optimization techniques", completed: false },
      { id: "w2t4", label: "Build a mini project", completed: false },
    ],
  },
  {
    week: 3,
    title: "Backend & API Development",
    description: "Learn server-side concepts and API design",
    tasks: [
      { id: "w3t1", label: "REST API design principles", completed: false },
      { id: "w3t2", label: "Node.js & Express basics", completed: false },
      { id: "w3t3", label: "Database fundamentals (SQL & NoSQL)", completed: false },
      { id: "w3t4", label: "Build a CRUD API project", completed: false },
    ],
  },
  {
    week: 4,
    title: "DevOps, Testing & Interview Prep",
    description: "CI/CD, testing strategies, and placement preparation",
    tasks: [
      { id: "w4t1", label: "Git workflow & branching strategies", completed: false },
      { id: "w4t2", label: "Unit & integration testing with Vitest", completed: false },
      { id: "w4t3", label: "CI/CD pipeline basics", completed: false },
      { id: "w4t4", label: "Mock interview practice", completed: false },
    ],
  },
]

export default function RoadmapPage() {
  const [weeks, setWeeks] = useState(initialWeeks)

  const totalTasks = weeks.flatMap((w) => w.tasks).length
  const completedTasks = weeks
    .flatMap((w) => w.tasks)
    .filter((t) => t.completed).length
  const overallProgress = Math.round((completedTasks / totalTasks) * 100)

  function toggleTask(weekIndex: number, taskId: string) {
    setWeeks((prev) =>
      prev.map((w, i) =>
        i === weekIndex
          ? {
              ...w,
              tasks: w.tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              ),
            }
          : w
      )
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Skill Roadmap
        </h1>
        <p className="text-muted-foreground mt-1">
          Your personalized 30-day learning plan to become placement-ready.
        </p>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="size-5 text-primary" />
            30-Day Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </span>
            <span className="font-semibold text-foreground">
              {overallProgress}%
            </span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-success" />
              <span className="text-muted-foreground">
                {completedTasks} Complete
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {totalTasks - completedTasks} Remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recently Completed */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-success/10">
                <Award className="size-5 text-success" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Recently Completed</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{recentlyCompleted.length} skills mastered this month</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-0 text-xs">
              +{recentlyCompleted.reduce((sum, s) => sum + s.xp, 0)} XP total
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyCompleted.map((item) => (
              <div
                key={item.skill}
                className="flex items-center gap-3 rounded-xl px-4 py-3 bg-success/[0.04] border border-success/10"
              >
                <CheckCircle2 className="size-4 text-success shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.skill}</p>
                  <p className="text-[11px] text-muted-foreground">{item.date}</p>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success border-0 text-[10px] px-1.5 py-0 shrink-0">
                  +{item.xp} XP
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Left to Complete */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
                <ArrowRight className="size-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Left to Complete</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{remainingSkills.length} skills remaining in your roadmap</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {Math.round((recentlyCompleted.length / (recentlyCompleted.length + remainingSkills.length)) * 100)}% done
            </span>
          </div>
          <div className="mt-3">
            <Progress
              value={Math.round((recentlyCompleted.length / (recentlyCompleted.length + remainingSkills.length)) * 100)}
              className="h-2"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {remainingSkills.map((item) => (
              <div
                key={item.skill}
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 hover:bg-muted/40 transition-colors"
              >
                <Circle className="size-4 text-muted-foreground/40 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.skill}</p>
                  <p className="text-[11px] text-muted-foreground">Week {item.week}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-2 py-0.5 border-0 shrink-0 ${
                    item.priority === "High"
                      ? "bg-destructive/10 text-destructive"
                      : item.priority === "Medium"
                        ? "bg-warning/10 text-warning-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Skills */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
                <TrendingUp className="size-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Trending Skills</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Popular among students right now</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {trendingSkills.map((item) => (
              <div
                key={item.skill}
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 hover:border-primary/30 hover:bg-muted/30 transition-all group cursor-pointer"
              >
                <Sparkles className="size-4 text-primary/50 group-hover:text-primary shrink-0 transition-colors" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{item.skill}</p>
                    {item.tag && (
                      <Badge
                        variant="secondary"
                        className={`text-[9px] px-1.5 py-0 border-0 shrink-0 ${
                          item.tag === "Hot"
                            ? "bg-destructive/10 text-destructive"
                            : item.tag === "Trending"
                              ? "bg-primary/10 text-primary"
                              : item.tag === "New"
                                ? "bg-success/10 text-success"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.tag}
                      </Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{item.learners} learners &middot; {item.demand} demand</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <Plus className="size-3.5" />
                  <span className="sr-only">Add {item.skill}</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Breakdown */}
      <div className="flex flex-col gap-5">
        {weeks.map((week, weekIndex) => {
          const weekCompleted = week.tasks.filter((t) => t.completed).length
          const weekTotal = week.tasks.length
          const weekProgress = Math.round((weekCompleted / weekTotal) * 100)
          const isComplete = weekCompleted === weekTotal
          const isActive =
            !isComplete && weekIndex === weeks.findIndex((w) => w.tasks.some((t) => !t.completed))

          return (
            <Card
              key={week.week}
              className={
                isActive
                  ? "ring-2 ring-primary/30 border-primary/40"
                  : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center size-10 rounded-full text-sm font-bold ${
                        isComplete
                          ? "bg-success/10 text-success"
                          : isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="size-5" />
                      ) : (
                        `W${week.week}`
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{week.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {week.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        <Clock className="size-3" />
                        In Progress
                      </Badge>
                    )}
                    {isComplete && (
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        <CheckCircle2 className="size-3" />
                        Complete
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {weekCompleted}/{weekTotal} tasks
                    </span>
                    <span className="font-medium text-foreground">
                      {weekProgress}%
                    </span>
                  </div>
                  <Progress value={weekProgress} className="h-1.5" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {week.tasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-3">
                      <Checkbox
                        id={task.id}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(weekIndex, task.id)}
                      />
                      <label
                        htmlFor={task.id}
                        className={`text-sm cursor-pointer ${
                          task.completed
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {task.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            Recommended Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <ResourceItem title="MDN Web Docs" category="Reference" />
            <ResourceItem title="React Official Docs" category="Framework" />
            <ResourceItem title="TypeScript Handbook" category="Language" />
            <ResourceItem title="LeetCode Easy/Medium" category="Practice" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ResourceItem({ title, category }: { title: string; category: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <div className="flex items-center justify-center size-8 rounded-md bg-primary/10">
        <BookOpen className="size-4 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{category}</p>
      </div>
    </div>
  )
}
