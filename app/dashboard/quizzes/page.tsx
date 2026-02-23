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
  ArrowLeft,
  Trophy,
  CircleDot,
  XCircle,
} from "lucide-react"

type Question = {
  question: string
  options: string[]
  correct: number
}

type Quiz = {
  id: number
  title: string
  duration: string
  difficulty: string
  completed: boolean
  score: number | null
  questions: Question[]
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    duration: "20 min",
    difficulty: "Medium",
    completed: true,
    score: 82,
    questions: [
      { question: "What is the output of typeof null?", options: ["null", "undefined", "object", "number"], correct: 2 },
      { question: "Which method converts JSON to a JavaScript object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toObject()"], correct: 1 },
      { question: "What does '===' check?", options: ["Value only", "Type only", "Value and type", "Reference"], correct: 2 },
      { question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "both", "none"], correct: 1 },
      { question: "What is a closure in JavaScript?", options: ["A function with no return", "A function with access to outer scope", "A loop construct", "An error handler"], correct: 1 },
      { question: "What does Array.prototype.map() return?", options: ["Modified original array", "New array", "undefined", "Boolean"], correct: 1 },
      { question: "Which is NOT a primitive type?", options: ["string", "boolean", "object", "number"], correct: 2 },
      { question: "What does the 'this' keyword refer to in an arrow function?", options: ["The function itself", "The global object", "The enclosing lexical scope", "undefined"], correct: 2 },
      { question: "What is event delegation?", options: ["Attaching events to each child", "Using a parent to handle child events", "Removing events", "Async event handling"], correct: 1 },
      { question: "What does Promise.all() do?", options: ["Runs promises sequentially", "Resolves when all promises resolve", "Returns first resolved", "Catches all errors"], correct: 1 },
    ],
  },
  {
    id: 2,
    title: "React Core Concepts",
    duration: "15 min",
    difficulty: "Medium",
    completed: true,
    score: 75,
    questions: [
      { question: "What is the virtual DOM?", options: ["A direct copy of the real DOM", "A lightweight JS representation of the DOM", "A browser API", "A CSS engine"], correct: 1 },
      { question: "What hook is used for side effects?", options: ["useState", "useEffect", "useRef", "useMemo"], correct: 1 },
      { question: "What does useState return?", options: ["A single value", "An array with state and setter", "An object", "A boolean"], correct: 1 },
      { question: "What is JSX?", options: ["A new language", "JavaScript XML syntax extension", "A CSS framework", "A build tool"], correct: 1 },
      { question: "What is prop drilling?", options: ["Passing props through many levels", "Removing props", "Default props", "Dynamic imports"], correct: 0 },
      { question: "Which hook avoids unnecessary re-renders?", options: ["useEffect", "useState", "useMemo", "useRef"], correct: 2 },
      { question: "What does useRef do?", options: ["Creates state", "Returns a mutable ref object", "Fetches data", "Handles routing"], correct: 1 },
      { question: "What triggers a re-render in React?", options: ["Variable change", "State or prop change", "Console.log", "Function call"], correct: 1 },
      { question: "What is a controlled component?", options: ["Component with internal state", "Component whose value is controlled by React state", "A pure component", "A class component"], correct: 1 },
      { question: "What is React.Fragment used for?", options: ["Error boundaries", "Grouping elements without extra DOM node", "Lazy loading", "State management"], correct: 1 },
    ],
  },
  {
    id: 3,
    title: "Data Structures Basics",
    duration: "30 min",
    difficulty: "Hard",
    completed: false,
    score: null,
    questions: [
      { question: "What is the time complexity of array access by index?", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], correct: 1 },
      { question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Array", "Tree"], correct: 1 },
      { question: "What is the worst case for binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correct: 2 },
      { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Heap", "Graph"], correct: 1 },
      { question: "What is a linked list?", options: ["Array of elements", "Nodes connected via pointers", "Hash table", "Binary tree"], correct: 1 },
      { question: "What is a hash collision?", options: ["Two keys mapping to same index", "Empty hash table", "Overflow error", "Key not found"], correct: 0 },
      { question: "Which traversal visits root first?", options: ["Inorder", "Preorder", "Postorder", "Level order"], correct: 1 },
      { question: "What is the height of a balanced BST with n nodes?", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], correct: 1 },
      { question: "What does a graph edge represent?", options: ["A node", "A relationship between nodes", "A weight", "A path"], correct: 1 },
      { question: "Which sorting algorithm is best for nearly sorted data?", options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Bubble Sort"], correct: 2 },
    ],
  },
  {
    id: 4,
    title: "HTML & CSS Mastery",
    duration: "12 min",
    difficulty: "Easy",
    completed: false,
    score: null,
    questions: [
      { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0 },
      { question: "Which CSS property controls text size?", options: ["text-style", "font-size", "text-size", "font-style"], correct: 1 },
      { question: "What is the CSS box model order (outer to inner)?", options: ["Margin, Border, Padding, Content", "Padding, Margin, Border, Content", "Border, Margin, Padding, Content", "Content, Padding, Border, Margin"], correct: 0 },
      { question: "Which HTML tag is semantic for navigation?", options: ["<div>", "<span>", "<nav>", "<section>"], correct: 2 },
      { question: "What does 'display: flex' do?", options: ["Hides the element", "Makes it a flex container", "Adds animation", "Makes it inline"], correct: 1 },
      { question: "Which unit is relative to the viewport width?", options: ["px", "em", "vw", "rem"], correct: 2 },
      { question: "What does z-index control?", options: ["Width", "Height", "Stacking order", "Opacity"], correct: 2 },
      { question: "What is a CSS media query used for?", options: ["Animations", "Responsive design", "JavaScript interaction", "SEO"], correct: 1 },
      { question: "Which selector has the highest specificity?", options: [".class", "#id", "element", "*"], correct: 1 },
      { question: "What does position: sticky do?", options: ["Fixed at all times", "Toggles between relative and fixed", "Removes from flow", "Centers the element"], correct: 1 },
    ],
  },
  {
    id: 5,
    title: "TypeScript Essentials",
    duration: "20 min",
    difficulty: "Medium",
    completed: false,
    score: null,
    questions: [
      { question: "What is TypeScript?", options: ["A new language", "A typed superset of JavaScript", "A CSS preprocessor", "A runtime"], correct: 1 },
      { question: "What keyword defines an interface?", options: ["type", "interface", "class", "struct"], correct: 1 },
      { question: "What is 'any' type used for?", options: ["Only strings", "Only numbers", "Opt out of type checking", "Arrays only"], correct: 2 },
      { question: "What does the '?' operator do in type definitions?", options: ["Makes property required", "Makes property optional", "Removes property", "Validates property"], correct: 1 },
      { question: "What is a generic in TypeScript?", options: ["A fixed type", "A reusable type parameter", "A global variable", "A module"], correct: 1 },
      { question: "What is an enum?", options: ["A function", "A set of named constants", "A loop", "A class method"], correct: 1 },
      { question: "What does 'readonly' do?", options: ["Makes it writable", "Prevents reassignment", "Deletes the property", "Makes it optional"], correct: 1 },
      { question: "What is a union type?", options: ["Only one type allowed", "Multiple types allowed with |", "An array type", "A function type"], correct: 1 },
      { question: "What is type narrowing?", options: ["Making types broader", "Refining types with checks", "Removing types", "Casting types"], correct: 1 },
      { question: "What file extension does TypeScript use?", options: [".js", ".ts", ".jsx", ".txt"], correct: 1 },
    ],
  },
  {
    id: 6,
    title: "System Design Intro",
    duration: "25 min",
    difficulty: "Hard",
    completed: false,
    score: null,
    questions: [
      { question: "What is horizontal scaling?", options: ["Adding more power to a machine", "Adding more machines", "Reducing servers", "Upgrading RAM"], correct: 1 },
      { question: "What does a load balancer do?", options: ["Stores data", "Distributes traffic across servers", "Encrypts data", "Compiles code"], correct: 1 },
      { question: "What is a CDN?", options: ["Central Data Node", "Content Delivery Network", "Cloud Database Network", "Client Data Node"], correct: 1 },
      { question: "What is database sharding?", options: ["Backing up data", "Splitting data across databases", "Encrypting data", "Indexing data"], correct: 1 },
      { question: "What does CAP theorem stand for?", options: ["Cache, API, Protocol", "Consistency, Availability, Partition tolerance", "Cloud, Application, Performance", "Create, Access, Publish"], correct: 1 },
      { question: "What is caching used for?", options: ["Permanent storage", "Reducing latency with temporary storage", "Encrypting data", "Logging errors"], correct: 1 },
      { question: "What is a message queue?", options: ["Email service", "Async communication between services", "Database", "Frontend tool"], correct: 1 },
      { question: "What is a microservices architecture?", options: ["One large application", "Small independent services", "Frontend only", "Database pattern"], correct: 1 },
      { question: "What does rate limiting prevent?", options: ["Slow queries", "Abuse and overloading", "Data loss", "CSS errors"], correct: 1 },
      { question: "What is an API gateway?", options: ["A database", "An entry point for client requests", "A frontend framework", "A testing tool"], correct: 1 },
    ],
  },
]

export default function QuizzesPage() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)

  if (activeQuiz) {
    return <QuizPlayer quiz={activeQuiz} onBack={() => setActiveQuiz(null)} />
  }

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
              <Clock className="size-6 text-warning-foreground" />
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
          <QuizCard key={quiz.id} quiz={quiz} onStart={() => setActiveQuiz(quiz)} />
        ))}
      </div>
    </div>
  )
}

function QuizCard({ quiz, onStart }: { quiz: Quiz; onStart: () => void }) {
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
                  : "bg-warning/10 text-warning-foreground border-warning/20"
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
          <span>{quiz.questions.length} questions</span>
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
            <Button variant="outline" size="sm" className="w-full mt-1" onClick={onStart}>
              Retake Quiz
            </Button>
          </div>
        ) : (
          <Button size="sm" className="w-full" onClick={onStart}>
            Start Quiz
            <ArrowRight className="size-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function QuizPlayer({ quiz, onBack }: { quiz: Quiz; onBack: () => void }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const q = quiz.questions[currentQ]
  const totalQuestions = quiz.questions.length
  const answeredCount = selected.filter((s) => s !== null).length

  function handleSelect(optionIdx: number) {
    if (submitted) return
    setSelected((prev) => {
      const copy = [...prev]
      copy[currentQ] = optionIdx
      return copy
    })
  }

  function handleSubmit() {
    setSubmitted(true)
    setCurrentQ(0)
  }

  const correctCount = selected.reduce<number>(
    (sum, s, i) => sum + (s === quiz.questions[i].correct ? 1 : 0),
    0
  )
  const scorePct = Math.round((correctCount / totalQuestions) * 100)

  if (submitted) {
    return (
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
            <ArrowLeft className="size-5" />
            <span className="sr-only">Back to quizzes</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{quiz.title}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Results</p>
          </div>
        </div>

        {/* Score Card */}
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
              <Trophy className="size-10 text-primary" />
            </div>
            <p className="text-4xl font-bold text-foreground">{scorePct}%</p>
            <p className="text-muted-foreground text-sm">
              You got {correctCount} out of {totalQuestions} correct
            </p>
            <Badge
              variant="secondary"
              className={
                scorePct >= 80
                  ? "bg-success/10 text-success border-0 text-sm px-3 py-1"
                  : scorePct >= 50
                    ? "bg-warning/10 text-warning-foreground border-0 text-sm px-3 py-1"
                    : "bg-destructive/10 text-destructive border-0 text-sm px-3 py-1"
              }
            >
              {scorePct >= 80 ? "Excellent" : scorePct >= 50 ? "Good Effort" : "Keep Practicing"}
            </Badge>
          </CardContent>
        </Card>

        {/* Review All Questions */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-foreground">Review Answers</h2>
          {quiz.questions.map((question, qIdx) => {
            const userAnswer = selected[qIdx]
            const isCorrect = userAnswer === question.correct
            return (
              <Card key={qIdx} className={`border-l-4 ${isCorrect ? "border-l-success" : "border-l-destructive"}`}>
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-bold text-muted-foreground mt-0.5">{qIdx + 1}.</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground mb-3">{question.question}</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {question.options.map((opt, oIdx) => {
                          const isUserPick = userAnswer === oIdx
                          const isCorrectOpt = question.correct === oIdx
                          let style = "border-border bg-card text-muted-foreground"
                          if (isCorrectOpt) style = "border-success/30 bg-success/[0.06] text-success"
                          if (isUserPick && !isCorrect) style = "border-destructive/30 bg-destructive/[0.06] text-destructive"

                          return (
                            <div
                              key={oIdx}
                              className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm ${style}`}
                            >
                              {isCorrectOpt ? (
                                <CheckCircle2 className="size-4 shrink-0" />
                              ) : isUserPick ? (
                                <XCircle className="size-4 shrink-0" />
                              ) : (
                                <CircleDot className="size-4 shrink-0 opacity-30" />
                              )}
                              {opt}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Button onClick={onBack} className="w-fit">
          <ArrowLeft className="size-4" />
          Back to Quizzes
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="size-5" />
          <span className="sr-only">Back to quizzes</span>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight text-foreground">{quiz.title}</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Question {currentQ + 1} of {totalQuestions}
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {answeredCount}/{totalQuestions} answered
        </Badge>
      </div>

      {/* Progress */}
      <Progress value={((currentQ + 1) / totalQuestions) * 100} className="h-1.5" />

      {/* Question Navigation Dots */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {quiz.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className={`size-8 rounded-lg text-xs font-medium transition-all ${
              i === currentQ
                ? "bg-primary text-primary-foreground shadow-sm"
                : selected[i] !== null
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">{q.question}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2.5">
          {q.options.map((opt, oIdx) => {
            const isSelected = selected[currentQ] === oIdx
            return (
              <button
                key={oIdx}
                onClick={() => handleSelect(oIdx)}
                className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-sm text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/[0.06] text-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-muted/30"
                }`}
              >
                <div
                  className={`flex items-center justify-center size-6 rounded-full border-2 shrink-0 transition-colors ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {isSelected && (
                    <div className="size-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                {opt}
              </button>
            )
          })}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
          disabled={currentQ === 0}
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        {currentQ < totalQuestions - 1 ? (
          <Button onClick={() => setCurrentQ((p) => p + 1)}>
            Next
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={answeredCount < totalQuestions}
            className="gap-2"
          >
            <CheckCircle2 className="size-4" />
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  )
}
