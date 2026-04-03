"use client"

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { AllocationChart } from '@/components/dashboard/allocation-chart'
import { RiskReturnChart } from '@/components/dashboard/risk-return-chart'
import { ComparisonChart } from '@/components/dashboard/comparison-chart'
import { PortfolioSummary } from '@/components/dashboard/portfolio-summary'

export default function AnalyticsPage() {
  // 1. Create the variable to hold the money
  const [totalInvestment, setTotalInvestment] = useState(0)

  // 2. Read the saved memory from the browser when the page loads
  useEffect(() => {
    const stored = localStorage.getItem('crypto-investment-amount')
    if (stored) {
      setTotalInvestment(parseFloat(stored))
    }
  }, [])

  return (
    <DashboardLayout title="Analytics">
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">Portfolio Analytics</h2>
        <p className="text-muted-foreground">Deep insights into your investment performance</p>
      </div>
      
      {/* Portfolio Summary */}
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Performance Overview
        </h3>
        {/* 3. Pass the memory tools down to fix the error! */}
        <PortfolioSummary 
          totalInvestment={totalInvestment} 
          setTotalInvestment={setTotalInvestment} 
        />
      </section>
      
      {/* Charts Row */}
      <section className="grid gap-6 lg:grid-cols-2">
        <AllocationChart />
        <RiskReturnChart />
      </section>
      
      {/* Comparison Chart */}
      <section>
        <ComparisonChart />
      </section>
    </DashboardLayout>
  )
}