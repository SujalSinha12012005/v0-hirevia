"use client"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { CreditCard, Check, Loader2, Building2, Lock, ArrowLeft } from "lucide-react"

// Use test key - replace with your own in production
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")

const packages = [
  { id: "starter", credits: 5, price: 99, name: "Starter Pack", color: "bg-blue-500" },
  { id: "standard", credits: 10, price: 199, name: "Standard Pack", color: "bg-purple-500", popular: true },
  { id: "premium", credits: 25, price: 399, name: "Premium Pack", color: "bg-amber-500" },
]

function CheckoutForm({ selectedPackage, onSuccess, onBack }: { selectedPackage: string; onSuccess: () => void; onBack: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState("")

  const pkg = packages.find(p => p.id === selectedPackage)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements) return
    
    setIsProcessing(true)
    setError(null)

    // In production, you would create a payment intent on the server
    // and confirm the payment here with stripe.confirmCardPayment
    
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
        <Lock className="size-3" />
        <span>Your payment is secured with 256-bit SSL encryption</span>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
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

export default function StripeDemoPage() {
  const { user, addCredits } = useAuth()
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [step, setStep] = useState<"select" | "checkout" | "success">("select")

  const balance = user?.credits || 0

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
    setStep("checkout")
  }

  const handlePaymentSuccess = () => {
    const pkg = packages.find(p => p.id === selectedPackage)
    if (pkg) {
      addCredits(pkg.credits)
    }
    setStep("success")
  }

  const handleBack = () => {
    setSelectedPackage(null)
    setStep("select")
  }

  const resetDemo = () => {
    setSelectedPackage(null)
    setStep("select")
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Stripe Checkout Demo
        </h1>
        <p className="text-muted-foreground mt-1">
          Experience the real Stripe payment flow. This uses actual Stripe Elements.
        </p>
      </div>

      {/* Current Balance */}
      <Card className="bg-muted/50">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
              <CreditCard className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-xl font-bold">{balance} credits</p>
            </div>
          </div>
          <Badge variant="outline">Demo</Badge>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === "select" && "Select Package"}
            {step === "checkout" && "Payment Details"}
            {step === "success" && "Payment Successful"}
          </CardTitle>
          <CardDescription>
            {step === "select" && "Choose a credit package to purchase"}
            {step === "checkout" && "Enter your card details to complete the purchase"}
            {step === "success" && "Your payment has been processed successfully"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Package Selection */}
          {step === "select" && (
            <div className="grid gap-4">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`relative flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:border-primary/50 ${
                    pkg.popular ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-2.5 right-4 bg-primary text-primary-foreground">
                      Popular
                    </Badge>
                  )}
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center size-12 rounded-full ${pkg.color}`}>
                      <CreditCard className="size-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">{pkg.name}</p>
                      <p className="text-sm text-muted-foreground">{pkg.credits} credits</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">${pkg.price / 100}</p>
                </button>
              ))}
            </div>
          )}

          {/* Checkout Form */}
          {step === "checkout" && selectedPackage && (
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                selectedPackage={selectedPackage} 
                onSuccess={handlePaymentSuccess}
                onBack={handleBack}
              />
            </Elements>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="flex items-center justify-center size-16 rounded-full bg-success/10 mb-4">
                <Check className="size-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground text-center mb-6">
                Your credits have been added to your account.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={resetDemo}>
                  Buy More Credits
                </Button>
                <Button onClick={() => window.location.href = '/dashboard/credits'}>
                  View Wallet
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Cards Info */}
      {step === "checkout" && (
        <Card className="bg-muted/30">
          <CardContent className="py-4">
            <p className="text-sm font-medium mb-2">Test Card Numbers:</p>
            <div className="space-y-1 text-xs text-muted-foreground font-mono">
              <p>• 4242 4242 4242 4242 - Success</p>
              <p>• 4000 0000 0000 0002 - Declined</p>
              <p>• 4000 0000 0000 3220 - 3D Secure</p>
              <p>• CVC: Any 3 digits, Expiry: Any future date</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

