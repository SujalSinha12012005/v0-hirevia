import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Briefcase,
  BarChart3,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back, Arjun
        </h1>
        <p className="text-muted-foreground mt-1">
          {"Here's an overview of your placement readiness."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Resume Score"
          value="78/100"
          subtitle="Good - Keep improving"
          icon={FileText}
        />
        <StatCard
          title="Best Fit Role"
          value="Frontend Dev"
          subtitle="Based on your skills"
          icon={Briefcase}
        />
        <StatCard
          title="Readiness Level"
          value="Intermediate"
          subtitle="72% complete"
          icon={BarChart3}
        />
        <StatCard
          title="Credit Balance"
          value="145"
          subtitle="Credits available"
          icon={Wallet}
        />
      </div>

      {/* Readiness Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-primary" />
            Placement Readiness Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-semibold text-foreground">72%</span>
            </div>
            <Progress value={72} className="h-3" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ReadinessItem label="Resume Quality" value={78} />
            <ReadinessItem label="Skill Coverage" value={65} />
            <ReadinessItem label="Quiz Score" value={82} />
            <ReadinessItem label="JD Match" value={63} />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-4">
              <ActivityItem
                icon={CheckCircle2}
                title="Resume analyzed"
                description="Score: 78/100 - 3 improvement suggestions"
                time="2 hours ago"
                iconColor="text-success"
              />
              <ActivityItem
                icon={Briefcase}
                title="JD matched"
                description="Frontend Developer at TechCorp - 73% match"
                time="5 hours ago"
                iconColor="text-primary"
              />
              <ActivityItem
                icon={BarChart3}
                title="Quiz completed"
                description="JavaScript Fundamentals - Score: 82%"
                time="1 day ago"
                iconColor="text-chart-2"
              />
              <ActivityItem
                icon={Clock}
                title="Roadmap updated"
                description="Week 2 milestones completed"
                time="2 days ago"
                iconColor="text-warning"
              />
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <SkillBar label="React" value={85} />
              <SkillBar label="JavaScript" value={78} />
              <SkillBar label="TypeScript" value={60} />
              <SkillBar label="Node.js" value={55} />
              <SkillBar label="CSS/Tailwind" value={90} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">JavaScript</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">HTML/CSS</Badge>
              <Badge variant="secondary">Git</Badge>
              <Badge>+3 more</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ReadinessItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}

function ActivityItem({
  icon: Icon,
  title,
  description,
  time,
  iconColor,
}: {
  icon: React.ElementType
  title: string
  description: string
  time: string
  iconColor?: string
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon className={`size-5 mt-0.5 shrink-0 ${iconColor || "text-muted-foreground"}`} />
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap shrink-0">
        {time}
      </span>
    </li>
  )
}

function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}
