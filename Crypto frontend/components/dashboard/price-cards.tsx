'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type CryptoData = {
  name: string
  symbol: string
  price: number
  change24h: number
  icon: string
}

const iconColors: Record<string, string> = {
  BTC: 'from-amber-500 to-orange-600',
  ETH: 'from-indigo-500 to-purple-600',
  SOL: 'from-emerald-400 to-teal-500',
  ADA: 'from-blue-500 to-cyan-500',
}

export function PriceCards() {
  const [prices, setPrices] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLivePrices() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/prices')
        const data = await response.json()
        
        // Map the Backend (Binance) data to the UI structure
        const updatedData: CryptoData[] = [
          { name: 'Bitcoin', symbol: 'BTC', price: data.BTCUSDT, change24h: 2.34, icon: '₿' },
          { name: 'Ethereum', symbol: 'ETH', price: data.ETHUSDT, change24h: -1.23, icon: 'Ξ' },
          { name: 'Solana', symbol: 'SOL', price: data.SOLUSDT, change24h: 5.67, icon: '◎' },
          { name: 'Cardano', symbol: 'ADA', price: data.ADAUSDT, change24h: -0.89, icon: '₳' },
        ]
        
        setPrices(updatedData)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch prices:", error)
        setLoading(false)
      }
    }

    fetchLivePrices()
    // Optional: Refresh prices every 30 seconds
    const interval = setInterval(fetchLivePrices, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Fetching Live Binance Prices...</span>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {prices.map((crypto) => (
        <div
          key={crypto.symbol}
          className="glass-card group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/20"
        >
          <div
            className={cn(
              'absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity group-hover:opacity-30',
              iconColors[crypto.symbol]
            )}
          />
          
          <div className="relative flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-lg font-bold text-white shadow-lg',
                    iconColors[crypto.symbol]
                  )}
                >
                  {crypto.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{crypto.name}</p>
                  <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
                </div>
              </div>
              
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {crypto.price.toLocaleString('en-IN', { 
                    style: 'currency', 
                    currency: 'INR', 
                    maximumFractionDigits: 0 
                  })}
                </p>
              </div>
            </div>
            
            <div
              className={cn(
                'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
                crypto.change24h >= 0
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-red-500/10 text-red-400'
              )}
            >
              {crypto.change24h >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(crypto.change24h)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}