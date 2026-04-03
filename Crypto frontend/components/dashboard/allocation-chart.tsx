'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Bitcoin', value: 45, color: '#f59e0b' },
  { name: 'Ethereum', value: 30, color: '#8b5cf6' },
  { name: 'Solana', value: 15, color: '#10b981' },
  { name: 'Cardano', value: 10, color: '#06b6d4' },
]

export function AllocationChart() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Investment Allocation</h3>
        <p className="text-sm text-muted-foreground">Distribution across assets</p>
      </div>
      
      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <div className="h-[200px] w-full max-w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload
                    return (
                      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-xl">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.value}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-20 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
                <span className="w-10 text-right text-sm font-semibold text-muted-foreground">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
