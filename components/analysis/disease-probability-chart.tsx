'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { DiseaseProb } from '@/types'

interface DiseaseProbabilityChartProps {
  diseaseProbs: DiseaseProb[]
  plantType?: string
}

const CHART_COLORS = ['#3E7A60', '#507D9B', '#BC8E54', '#B35A6A', '#7B6B95']

export function DiseaseProbabilityChart({ diseaseProbs, plantType }: DiseaseProbabilityChartProps) {
  const sortedData = [...diseaseProbs]
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 5)

  const chartData = sortedData.map(item => ({
    name: item.disease,
    probability: parseFloat((item.probability * 100).toFixed(2)),
  }))

  return (
    <div className="w-full">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground">Disease Probability Distribution</h4>
        {plantType && <p className="text-xs text-muted-foreground mt-0.5">Based on {plantType} analysis</p>}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
          />
          <YAxis
            label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
          />
          <Tooltip
            formatter={(value: number) => `${value}%`}
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              fontSize: '13px',
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar dataKey="probability" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Detailed Probabilities</p>
        {sortedData.map((item, index) => (
          <div key={`${item.disease}-${index}`} className="flex items-center justify-between rounded-md bg-muted/50 p-2">
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
              <span className="text-sm text-foreground">{item.disease}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {(item.probability * 100).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
