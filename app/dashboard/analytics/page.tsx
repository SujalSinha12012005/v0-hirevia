"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircularProgress } from "@/components/circular-progress"
import { useAuth } from "@/context/auth-context"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Award,
  Flame,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  LineChart,
  PieChart,
  CheckCircle2,
  Clock,
  Brain,
  FileText,
  Briefcase,
  Zap,
  Star,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Building2,
  GraduationCap,
  Search,
  X,
  Code2
} from "lucide-react"

// Mock data for analytics
const performanceData = [
  { month: "Jan", score: 65, target: 70 },
  { month: "Feb", score: 68, target: 70 },
  { month: "Mar", score: 72, target: 75 },
  { month: "Apr", score: 70, target: 75 },
  { month: "May", score: 75, target: 80 },
  { month: "Jun", score: 78, target: 80 },
  { month: "Jul", score: 82, target: 85 },
  { month: "Aug", score: 85, target: 85 },
]

const skillData = [
  { name: "JavaScript", score: 85, color: "bg-yellow-500" },
  { name: "React", score: 78, color: "bg-blue-500" },
  { name: "Node.js", score: 72, color: "bg-green-500" },
  { name: "TypeScript", score: 65, color: "bg-blue-600" },
  { name: "Python", score: 58, color: "bg-yellow-600" },
  { name: "SQL", score: 70, color: "bg-purple-500" },
]

const activityData = [
  { day: "Mon", value: 4 },
  { day: "Tue", value: 3 },
  { day: "Wed", value: 5 },
  { day: "Thu", value: 2 },
  { day: "Fri", value: 4 },
  { day: "Sat", value: 1 },
  { day: "Sun", value: 0 },
]

const monthlyProgress = [
  { month: "Week 1", resume: 65, jdMatch: 55, quiz: 70, coding: 45 },
  { month: "Week 2", resume: 68, jdMatch: 60, quiz: 72, coding: 50 },
  { month: "Week 3", resume: 72, jdMatch: 65, quiz: 75, coding: 55 },
  { month: "Week 4", resume: 75, jdMatch: 70, quiz: 78, coding: 60 },
]

const categoryBreakdown = [
  { name: "Resume Analysis", value: 35, color: "bg-primary" },
  { name: "JD Matching", value: 25, color: "bg-success" },
  { name: "Quizzes", value: 20, color: "bg-warning" },
  { name: "Coding Practice", value: 15, color: "bg-purple-500" },
  { name: "Other", value: 5, color: "bg-muted-foreground" },
]

const recentActivity = [
  { type: "resume", title: "Resume analyzed", score: 78, date: "2 hours ago", icon: FileText },
  { type: "quiz", title: "Quiz completed", score: "85%", date: "5 hours ago", icon: Brain },
  { type: "jd", title: "JD Match scored", score: "72%", date: "1 day ago", icon: Briefcase },
  { type: "coding", title: "Problem solved", score: "Accepted", date: "1 day ago", icon: Code2 },
]

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState("30d")

  // Get user data from auth context
  const resumeScore = user?.resumeData?.score ?? 78
  const jdMatchScore = user?.resumeData?.lastJDMatch ?? 63
  const quizScore = 82
  const codingScore = 65

  const overallScore = Math.round((resumeScore + jdMatchScore + quizScore + codingScore) / 4)

  // Simulate refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 border border-primary/20">
              <BarChart3 className="size-5 text-primary" />
            </div>
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your placement preparation progress and performance metrics.
          </p>
        </div>
        
        <div className="flex items-center gap-3 animate-fade-in-up delay-200">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`size-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="size-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Overall Score"
          value={overallScore}
          target={85}
          trend={+8}
          delay={0}
          icon={Target}
          color="primary"
        />
        <MetricCard
          title="Resume Score"
          value={resumeScore}
          target={90}
          trend={+5}
          delay={100}
          icon={FileText}
          color="success"
        />
        <MetricCard
          title="JD Match Rate"
          value={jdMatchScore}
          target={80}
          trend={+12}
          delay={200}
          icon={Briefcase}
          color="warning"
        />
        <MetricCard
          title="Quiz Average"
          value={quizScore}
          target={85}
          trend={+3}
          delay={300}
          icon={Brain}
          color="purple"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Trend */}
        <Card className="animate-fade-in-up delay-400 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-primary" />
              Performance Trend
            </CardTitle>
            <CardDescription>Your progress over time compared to target goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-end justify-between gap-2">
              {performanceData.map((item, index) => (
                <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
                  <div className="relative w-full h-[200px] flex items-end gap-1">
                    {/* Target bar */}
                    <div 
                      className="flex-1 bg-muted rounded-t-sm transition-all duration-500"
                      style={{ height: `${(item.target / 100) * 100}%` }}
                    />
                    {/* Actual score bar */}
                    <div 
                      className={`flex-1 rounded-t-sm transition-all duration-700 ${
                        item.score >= item.target ? 'bg-success' : 'bg-primary'
                      }`}
                      style={{ 
                        height: `${(item.score / 100) * 100}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span>Your Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-muted" />
                <span>Target</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skill Radar */}
        <Card className="animate-fade-in-up delay-500 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="size-5 text-primary" />
              Skill Proficiency
            </CardTitle>
            <CardDescription>Your competency across different technical skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillData.map((skill, index) => (
                <div key={skill.name} className="space-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.score}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${skill.color} rounded-full transition-all duration-1000`}
                      style={{ 
                        width: `${skill.score}%`,
                        animationDelay: `${index * 150}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Activity */}
        <Card className="animate-fade-in-up delay-600 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5 text-primary" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Your activity pattern this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-[150px] gap-2">
              {activityData.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="w-full bg-primary/80 rounded-t-md transition-all duration-500 hover:bg-primary"
                    style={{ 
                      height: `${day.value * 25}%`,
                      minHeight: day.value > 0 ? '20%' : '4px',
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total activities</span>
              <span className="font-semibold">{activityData.reduce((a, b) => a + b.value, 0)} this week</span>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="animate-fade-in-up delay-700 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="size-5 text-primary" />
              Time Distribution
            </CardTitle>
            <CardDescription>How you spend your preparation time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryBreakdown.map((cat, index) => (
                <div key={cat.name} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="flex-1 text-sm">{cat.name}</span>
                  <span className="text-sm font-medium">{cat.value}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total hours</span>
                <span className="font-semibold">48 hrs</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="animate-fade-in-up delay-800 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10">
                    <activity.icon className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.score}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Over Time */}
      <Card className="animate-fade-in-up delay-900 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="size-5 text-primary" />
            Monthly Progress
          </CardTitle>
          <CardDescription>Breakdown of your improvement across all modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Legend */}
              <div className="flex flex-wrap items-center justify-end gap-4 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-primary" />
                  <span>Resume</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-success" />
                  <span>JD Match</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-warning" />
                  <span>Quiz</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-purple-500" />
                  <span>Coding</span>
                </div>
              </div>
              
              {/* Bars */}
              <div className="space-y-4">
                {monthlyProgress.map((week, index) => (
                  <div key={week.month} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="text-sm font-medium mb-2">{week.month}</div>
                    <div className="flex gap-1 h-8">
                      <div 
                        className="bg-primary rounded-r-sm transition-all duration-700"
                        style={{ width: `${week.resume}%` }}
                      />
                      <div 
                        className="bg-success rounded-r-sm transition-all duration-700"
                        style={{ width: `${week.jdMatch}%` }}
                      />
                      <div 
                        className="bg-warning rounded-r-sm transition-all duration-700"
                        style={{ width: `${week.quiz}%` }}
                      />
                      <div 
                        className="bg-purple-500 rounded-r-sm transition-all duration-700"
                        style={{ width: `${week.coding}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card className="animate-fade-in-up delay-1000 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-5 text-primary" />
            Achievements & Milestones
          </CardTitle>
          <CardDescription>Your accomplishments and badges earned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AchievementCard
              icon={FileText}
              title="Resume Master"
              description="Achieved 80%+ resume score"
              earned={true}
              delay={0}
            />
            <AchievementCard
              icon={Brain}
              title="Quiz Champion"
              description="Completed 50+ quizzes"
              earned={true}
              delay={100}
            />
            <AchievementCard
              icon={Code2}
              title="Code Warrior"
              description="Solved 100+ problems"
              earned={false}
              progress={65}
              delay={200}
            />
            <AchievementCard
              icon={Briefcase}
              title="JD Matcher"
              description="80%+ match rate"
              earned={false}
              progress={78}
              delay={300}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({ 
  title, 
  value, 
  target, 
  trend, 
  delay,
  icon: Icon, 
  color 
}: { 
  title: string
  value: number
  target: number
  trend: number
  delay: number
  icon: React.ElementType
  color: string
}) {
  const colorClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  }
  
  const iconColors: Record<string, string> = {
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    purple: "text-purple-500",
  }

  return (
    <Card className={`animate-fade-in-up hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${delay ? '' : ''}`} style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className={`flex items-center justify-center size-11 rounded-xl border ${colorClasses[color]}`}>
            <Icon className={`size-5 ${iconColors[color]}`} />
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium ${trend > 0 ? 'text-success' : 'text-destructive'}`}>
            {trend > 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(trend)}%
          </div>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Target: {target}</span>
          <span className={value >= target ? 'text-success' : ''}>{Math.round((value / target) * 100)}%</span>
        </div>
        <Progress value={(value / target) * 100} className="mt-2 h-1.5" />
      </CardContent>
    </Card>
  )
}

function AchievementCard({ 
  icon: Icon, 
  title, 
  description, 
  earned, 
  progress,
  delay 
}: { 
  icon: React.ElementType
  title: string
  description: string
  earned?: boolean
  progress?: number
  delay: number
}) {
  return (
    <div 
      className={`p-4 rounded-xl border transition-all duration-300 animate-fade-in-up ${
        earned 
          ? 'bg-success/10 border-success/20 hover:shadow-lg hover:-translate-y-1' 
          : 'bg-muted/30 border-border hover:border-primary/30'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex items-center justify-center size-10 rounded-lg ${
          earned ? 'bg-success/20' : 'bg-muted'
        }`}>
          <Icon className={`size-5 ${earned ? 'text-success' : 'text-muted-foreground'}`} />
        </div>
        {earned && <CheckCircle2 className="size-5 text-success ml-auto" />}
      </div>
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
      {!earned && progress !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}
    </div>
  )
}
