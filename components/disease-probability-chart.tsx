'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { DiseaseProb } from '@/lib/mock-data'

interface DiseaseProbabilityChartProps {
  diseaseProbs: DiseaseProb[]
  plantType?: string
}

export function DiseaseProbabilityChart({ diseaseProbs, plantType }: DiseaseProbabilityChartProps) {
  // Sort by probability descending and take top 5
  const sortedData = [...diseaseProbs]
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 5)

  // Convert to percentage for display
  const chartData = sortedData.map(item => ({
    name: item.disease,
    probability: parseFloat((item.probability * 100).toFixed(2)),
  }))

  const getColorForDisease = (index: number): string => {
    const colors = ['#22c55e', '#f97316', '#ef4444', '#3b82f6', '#8b5cf6']
    return colors[index % colors.length]
  }

  return (
    <Card className="w-full border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-base">Disease Probability Distribution</CardTitle>
        {plantType && <p className="text-sm text-muted-foreground">Based on {plantType} analysis</p>}
      </CardHeader>
      <CardContent>
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
                border: `1px solid var(--color-border)`,
                borderRadius: '8px',
              }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            />
            <Bar dataKey="probability" fill="#22c55e" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForDisease(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Simple list view below chart */}
        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Detailed Probabilities</p>
          {sortedData.map((item, index) => (
            <div key={`${item.disease}-${index}`} className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: getColorForDisease(index) }}
                />
                <span className="text-sm text-foreground">{item.disease}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {(item.probability * 100).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
