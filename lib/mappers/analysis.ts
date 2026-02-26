import type { PredictionItem, AnalysisResult, DiseaseProb, PlantClassificationProb, LLMAnalysis } from '@/types'

// ---------------------------------------------------------------------------
// Label normalisation helpers
// ---------------------------------------------------------------------------

/**
 * Converts a raw disease class key from the backend (e.g. "Tomato_Early_blight",
 * "Corn_(maize)___Common_rust_") into a human-readable label.
 */
function formatDiseaseLabel(raw: string): string {
	return raw
		.replace(/^[A-Za-z_()]+___?/, '') // strip plant prefix
		.replace(/_/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		|| 'Unknown'
}

/**
 * Converts a raw plant class key (e.g. "Corn_(maize)", "Pepper__bell") into a
 * display-friendly plant name.
 */
function formatPlantLabel(raw: string): string {
	return raw
		.replace(/[_()]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

// ---------------------------------------------------------------------------
// Health status derivation
// ---------------------------------------------------------------------------

type HealthStatus = 'healthy' | 'stressed' | 'diseased'
type UrgencyLevel = 'low' | 'medium' | 'high'

function deriveHealthStatus(topDisease: string): HealthStatus {
	const label = topDisease.toLowerCase()
	if (label.includes('healthy')) return 'healthy'
	// Stress conditions are nutrients/water related — not infectious disease
	if (label.includes('stress') || label.includes('deficiency')) return 'stressed'
	return 'diseased'
}

function deriveUrgency(confidence: number, status: HealthStatus): UrgencyLevel {
	if (status === 'healthy') return 'low'
	if (status === 'stressed') return confidence > 0.75 ? 'medium' : 'low'
	return confidence > 0.75 ? 'high' : 'medium'
}

// ---------------------------------------------------------------------------
// Irrigation heuristics (derived from status — backend does not return this yet)
// ---------------------------------------------------------------------------

interface IrrigationHints {
	irrigationNeeded: number
	waterFrequency: string
	waterTiming: string
	soilMoisture: number
	irrigationNotes: string[]
}

function deriveIrrigationHints(status: HealthStatus): IrrigationHints {
	switch (status) {
		case 'healthy':
			return {
				irrigationNeeded: 25,
				waterFrequency: 'Every 2-3 days',
				waterTiming: 'Early morning (6-8 AM)',
				soilMoisture: 65,
				irrigationNotes: [
					'Soil moisture is at optimal level',
					'Reduce watering frequency during rainy season',
					'Ensure good drainage to prevent root rot',
				],
			}
		case 'stressed':
			return {
				irrigationNeeded: 35,
				waterFrequency: 'Daily',
				waterTiming: 'Early morning and evening',
				soilMoisture: 42,
				irrigationNotes: [
					'Soil moisture is below optimal — increase watering',
					'Consider installing drip irrigation for consistency',
					'Apply 2-3 inches of mulch around the base',
				],
			}
		case 'diseased':
			return {
				irrigationNeeded: 15,
				waterFrequency: 'Every 3-4 days',
				waterTiming: 'Early morning (water soil, not leaves)',
				soilMoisture: 70,
				irrigationNotes: [
					'Avoid overhead watering to reduce humidity',
					'Water at soil level only',
					'Do not water in the evening to prevent fungal growth',
				],
			}
	}
}

// ---------------------------------------------------------------------------
// Recommendation text
// ---------------------------------------------------------------------------

function buildRecommendation(plantName: string, status: HealthStatus, diseaseName: string | undefined): string {
	if (status === 'healthy') {
		return `Your ${plantName} shows excellent health. Continue current care routine and monitor for early signs of disease.`
	}
	if (status === 'stressed') {
		return `Your ${plantName} shows signs of stress${diseaseName ? ` (${diseaseName})` : ''}. Review irrigation schedule and soil nutrition levels.`
	}
	return `Your ${plantName} has been detected with ${diseaseName || 'a disease'}. Take corrective action promptly and consider consulting an agronomist.`
}

// ---------------------------------------------------------------------------
// Main mapper
// ---------------------------------------------------------------------------

/**
 * Maps backend API PredictionItem arrays into the AnalysisResult UI model.
 *
 * @param plantPredictions  Sorted predictions from /predict_plant_class
 * @param diseasePredictions Sorted predictions from /predict_plant_desease
 */
export function mapToAnalysisResult(
	plantPredictions: PredictionItem[],
	diseasePredictions: PredictionItem[],
	llmAnalysis?: LLMAnalysis
): AnalysisResult {
	const topPlant = plantPredictions[0]
	const topDisease = diseasePredictions[0]

	const plantName = topPlant ? formatPlantLabel(topPlant.name) : 'Unknown Plant'
	const diseaseLabel = topDisease ? formatDiseaseLabel(topDisease.name) : 'Healthy'
	const isHealthy = diseaseLabel.toLowerCase() === 'healthy' || topDisease?.name?.toLowerCase().includes('healthy')

	const healthStatus = deriveHealthStatus(topDisease?.name ?? 'healthy')
	const urgency = deriveUrgency(topDisease?.confidence ?? 0, healthStatus)
	const irrigation = deriveIrrigationHints(healthStatus)
	const confidence = topDisease?.confidence ?? topPlant?.confidence ?? 0

	// Map to UI DiseaseProb shape
	const diseaseProbs: DiseaseProb[] = diseasePredictions.map((p) => ({
		disease: formatDiseaseLabel(p.name),
		probability: p.confidence,
	}))

	// Map to UI PlantClassificationProb shape
	const plantClassificationProbs: PlantClassificationProb[] = plantPredictions.map((p) => ({
		plantType: formatPlantLabel(p.name),
		probability: p.confidence,
	}))

	return {
		plantType: plantName,
		healthStatus,
		disease: isHealthy ? undefined : diseaseLabel,
		confidence,
		recommendation: llmAnalysis?.recommendation ?? '',
		irrigationNeeded: llmAnalysis?.water_needed_mm ?? 0,
		waterFrequency: llmAnalysis?.frequency ?? '',
		waterTiming: llmAnalysis?.best_watering_time ?? irrigation.waterTiming,
		soilMoisture: irrigation.soilMoisture,
		urgency,
		irrigationNotes: llmAnalysis?.notes ?? [],
		llmAnalysis,
		analysisDetails: {
			leafColor: isHealthy ? 'Vibrant green, no discoloration' : 'Discoloration or lesions detected',
			stemCondition: healthStatus === 'healthy' ? 'Strong and upright' : 'Signs of stress observed',
			overallVitality: Math.round((1 - (topDisease?.confidence ?? 0)) * 50 + (isHealthy ? 50 : 0)),
		},
		plantClassificationProbs,
		diseaseProbs,
	}
}
