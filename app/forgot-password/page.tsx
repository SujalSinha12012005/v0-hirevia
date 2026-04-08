"use client"

import { useState } from 'react'
import { resetPasswordForEmail } from '@/app/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, ArrowLeft, MailCheck } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null)

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    
    try {
      const res = await resetPasswordForEmail(email)
      if (res.error) {
        setMessage({ text: res.error, type: 'error' })
      } else {
        setMessage({ text: 'Check your email for the password reset link!', type: 'success' })
      }
    } catch (error: any) {
      setMessage({ text: error.message || 'Something went wrong.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <Link href="/login" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-fit">
          <ArrowLeft className="mr-2 size-4" />
          Back to login
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <Sparkles className="size-5 text-primary" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Hirevia</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Reset password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {message?.type === 'success' ? (
          <div className="rounded-xl bg-success/10 border border-success/20 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="size-12 rounded-full bg-success/20 flex items-center justify-center">
              <MailCheck className="size-6 text-success" />
            </div>
            <p className="text-sm font-medium text-success-foreground">
              {message.text}
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleReset}>
            {message?.type === 'error' && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/25 px-4 py-3 text-sm text-destructive font-medium text-center">
                {message.text}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="h-11 rounded-xl border-border/80 bg-card focus:border-primary transition-colors"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full h-11 rounded-xl font-semibold text-sm shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            >
              {loading ? 'Sending link...' : 'Send reset link'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
