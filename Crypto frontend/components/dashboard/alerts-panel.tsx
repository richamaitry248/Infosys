'use client'

import { useState } from 'react'
import { Bell, TrendingUp, AlertTriangle, Info, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Alert = {
  id: string
  type: 'success' | 'warning' | 'info'
  title: string
  message: string
  time: string
}

const initialAlerts: Alert[] = [
  {
    id: '1',
    type: 'success',
    title: 'Profit Alert',
    message: 'Profit increased by 1.2% in the last hour',
    time: '2 min ago',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Volatility Warning',
    message: 'High market volatility detected for SOL',
    time: '15 min ago',
  },
  {
    id: '3',
    type: 'info',
    title: 'Market Update',
    message: 'BTC reached $68,000 resistance level',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'success',
    title: 'Goal Progress',
    message: 'You are 85% towards your monthly goal',
    time: '3 hours ago',
  },
]

const alertStyles = {
  success: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: TrendingUp,
    iconColor: 'text-emerald-400',
  },
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: Info,
    iconColor: 'text-blue-400',
  },
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  const clearAllAlerts = () => {
    setAlerts([])
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
            <Bell className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Alerts</h3>
            <p className="text-sm text-muted-foreground">{alerts.length} notifications</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {alerts.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllAlerts}
              className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {alerts.length}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const style = alertStyles[alert.type]
            const Icon = style.icon
            return (
              <div
                key={alert.id}
                className={cn(
                  'group relative flex items-start gap-3 rounded-lg border p-3 transition-all hover:scale-[1.01]',
                  style.bg,
                  style.border
                )}
              >
                <div className={cn('mt-0.5', style.iconColor)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{alert.title}</p>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                </div>
                <button 
                  onClick={() => removeAlert(alert.id)}
                  className="absolute right-2 top-2 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-secondary hover:text-foreground group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No notifications</p>
            <p className="text-xs text-muted-foreground">All alerts have been cleared</p>
          </div>
        )}
      </div>
    </div>
  )
}
