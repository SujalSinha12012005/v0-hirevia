import Link from "next/link"
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border/40 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Sparkles className="size-4 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">Hirevia</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Log In
          </Link>
          <Link href="/signup">
            <Button className="font-semibold shadow-sm rounded-full px-5">
              Sign Up for Free
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          {/* Background decorations */}
          <div className="absolute inset-0 -z-10 bg-background">
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
              <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
            </div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
              <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
            </div>
          </div>

          <div className="px-6 text-center lg:px-8 max-w-5xl mx-auto space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem] lg:leading-[1.1]">
                Your next great hire <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  starts right here.
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                Hirevia uses advanced AI to match top tech talent with the right opportunities. Analyze resumes, prep for interviews, and build your dream team effortlessly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                  Get Started — It&apos;s Free
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base font-semibold w-full sm:w-auto border-border shadow-sm hover:bg-accent hover:border-accent">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" /> No credit card required
              </div>
              <div className="hidden sm:block size-1.5 rounded-full bg-muted-foreground/30" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" /> Setup in 2 minutes
              </div>
              <div className="hidden sm:block size-1.5 rounded-full bg-muted-foreground/30" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" /> AI-Powered matching
              </div>
            </div>
          </div>
        </section>

        {/* Small feature section */}
        <section className="border-t border-border bg-muted/30 py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: "Smart Resume Analysis", desc: "Instantly score resumes against job descriptions with deep AI insights." },
                { title: "Mock Interviews", desc: "Practice with our AI interviewer and get immediate, actionable feedback." },
                { title: "Skill Roadmaps", desc: "Identify skill gaps and get custom roadmaps to land your next dream role." }
              ].map((f) => (
                <div key={f.title} className="flex flex-col gap-3 rounded-2xl bg-background border border-border p-6 shadow-sm">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                    <Sparkles className="size-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row lg:px-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hirevia. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground font-medium">
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
