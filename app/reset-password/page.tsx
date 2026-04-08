"use client"

import { useState } from 'react'
import { updatePassword } from '@/app/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Sparkles, CheckCircle2 } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null)
  const router = useRouter()

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setMessage({ text: 'Passwords do not match.', type: 'error' })
      return
    }

    setLoading(true)
    setMessage(null)
    
    try {
      const res = await updatePassword(password)
      if (res.error) {
        setMessage({ text: res.error, type: 'error' })
      } else {
        setMessage({ text: 'Password successfully updated!', type: 'success' })
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
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
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <Sparkles className="size-5 text-primary" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Hirevia</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create new password</h1>
          <p className="text-muted-foreground text-sm">
            Please enter your new password below.
          </p>
        </div>

        {message?.type === 'success' ? (
          <div className="rounded-xl bg-success/10 border border-success/20 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="size-12 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="size-6 text-success" />
            </div>
            <p className="text-sm font-medium text-success-foreground">
              {message.text}
            </p>
            <p className="text-xs text-success-foreground/70">Redirecting to dashboard...</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleUpdate}>
            {message?.type === 'error' && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/25 px-4 py-3 text-sm text-destructive font-medium text-center">
                {message.text}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="h-11 rounded-xl border-border/80 bg-card focus:border-primary transition-colors"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="h-11 rounded-xl border-border/80 bg-card focus:border-primary transition-colors"
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading || !password || !confirm}
              className="w-full h-11 rounded-xl font-semibold text-sm shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
