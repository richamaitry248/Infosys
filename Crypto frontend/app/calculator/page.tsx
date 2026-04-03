import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { CalculatorForm } from '@/components/dashboard/calculator-form'

export default function CalculatorPage() {
  return (
    <DashboardLayout title="Calculator">
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">Investment Calculator</h2>
        <p className="text-muted-foreground">Plan your crypto investments with our smart calculator</p>
      </div>
      
      {/* Calculator */}
      <section className="max-w-2xl">
        <CalculatorForm />
      </section>
    </DashboardLayout>
  )
}
