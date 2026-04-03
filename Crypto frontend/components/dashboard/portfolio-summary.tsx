'use client'

import { useState, useEffect } from 'react'
import { Wallet, TrendingUp, PiggyBank, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InvestmentModal } from './investment-modal'

type SummaryItem = {
  label: string
  value: string
  subtext: string
  icon: React.ElementType
  trend?: 'up' | 'down' | 'neutral'
  color: string
  isClickable?: boolean
}

// 1. We added the shared props here
export function PortfolioSummary({ totalInvestment, setTotalInvestment }: any) {
  const [modalOpen, setModalOpen] = useState(false)

  // 2. It now updates the parent's shared state when loading from memory
  useEffect(() => {
    const stored = localStorage.getItem('crypto-investment-amount')
    if (stored) {
      setTotalInvestment(parseFloat(stored))
    }
  }, [setTotalInvestment])

  // Calculate portfolio values based on investment
  const calculatePortfolioValues = (investment: number) => {
    if (investment <= 0) {
      return {
        portfolioValue: 0,
        profitLoss: 0,
        riskLevel: 'N/A',
      }
    }

    // Simulated market growth - assuming average 8% annual return
    const growthRate = 0.08
    const portfolioValue = investment * (1 + growthRate)
    const profitLoss = portfolioValue - investment

    // Risk level based on investment amount
    let riskLevel = 'Low'
    if (investment > 500000) riskLevel = 'Moderate'
    if (investment > 2000000) riskLevel = 'High'

    return {
      portfolioValue,
      profitLoss,
      riskLevel,
    }
  }

  // 3. Changed this to use totalInvestment
  const { portfolioValue, profitLoss, riskLevel } = calculatePortfolioValues(totalInvestment)

  const summaryItems: SummaryItem[] = [
    {
      label: 'Total Investment',
      // 4. Changed investmentAmount to totalInvestment here
      value: totalInvestment > 0 ? `₹${totalInvestment.toLocaleString('en-IN')}` : '₹0',
      subtext: totalInvestment > 0 ? 'Click to update' : 'Click to add investment',
      icon: Wallet,
      trend: 'neutral',
      color: 'from-blue-500 to-indigo-600',
      isClickable: true,
    },
    {
      label: 'Portfolio Value',
      value: portfolioValue > 0 ? `₹${Math.round(portfolioValue).toLocaleString('en-IN')}` : '₹0',
      subtext: portfolioValue > 0 ? `+${((portfolioValue / totalInvestment - 1) * 100).toFixed(1)}% growth` : 'Add investment to see projection',
      icon: TrendingUp,
      trend: portfolioValue > totalInvestment ? 'up' : 'neutral',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Profit / Loss',
      value: profitLoss > 0 ? `+₹${Math.round(profitLoss).toLocaleString('en-IN')}` : '₹0',
      subtext: profitLoss > 0 ? 'Unrealized gains' : 'No gains yet',
      icon: PiggyBank,
      trend: profitLoss > 0 ? 'up' : 'neutral',
      color: 'from-amber-500 to-orange-600',
    },
    {
      label: 'Risk Level',
      value: riskLevel,
      subtext: totalInvestment > 0 ? 'Portfolio risk' : 'Build your portfolio',
      icon: Shield,
      trend: 'neutral',
      color: 'from-purple-500 to-pink-600',
    },
  ]

  // 5. This saves the new number to the shared state when she clicks save
  const handleSaveInvestment = (amount: number) => {
    setTotalInvestment(amount)
    localStorage.setItem('crypto-investment-amount', amount.toString())
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon
          const isClickable = item.isClickable
          
          return (
            <div
              key={item.label}
              onClick={() => isClickable && setModalOpen(true)}
              className={cn(
                'glass-card group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:border-primary/20',
                isClickable && 'cursor-pointer hover:bg-primary/5'
              )}
            >
              <div
                className={cn(
                  'absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-10 blur-xl transition-opacity group-hover:opacity-20',
                  item.color
                )}
              />
              
              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br',
                      item.color
                    )}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div>
                  <p
                    className={cn(
                      'text-2xl font-bold',
                      item.trend === 'up' && 'text-emerald-400',
                      item.trend === 'down' && 'text-red-400',
                      item.trend === 'neutral' && 'text-foreground'
                    )}
                  >
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.subtext}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <InvestmentModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSaveInvestment}
      />
    </>
  )
}