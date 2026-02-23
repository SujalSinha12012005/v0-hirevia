"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Map,
  Brain,
  BarChart3,
  Wallet,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Mic,
} from "lucide-react"

import { Lock } from "lucide-react"

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Resume Analysis", href: "/dashboard/resume", icon: FileText },
  { label: "JD Match", href: "/dashboard/jd-match", icon: Briefcase },
  { label: "Skill Roadmap", href: "/dashboard/roadmap", icon: Map },
  { label: "Quizzes", href: "/dashboard/quizzes", icon: Brain },
  { label: "Placement Readiness", href: "/dashboard/readiness", icon: BarChart3 },
]

const premiumNav = [
  { label: "Career Counselling", href: "/dashboard/counselling", icon: GraduationCap },
  { label: "Interview Prep", href: "/dashboard/interview", icon: Mic },
]

const bottomNav = [
  { label: "Credits Wallet", href: "/dashboard/credits", icon: Wallet },
  { label: "Admin Panel", href: "/dashboard/admin", icon: ShieldCheck },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shrink-0">
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center size-8 rounded-lg bg-sidebar-primary">
          <Sparkles className="size-4 text-sidebar-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight">Hirevia</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Main Nav */}
        <ul className="flex flex-col gap-1">
          {mainNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="size-[18px] shrink-0" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Premium Section */}
        <div className="mt-4 pt-4 border-t border-sidebar-border">
          <span className="flex items-center gap-1.5 px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
            <Lock className="size-3" />
            Premium
          </span>
          <ul className="flex flex-col gap-1">
            {premiumNav.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="size-[18px] shrink-0" />
                    {item.label}
                    <span className="ml-auto text-[9px] font-semibold bg-sidebar-primary/20 text-sidebar-primary rounded-full px-2 py-0.5">
                      150 Cr
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Bottom Nav */}
        <div className="mt-4 pt-4 border-t border-sidebar-border">
          <ul className="flex flex-col gap-1">
            {bottomNav.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="size-[18px] shrink-0" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-9 rounded-full bg-sidebar-accent text-sm font-semibold">
            AJ
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Arjun Mehta</span>
            <span className="text-xs text-sidebar-foreground/50">Student</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
