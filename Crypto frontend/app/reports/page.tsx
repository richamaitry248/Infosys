"use client"

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { ReportSection } from '@/components/dashboard/report-section'
import { MarketTable } from '@/components/dashboard/market-table'

export default function ReportsPage() {
  // 1. Create the variable to hold the saved money
  const [totalInvestment, setTotalInvestment] = useState(0)

  // 2. Read the saved memory from the browser when the page loads
  useEffect(() => {
    const stored = localStorage.getItem('crypto-investment-amount')
    if (stored) {
      setTotalInvestment(parseFloat(stored))
    }
  }, [])

  return (
    <DashboardLayout title="Reports">
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">Portfolio Reports</h2>
        <p className="text-muted-foreground">Download and analyze your investment history</p>
      </div>
      
      {/* Report Downloads */}
      <section className="max-w-xl">
        <ReportSection />
      </section>
      
      {/* Current Holdings */}
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Current Holdings
        </h3>
        {/* 3. Pass the memory down to fix the table error! */}
        <MarketTable totalInvestment={totalInvestment} />
      </section>
    </DashboardLayout>
  )
}