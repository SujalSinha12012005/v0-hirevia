"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "@/app/actions/auth"
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
  LogOut,
  Lock,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

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
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

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

      {/* Premium Section */}
      <div className="px-3 pb-2 border-t border-sidebar-border pt-3">
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

      {/* User Profile Section */}
      <div className="border-t border-sidebar-border px-4 py-4">
        {loading ? (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="size-9 rounded-full bg-sidebar-accent" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="h-3 w-20 bg-sidebar-accent rounded" />
              <div className="h-2 w-24 bg-sidebar-accent rounded" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-full bg-sidebar-accent text-sm font-semibold text-primary">
              {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-sm font-medium truncate">
                {user?.user_metadata?.full_name || "User"}
              </span>
              <span className="text-[10px] text-sidebar-foreground/50 truncate">
                {user?.email}
              </span>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="p-2 hover:bg-sidebar-accent rounded-full text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                title="Log Out"
              >
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </aside>
  )
}
