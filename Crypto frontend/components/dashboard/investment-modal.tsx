'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'

interface InvestmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (amount: number) => void
}

export function InvestmentModal({ open, onOpenChange, onSave }: InvestmentModalProps) {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const handleSave = () => {
    // Validation
    const numAmount = parseFloat(amount)
    
    if (!amount.trim()) {
      setError('Please enter an investment amount')
      return
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0')
      return
    }

    if (numAmount > 10000000) {
      setError('Amount should be less than ₹1 crore')
      return
    }

    // Save and close
    onSave(numAmount)
    setAmount('')
    setError('')
    onOpenChange(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setAmount('')
      setError('')
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Investment Amount</DialogTitle>
          <DialogDescription>
            Add your initial investment amount to see portfolio projections
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="amount"
                type="number"
                placeholder="100000"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  setError('')
                }}
                className="pl-7"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSave()
                  }
                }}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Example amounts:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {['50,000', '1,00,000', '5,00,000', '10,00,000'].map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setAmount(ex.replace(/,/g, ''))}
                    className="rounded bg-primary/10 px-2 py-1 text-xs font-medium hover:bg-primary/20"
                  >
                    ₹{ex}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => handleOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Add Investment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
