'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const data = [
  { name: 'BTC', initial: 416000, current: 520000 },
  { name: 'ETH', initial: 332800, current: 399360 },
  { name: 'SOL', initial: 166400, current: 232960 },
  { name: 'ADA', initial: 124800, current: 152522 },
]

export function ComparisonChart() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Portfolio Comparison</h3>
        <p className="text-sm text-muted-foreground">Initial vs Current Value</p>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-xl">
                      <p className="text-sm font-semibold text-foreground">{payload[0].payload.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Initial: ₹{payload[0].value?.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-emerald-400">
                        Current: ₹{payload[1].value?.toLocaleString('en-IN')}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend
              formatter={(value) => (
                <span className="text-xs text-muted-foreground capitalize">{value}</span>
              )}
            />
            <Bar
              dataKey="initial"
              fill="rgba(255,255,255,0.15)"
              radius={[4, 4, 0, 0]}
              name="Initial Investment"
            />
            <Bar
              dataKey="current"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              name="Current Value"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
