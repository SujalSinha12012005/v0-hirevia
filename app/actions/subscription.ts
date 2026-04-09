"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function activateSubscription(
  tier: "pro" | "elite",
  durationMonths: number
): Promise<{ success: boolean; message?: string }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, message: "User not authenticated." }
    }

    // Calculate expiry date
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + durationMonths)

    // Update user metadata to securely hold subscription state
    const { error } = await supabase.auth.updateUser({
      data: {
        subscription_tier: tier,
        subscription_expiry: expiryDate.toISOString(),
      }
    })

    if (error) {
      console.error("Error updating subscription metadata:", error)
      return { success: false, message: "Failed to allocate subscription." }
    }

    // Attempt to log this in credit_history as a ledger tracking
    await supabase.from("credit_history").insert({
      user_id: user.id,
      type: "earned", // Using 'earned' to show a positive activity interaction
      amount: durationMonths === 1 ? 500 : 5000, // Massive credit boost just for ledger tracking
      description: `Purchased ${tier === "elite" ? "1 Year" : "1 Month"} Premium Plan`,
    })

    // Also inject some credits as a bonus for subscribing
    const { data: balanceData } = await supabase
      .from("user_balances")
      .select("balance, total_earned")
      .eq("user_id", user.id)
      .single()

    if (balanceData) {
      await supabase
        .from("user_balances")
        .update({
          balance: balanceData.balance + (durationMonths === 1 ? 500 : 5000),
          total_earned: balanceData.total_earned + (durationMonths === 1 ? 500 : 5000),
        })
        .eq("user_id", user.id)
    }

    // Revalidate screen
    revalidatePath("/dashboard")
    return { success: true }
  } catch (err: any) {
    console.error("Subscription purchase error:", err)
    return { success: false, message: "Transaction completed, but backend sync failed." }
  }
}
