import { signInWithGoogle } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, CheckCircle2, Zap, Shield, Globe } from 'lucide-react'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    return redirect('/dashboard')
  }

  const { message } = await searchParams
  const isSuccess = message?.toLowerCase().includes('check email')

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branded */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, oklch(0.2 0.1 270) 0%, oklch(0.32 0.2 280) 50%, oklch(0.25 0.12 260) 100%)',
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'oklch(0.75 0.2 265)' }} />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10"
            style={{ background: 'oklch(0.65 0.2 290)' }} />
        </div>

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl"
            style={{ background: 'oklch(0.65 0.2 265 / 0.3)', border: '1px solid oklch(0.65 0.2 265 / 0.5)' }}>
            <Sparkles className="size-5" style={{ color: 'oklch(0.85 0.15 265)' }} />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Hirevia</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Start hiring smarter
              <br />
              <span style={{ color: 'oklch(0.8 0.18 275)' }}>in minutes.</span>
            </h2>
            <p className="text-lg" style={{ color: 'oklch(0.8 0.05 265)' }}>
              Join thousands of companies using Hirevia&apos;s AI to find the right people, faster.
            </p>
          </div>

          {/* Features list */}
          <ul className="space-y-4">
            {[
              { icon: Zap, text: 'AI-powered candidate matching & ranking' },
              { icon: Shield, text: 'Secure, GDPR-compliant hiring pipeline' },
              { icon: Globe, text: 'Post to 50+ job boards in one click' },
              { icon: CheckCircle2, text: 'Free to get started — no credit card required' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: 'oklch(0.65 0.2 265 / 0.25)', border: '1px solid oklch(0.65 0.2 265 / 0.4)' }}>
                  <Icon className="size-3.5" style={{ color: 'oklch(0.8 0.18 265)' }} />
                </div>
                <span className="text-sm leading-relaxed" style={{ color: 'oklch(0.85 0.03 265)' }}>{text}</span>
              </li>
            ))}
          </ul>

          {/* Trust badges */}
          <div className="rounded-2xl p-5 backdrop-blur-sm"
            style={{ background: 'oklch(1 0 0 / 0.07)', border: '1px solid oklch(1 0 0 / 0.12)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'oklch(0.65 0.1 265)' }}>
              Trusted by teams at
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              {['Stripe', 'Notion', 'Linear', 'Vercel'].map((co) => (
                <span key={co} className="text-sm font-semibold" style={{ color: 'oklch(0.75 0.06 265)' }}>{co}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="relative z-10">
          <p className="text-xs" style={{ color: 'oklch(0.6 0.04 265)' }}>
            © 2025 Hirevia. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <Sparkles className="size-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">Hirevia</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-muted-foreground text-sm">Free forever. No credit card required.</p>
          </div>

          {/* Success / Error message */}
          {message && (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium text-center ${
              isSuccess
                ? 'bg-green-500/10 border border-green-500/25 text-green-600 dark:text-green-400'
                : 'bg-destructive/10 border border-destructive/25 text-destructive'
            }`}>
              {isSuccess ? '📧 ' : ''}{message}
            </div>
          )}

          {/* Google OAuth */}
          <form action={signInWithGoogle}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:shadow-md active:scale-[0.98]"
            >
              <svg className="size-4 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                or sign up with email
              </span>
            </div>
          </div>

          {/* Signup Form */}
          <form
            className="space-y-4"
            action={async (formData) => {
              'use server'
              const name = formData.get('full_name') as string
              const email = formData.get('email') as string
              const password = formData.get('password') as string
              const sbase = await createClient()
              const { error } = await sbase.auth.signUp({
                email,
                password,
                options: {
                  emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback`,
                  data: {
                    full_name: name
                  }
                },
              })
              if (error) {
                return redirect(`/signup?message=${encodeURIComponent(error.message)}`)
              }
              return redirect('/signup?message=Check email to continue sign in process')
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="full_name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="John Doe"
                required
                className="h-11 rounded-xl border-border/80 bg-card focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="h-11 rounded-xl border-border/80 bg-card focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                required
                minLength={6}
                className="h-11 rounded-xl border-border/80 bg-card focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
            </div>
            <Button
              type="submit"
              className="w-full h-11 rounded-xl font-semibold text-sm shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            >
              Create Account
            </Button>
          </form>

          <div className="space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline underline-offset-4">
                Sign in
              </Link>
            </p>
            <p className="text-xs text-muted-foreground px-4">
              By creating an account, you agree to our{' '}
              <a href="#" className="underline underline-offset-4 hover:text-primary transition-colors">Terms</a>
              {' '}and{' '}
              <a href="#" className="underline underline-offset-4 hover:text-primary transition-colors">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
