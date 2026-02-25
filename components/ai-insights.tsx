'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlantClassificationChart } from './plant-classification-chart'
import { apiService } from '@/lib/api-service'
import { Brain, Zap, TrendingUp, Database } from 'lucide-react'

interface ModelMetrics {
  architecture: string
  trainingDataset: string
  dataAugmentation: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  testDataSize: string
  classesDetected: number
  trainingEpochs: number
  batchSize: number
  optimizer: string
  learningRate: number
}

export function AIInsights() {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await apiService.getModelMetrics()
        setMetrics(data)
      } catch (err) {
        console.error('Failed to load metrics:', err)
      } finally {
        setLoading(false)
      }
    }
    loadMetrics()
  }, [])

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading AI insights...</p>
      </div>
    )
  }

  const performanceData = [
    { metric: 'Accuracy', value: metrics.accuracy },
    { metric: 'Precision', value: metrics.precision },
    { metric: 'Recall', value: metrics.recall },
    { metric: 'F1 Score', value: metrics.f1Score },
  ]

  const confusionData = [
    { name: 'Correct', value: 96.2, fill: '#22c55e' },
    { name: 'Incorrect', value: 3.8, fill: '#ef4444' },
  ]

  return (
    <div className="space-y-6">
      {/* Model Architecture Section */}
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Model Architecture</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Neural Network
              </p>
              <p className="mt-2 text-lg font-bold text-foreground">
                {metrics.architecture}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Optimized for mobile and edge devices
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Classes Detected
              </p>
              <p className="mt-2 text-lg font-bold text-primary">
                {metrics.classesDetected}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Plant diseases and conditions
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Optimizer
              </p>
              <p className="mt-2 text-lg font-bold text-foreground">
                {metrics.optimizer}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Learning Rate: {metrics.learningRate}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Batch Size
              </p>
              <p className="mt-2 text-lg font-bold text-foreground">
                {metrics.batchSize}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Per training iteration
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Data Section */}
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
              <Database className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-xl">Training Data</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              Dataset Information
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">
                  Training Dataset
                </span>
                <Badge variant="secondary">{metrics.trainingDataset}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Test Data Size</span>
                <Badge variant="secondary">{metrics.testDataSize}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">
                  Training Epochs
                </span>
                <Badge variant="secondary">{metrics.trainingEpochs}</Badge>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">
              Data Augmentation Techniques
            </p>
            <div className="flex flex-wrap gap-2">
              {metrics.dataAugmentation.split(', ').map((tech, idx) => (
                <Badge key={idx} className="bg-primary/20 text-primary hover:bg-primary/30">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics Section */}
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-xl">Performance Metrics</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="metric"
                className="text-xs"
                style={{ color: 'var(--foreground)' }}
              />
              <YAxis
                domain={[0, 100]}
                className="text-xs"
                style={{ color: 'var(--foreground)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--foreground)',
                }}
              />
              <Bar
                dataKey="value"
                fill="var(--primary)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-green-50 p-4 dark:bg-green-950/20">
              <p className="text-xs font-semibold uppercase text-green-700 dark:text-green-300 mb-2">
                Accuracy
              </p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                {metrics.accuracy}%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Overall correct predictions
              </p>
            </div>

            <div className="rounded-lg border border-border bg-blue-50 p-4 dark:bg-blue-950/20">
              <p className="text-xs font-semibold uppercase text-blue-700 dark:text-blue-300 mb-2">
                F1 Score
              </p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                {metrics.f1Score}%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Balance of precision & recall
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Reliability Section */}
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
              <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-xl">Model Reliability</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">
                Precision
              </p>
              <p className="text-2xl font-bold text-foreground">
                {metrics.precision}%
              </p>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                When model predicts a disease, this is the chance it's correct
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">
                Recall
              </p>
              <p className="text-2xl font-bold text-foreground">
                {metrics.recall}%
              </p>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Percentage of actual diseases the model correctly identifies
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={confusionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {confusionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">
              Key Insights
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm text-foreground">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Model achieves 96%+ accuracy on test dataset
              </li>
              <li className="flex gap-2 text-sm text-foreground">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Trained on 54,305 diverse plant images
              </li>
              <li className="flex gap-2 text-sm text-foreground">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Detects 38 different plant diseases and conditions
              </li>
              <li className="flex gap-2 text-sm text-foreground">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Optimized for real-world deployment on edge devices
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Plant Classification Section */}
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-xl">Plant Classification Performance</CardTitle>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Model confidence distribution across the 5 target crop types
          </p>
        </CardHeader>
        <CardContent>
          <PlantClassificationChart
            plantClassificationProbs={[
              { plantType: 'Maize', probability: 1.0 },
              { plantType: 'Tomato', probability: 1.7e-8 },
              { plantType: 'Pepper', probability: 1.2e-9 },
              { plantType: 'Potato', probability: 9.5e-10 },
              { plantType: 'Apple', probability: 2.2e-10 },
            ]}
          />
          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">
              Classification Insights
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm text-foreground">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Fine-tuned on 5 major crop types with high discriminative power
              </li>
              <li className="flex gap-2 text-sm text-foreground">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Each crop has dedicated disease detection sub-models
              </li>
              <li className="flex gap-2 text-sm text-foreground">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                Achieves near-perfect plant classification with low false positives
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
