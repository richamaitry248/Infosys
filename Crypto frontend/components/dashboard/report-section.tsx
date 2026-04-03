'use client'

import { useState } from 'react'
import { FileText, Download, FileSpreadsheet, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ReportSection() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    
    // Simulate download
    setTimeout(() => {
      const csvContent = `Coin,Symbol,Price,Investment,Risk Status,24h Change
Bitcoin,BTC,67842.50,50000,Medium,+2.34%
Ethereum,ETH,3456.78,40000,Medium,-1.23%
Solana,SOL,178.45,20000,High,+5.67%
Cardano,ADA,0.65,15000,Low,-0.89%

Portfolio Summary
Total Investment,$125,000
Current Value,$156,842
Profit/Loss,+$31,842 (+25.5%)
Risk Level,Moderate`

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `crypto-portfolio-report-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      setIsDownloading(false)
    }, 1000)
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
          <FileText className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Reports</h3>
          <p className="text-sm text-muted-foreground">Export your portfolio data</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/20 p-4">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-foreground">Portfolio Report</p>
              <p className="text-xs text-muted-foreground">Complete CSV export</p>
            </div>
          </div>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            variant="outline"
            size="sm"
            className="border-border bg-transparent text-foreground hover:bg-secondary"
          >
            {isDownloading ? (
              <>
                <Download className="mr-2 h-4 w-4 animate-bounce" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </>
            )}
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>Last exported: March 7, 2026</span>
        </div>
      </div>
    </div>
  )
}
