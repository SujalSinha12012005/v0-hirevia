"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { Sparkles, Mail, Lock, Eye, EyeOff, Loader2, GraduationCap, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const success = await login(email, password)
    
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
      setIsSubmitting(false)
    }
  }

  const handleDemoLogin = async (type: "student" | "admin") => {
    setIsSubmitting(true)
    setError("")
    
    const userEmail = type === "student" ? "student@hirevia.com" : "admin@hirevia.com"
    const userPassword = type === "student" ? "student123" : "admin123"
    
    const success = await login(userEmail, userPassword)
    
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Login failed")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="size-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Hirevia</h1>
          <p className="text-muted-foreground mt-2">AI-Powered Placement Platform</p>
        </div>

        <Card className="shadow-xl border-border/50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your placement journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="size-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleDemoLogin("student")}
                disabled={isSubmitting}
                className="w-full"
              >
                <GraduationCap className="size-4 mr-2" />
                Student Demo
              </Button>
             
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 text-xs space-y-2">
              <p className="font-medium text-foreground">Demo Credentials:</p>
              <p className="text-muted-foreground">
                <span className="font-medium">Student:</span> student@hirevia.com / student123
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Admin:</span> admin@hirevia.com / admin123
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Do not have an account?{" "}
          <button className="text-primary hover:underline font-medium">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

