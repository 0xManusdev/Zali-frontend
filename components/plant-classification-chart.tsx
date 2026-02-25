'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PlantClassificationProb } from '@/lib/mock-data'

interface PlantClassificationChartProps {
  plantClassificationProbs: PlantClassificationProb[]
}

export function PlantClassificationChart({ plantClassificationProbs }: PlantClassificationChartProps) {
  // Sort by probability descending
  const sortedData = [...plantClassificationProbs].sort((a, b) => b.probability - a.probability)

  // Convert probabilities to more readable format
  const chartData = sortedData.map(item => ({
    name: item.plantType,
    probability: item.probability < 0.0001 
      ? parseFloat((item.probability * 100).toExponential(2))
      : parseFloat((item.probability * 100).toFixed(2)),
    rawProbability: item.probability,
  }))

  const getColorForPlant = (index: number): string => {
    const colors = ['#22c55e', '#f97316', '#ef4444', '#3b82f6', '#8b5cf6']
    return colors[index % colors.length]
  }

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
    <Card className="w-full border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-base">Plant Type Classification</CardTitle>
        <p className="text-sm text-muted-foreground">Model confidence across crop types</p>
      </CardHeader>
      <CardContent>
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
                border: `1px solid var(--color-border)`,
                borderRadius: '8px',
              }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            />
            <Bar dataKey="rawProbability" fill="#22c55e" radius={[8, 8, 0, 0]}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForPlant(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* List view with proper formatting */}
        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Classification Results</p>
          {sortedData.map((item, index) => (
            <div key={`${item.plantType}-${index}`} className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: getColorForPlant(index) }}
                />
                <span className="text-sm text-foreground">{item.plantType}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {formatProbability(item.probability)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
