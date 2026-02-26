import { mockAnalysisResults, mockHistory } from './mock-data'
import type { AnalysisRequest, AnalysisResult, HistoryItem } from '@/types'

class APIService {
	private baseUrl = process.env.NEXT_PUBLIC_API_URL || ''

	async analyzeImage(request: AnalysisRequest): Promise<AnalysisResult> {
		try {
			if (this.baseUrl) {
				// Try real API first
				const response = await fetch(`${this.baseUrl}/api/analyze`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(request),
				})

				if (!response.ok) {
					throw new Error(`API error: ${response.statusText}`)
				}

				return await response.json()
			}
		} catch (error) {
			console.log('[v0] Real API unavailable, using mock data')
		}

		// Fallback to mock data
		return this.getMockAnalysis()
	}

	async getHistory(): Promise<HistoryItem[]> {
		try {
			if (this.baseUrl) {
				const response = await fetch(`${this.baseUrl}/api/history`, {
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (!response.ok) {
					throw new Error(`API error: ${response.statusText}`)
				}

				return await response.json()
			}
		} catch (error) {
			console.log('[v0] Real API unavailable, using mock history')
		}

		// Fallback to mock data
		return mockHistory
	}

	private getMockAnalysis(): AnalysisResult {
		// Return a random analysis from mock data
		const randomIndex = Math.floor(
			Math.random() * mockAnalysisResults.length
		)
		return mockAnalysisResults[randomIndex]
	}

	async getModelMetrics() {
		// Model metrics are always from mock data (static)
		const { modelMetrics } = await import('./mock-data')
		return modelMetrics
	}

	async getDiseaseCategories() {
		// Disease categories are always from mock data (static)
		const { diseaseCategories } = await import('./mock-data')
		return diseaseCategories
	}
}

export const apiService = new APIService()
