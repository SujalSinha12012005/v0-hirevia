"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import {
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Mic,
  TrendingUp,
  CreditCard,
  Check,
  Loader2,
  Lock as LockIcon,
  ArrowLeft,
} from "lucide-react"

// Use test key - replace with your own in production
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")

const creditHistory = [
  { type: "earned" as const, description: "Resume Analysis", amount: 10, date: "Feb 21, 2026" },
  { type: "spent" as const, description: "Mock Interview Unlock", amount: -20, date: "Feb 20, 2026" },
  { type: "earned" as const, description: "Quiz Completed", amount: 5, date: "Feb 19, 2026" },
  { type: "earned" as const, description: "JD Match Analysis", amount: 5, date: "Feb 18, 2026" },
  { type: "spent" as const, description: "Resume Analysis", amount: -10, date: "Feb 17, 2026" },
  { type: "earned" as const, description: "Resume Analysis", amount: 10, date: "Feb 16, 2026" },
  { type: "spent" as const, description: "JD Match", amount: -5, date: "Feb 15, 2026" },
  { type: "earned" as const, description: "Roadmap Week Completed", amount: 15, date: "Feb 14, 2026" },
]

// Credit packages for purchase
const creditPackages = [
  { id: "starter", credits: 5, price: 99, name: "Starter Pack", popular: false },
  { id: "standard", credits: 10, price: 199, name: "Standard Pack", popular: true },
  { id: "premium", credits: 25, price: 399, name: "Premium Pack", popular: false },
]

function CheckoutForm({ selectedPackage, onSuccess, onCancel }: { selectedPackage: string; onSuccess: () => void; onCancel: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState("")

  const pkg = creditPackages.find(p => p.id === selectedPackage)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements) return
    
    setIsProcessing(true)
    setError(null)

    // In production, you would create a payment intent on the server
    // and confirm the payment with stripe.confirmCardPayment
    
    // For demo, simulate successful payment
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    onSuccess()
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
            <CreditCard className="size-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{pkg?.name}</p>
            <p className="text-sm text-muted-foreground">{pkg?.credits} credits</p>
          </div>
        </div>
        <p className="text-xl font-bold">${(pkg?.price || 0) / 100}</p>
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="text-sm font-medium">Cardholder Name</label>
        <Input
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      {/* Stripe Card Element */}
      <div>
        <label className="text-sm font-medium">Card Details</label>
        <div className="mt-1 p-4 rounded-xl border border-input bg-background">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <LockIcon className="size-3" />
        <span>Your payment is secured with 256-bit SSL encryption</span>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Test Cards Info */}
      <div className="p-3 rounded-lg bg-muted/50 text-xs">
        <p className="font-medium mb-1">Test Cards:</p>
        <p className="text-muted-foreground">4242 4242 4242 4242 (Success)</p>
        <p className="text-muted-foreground">4000 0000 0000 0002 (Declined)</p>
        <p className="text-muted-foreground">CVC: Any 3 digits, Exp: Any future date</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing} className="flex-1">
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
        <Button type="submit" disabled={!stripe || isProcessing} className="flex-1">
          {isProcessing ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="size-4 mr-2" />
              Pay ${(pkg?.price || 0) / 100}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default function CreditsWalletPage() {
  const { user, addCredits } = useAuth()
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Get real balance from auth context
  const balance = user?.credits || 0

  function handleBuyCredits(packageId: string) {
    setSelectedPackage(packageId)
    setShowCheckout(true)
  }

  function handlePaymentSuccess() {
    const pkg = creditPackages.find(p => p.id === selectedPackage)
    if (pkg) {
      addCredits(pkg.credits)
    }
    setShowCheckout(false)
    setShowSuccess(true)
    setSelectedPackage(null)
  }

  function handleCancelCheckout() {
    setShowCheckout(false)
    setSelectedPackage(null)
  }

  // Success message
  if (showSuccess) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Credits Wallet
          </h1>
          <p className="text-muted-foreground mt-1">
            Earn credits by completing activities or purchase more to unlock premium features.
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex items-center justify-center size-16 rounded-full bg-success/10 mb-4">
              <Check className="size-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground text-center mb-6">
              Your credits have been added to your account.
            </p>
            <Button onClick={() => setShowSuccess(false)}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Checkout view
  if (showCheckout && selectedPackage) {
    return (
      <div className="flex flex-col gap-8 max-w-lg mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Checkout
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete your purchase securely with Stripe.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              Payment Details
            </CardTitle>
            <CardDescription>
              Enter your card details to complete the purchase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                selectedPackage={selectedPackage} 
                onSuccess={handlePaymentSuccess}
                onCancel={handleCancelCheckout}
              />
            </Elements>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Default view - package selection
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Credits Wallet
        </h1>
        <p className="text-muted-foreground mt-1">
          Earn credits by completing activities or purchase more to unlock premium features.
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

      {/* Buy Credits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-5 text-primary" />
            Buy Credits
          </CardTitle>
          <CardDescription>
            Purchase credits to unlock premium features. Fast, secure payment with Stripe.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {creditPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col gap-3 rounded-xl border p-4 transition-all ${
                  pkg.popular
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 mb-2">
                    <Coins className="size-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{pkg.credits}</p>
                  <p className="text-sm text-muted-foreground">credits</p>
                </div>
                <div className="flex flex-col items-center gap-2 mt-2">
                  <p className="text-2xl font-bold">${pkg.price / 100}</p>
                  <p className="text-xs text-muted-foreground">
                    ${((pkg.price / 100) / pkg.credits).toFixed(2)} per credit
                  </p>
                </div>
                <Button
                  onClick={() => handleBuyCredits(pkg.id)}
                  variant={pkg.popular ? "default" : "outline"}
                  className="w-full mt-2"
                >
                  <CreditCard className="size-4 mr-2" />
                  Buy Now
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
            <Check className="size-3 text-success" />
            <span>Secure payment powered by Stripe</span>
            <Check className="size-3 text-success ml-2" />
            <span>Instant credit delivery</span>
          </div>
        </CardContent>
      </Card>

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
