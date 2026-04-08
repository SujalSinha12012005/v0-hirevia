"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { SidebarContent } from "@/components/app-sidebar"
import { Menu, Sparkles } from "lucide-react"

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Automatically close the mobile sheet navigation whenever the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="flex items-center gap-3 px-4 py-4 border-b border-border bg-background md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="p-2 -ml-2 text-foreground/80 hover:text-foreground">
            <Menu className="size-6" />
            <span className="sr-only">Toggle mobile menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] sm:w-80 p-0 flex flex-col bg-sidebar text-sidebar-foreground border-r-0">
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
      
      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center justify-center size-7 rounded-md bg-sidebar-primary">
          <Sparkles className="size-3.5 text-sidebar-primary-foreground" />
        </div>
        <span className="text-base font-semibold tracking-tight">Hirevia</span>
      </div>
    </header>
  )
}
