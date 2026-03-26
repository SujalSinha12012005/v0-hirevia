import { signInWithGoogle } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Briefcase, Users, TrendingUp, Star } from 'lucide-react'

export default async function LoginPage({
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

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branded */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, oklch(0.25 0.1 265) 0%, oklch(0.35 0.18 275) 50%, oklch(0.28 0.15 255) 100%)',
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'oklch(0.7 0.2 265)' }} />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'oklch(0.6 0.2 290)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-5"
            style={{ background: 'oklch(0.85 0.1 265)' }} />
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
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Your next great
              <br />
              <span style={{ color: 'oklch(0.8 0.18 265)' }}>hire is waiting.</span>
            </h2>
            <p className="text-lg" style={{ color: 'oklch(0.8 0.05 265)' }}>
              AI-powered hiring that connects top talent with the right opportunities — faster than ever before.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Briefcase, label: 'Active Jobs', value: '24,000+' },
              { icon: Users, label: 'Candidates', value: '180,000+' },
              { icon: TrendingUp, label: 'Placements/mo', value: '3,200+' },
              { icon: Star, label: 'Avg. Rating', value: '4.9 / 5' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl p-4 backdrop-blur-sm"
                style={{ background: 'oklch(1 0 0 / 0.07)', border: '1px solid oklch(1 0 0 / 0.12)' }}>
                <Icon className="size-4 mb-2" style={{ color: 'oklch(0.75 0.18 265)' }} />
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'oklch(0.72 0.05 265)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 rounded-2xl p-5 backdrop-blur-sm"
          style={{ background: 'oklch(1 0 0 / 0.07)', border: '1px solid oklch(1 0 0 / 0.12)' }}>
          <p className="text-sm italic" style={{ color: 'oklch(0.85 0.03 265)' }}>
            "Hirevia helped us fill 3 senior roles in under 2 weeks. The AI matching is genuinely impressive."
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="size-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'oklch(0.55 0.2 265)' }}>S</div>
            <div>
              <div className="text-sm font-semibold text-white">Sarah K.</div>
              <div className="text-xs" style={{ color: 'oklch(0.7 0.04 265)' }}>Head of Talent, TechCorp</div>
            </div>
          </div>
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
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground text-sm">Sign in to your account to continue</p>
          </div>

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
                or sign in with email
              </span>
            </div>
          </div>

          {/* Error message */}
          {message && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/25 px-4 py-3 text-sm text-destructive font-medium text-center">
              {message}
            </div>
          )}

          {/* Email/Password Form */}
          <form
            className="space-y-4"
            action={async (formData) => {
              'use server'
              const email = formData.get('email') as string
              const password = formData.get('password') as string
              const sbase = await createClient()
              const { error } = await sbase.auth.signInWithPassword({ email, password })
              if (error) {
                return redirect(`/login?message=${encodeURIComponent(error.message)}`)
              }
              return redirect('/dashboard')
            }}
          >
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link href="#" className="text-xs font-semibold text-primary hover:underline underline-offset-4">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-11 rounded-xl border-border/80 bg-card focus:border-primary transition-colors"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 rounded-xl font-semibold text-sm shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline underline-offset-4">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
