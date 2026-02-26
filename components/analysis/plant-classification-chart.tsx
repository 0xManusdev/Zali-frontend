'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { PlantClassificationProb } from '@/types'

interface PlantClassificationChartProps {
  plantClassificationProbs: PlantClassificationProb[]
}

const CHART_COLORS = ['#3E7A60', '#507D9B', '#BC8E54', '#B35A6A', '#7B6B95']

export function PlantClassificationChart({ plantClassificationProbs }: PlantClassificationChartProps) {
  const sortedData = [...plantClassificationProbs].sort((a, b) => b.probability - a.probability)

  const chartData = sortedData.map(item => ({
    name: item.plantType,
    probability: item.probability < 0.0001 
      ? parseFloat((item.probability * 100).toExponential(2))
      : parseFloat((item.probability * 100).toFixed(2)),
    rawProbability: item.probability,
  }))

  const formatProbability = (prob: number): string => {
    if (prob > 0.01) {
      return `${(prob * 100).toFixed(2)}%`
    } else if (prob > 0.0001) {
      return `${(prob * 1e6).toFixed(2)} ppm`
    } else {
      return prob.toExponential(2)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">Plant Type Classification</h4>
        <p className="text-xs text-muted-foreground mt-0.5">Model confidence across crop types</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
          />
          <YAxis
            scale="log"
            label={{ value: 'Probability (log scale)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
          />
          <Tooltip
            formatter={(value: number) => {
              const rawIndex = sortedData.findIndex(item => item.probability === value / 100 || item.probability.toFixed(10) === (value / 100).toFixed(10))
              const raw = rawIndex >= 0 ? sortedData[rawIndex].probability : value / 100
              return formatProbability(raw)
            }}
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '13px',
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar dataKey="rawProbability" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]}>
            {sortedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Classification Results</p>
        {sortedData.map((item, index) => (
          <div key={`${item.plantType}-${index}`} className="flex items-center justify-between rounded-md bg-muted/50 p-2">
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
              <span className="text-sm text-foreground">{item.plantType}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {formatProbability(item.probability)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
