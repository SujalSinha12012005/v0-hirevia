import { AppSidebar, SidebarContent } from "@/components/app-sidebar"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Sparkles } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <AppSidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header Navigation */}
        <header className="flex items-center gap-3 px-4 py-4 border-b border-border bg-background md:hidden">
          <Sheet>
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

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="mx-auto max-w-6xl w-full px-4 py-6 md:px-6 md:py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
