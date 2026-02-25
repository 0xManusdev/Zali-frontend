'use client'

import { useState, useEffect } from 'react'
import { ImageUpload } from './image-upload'
import { AnalysisCard } from './analysis-card'
import { IrrigationRecommendation } from './irrigation-recommendation'
import { AnalysisHistory, type HistoryItem } from './analysis-history'
import { apiService, type AnalysisRequest, type AnalysisResult } from '@/lib/api-service'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2 } from 'lucide-react'

export function DashboardClient() {
	const [selectedImage, setSelectedImage] = useState<{
		file: File
		preview: string
	} | null>(null)
	const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
	const [history, setHistory] = useState<HistoryItem[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Load history on mount
		const loadHistory = async () => {
			try {
				const data = await apiService.getHistory()
				setHistory(data)
			} catch (err) {
				console.error('Failed to load history:', err)
			}
		}
		loadHistory()
	}, [])

	const handleImageSelect = async (file: File, preview: string) => {
		setSelectedImage({ file, preview })
		setError(null)

		// Auto-analyze when image is selected
		await analyzeImage(file, preview)
	}

	const analyzeImage = async (file: File, preview: string) => {
		setLoading(true)
		setError(null)

		try {
			const request: AnalysisRequest = {
				image: preview,
				fileName: file.name,
			}

			const result = await apiService.analyzeImage(request)
			setAnalysis(result)

			// Add to history
			const newHistoryItem: HistoryItem = {
				id: Date.now().toString(),
				plantType: result.plantType,
				status: result.healthStatus,
				disease: result.disease,
				confidence: result.confidence,
				timestamp: new Date(),
				thumbnail: preview,
			}

			setHistory((prev) => [newHistoryItem, ...prev.slice(0, 9)])
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to analyze image'
			)
		} finally {
			setLoading(false)
		}
	}

	const handleRetry = async () => {
		if (selectedImage) {
			await analyzeImage(selectedImage.file, selectedImage.preview)
		}
	}

	return (
		<div className="space-y-8 pb-8">
			{/* Upload Section */}
			<Card className="border-0 shadow-medium overflow-hidden">
				<CardHeader className="bg-linear-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/20 dark:to-cyan-950/20 pb-8 pt-10 px-8">
					<CardTitle className="text-3xl font-semibold tracking-tight">Plant Health Analysis</CardTitle>
					<p className="mt-3 text-base text-muted-foreground font-medium">
						Upload a crop image for instant AI analysis with disease detection and irrigation recommendations
					</p>
				</CardHeader>
				<CardContent className="pt-8 pb-8 px-8">
					<ImageUpload onImageSelect={handleImageSelect} isLoading={loading} />
				</CardContent>
			</Card>

			{/* Loading State */}
			{loading && (
				<Card className="border-0 bg-linear-to-r from-primary/10 to-primary/5 shadow-medium">
					<CardContent className="flex items-center justify-center gap-4 py-16">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
						<div>
							<p className="font-semibold text-foreground text-lg">Analyzing plant image...</p>
							<p className="text-sm text-muted-foreground mt-1">
								Using AI to detect health status, diseases, and irrigation needs
							</p>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Error State */}
			{error && (
				<Card className="border border-red-200/50 bg-red-50/80 dark:border-red-900/30 dark:bg-red-950/20 shadow-medium">
					<CardContent className="flex gap-4 py-6 px-8">
						<AlertCircle className="h-6 w-6 shrink-0 text-red-600 dark:text-red-400 mt-1" />
						<div className="flex-1">
							<p className="font-semibold text-red-900 dark:text-red-100 text-base">
								Analysis Failed
							</p>
							<p className="mt-2 text-sm text-red-800 dark:text-red-200">
								{error}
							</p>
							<button
								onClick={handleRetry}
								className="mt-4 inline-flex text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline transition-colors"
							>
								Try Again
							</button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Analysis Results */}
			{analysis && !loading && (
				<>
					<AnalysisCard data={analysis} />

					<IrrigationRecommendation
						data={{
							waterNeeded: analysis.irrigationNeeded,
							frequency: analysis.waterFrequency,
							timing: analysis.waterTiming,
							soilMoisture: analysis.soilMoisture,
							urgency: analysis.urgency,
							notes: analysis.irrigationNotes,
						}}
					/>

					{/* Analysis Details */}
					<Card className="border-0 shadow-medium">
						<CardHeader className="pt-8 px-8">
							<CardTitle className="text-2xl font-semibold">Plant Assessment Details</CardTitle>
						</CardHeader>
						<CardContent className="px-8 pb-8">
							<div className="grid gap-4 sm:grid-cols-3">
								<div className="rounded-2xl border border-border/40 bg-muted/30 p-5 hover:shadow-soft transition-shadow">
									<p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
										Leaf Condition
									</p>
									<p className="mt-3 text-base font-medium text-foreground">
										{analysis.analysisDetails.leafColor}
									</p>
								</div>
								<div className="rounded-2xl border border-border/40 bg-muted/30 p-5 hover:shadow-soft transition-shadow">
									<p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
										Stem Status
									</p>
									<p className="mt-3 text-base font-medium text-foreground">
										{analysis.analysisDetails.stemCondition}
									</p>
								</div>
								<div className="rounded-2xl border border-border/40 bg-linear-to-br from-primary/5 to-primary/2 p-5 hover:shadow-soft transition-shadow">
									<p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
										Vitality Score
									</p>
									<p className="mt-3 text-4xl font-semibold text-primary">
										{analysis.analysisDetails.overallVitality}%
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</>
			)}

			{/* History Section */}
			<div className="mt-12">
				<Tabs defaultValue="recent" className="w-full">
					<TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1.5">
						<TabsTrigger value="recent" className="rounded-lg">Recent Analyses</TabsTrigger>
						<TabsTrigger value="all" className="rounded-lg">Full History</TabsTrigger>
					</TabsList>

					<TabsContent value="recent" className="mt-8">
						{history.length > 0 ? (
							<AnalysisHistory items={history.slice(0, 5)} />
						) : (
							<Card className="border-0 bg-muted/30 shadow-soft">
								<CardContent className="py-16 text-center">
									<p className="text-lg text-muted-foreground">
										No analyses yet. Upload a plant image to get started!
									</p>
								</CardContent>
							</Card>
						)}
					</TabsContent>

					<TabsContent value="all" className="mt-8">
						{history.length > 0 ? (
							<AnalysisHistory items={history} />
						) : (
							<Card className="border-0 bg-muted/30 shadow-soft">
								<CardContent className="py-16 text-center">
									<p className="text-lg text-muted-foreground">
										No analyses yet. Upload a plant image to get started!
									</p>
								</CardContent>
							</Card>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
