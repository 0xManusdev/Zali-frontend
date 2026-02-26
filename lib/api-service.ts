import { mockAnalysisResults, mockHistory } from './mock-data'
import type { AnalysisRequest, AnalysisResult, HistoryItem, IntegratedAnalysisResponse, PredictionItem } from '@/types'
import { mapToAnalysisResult } from './mappers/analysis'

class APIService {
	private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

	async analyzeImage(request: AnalysisRequest): Promise<AnalysisResult> {
		if (!this.baseUrl) {
			throw new Error('NEXT_PUBLIC_API_URL is not set. Cannot fetch Gemini recommendations.')
		}
		try {
			const formData = new FormData()
			// Note: In the current UI, 'request.image' might be a File or a base64 string.
			// For the FastAPI backend, we expect a multipart 'file'.
			
			// Assuming request.image can be converted to Blob if it's base64, 
			// or it's already a File/Blob from the input.
			let fileToUpload: Blob | string = request.image
			
			if (typeof request.image === 'string' && request.image.startsWith('data:')) {
				const response = await fetch(request.image)
				fileToUpload = await response.blob()
			}

			const body = new FormData()
			if (fileToUpload instanceof Blob) {
				body.append('file', fileToUpload, request.fileName || 'upload.jpg')
			} else {
				body.append('file', fileToUpload)
			}

			const response = await fetch(`${this.baseUrl}/analyze?generate_llm=true`, {
				method: 'POST',
				body: body,
			})

			if (!response.ok) {
				throw new Error(`API error: ${response.statusText}`)
			}

			const data: IntegratedAnalysisResponse = await response.json()
			
			// Map backend simple plant class dict to PredictionItem[]
			const plantPredictions: PredictionItem[] = Object.entries(data.plant_predictions)
				.map(([name, confidence]) => ({ name, confidence }))
				.sort((a, b) => b.confidence - a.confidence)

			// Map backend simple disease class dict to PredictionItem[]
			const diseasePredictions: PredictionItem[] = Object.entries(data.disease_predictions)
				.map(([name, confidence]) => ({ name, confidence }))
				.sort((a, b) => b.confidence - a.confidence)

			return mapToAnalysisResult(plantPredictions, diseasePredictions, data.llm_analysis ?? undefined)
		} catch (error) {
			console.error('[Zali] API error:', error)
			throw error
		}
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
