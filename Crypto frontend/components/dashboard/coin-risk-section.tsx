'use client'

import { AlertTriangle, TrendingDown, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

type CoinRisk = {
  name: string
  symbol: string
  riskLevel: 'Low' | 'Medium' | 'High'
  volatility: number // percentage
  riskScore: number // 1-100
  description: string
}

const coinRisks: CoinRisk[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    riskLevel: 'Medium',
    volatility: 3.2,
    riskScore: 45,
    description: 'Established cryptocurrency with moderate volatility',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    riskLevel: 'Medium',
    volatility: 4.1,
    riskScore: 52,
    description: 'Smart contract platform with steady market presence',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    riskLevel: 'High',
    volatility: 7.8,
    riskScore: 72,
    description: 'High-speed blockchain with higher volatility',
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    riskLevel: 'Low',
    volatility: 2.1,
    riskScore: 35,
    description: 'Peer-reviewed blockchain with lower volatility',
  },
]

const riskStyles = {
  Low: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20',
  },
  Medium: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20',
  },
  High: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    badge: 'bg-red-500/20',
  },
}

function RiskIndicator({ level, score }: { level: 'Low' | 'Medium' | 'High'; score: number }) {
  const percentage = score
  const colors = {
    Low: 'bg-emerald-500',
    Medium: 'bg-amber-500',
    High: 'bg-red-500',
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Risk Score</span>
        <span className="text-sm font-semibold text-foreground">{score}/100</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className={cn('h-full transition-all duration-300', colors[level])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export function CoinRiskSection() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
            <Shield className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Coin Risk Analysis</h3>
            <p className="text-sm text-muted-foreground">Risk levels and volatility metrics</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {coinRisks.map((coin) => {
          const style = riskStyles[coin.riskLevel]

          return (
            <div
              key={coin.symbol}
              className={cn(
                'rounded-lg border p-4 transition-all hover:border-primary/20',
                style.bg,
                style.border
              )}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{coin.name}</p>
                    <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
                    style.badge,
                    style.text
                  )}
                >
                  {coin.riskLevel === 'High' && <AlertTriangle className="h-3 w-3" />}
                  {coin.riskLevel === 'Medium' && <TrendingDown className="h-3 w-3" />}
                  {coin.riskLevel === 'Low' && <Shield className="h-3 w-3" />}
                  {coin.riskLevel} Risk
                </span>
              </div>

              <p className="mb-3 text-xs text-muted-foreground">{coin.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <RiskIndicator level={coin.riskLevel} score={coin.riskScore} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">24h Volatility</p>
                  <p className={cn('text-sm font-semibold', style.text)}>±{coin.volatility}%</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
        <div className="flex gap-3">
          <Shield className="h-5 w-5 shrink-0 text-blue-400" />
          <div className="text-xs space-y-1">
            <p className="font-medium text-blue-400">Risk Disclaimer</p>
            <p className="text-muted-foreground">
              Higher risk assets have greater potential returns but also higher volatility. Always diversify your portfolio and invest according to your risk tolerance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
