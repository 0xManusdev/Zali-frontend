'use client'

import { useState, useRef, useCallback } from 'react'
import { classifyPlant, predictDisease } from '@/lib/api'
import { mapToAnalysisResult } from '@/lib/mappers/analysis'
import type { AnalysisResult } from '@/types'

interface UseAnalysisOptions {
	onSuccess?: (result: AnalysisResult, preview: string) => void
}

interface UseAnalysisReturn {
	analysis: AnalysisResult | null
	isLoading: boolean
	error: string | null
	analyzeImage: (file: File, preview: string) => Promise<void>
	retry: () => void
	reset: () => void
}

/**
 * Encapsulates the full plant image analysis flow:
 *  1. Calls /predict_plant_class and /predict_plant_desease in parallel
 *  2. Maps raw API results into the AnalysisResult UI model
 *  3. Manages loading / error state and exposes a retry function
 *  4. Calls onSuccess(result, preview) when analysis succeeds (e.g. to add to history)
 */
export function useAnalysis({ onSuccess }: UseAnalysisOptions = {}): UseAnalysisReturn {
	const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Store last call args so retry() can replay the same request
	const lastArgs = useRef<{ file: File; preview: string } | null>(null)
	// Keep latest onSuccess ref so it's always up-to-date without re-creating run()
	const onSuccessRef = useRef(onSuccess)
	onSuccessRef.current = onSuccess

	const run = useCallback(async (file: File, preview: string) => {
		setIsLoading(true)
		setError(null)

		try {
			// Run both API calls in parallel for speed
			const [plantPreds, diseasePreds] = await Promise.all([
				classifyPlant(file),
				predictDisease(file),
			])
			const result = mapToAnalysisResult(plantPreds, diseasePreds)
			setAnalysis(result)
			onSuccessRef.current?.(result, preview)
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Failed to analyze image'
			setError(message)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const analyzeImage = useCallback(
		async (file: File, preview: string) => {
			lastArgs.current = { file, preview }
			await run(file, preview)
		},
		[run]
	)

	const retry = useCallback(() => {
		if (lastArgs.current) {
			run(lastArgs.current.file, lastArgs.current.preview)
		}
	}, [run])

	const reset = useCallback(() => {
		setAnalysis(null)
		setError(null)
		lastArgs.current = null
	}, [])

	return { analysis, isLoading, error, analyzeImage, retry, reset }
}
