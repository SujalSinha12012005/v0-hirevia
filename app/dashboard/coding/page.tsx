"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Lightbulb,
  ChevronRight,
  Copy,
  RotateCcw,
  Star,
  BookOpen,
  Target,
  Flame,
  Zap,
} from "lucide-react"

type Problem = {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  completed: boolean
  solved: boolean
  attempts: number
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  constraints: string[]
  starterCode: { [key: string]: string }
  testCases: { input: string; expectedOutput: string; hidden: boolean }[]
}

type Submission = {
  id: number
  problemId: number
  language: string
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Time Limit"
  time: string
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    completed: false,
    solved: false,
    attempts: 0,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // Your code here\n\n}",
      python: "def two_sum(nums, target):\n    # Your code here\n    pass",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}",
    },
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]", hidden: false },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]", hidden: false },
      { input: "[3,3], 6", expectedOutput: "[0,1]", hidden: true },
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks",
    completed: false,
    solved: false,
    attempts: 0,
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'"],
    starterCode: {
      javascript: "function isValid(s) {\n  // Your code here\n\n}",
      python: "def is_valid(s):\n    # Your code here\n    pass",
    },
    testCases: [
      { input: '"()"', expectedOutput: "true", hidden: false },
      { input: '"()[]{}"', expectedOutput: "true", hidden: false },
      { input: '"(]"', expectedOutput: "false", hidden: true },
    ],
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked Lists",
    completed: false,
    solved: false,
    attempts: 0,
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100", "Both list1 and list2 are sorted in non-decreasing order."],
    starterCode: {
      javascript: "function mergeTwoLists(list1, list2) {\n  // Your code here\n\n}",
      python: "def merge_two_lists(list1, list2):\n    # Your code here\n    pass",
    },
    testCases: [
      { input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]", hidden: false },
      { input: "[], []", expectedOutput: "[]", hidden: false },
    ],
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    completed: false,
    solved: false,
    attempts: 0,
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: "function maxSubArray(nums) {\n  // Your code here\n\n}",
      python: "def max_sub_array(nums):\n    # Your code here\n    pass",
    },
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", hidden: false },
      { input: "[1]", expectedOutput: "1", hidden: false },
      { input: "[5,4,-1,7,8]", expectedOutput: "23", hidden: true },
    ],
  },
  {
    id: 5,
    title: "Binary Tree Level Order",
    difficulty: "Medium",
    category: "Trees",
    completed: false,
    solved: false,
    attempts: 0,
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 2000].", "-1000 <= Node.val <= 1000"],
    starterCode: {
      javascript: "function levelOrder(root) {\n  // Your code here\n\n}",
      python: "def level_order(root):\n    # Your code here\n    pass",
    },
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]", hidden: false },
      { input: "[1]", expectedOutput: "[[1]]", hidden: false },
    ],
  },
  {
    id: 6,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "Strings",
    completed: false,
    solved: false,
    attempts: 0,
    description: "Given a string s, return the longest palindromic substring in s. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward.",
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
    starterCode: {
      javascript: "function longestPalindrome(s) {\n  // Your code here\n\n}",
      python: "def longest_palindrome(s):\n    # Your code here\n    pass",
    },
    testCases: [
      { input: '"babad"', expectedOutput: '"bab"', hidden: false },
      { input: '"cbbd"', expectedOutput: '"bb"', hidden: false },
    ],
  },
]

const submissions: Submission[] = [
  { id: 1, problemId: 1, language: "javascript", status: "Accepted", time: "2 hours ago" },
  { id: 2, problemId: 2, language: "javascript", status: "Wrong Answer", time: "1 day ago" },
]

const categories = ["All", "Arrays", "Strings", "Linked Lists", "Trees", "Dynamic Programming", "Stacks", "Graphs"]

export default function CodingChallengesPage() {
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null)
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [output, setOutput] = useState<{ success: boolean; message: string } | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null)

  const filteredProblems = problems.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory
    const matchesDifficulty = !difficultyFilter || p.difficulty === difficultyFilter
    return matchesCategory && matchesDifficulty
  })

  const solvedCount = problems.filter((p) => p.solved).length
  const totalProblems = problems.length

  function handleStartProblem(problem: Problem) {
    setActiveProblem(problem)
    setCode(problem.starterCode[language] || "")
    setOutput(null)
  }

  function handleLanguageChange(lang: string) {
    setLanguage(lang)
    if (activeProblem) {
      setCode(activeProblem.starterCode[lang] || "")
    }
  }

  function handleRunCode() {
    setIsRunning(true)
    setOutput(null)
    
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false)
      // Simulate output based on whether code has content
      if (code.trim().length > 10) {
        setOutput({ success: true, message: "Test cases passed! 3/3 test cases successful." })
      } else {
        setOutput({ success: false, message: "No output. Please write your solution first." })
      }
    }, 1500)
  }

  function handleSubmit() {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      // Simulate submission result
      const passed = Math.random() > 0.3
      setOutput(passed 
        ? { success: true, message: "Accepted! All test cases passed. +50 XP" }
        : { success: false, message: "Wrong Answer. 2/3 test cases passed." }
      )
    }, 2000)
  }

  if (activeProblem) {
    return (
      <ProblemEditor
        problem={activeProblem}
        code={code}
        setCode={setCode}
        language={language}
        onLanguageChange={handleLanguageChange}
        output={output}
        isRunning={isRunning}
        onRun={handleRunCode}
        onSubmit={handleSubmit}
        onBack={() => setActiveProblem(null)}
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Code2 className="size-6 text-primary" />
            Coding Challenges
          </h1>
          <p className="text-muted-foreground mt-1">
            Practice coding problems to ace your technical interviews.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <CheckCircle2 className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{solvedCount}/{totalProblems}</p>
              <p className="text-sm text-muted-foreground">Problems Solved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-success/10">
              <Trophy className="size-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">350</p>
              <p className="text-sm text-muted-foreground">XP Earned</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-warning/10">
              <Flame className="size-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-purple-500/10">
              <Star className="size-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">Easy</p>
              <p className="text-sm text-muted-foreground">Current Level</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 sm:ml-auto">
          <Button
            variant={difficultyFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setDifficultyFilter(null)}
          >
            All
          </Button>
          <Button
            variant={difficultyFilter === "Easy" ? "default" : "outline"}
            size="sm"
            onClick={() => setDifficultyFilter("Easy")}
            className={difficultyFilter === "Easy" ? "" : "text-success border-success/30 hover:bg-success/10"}
          >
            Easy
          </Button>
          <Button
            variant={difficultyFilter === "Medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setDifficultyFilter("Medium")}
            className={difficultyFilter === "Medium" ? "" : "text-warning border-warning/30 hover:bg-warning/10"}
          >
            Medium
          </Button>
          <Button
            variant={difficultyFilter === "Hard" ? "default" : "outline"}
            size="sm"
            onClick={() => setDifficultyFilter("Hard")}
            className={difficultyFilter === "Hard" ? "" : "text-destructive border-destructive/30 hover:bg-destructive/10"}
          >
            Hard
          </Button>
        </div>
      </div>

      {/* Problems List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} onStart={() => handleStartProblem(problem)} />
        ))}
      </div>
    </div>
  )
}

function ProblemCard({ problem, onStart }: { problem: Problem; onStart: () => void }) {
  const difficultyColors = {
    Easy: "bg-success/10 text-success border-success/20",
    Medium: "bg-warning/10 text-warning border-warning/20",
    Hard: "bg-destructive/10 text-destructive border-destructive/20",
  }

  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="flex-1 pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={difficultyColors[problem.difficulty]}>
            {problem.difficulty}
          </Badge>
          {problem.solved && <CheckCircle2 className="size-5 text-success" />}
        </div>
        <CardTitle className="text-base mt-2">{problem.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 mt-1">
          <BookOpen className="size-3" />
          {problem.category}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Target className="size-3" />
            {problem.testCases.length} test cases
          </span>
          <Button size="sm" onClick={onStart}>
            Solve
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ProblemEditor({
  problem,
  code,
  setCode,
  language,
  onLanguageChange,
  output,
  isRunning,
  onRun,
  onSubmit,
  onBack,
}: {
  problem: Problem
  code: string
  setCode: (code: string) => void
  language: string
  onLanguageChange: (lang: string) => void
  output: { success: boolean; message: string } | null
  isRunning: boolean
  onRun: () => void
  onSubmit: () => void
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState<"description" | "solution">("description")

  const difficultyColors = {
    Easy: "bg-success/10 text-success border-success/20",
    Medium: "bg-warning/10 text-warning border-warning/20",
    Hard: "bg-destructive/10 text-destructive border-destructive/20",
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="size-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight text-foreground">{problem.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className={difficultyColors[problem.difficulty]}>
              {problem.difficulty}
            </Badge>
            <span className="text-xs text-muted-foreground">{problem.category}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left Panel - Description */}
        <Card>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "description" | "solution")}>
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="description" className="flex-1 rounded-none">Description</TabsTrigger>
              <TabsTrigger value="solution" className="flex-1 rounded-none">Submissions</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <CardContent className="pt-4 space-y-4 max-h-[500px] overflow-y-auto">
                <p className="text-sm leading-relaxed">{problem.description}</p>

                <div>
                  <h3 className="font-semibold text-sm mb-2">Examples</h3>
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="bg-muted/50 rounded-lg p-3 mb-2 text-sm">
                      <p className="font-medium mb-1">Example {i + 1}</p>
                      <div className="space-y-1 text-muted-foreground">
                        <p><span className="text-foreground font-medium">Input:</span> {ex.input}</p>
                        <p><span className="text-foreground font-medium">Output:</span> {ex.output}</p>
                        {ex.explanation && <p className="text-xs">{ex.explanation}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-2">Constraints</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {problem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <Lightbulb className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Hint</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider using a hash map to store seen values and their indices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="solution" className="mt-0">
              <CardContent className="pt-4">
                <div className="text-center py-8">
                  <Trophy className="size-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No submissions yet</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View All Submissions
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Right Panel - Code Editor */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="text-sm bg-muted border rounded-md px-3 py-1.5"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setCode(problem.starterCode[language] || "")}>
                  <RotateCcw className="size-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[350px] font-mono text-sm bg-muted/30 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Write your solution here..."
            />
          </CardContent>
          <div className="border-t p-4 space-y-3">
            {output && (
              <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${output.success ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                {output.success ? <CheckCircle2 className="size-5" /> : <XCircle className="size-5" />}
                {output.message}
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={onRun} disabled={isRunning}>
                <Play className="size-4" />
                {isRunning ? " Running..." : " Run Code"}
              </Button>
              <Button className="flex-1" onClick={onSubmit} disabled={isRunning}>
                <Zap className="size-4" />
                {isRunning ? " Submitting..." : " Submit"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

