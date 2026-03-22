import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CircularProgress } from "@/components/circular-progress"
import {
  BarChart3,
  FileText,
  Brain,
  Briefcase,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

const scores = {
  resumeQuality: 78,
  skillCoverage: 65,
  quizScore: 82,
  jdMatch: 63,
}

const overallScore = Math.round(
  (scores.resumeQuality + scores.skillCoverage + scores.quizScore + scores.jdMatch) / 4
)

function getReadinessLevel(score: number) {
  if (score >= 80) return { label: "Placement Ready", color: "bg-success/10 text-success border-success/20" }
  if (score >= 50) return { label: "Intermediate", color: "bg-warning/10 text-warning border-warning/20" }
  return { label: "Beginner", color: "bg-destructive/10 text-destructive border-destructive/20" }
}

const readiness = getReadinessLevel(overallScore)

const tips = [
  { icon: CheckCircle2, text: "Strong quiz performance - keep practicing!", positive: true },
  { icon: CheckCircle2, text: "Good resume structure and formatting", positive: true },
  { icon: AlertCircle, text: "Improve skill coverage by learning TypeScript and testing", positive: false },
  { icon: AlertCircle, text: "Better align your resume with target JD keywords", positive: false },
]

export default function PlacementReadinessPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Placement Readiness
        </h1>
        <p className="text-muted-foreground mt-1">
          Your composite readiness score based on all activities.
        </p>
      </div>

      {/* Main Score */}
      <Card>
        <CardContent className="flex flex-col items-center gap-6 py-10">
          <CircularProgress
            value={overallScore}
            size={180}
            strokeWidth={14}
            label="Overall"
            sublabel="readiness"
          />
          <div className="text-center flex flex-col gap-2">
            <Badge className={readiness.color} variant="secondary">
              {readiness.label}
            </Badge>
            <p className="text-sm text-muted-foreground max-w-md">
              Your overall readiness score is calculated from resume quality,
              skill coverage, quiz scores, and JD match performance.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ScoreCard
          title="Resume Quality"
          value={scores.resumeQuality}
          icon={FileText}
        />
        <ScoreCard
          title="Skill Coverage"
          value={scores.skillCoverage}
          icon={Target}
        />
        <ScoreCard
          title="Quiz Score"
          value={scores.quizScore}
          icon={Brain}
        />
        <ScoreCard
          title="JD Match"
          value={scores.jdMatch}
          icon={Briefcase}
        />
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5 text-primary" />
            Score Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <ScoreBar label="Resume Quality" value={scores.resumeQuality} />
          <ScoreBar label="Skill Coverage" value={scores.skillCoverage} />
          <ScoreBar label="Quiz Score" value={scores.quizScore} />
          <ScoreBar label="JD Match" value={scores.jdMatch} />
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-primary" />
            Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <tip.icon
                  className={`size-5 mt-0.5 shrink-0 ${
                    tip.positive ? "text-success" : "text-warning"
                  }`}
                />
                <span className="text-sm text-foreground">{tip.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Level Progression */}
      <Card>
        <CardHeader>
          <CardTitle>Level Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <LevelStep label="Beginner" active={overallScore < 50} passed={overallScore >= 50} />
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: overallScore >= 50 ? "100%" : `${(overallScore / 50) * 100}%` }}
              />
            </div>
            <LevelStep label="Intermediate" active={overallScore >= 50 && overallScore < 80} passed={overallScore >= 80} />
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: overallScore >= 80 ? "100%" : overallScore >= 50 ? `${((overallScore - 50) / 30) * 100}%` : "0%" }}
              />
            </div>
            <LevelStep label="Placement Ready" active={overallScore >= 80} passed={false} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ScoreCard({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: number
  icon: React.ElementType
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 pt-6">
        <div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <CircularProgress value={value} size={90} strokeWidth={8} />
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-2.5" />
    </div>
  )
}

function LevelStep({
  label,
  active,
  passed,
}: {
  label: string
  active: boolean
  passed: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      <div
        className={`flex items-center justify-center size-8 rounded-full text-xs font-bold ${
          active
            ? "bg-primary text-primary-foreground"
            : passed
            ? "bg-success text-success-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {passed ? <CheckCircle2 className="size-4" /> : active ? <BarChart3 className="size-4" /> : <Target className="size-4" />}
      </div>
      <span className={`text-xs font-medium whitespace-nowrap ${active ? "text-primary" : passed ? "text-success" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  )
}
