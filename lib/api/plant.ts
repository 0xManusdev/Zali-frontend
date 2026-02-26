import { ENDPOINTS } from '@/lib/constants'
import { apiPost } from './client'
import type { PlantClassResponse, DiseaseResponse, PredictionItem } from '@/types'

/**
 * Sort a raw { className: confidence } response into a descending array of PredictionItems.
 */
function sortPredictions(raw: Record<string, number>): PredictionItem[] {
	return Object.entries(raw)
		.map(([name, confidence]) => ({ name, confidence }))
		.sort((a, b) => b.confidence - a.confidence)
}

/**
 * POST /predict_plant_class
 * Accepts a plant image file and returns a sorted list of plant classification probabilities.
 */
export async function classifyPlant(file: File): Promise<PredictionItem[]> {
	const form = new FormData()
	form.append('file', file)
	const raw = await apiPost<PlantClassResponse>(ENDPOINTS.predictPlantClass, form)
	return sortPredictions(raw)
}

/**
 * POST /predict_plant_desease
 * Accepts a plant image file and returns a sorted list of disease probabilities.
 * Internally uses a two-stage pipeline: plant classification → disease detection.
 */
export async function predictDisease(file: File): Promise<PredictionItem[]> {
	const form = new FormData()
	form.append('file', file)
	const raw = await apiPost<DiseaseResponse>(ENDPOINTS.predictPlantDisease, form)
	return sortPredictions(raw)
}
