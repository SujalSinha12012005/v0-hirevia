"use client"

import { useState } from "react"
import { toast } from "sonner"
import { QrCode, CreditCard, CheckCircle2, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { activateSubscription } from "@/app/actions/subscription"

interface SubscriptionPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  price: number
  tier: "pro" | "elite"
  durationMonths: number
}

export function SubscriptionPaymentModal({
  isOpen,
  onClose,
  planName,
  price,
  tier,
  durationMonths
}: SubscriptionPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("upi")

  const handleSimulatePayment = async () => {
    setIsProcessing(true)
    
    // Simulate network delay and bank verification (3 seconds)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    try {
      // Call server action to securely activate subscription in DB
      const result = await activateSubscription(tier, durationMonths)
      
      if (result.success) {
        toast.success(
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-success flex items-center gap-1">
              <CheckCircle2 className="size-4" /> Subscription Successful!
            </span>
            <span className="text-muted-foreground text-xs">
              You are now upgraded to the Hirevia {planName} tier!
            </span>
          </div>
        )
      } else {
        toast.error(result.message || "Something went wrong during subscription activation.")
      }
    } catch (err) {
      toast.error("Internal Server Error")
    } finally {
      setIsProcessing(false)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onClose()}>
      <DialogContent className="sm:max-w-md border-primary/20 shadow-xl shadow-primary/10">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
             <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
               <Sparkles className="size-4" />
             </div>
             <DialogTitle className="text-xl">Upgrade Subscription</DialogTitle>
          </div>
          <DialogDescription>
            You are subscribing to the <strong>{planName}</strong> for <strong>₹{price}</strong>.
          </DialogDescription>
        </DialogHeader>

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <Loader2 className="size-10 text-primary animate-spin" />
            <div className="text-center">
              <p className="font-semibold">Processing Secure Payment...</p>
              <p className="text-sm text-muted-foreground">Contacting your bank. Please do not close.</p>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upi" className="flex items-center gap-2">
                <QrCode className="size-4" />
                UPI
              </TabsTrigger>
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="size-4" />
                Card
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upi" className="flex flex-col items-center justify-center pt-6 pb-2 gap-4">
              <div className="flex items-center justify-center p-4 border-2 border-dashed border-border rounded-xl bg-muted/30">
                {/* Fake QR Code Visual */}
                <div className="grid grid-cols-3 gap-2">
                   {[...Array(9)].map((_, i) => (
                     <div key={i} className={`size-8 bg-foreground rounded-sm ${i % 2 === 0 ? 'opacity-80' : 'opacity-100'}`} />
                   ))}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Scan with any UPI App</p>
                <p className="text-xs text-muted-foreground mt-1">GPay • PhonePe • Paytm • BHIM</p>
              </div>
              <Button onClick={handleSimulatePayment} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                Simulate Payment for ₹{price}
              </Button>
            </TabsContent>
            
            <TabsContent value="card" className="flex flex-col gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="0000 0000 0000 0000" maxLength={19} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" type="password" placeholder="123" maxLength={4} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <Button onClick={handleSimulatePayment} className="w-full mt-2">
                Subscribe Securely
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
