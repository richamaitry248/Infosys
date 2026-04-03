import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { AlertsPanel } from '@/components/dashboard/alerts-panel'
import { CoinRiskSection } from '@/components/dashboard/coin-risk-section'

export default function AlertsPage() {
  return (
    <DashboardLayout title="Alerts">
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">Alerts & Notifications</h2>
        <p className="text-muted-foreground">Stay updated on your portfolio changes</p>
      </div>
      
      {/* Coin Risk Analysis */}
      <section>
        <CoinRiskSection />
      </section>
      
      {/* Alerts */}
      <section className="max-w-2xl">
        <AlertsPanel />
      </section>
    </DashboardLayout>
  )
}
