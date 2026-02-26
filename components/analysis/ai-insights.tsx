'use client'

import { useEffect, useState } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlantClassificationChart } from './plant-classification-chart'
import { apiService } from '@/lib/api-service'
import { mockPlantClassificationData } from '@/lib/mock-data'
import type { ModelMetrics } from '@/types'
import { Brain, Zap, TrendingUp, Database } from 'lucide-react'

const CHART_COLORS = ['#3E7A60', '#507D9B', '#BC8E54', '#B35A6A', '#7B6B95']

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
				<p className="text-sm text-muted-foreground">Loading AI insights...</p>
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
		{ name: 'Correct', value: 96.2, fill: CHART_COLORS[0] },
		{ name: 'Incorrect', value: 3.8, fill: CHART_COLORS[3] },
	]

	return (
		<div className="space-y-6">
			{/* Model Architecture */}
			<Card>
				<CardHeader className="p-6 pb-4">
					<div className="flex items-center gap-3">
						<Brain className="h-5 w-5 text-primary" />
						<CardTitle className="text-lg">Model Architecture</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="px-6 pb-6 space-y-4">
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="rounded-lg border border-border p-4">
							<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
								Neural Network
							</p>
							<p className="mt-2 text-base font-semibold text-foreground">
								{metrics.architecture}
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Optimized for mobile and edge devices
							</p>
						</div>

						<div className="rounded-lg border border-border p-4">
							<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
								Classes Detected
							</p>
							<p className="mt-2 text-base font-semibold text-primary">
								{metrics.classesDetected}
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Plant diseases and conditions
							</p>
						</div>

						<div className="rounded-lg border border-border p-4">
							<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
								Optimizer
							</p>
							<p className="mt-2 text-base font-semibold text-foreground">
								{metrics.optimizer}
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Learning Rate: {metrics.learningRate}
							</p>
						</div>

						<div className="rounded-lg border border-border p-4">
							<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
								Batch Size
							</p>
							<p className="mt-2 text-base font-semibold text-foreground">
								{metrics.batchSize}
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Per training iteration
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Training Data */}
			<Card>
				<CardHeader className="p-6 pb-4">
					<div className="flex items-center gap-3">
						<Database className="h-5 w-5 text-muted-foreground" />
						<CardTitle className="text-lg">Training Data</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="px-6 pb-6 space-y-4">
					<div className="rounded-lg border border-border bg-muted/50 p-4">
						<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-3">
							Dataset Information
						</p>
						<div className="space-y-2.5">
							<div className="flex justify-between items-center">
								<span className="text-sm text-foreground">Training Dataset</span>
								<Badge variant="secondary">{metrics.trainingDataset}</Badge>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-foreground">Test Data Size</span>
								<Badge variant="secondary">{metrics.testDataSize}</Badge>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-foreground">Training Epochs</span>
								<Badge variant="secondary">{metrics.trainingEpochs}</Badge>
							</div>
						</div>
					</div>

					<div className="rounded-lg border border-border p-4">
						<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-3">
							Data Augmentation Techniques
						</p>
						<div className="flex flex-wrap gap-2">
							{metrics.dataAugmentation.split(', ').map((tech, idx) => (
								<Badge key={idx} variant="secondary">
									{tech}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Performance Metrics */}
			<Card>
				<CardHeader className="p-6 pb-4">
					<div className="flex items-center gap-3">
						<TrendingUp className="h-5 w-5 text-primary" />
						<CardTitle className="text-lg">Performance Metrics</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="px-6 pb-6 space-y-4">
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={performanceData}>
							<CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
							<XAxis
								dataKey="metric"
								tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
							/>
							<YAxis
								domain={[0, 100]}
								tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: 'var(--color-card)',
									border: '1px solid var(--color-border)',
									borderRadius: '6px',
									fontSize: '13px',
								}}
							/>
							<Bar
								dataKey="value"
								fill={CHART_COLORS[0]}
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="rounded-lg border border-border p-4">
							<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-2">
								Accuracy
							</p>
							<p className="text-2xl font-semibold text-foreground">
								{metrics.accuracy}%
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Overall correct predictions
							</p>
						</div>

						<div className="rounded-lg border border-border p-4">
							<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-2">
								F1 Score
							</p>
							<p className="text-2xl font-semibold text-foreground">
								{metrics.f1Score}%
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								Balance of precision & recall
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Model Reliability */}
			<Card>
				<CardHeader className="p-6 pb-4">
					<div className="flex items-center gap-3">
						<Zap className="h-5 w-5 text-muted-foreground" />
						<CardTitle className="text-lg">Model Reliability</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="px-6 pb-6 space-y-4">
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="rounded-lg border border-border p-4">
							<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-2">
								Precision
							</p>
							<p className="text-2xl font-semibold text-foreground">
								{metrics.precision}%
							</p>
							<p className="mt-1 text-xs text-muted-foreground leading-relaxed">
								When model predicts a disease, this is the chance it&apos;s correct
							</p>
						</div>

						<div className="rounded-lg border border-border p-4">
							<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-2">
								Recall
							</p>
							<p className="text-2xl font-semibold text-foreground">
								{metrics.recall}%
							</p>
							<p className="mt-1 text-xs text-muted-foreground leading-relaxed">
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
										backgroundColor: 'var(--color-card)',
										border: '1px solid var(--color-border)',
										borderRadius: '6px',
										fontSize: '13px',
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>

					<div className="rounded-lg border border-border bg-muted/50 p-4">
						<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-3">
							Key Insights
						</p>
						<ul className="space-y-2">
							<li className="flex gap-2 text-sm text-foreground">
								<span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
								Model achieves 96%+ accuracy on test dataset
							</li>
							<li className="flex gap-2 text-sm text-foreground">
								<span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
								Trained on 54,305 diverse plant images
							</li>
							<li className="flex gap-2 text-sm text-foreground">
								<span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
								Detects 38 different plant diseases and conditions
							</li>
							<li className="flex gap-2 text-sm text-foreground">
								<span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
								Optimized for real-world deployment on edge devices
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>

			{/* Plant Classification */}
			<Card>
				<CardHeader className="p-6 pb-4">
					<div className="flex items-center gap-3">
						<TrendingUp className="h-5 w-5 text-primary" />
						<CardTitle className="text-lg">Plant Classification Performance</CardTitle>
					</div>
					<p className="mt-1 text-sm text-muted-foreground">
						Model confidence distribution across the 5 target crop types
					</p>
				</CardHeader>
				<CardContent className="px-6 pb-6">
					<PlantClassificationChart
						plantClassificationProbs={mockPlantClassificationData}
					/>
					<div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
						<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-3">
							Classification Insights
						</p>
						<ul className="space-y-2">
							<li className="flex gap-2 text-sm text-foreground">
								<span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
								Fine-tuned on 5 major crop types with high discriminative power
							</li>
							<li className="flex gap-2 text-sm text-foreground">
								<span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
								Each crop has dedicated disease detection sub-models
							</li>
							<li className="flex gap-2 text-sm text-foreground">
								<span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
								Achieves near-perfect plant classification with low false positives
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
