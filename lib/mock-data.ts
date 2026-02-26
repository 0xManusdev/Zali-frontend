import type { AnalysisResult, HistoryItem, ModelMetrics, PlantClassificationProb } from '@/types'

export const mockAnalysisResults: AnalysisResult[] = [
	{
		plantType: 'Tomato Plant',
		healthStatus: 'healthy',
		confidence: 0.94,
		recommendation:
			'Your tomato plant shows excellent health with vibrant green foliage and strong stem structure. Continue current watering schedule and monitor for pests regularly.',
		irrigationNeeded: 25,
		waterFrequency: 'Every 2-3 days',
		waterTiming: 'Early morning (6-8 AM)',
		soilMoisture: 65,
		urgency: 'low',
		irrigationNotes: [
			'Soil moisture is at optimal level',
			'Reduce watering frequency during rainy season',
			'Ensure good drainage to prevent root rot',
		],
		analysisDetails: {
			leafColor: 'Vibrant green with no discoloration',
			stemCondition: 'Strong and upright',
			overallVitality: 95,
		},
		plantClassificationProbs: [
			{ plantType: 'Tomato', probability: 0.994 },
			{ plantType: 'Pepper', probability: 3.2e-3 },
			{ plantType: 'Maize', probability: 2.1e-4 },
			{ plantType: 'Potato', probability: 5.2e-5 },
			{ plantType: 'Apple', probability: 1.8e-5 },
		],
		diseaseProbs: [
			{ disease: 'Healthy', probability: 0.94 },
			{ disease: 'Early Blight', probability: 0.04 },
			{ disease: 'Late Blight', probability: 0.015 },
			{ disease: 'Septoria Leaf Spot', probability: 0.003 },
			{ disease: 'Bacterial Spot', probability: 0.002 },
		],
		llmDescription: 'This tomato plant displays optimal health conditions. The foliage exhibits rich green coloration with well-developed leaf structures. No visible signs of disease, pest damage, or nutrient deficiencies. The plant is well-suited for continued fruit production with standard maintenance protocols.',
	},
	{
		plantType: 'Corn Plant',
		healthStatus: 'stressed',
		confidence: 0.87,
		disease: 'Water Stress',
		recommendation:
			'Your corn plant shows signs of water stress. The lower leaves are showing slight wilting. Increase watering frequency and ensure consistent soil moisture. Apply mulch to reduce evaporation.',
		irrigationNeeded: 35,
		waterFrequency: 'Daily',
		waterTiming: 'Early morning and evening',
		soilMoisture: 42,
		urgency: 'medium',
		irrigationNotes: [
			'Soil moisture is below optimal - increase watering',
			'Consider installing drip irrigation for consistency',
			'Apply 2-3 inches of mulch around the base',
			'Monitor weather patterns for optimal scheduling',
		],
		analysisDetails: {
			leafColor: 'Slightly yellowing at tips',
			stemCondition: 'Minor wilting observed',
			overallVitality: 68,
		},
		plantClassificationProbs: [
			{ plantType: 'Maize', probability: 1.0 },
			{ plantType: 'Tomato', probability: 1.7e-8 },
			{ plantType: 'Pepper', probability: 1.2e-9 },
			{ plantType: 'Potato', probability: 9.5e-10 },
			{ plantType: 'Apple', probability: 2.2e-10 },
		],
		diseaseProbs: [
			{ disease: 'Water Stress', probability: 0.87 },
			{ disease: 'Nitrogen Deficiency', probability: 0.08 },
			{ disease: 'Common Rust', probability: 0.03 },
			{ disease: 'Gray Leaf Spot', probability: 0.015 },
			{ disease: 'Anthracnose Leaf Blight', probability: 0.005 },
		],
		llmDescription: 'The corn crop shows clear indicators of water stress with characteristic wilting and leaf tip browning. Soil moisture levels are critically low at 42%, well below the recommended 60-70% for optimal corn growth. Immediate irrigation is essential to prevent yield reduction and permanent damage to the developing grain.',
	},
	{
		plantType: 'Wheat Crop',
		healthStatus: 'diseased',
		confidence: 0.91,
		disease: 'Powdery Mildew',
		recommendation:
			'Your wheat crop has been infected with powdery mildew. Apply fungicide treatment immediately and increase air circulation by pruning affected branches. Avoid overhead watering.',
		irrigationNeeded: 15,
		waterFrequency: 'Every 3-4 days',
		waterTiming: 'Early morning (water soil, not leaves)',
		soilMoisture: 78,
		urgency: 'high',
		irrigationNotes: [
			'URGENT: Reduce humidity by avoiding overhead watering',
			'Apply sulfur-based fungicide treatment',
			'Remove affected leaves and dispose properly',
			'Increase air circulation around the crop',
			'Do not water in evening to prevent fungal growth',
		],
		analysisDetails: {
			leafColor: 'White powder coating on leaves',
			stemCondition: 'Powdery residue visible',
			overallVitality: 45,
		},
		plantClassificationProbs: [
			{ plantType: 'Maize', probability: 0.85 },
			{ plantType: 'Potato', probability: 0.1 },
			{ plantType: 'Tomato', probability: 0.03 },
			{ plantType: 'Apple', probability: 0.015 },
			{ plantType: 'Pepper', probability: 0.005 },
		],
		diseaseProbs: [
			{ disease: 'Powdery Mildew', probability: 0.91 },
			{ disease: 'Leaf Rust', probability: 0.05 },
			{ disease: 'Stripe Rust', probability: 0.025 },
			{ disease: 'Septoria Leaf Blotch', probability: 0.01 },
			{ disease: 'Healthy', probability: 0.005 },
		],
		llmDescription: 'The wheat crop exhibits severe powdery mildew infection characterized by white fungal coating across leaf surfaces. This condition develops in warm, humid environments with poor air circulation. Immediate action required: spray with sulfur-based fungicide and reduce watering frequency to lower humidity levels.',
	},
	{
		plantType: 'Rice Paddy',
		healthStatus: 'healthy',
		confidence: 0.89,
		recommendation:
			'Your rice paddy is thriving with proper water management. Maintain current water level and prepare for harvest. Monitor for pest activity and maintain field sanitation.',
		irrigationNeeded: 50,
		waterFrequency: 'Continuous flooding',
		waterTiming: 'Maintain 5-10cm water depth',
		soilMoisture: 85,
		urgency: 'low',
		irrigationNotes: [
			'Maintain optimal water depth of 5-10cm',
			'Check irrigation channels for leaks',
			'Monitor water quality and pH levels',
			'Prepare for harvest cycle',
		],
		analysisDetails: {
			leafColor: 'Deep green with healthy sheen',
			stemCondition: 'Robust and well-developed',
			overallVitality: 92,
		},
	},
	{
		plantType: 'Apple Orchard',
		healthStatus: 'stressed',
		confidence: 0.85,
		disease: 'Early Nutrient Deficiency',
		recommendation:
			'Your apple trees show signs of nitrogen deficiency with yellowing older leaves. Apply balanced fertilizer treatment and increase irrigation. Soil testing recommended.',
		irrigationNeeded: 30,
		waterFrequency: 'Every 7-10 days (deeper watering)',
		waterTiming: 'Early morning',
		soilMoisture: 48,
		urgency: 'medium',
		irrigationNotes: [
			'Apply nitrogen-rich fertilizer',
			'Increase watering depth but maintain intervals',
			'Conduct soil nutrient analysis',
			'Mulch around tree base for moisture retention',
		],
		analysisDetails: {
			leafColor: 'Yellowing of older leaves',
			stemCondition: 'Slightly weak growth',
			overallVitality: 72,
		},
		plantClassificationProbs: [
			{ plantType: 'Apple', probability: 0.99 },
			{ plantType: 'Maize', probability: 0.007 },
			{ plantType: 'Tomato', probability: 0.002 },
			{ plantType: 'Pepper', probability: 0.0008 },
			{ plantType: 'Potato', probability: 0.0002 },
		],
		diseaseProbs: [
			{ disease: 'Nitrogen Deficiency', probability: 0.85 },
			{ disease: 'Powdery Mildew', probability: 0.08 },
			{ disease: 'Apple Scab', probability: 0.05 },
			{ disease: 'Cedar Apple Rust', probability: 0.015 },
			{ disease: 'Sooty Blotch', probability: 0.005 },
		],
		llmDescription: 'The apple orchard displays classic symptoms of nitrogen deficiency, with characteristic yellowing beginning from the oldest leaves and progressing inward. Nitrogen is essential for chlorophyll production and vegetative growth. Immediate application of nitrogen-rich fertilizer (such as ammonium nitrate or urea) will help restore normal coloration within 2-3 weeks.',
	},
]

export const mockHistory: HistoryItem[] = [
	{
		id: '1',
		plantType: 'Tomato Plant',
		status: 'healthy',
		confidence: 0.94,
		timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2322c55e" width="100" height="100"/></svg>',
	},
	{
		id: '2',
		plantType: 'Corn Plant',
		status: 'stressed',
		disease: 'Water Stress',
		confidence: 0.87,
		timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f97316" width="100" height="100"/></svg>',
	},
	{
		id: '3',
		plantType: 'Wheat Crop',
		status: 'diseased',
		disease: 'Powdery Mildew',
		confidence: 0.91,
		timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ef4444" width="100" height="100"/></svg>',
	},
	{
		id: '4',
		plantType: 'Rice Paddy',
		status: 'healthy',
		confidence: 0.89,
		timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2322c55e" width="100" height="100"/></svg>',
	},
	{
		id: '5',
		plantType: 'Apple Orchard',
		status: 'stressed',
		disease: 'Nutrient Deficiency',
		confidence: 0.85,
		timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f97316" width="100" height="100"/></svg>',
	},
	{
		id: '6',
		plantType: 'Tomato Plant',
		status: 'healthy',
		confidence: 0.92,
		timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2322c55e" width="100" height="100"/></svg>',
	},
	{
		id: '7',
		plantType: 'Lettuce Bed',
		status: 'healthy',
		confidence: 0.88,
		timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2322c55e" width="100" height="100"/></svg>',
	},
	{
		id: '8',
		plantType: 'Pepper Plant',
		status: 'stressed',
		disease: 'Early Blight',
		confidence: 0.83,
		timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f97316" width="100" height="100"/></svg>',
	},
	{
		id: '9',
		plantType: 'Carrot Patch',
		status: 'healthy',
		confidence: 0.90,
		timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2322c55e" width="100" height="100"/></svg>',
	},
	{
		id: '10',
		plantType: 'Cucumber Vine',
		status: 'healthy',
		confidence: 0.86,
		timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
		thumbnail: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2322c55e" width="100" height="100"/></svg>',
	},
]

export const modelMetrics: ModelMetrics = {
	architecture: 'MobileNetV3-Large',
	trainingDataset: 'PlantVillage Dataset (54,305 images)',
	dataAugmentation: 'Rotation, flip, zoom, brightness, contrast',
	accuracy: 96.2,
	precision: 95.8,
	recall: 96.5,
	f1Score: 96.1,
	testDataSize: '20% (10,861 images)',
	classesDetected: 38,
	trainingEpochs: 150,
	batchSize: 32,
	optimizer: 'Adam',
	learningRate: 0.001,
}

export const diseaseCategories = [
	'Healthy',
	'Powdery Mildew',
	'Early Blight',
	'Late Blight',
	'Septoria Leaf Spot',
	'Bacterial Speck',
	'Bacterial Spot',
	'Bacterial Wilt',
	'Anthracnose',
	'Fusarium Wilt',
	'Target Spot',
	'Yellow Leaf Curl',
	'Mosaic Virus',
	'Rust',
	'Leaf Spot',
]

export const mockPlantClassificationData: PlantClassificationProb[] = [
	{ plantType: 'Maize', probability: 1.0 },
	{ plantType: 'Tomato', probability: 1.7e-8 },
	{ plantType: 'Pepper', probability: 1.2e-9 },
	{ plantType: 'Potato', probability: 9.5e-10 },
	{ plantType: 'Apple', probability: 2.2e-10 },
]
