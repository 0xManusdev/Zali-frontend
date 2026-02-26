'use client'

import { useCallback } from 'react'
import { ImageUpload } from './image-upload'
import { AnalysisCard } from '@/components/analysis/analysis-card'
import { IrrigationRecommendation } from '@/components/irrigation/irrigation-recommendation'
import { AnalysisHistory } from '@/components/analysis/analysis-history'
import { OnboardingDialog } from '@/components/onboarding/onboarding-dialog'
import { useAnalysis } from '@/hooks/use-analysis'
import { useHistory } from '@/hooks/use-history'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2 } from 'lucide-react'
import type { AnalysisResult } from '@/types'

export function DashboardClient() {
	const { history, addToHistory } = useHistory()

	const handleSuccess = useCallback(
		(result: AnalysisResult, preview: string) => {
			addToHistory(result, preview)
		},
		[addToHistory]
	)

	const { analysis, isLoading, error, analyzeImage, retry } = useAnalysis({
		onSuccess: handleSuccess,
	})

	return (
		<>
			<OnboardingDialog />
			<div className="space-y-6 pb-8" id="main-content" role="main">
				{/* Upload Section */}
				<Card className="bg-white">
					<CardHeader className="p-6 pb-4">
						<CardTitle className="text-lg">Plant Health Analysis</CardTitle>
						<p className="mt-1 text-sm text-muted-foreground">
							Upload a crop image for instant AI analysis with disease detection and irrigation recommendations
						</p>
					</CardHeader>
					<CardContent className="p-6 pt-2">
						<ImageUpload onImageSelect={analyzeImage} isLoading={isLoading} />
					</CardContent>
				</Card>

				{/* Loading State */}
				<div aria-live="polite" aria-atomic="true">
					{isLoading && (
						<Card role="status">
							<CardContent className="flex items-center gap-4 py-8 px-6">
								<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-hidden="true" />
								<div>
									<p className="text-sm font-medium text-foreground">Analyzing plant image...</p>
									<p className="text-xs text-muted-foreground mt-0.5">This usually takes a few seconds</p>
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Error State */}
				<div aria-live="assertive" aria-atomic="true">
					{error && (
						<Card className="border-destructive/30" role="alert">
							<CardContent className="flex gap-3 py-4 px-6">
								<AlertCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" aria-hidden="true" />
								<div className="flex-1">
									<p className="text-sm font-medium text-foreground">Analysis failed</p>
									<p className="mt-1 text-xs text-muted-foreground">{error}</p>
									<button
										onClick={retry}
										className="mt-2 text-xs font-medium text-primary hover:underline"
									>
										Try again
									</button>
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Analysis Results */}
				{analysis && !isLoading && (
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

						{/* Plant Assessment Details */}
						<Card>
							<CardHeader className="p-6 pb-4">
								<CardTitle className="text-lg">Plant Assessment Details</CardTitle>
							</CardHeader>
							<CardContent className="px-6 pb-6">
								<div className="grid gap-4 sm:grid-cols-3">
									<div className="rounded-lg border border-border p-4">
										<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
											Leaf Condition
										</p>
										<p className="mt-2 text-sm font-medium text-foreground">
											{analysis.analysisDetails.leafColor}
										</p>
									</div>
									<div className="rounded-lg border border-border p-4">
										<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
											Stem Status
										</p>
										<p className="mt-2 text-sm font-medium text-foreground">
											{analysis.analysisDetails.stemCondition}
										</p>
									</div>
									<div className="rounded-lg border border-border p-4">
										<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
											Vitality Score
										</p>
										<p className="mt-2 text-2xl font-semibold text-primary">
											{analysis.analysisDetails.overallVitality}%
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</>
				)}

				{/* History Section */}
				<div className="mt-8">
					<Tabs defaultValue="recent" className="w-full">
						<TabsList className="w-fit">
							<TabsTrigger value="recent">Recent Analyses</TabsTrigger>
							<TabsTrigger value="all">Full History</TabsTrigger>
						</TabsList>

						<TabsContent value="recent" className="mt-6">
							{history.length > 0 ? (
								<AnalysisHistory items={history.slice(0, 5)} showFilters={false} />
							) : (
								<Card>
									<CardContent className="py-12 text-center">
										<p className="text-sm text-muted-foreground">
											No analyses yet. Upload a plant image to get started.
										</p>
									</CardContent>
								</Card>
							)}
						</TabsContent>

						<TabsContent value="all" className="mt-6">
							{history.length > 0 ? (
								<AnalysisHistory items={history} />
							) : (
								<Card>
									<CardContent className="py-12 text-center">
										<p className="text-sm text-muted-foreground">
											No analyses yet. Upload a plant image to get started.
										</p>
									</CardContent>
								</Card>
							)}
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</>
	)
}
