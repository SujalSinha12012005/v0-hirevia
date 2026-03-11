"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { 
  Sparkles, 
  FileText, 
  Briefcase, 
  Brain, 
  BarChart3, 
  Map, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight,
  Play,
  Star,
  Menu,
  X,
  ChevronRight,
  Building2,
  Users,
  BriefcaseBusiness,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: FileText,
    title: "AI Resume Analysis",
    description: "Get instant feedback on your resume with AI-powered analysis. Optimize for ATS and recruiter expectations.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    icon: Briefcase,
    title: "JD Match Scoring",
    description: "Match your profile against job descriptions with precision. See your compatibility score instantly.",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  },
  {
    icon: Map,
    title: "Personalized Roadmaps",
    description: "Get customized skill development paths based on your career goals and target roles.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  },
  {
    icon: Brain,
    title: "Skill Quizzes",
    description: "Test your knowledge with industry-relevant quizzes. Track progress and identify gaps.",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
  },
  {
    icon: BarChart3,
    title: "Placement Readiness",
    description: "Comprehensive readiness index measuring your overall preparation for placements.",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Visual dashboards tracking your improvement over time with actionable insights.",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400"
  }
]

const stats = [
  { value: "50K+", label: "Students Placed" },
  { value: "500+", label: "Hiring Partners" },
  { value: "95%", label: "Success Rate" },
  { value: "4.9", label: "Average Rating" }
]

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    avatar: "PS",
    content: "Hirevia's resume analysis helped me optimize my resume for ATS. Got interview calls from 5 top companies within a week!",
    rating: 5
  },
  {
    name: "Arjun Mehta",
    role: "Data Scientist at Meta",
    avatar: "AM",
    content: "The JD matching feature is incredible. It showed exactly what skills I needed to focus on for my dream role.",
    rating: 5
  },
  {
    name: "Sneha Reddy",
    role: "Product Manager at Amazon",
    avatar: "SR",
    content: "The skill roadmap kept me focused throughout my placement prep. Highly recommend to all engineering students!",
    rating: 5
  }
]

const pricingPlans = [
  {
    name: "Starter",
    price: "₹99",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "5 Resume Analyses",
      "10 JD Matches",
      "Basic Quizzes",
      "Email Support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "₹249",
    period: "/month",
    description: "Best for serious candidates",
    features: [
      "Unlimited Resume Analyses",
      "Unlimited JD Matches",
      "All Skill Quizzes",
      "Priority Support",
      "Placement Roadmap",
      "Mock Interview Access"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For colleges & organizations",
    features: [
      "Everything in Pro",
      "Custom Branding",
      "Admin Dashboard",
      "API Access",
      "Dedicated Account Manager",
      "Analytics & Reporting"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

const howItWorksSteps = [
  {
    step: "01",
    title: "Upload Resume",
    description: "Upload your resume and let our AI analyze it for ATS compatibility and improvements."
  },
  {
    step: "02",
    title: "Get JD Matches",
    description: "Paste job descriptions to see how well your profile matches and what skills you need."
  },
  {
    step: "03",
    title: "Follow Roadmap",
    description: "Get a personalized skill roadmap with quizzes and resources to bridge your gaps."
  },
  {
    step: "04",
    title: "Track Progress",
    description: "Monitor your readiness index and track improvements until you're placement-ready."
  }
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const currentYear = new Date().getFullYear()
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  // Live stats that would come from backend
  const liveStats = {
    studentsActive: 2847,
    interviewsToday: 156,
    placementsThisWeek: 89,
    avgScoreImprovement: 34
  }

  // Handle scroll for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-9 rounded-lg bg-primary">
                <Sparkles className="size-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Hirevia</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Success Stories</a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button size="sm">Get Started Free</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
              <a href="#pricing" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#testimonials" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Success Stories</a>
              <div className="pt-3 border-t border-border space-y-3">
                <Link href="/login" className="block">
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link href="/login" className="block">
                  <Button className="w-full">Get Started Free</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Trusted by 50,000+ students
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Land Your Dream{" "}
              <span className="text-primary">Placement</span>{" "}
              With AI-Powered Prep
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              From resume optimization to mock interviews — everything you need to crack placements at top companies. Join thousands of successful students.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Free Trial
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                <Play className="mr-2 size-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for campus placement preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center size-12 rounded-lg mb-4 ${feature.color}`}>
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How Hirevia Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your journey to landing your dream placement in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-primary/10 absolute -top-2 -left-2">
                  {item.step}
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {i < 3 && (
                  <ChevronRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 size-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who got placed at top companies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your preparation needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <Card 
                key={i} 
                className={`relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/10' : 'border-border/50'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Land Your Dream Placement?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join 50,000+ students who have transformed their placement journey with Hirevia. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base">
                Start Free Trial
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="h-12 px-8 text-base text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/10">
              Schedule Demo Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
                  <Sparkles className="size-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">Hirevia</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your AI-powered placement preparation platform. Land your dream job with confidence.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hirevia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

