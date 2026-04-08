import { AppSidebar } from "@/components/app-sidebar"
import { MobileHeader } from "@/components/mobile-header"

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
        <MobileHeader />

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
