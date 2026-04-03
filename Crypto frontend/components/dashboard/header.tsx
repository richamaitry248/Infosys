'use client'

import { useState } from 'react'
import { RefreshCw, Search, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-1.5 md:flex">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 border-border bg-secondary/50 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
        
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="border-border bg-transparent text-foreground hover:bg-secondary"
        >
          <RefreshCw
            className={cn(
              'mr-2 h-4 w-4',
              isRefreshing && 'animate-spin'
            )}
          />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
        
        <Link 
          href="/alerts"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            4
          </span>
        </Link>
        
        <Link 
          href="/settings"
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-br from-primary/20 to-primary/10"
        >
          <User className="h-4 w-4 text-primary" />
        </Link>
      </div>
    </header>
  )
}
