"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type ResumeData = {
  score: number
  creditsEarned: number
  bestFitRole: string
  lastAnalyzed: string
  resumeText?: string
  lastJDMatch?: number
}

type User = {
  email: string
  name: string
  role: "student" | "admin"
  resumeData?: ResumeData
  credits?: number
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  updateResumeData: (resumeData: ResumeData) => void
  addCredits: (amount: number) => void
  deductCredits: (amount: number) => boolean
  deductCreditsIfAvailable: (amount: number) => boolean
  hasEnoughCredits: (amount: number) => boolean
  updateJDMatch: (matchPercentage: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users
const DEMO_USERS = [
  { email: "student@hirevia.com", password: "student123", name: "Arjun Mehta", role: "student" as const },
  { email: "admin@hirevia.com", password: "admin123", name: "Admin User", role: "admin" as const },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem("hirevia_user")
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored)
        // Ensure credits is at least 0
        if (parsedUser && typeof parsedUser.credits === 'undefined') {
          parsedUser.credits = 100 // Default credits for demo
        }
        setUser(parsedUser)
      } catch {
        localStorage.removeItem("hirevia_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const foundUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (foundUser) {
      const userData = { 
        email: foundUser.email, 
        name: foundUser.name, 
        role: foundUser.role,
        credits: 100 // Default credits for demo
      }
      setUser(userData)
      localStorage.setItem("hirevia_user", JSON.stringify(userData))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hirevia_user")
  }

  const updateResumeData = (resumeData: ResumeData) => {
    setUser(prevUser => {
      if (prevUser) {
        const updatedUser = { ...prevUser, resumeData }
        localStorage.setItem("hirevia_user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return prevUser
    })
  }

  const addCredits = (amount: number) => {
    setUser(prevUser => {
      if (prevUser) {
        const currentCredits = prevUser.credits || 0
        const updatedUser = { ...prevUser, credits: currentCredits + amount }
        localStorage.setItem("hirevia_user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return prevUser
    })
  }

  const updateJDMatch = (matchPercentage: number) => {
    setUser(prevUser => {
      if (prevUser && prevUser.resumeData) {
        const updatedResumeData = {
          ...prevUser.resumeData,
          lastJDMatch: matchPercentage
        }
        const updatedUser = { ...prevUser, resumeData: updatedResumeData }
        localStorage.setItem("hirevia_user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return prevUser
    })
  }

  const hasEnoughCredits = (amount: number): boolean => {
    const currentCredits = user?.credits || 0
    return currentCredits >= amount
  }

  const deductCredits = (amount: number): boolean => {
    const currentCredits = user?.credits || 0
    if (currentCredits >= amount) {
      setUser(prevUser => {
        if (prevUser) {
          const updatedUser = { ...prevUser, credits: currentCredits - amount }
          localStorage.setItem("hirevia_user", JSON.stringify(updatedUser))
          return updatedUser
        }
        return prevUser
      })
      return true
    }
    return false
  }

  const deductCreditsIfAvailable = (amount: number): boolean => {
    return deductCredits(amount)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, updateResumeData, addCredits, deductCredits, deductCreditsIfAvailable, hasEnoughCredits, updateJDMatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

