"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  ShieldCheck,
  Users,
  TrendingUp,
  GraduationCap,
  Search,
} from "lucide-react"

const students = [
  { id: 1, name: "Arjun Mehta", resumeScore: 78, bestRole: "MERN Stack Developer", readiness: "Intermediate" },
  { id: 2, name: "Priya Sharma", resumeScore: 92, bestRole: "Full Stack Developer", readiness: "Placement Ready" },
  { id: 3, name: "Ravi Kumar", resumeScore: 45, bestRole: "Backend Developer", readiness: "Beginner" },
  { id: 4, name: "Ananya Patel", resumeScore: 88, bestRole: "UI/UX Designer", readiness: "Placement Ready" },
  { id: 5, name: "Karthik Iyer", resumeScore: 62, bestRole: "Data Analyst", readiness: "Intermediate" },
  { id: 6, name: "Sneha Reddy", resumeScore: 71, bestRole: "MERN Stack Developer", readiness: "Intermediate" },
  { id: 7, name: "Vikram Singh", resumeScore: 35, bestRole: "QA Engineer", readiness: "Beginner" },
  { id: 8, name: "Meera Nair", resumeScore: 85, bestRole: "DevOps Engineer", readiness: "Placement Ready" },
  { id: 9, name: "Rahul Gupta", resumeScore: 58, bestRole: "Mobile Developer", readiness: "Intermediate" },
  { id: 10, name: "Divya Joshi", resumeScore: 94, bestRole: "ML Engineer", readiness: "Placement Ready" },
]

function getReadinessBadge(level: string) {
  switch (level) {
    case "Placement Ready":
      return { color: "bg-success/10 text-success border-success/20" }
    case "Intermediate":
      return { color: "bg-warning/10 text-warning border-warning/20" }
    case "Beginner":
      return { color: "bg-destructive/10 text-destructive border-destructive/20" }
    default:
      return { color: "" }
  }
}

export default function AdminPanelPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = students.filter((s) => {
    const matchesFilter = filter === "all" || s.readiness === filter
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalStudents = students.length
  const readyCount = students.filter((s) => s.readiness === "Placement Ready").length
  const avgScore = Math.round(
    students.reduce((sum, s) => sum + s.resumeScore, 0) / totalStudents
  )

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Admin Panel
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor and manage student placement readiness.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <Users className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-success/10">
              <GraduationCap className="size-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{readyCount}</p>
              <p className="text-sm text-muted-foreground">Placement Ready</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex items-center justify-center size-12 rounded-full bg-warning/10">
              <TrendingUp className="size-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{avgScore}%</p>
              <p className="text-sm text-muted-foreground">Avg Resume Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              Student Directory
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Placement Ready">Placement Ready</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">#</TableHead>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Resume Score</TableHead>
                  <TableHead className="font-semibold">Best Fit Role</TableHead>
                  <TableHead className="font-semibold">Readiness Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((student, i) => {
                    const badge = getReadinessBadge(student.readiness)
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium text-muted-foreground">
                          {i + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {student.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className="font-medium text-foreground">
                              {student.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${student.resumeScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {student.resumeScore}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {student.bestRole}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={badge.color}>
                            {student.readiness}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No students found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
