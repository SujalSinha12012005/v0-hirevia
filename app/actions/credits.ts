"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type CreditHistoryItem = {
  id: string
  type: "earned" | "spent"
  amount: number
  description: string
  created_at: string
}

export type UserCreditInfo = {
  balance: number
  total_earned: number
  total_spent: number
  history: CreditHistoryItem[]
}

export async function getUserCredits(): Promise<UserCreditInfo> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { balance: 0, total_earned: 0, total_spent: 0, history: [] }
  }

  // Fetch balances
  const { data: balanceData } = await supabase
    .from("user_balances")
    .select("balance, total_earned, total_spent")
    .eq("user_id", user.id)
    .single()

  // Fetch history
  const { data: historyData } = await supabase
    .from("credit_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  return {
    balance: balanceData?.balance || 0,
    total_earned: balanceData?.total_earned || 0,
    total_spent: balanceData?.total_spent || 0,
    history: (historyData as CreditHistoryItem[]) || [],
  }
}

export async function useFeatureWithCredits(
  amount: number,
  description: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, message: "User not authenticated." }
    }

    // Call the Postgres RPC function
    const { data, error } = await supabase.rpc("deduct_credits", {
      deduct_amount: amount,
      action_desc: description,
    })

    if (error) {
      console.error("RPC Error updating credits:", error)
      return { success: false, message: "Server error deducting credits." }
    }

    if (data === true) {
      // Revalidate the credits page to show the latest balance
      revalidatePath("/dashboard/credits")
      return { success: true }
    } else {
      return { success: false, message: "Insufficient credits in wallet." }
    }
  } catch (err: any) {
    console.error("Feature deduct error:", err)
    return { success: false, message: "Unknown error occurred." }
  }
}
