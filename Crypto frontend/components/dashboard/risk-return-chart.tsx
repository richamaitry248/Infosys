'use client'

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from 'recharts'

const data = [
  { name: 'Bitcoin', risk: 65, return: 85, volume: 400 },
  { name: 'Ethereum', risk: 70, return: 75, volume: 300 },
  { name: 'Solana', risk: 85, return: 120, volume: 200 },
  { name: 'Cardano', risk: 60, return: 45, volume: 150 },
]

const colors: Record<string, string> = {
  Bitcoin: '#f59e0b',
  Ethereum: '#8b5cf6',
  Solana: '#10b981',
  Cardano: '#06b6d4',
}

export function RiskReturnChart() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Risk vs Return Analysis</h3>
        <p className="text-sm text-muted-foreground">Compare asset performance</p>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              type="number"
              dataKey="risk"
              name="Risk"
              domain={[40, 100]}
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              label={{
                value: 'Risk Level (%)',
                position: 'bottom',
                offset: 0,
                fill: 'rgba(255,255,255,0.5)',
                fontSize: 12,
              }}
            />
            <YAxis
              type="number"
              dataKey="return"
              name="Return"
              domain={[20, 140]}
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              label={{
                value: 'Expected Return (%)',
                angle: -90,
                position: 'insideLeft',
                fill: 'rgba(255,255,255,0.5)',
                fontSize: 12,
              }}
            />
            <ZAxis type="number" dataKey="volume" range={[100, 400]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload
                  return (
                    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-xl">
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Risk: {item.risk}%</p>
                      <p className="text-xs text-muted-foreground">Return: {item.return}%</p>
                    </div>
                  )
                }
                return null
              }}
            />
            {data.map((entry) => (
              <Scatter
                key={entry.name}
                name={entry.name}
                data={[entry]}
                fill={colors[entry.name]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: colors[item.name] }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
