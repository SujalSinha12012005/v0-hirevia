import { NextRequest, NextResponse } from "next/server"

// This is a mock implementation for demo purposes
// In production, you would use the actual Stripe SDK

// Credit packages mapping
const creditPackages: Record<string, { credits: number; price: number }> = {
  starter: { credits: 5, price: 99 }, // $0.99 in cents
  standard: { credits: 10, price: 199 }, // $1.99 in cents
  premium: { credits: 25, price: 399 }, // $3.99 in cents
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { packageId, credits } = body

    // Validate package
    const pkg = creditPackages[packageId]
    if (!pkg) {
      return NextResponse.json(
        { error: "Invalid package ID" },
        { status: 400 }
      )
    }

    // In production, you would create a real Stripe payment intent:
    // import Stripe from "stripe"
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: pkg.price,
    //   currency: "usd",
    //   metadata: { credits: pkg.credits },
    // })
    // return NextResponse.json({ clientSecret: paymentIntent.client_secret })

    // For demo, return a mock response
    // The frontend will handle this by adding credits directly in demo mode
    return NextResponse.json({
      success: true,
      message: "Demo mode: credits will be added directly",
      credits: pkg.credits,
      price: pkg.price / 100,
    })
  } catch (error) {
    console.error("Payment intent error:", error)
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    )
  }
}

