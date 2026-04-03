'use client'

import { useState } from 'react'
import { Calculator, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Allocation = {
  coin: string
  symbol: string
  percentage: number
  amount: number
  color: string
}

export function CalculatorForm() {
  const [investment, setInvestment] = useState('100000')
  const [strategy, setStrategy] = useState('auto')
  const [goal, setGoal] = useState('balanced')
  const [allocation, setAllocation] = useState<Allocation[] | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculatePortfolio = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay
    setTimeout(() => {
      const amount = parseFloat(investment) || 100000
      
      let allocations: Allocation[] = []
      
      if (goal === 'max-return') {
        allocations = [
          { coin: 'Bitcoin', symbol: 'BTC', percentage: 30, amount: amount * 0.3, color: '#f59e0b' },
          { coin: 'Ethereum', symbol: 'ETH', percentage: 25, amount: amount * 0.25, color: '#8b5cf6' },
          { coin: 'Solana', symbol: 'SOL', percentage: 35, amount: amount * 0.35, color: '#10b981' },
          { coin: 'Cardano', symbol: 'ADA', percentage: 10, amount: amount * 0.1, color: '#06b6d4' },
        ]
      } else if (goal === 'low-risk') {
        allocations = [
          { coin: 'Bitcoin', symbol: 'BTC', percentage: 55, amount: amount * 0.55, color: '#f59e0b' },
          { coin: 'Ethereum', symbol: 'ETH', percentage: 30, amount: amount * 0.3, color: '#8b5cf6' },
          { coin: 'Solana', symbol: 'SOL', percentage: 10, amount: amount * 0.1, color: '#10b981' },
          { coin: 'Cardano', symbol: 'ADA', percentage: 5, amount: amount * 0.05, color: '#06b6d4' },
        ]
      } else {
        allocations = [
          { coin: 'Bitcoin', symbol: 'BTC', percentage: 45, amount: amount * 0.45, color: '#f59e0b' },
          { coin: 'Ethereum', symbol: 'ETH', percentage: 30, amount: amount * 0.3, color: '#8b5cf6' },
          { coin: 'Solana', symbol: 'SOL', percentage: 15, amount: amount * 0.15, color: '#10b981' },
          { coin: 'Cardano', symbol: 'ADA', percentage: 10, amount: amount * 0.1, color: '#06b6d4' },
        ]
      }
      
      setAllocation(allocations)
      setIsCalculating(false)
    }, 800)
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Investment Calculator</h3>
          <p className="text-sm text-muted-foreground">Get personalized allocation</p>
        </div>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="investment" className="text-sm font-medium text-foreground">
            Total Investment Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
            <Input
              id="investment"
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="border-border bg-secondary/50 pl-7 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              placeholder="100000"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Strategy Mode</Label>
          <Select value={strategy} onValueChange={setStrategy}>
            <SelectTrigger className="border-border bg-secondary/50 text-foreground">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card">
              <SelectItem value="auto">Auto (AI-Powered)</SelectItem>
              <SelectItem value="manual">Manual Selection</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Investment Goal</Label>
          <Select value={goal} onValueChange={setGoal}>
            <SelectTrigger className="border-border bg-secondary/50 text-foreground">
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card">
              <SelectItem value="max-return">Max Return (High Risk)</SelectItem>
              <SelectItem value="balanced">Balanced (Medium Risk)</SelectItem>
              <SelectItem value="low-risk">Low Risk (Conservative)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={calculatePortfolio}
          disabled={isCalculating}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isCalculating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Portfolio
            </>
          )}
        </Button>
        
        {allocation && (
          <div className="mt-6 space-y-3 rounded-lg border border-border bg-secondary/20 p-4">
            <p className="text-sm font-semibold text-foreground">Recommended Allocation</p>
            <div className="space-y-2">
              {allocation.map((item) => (
                <div key={item.symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.coin}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {item.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        'bg-secondary text-muted-foreground'
                      )}
                    >
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
