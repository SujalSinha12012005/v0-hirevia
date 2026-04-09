import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getUserCredits } from "@/app/actions/credits"
import { format } from "date-fns"
import {
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Mic,
  TrendingUp,
} from "lucide-react"

export default async function CreditsWalletPage() {
  const creditInfo = await getUserCredits()
  const { balance, total_earned, total_spent, history } = creditInfo

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
        <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
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
            <p className="text-3xl font-bold text-foreground">{total_earned}</p>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2 pt-6">
            <div className="flex items-center gap-2">
              <Coins className="size-5 text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">
                Total Spent
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground">{total_spent}</p>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>


      {/* Unlock Feature */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-5 text-primary" />
            Premium Feature Pricing
          </CardTitle>
          <CardDescription>
            Features run on credits. Ensure your balance is sufficient to unlock them.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Mic}
              title="Resume Analysis"
              cost={10}
              description="AI-powered analysis of your resume."
              available={balance >= 10}
            />
            <FeatureCard
              icon={TrendingUp}
              title="JD Match"
              cost={5}
              description="Intelligent match against job descriptions."
              available={balance >= 5}
            />
            <FeatureCard
              icon={Lock}
              title="Cold Email Gen"
              cost={5}
              description="Hyper-personalized recruiter outreach."
              available={balance >= 5}
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
            {history.length > 0 ? (
              history.map((item) => (
                <div
                  key={item.id}
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
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(item.created_at), "MMM dd, yyyy h:mm a")}
                      </p>
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
              ))
            ) : (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No credit history found. Start using features to see activity!
              </div>
            )}
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
          <>Sufficient Balance</>
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
