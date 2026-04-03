import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-20 lg:ml-64">
        <Header title={title} />
        
        <div className="p-6 space-y-6">
          {children}
          
          {/* Footer */}
          <footer className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>CryptoVault Dashboard &copy; 2026. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
