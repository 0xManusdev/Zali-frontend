'use client'

import { useState, useCallback } from 'react'
import type { HistoryItem, AnalysisResult } from '@/types'

interface UseHistoryReturn {
	history: HistoryItem[]
	addToHistory: (result: AnalysisResult, thumbnail: string) => void
	clearHistory: () => void
}

/**
 * Manages the local in-session analysis history list.
 * Keeps the most recent 10 entries only.
 */
export function useHistory(initialItems: HistoryItem[] = []): UseHistoryReturn {
	const [history, setHistory] = useState<HistoryItem[]>(initialItems)

	const addToHistory = useCallback(
		(result: AnalysisResult, thumbnail: string) => {
			const item: HistoryItem = {
				id: Date.now().toString(),
				plantType: result.plantType,
				status: result.healthStatus,
				disease: result.disease,
				confidence: result.confidence,
				timestamp: new Date(),
				thumbnail,
			}
			setHistory((prev) => [item, ...prev.slice(0, 9)])
		},
		[]
	)

	const clearHistory = useCallback(() => setHistory([]), [])

	return { history, addToHistory, clearHistory }
}
