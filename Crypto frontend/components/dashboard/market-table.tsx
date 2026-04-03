'use client'

import { cn } from '@/lib/utils'

type MarketData = {
  coin: string
  symbol: string
  price: number
  investment: number // We keep this for structure, but we'll override it dynamically
  riskStatus: 'Low' | 'Medium' | 'High'
}

const marketData: MarketData[] = [
  { coin: 'Bitcoin', symbol: 'BTC', price: 5647000, investment: 416000, riskStatus: 'Medium' },
  { coin: 'Ethereum', symbol: 'ETH', price: 287500, investment: 332800, riskStatus: 'Medium' },
  { coin: 'Solana', symbol: 'SOL', price: 14850, investment: 166400, riskStatus: 'High' },
  { coin: 'Cardano', symbol: 'ADA', price: 54.25, investment: 124800, riskStatus: 'Low' },
]

const riskColors = {
  Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  High: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const iconColors: Record<string, string> = {
  BTC: 'from-amber-500 to-orange-600',
  ETH: 'from-indigo-500 to-purple-600',
  SOL: 'from-emerald-400 to-teal-500',
  ADA: 'from-blue-500 to-cyan-500',
}

const icons: Record<string, string> = {
  BTC: '₿',
  ETH: 'Ξ',
  SOL: '◎',
  ADA: '₳',
}

// 1. We added { totalInvestment } to catch the number from the parent page
export function MarketTable({ totalInvestment = 0 }: any) {
  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="border-b border-border p-6">
        <h3 className="text-lg font-semibold text-foreground">Live Market Data</h3>
        <p className="text-sm text-muted-foreground">Real-time portfolio positions</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Coin
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Investment
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Risk Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {marketData.map((item) => {
              
              // 2. THIS IS THE MAGIC MATH! 
              // It splits the money based on the coin symbol
              let calculatedInvestment = 0;
              if (item.symbol === 'BTC') calculatedInvestment = totalInvestment * 0.50;      // 50%
              else if (item.symbol === 'ETH') calculatedInvestment = totalInvestment * 0.30; // 30%
              else if (item.symbol === 'SOL') calculatedInvestment = totalInvestment * 0.10; // 10%
              else if (item.symbol === 'ADA') calculatedInvestment = totalInvestment * 0.10; // 10%

              return (
                <tr
                  key={item.symbol}
                  className="transition-colors hover:bg-secondary/20"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white',
                          iconColors[item.symbol]
                        )}
                      >
                        {icons[item.symbol]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.coin}</p>
                        <p className="text-xs text-muted-foreground">{item.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <p className="font-mono font-medium text-foreground">
                      {item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <p className="font-mono font-medium text-foreground">
                      {/* 3. We print our calculated math here instead of the hardcoded number */}
                      {calculatedInvestment.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
                        riskColors[item.riskStatus]
                      )}
                    >
                      {item.riskStatus}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}