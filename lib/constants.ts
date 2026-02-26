// API base URL — override with NEXT_PUBLIC_API_URL env var in production
export const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Endpoint paths
export const ENDPOINTS = {
	health: '/health',
	info: '/info',
	predictPlantClass: '/predict_plant_class',
	predictPlantDisease: '/predict_plant_desease', // note: typo is in the backend
} as const
