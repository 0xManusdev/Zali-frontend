export interface DiseaseProb {
  disease: string
  probability: number
}

export interface PlantClassificationProb {
  plantType: string
  probability: number
}

export interface AnalysisResult {
  plantType: string
  healthStatus: 'healthy' | 'stressed' | 'diseased'
  disease?: string
  confidence: number
  recommendation: string
  irrigationNeeded: number
  waterFrequency: string
  waterTiming: string
  soilMoisture: number
  urgency: 'low' | 'medium' | 'high'
  irrigationNotes: string[]
  analysisDetails: {
    leafColor: string
    stemCondition: string
    overallVitality: number
  }
  plantClassificationProbs?: PlantClassificationProb[]
  diseaseProbs?: DiseaseProb[]
  llmDescription?: string
}

export interface AnalysisRequest {
  image: string // base64 or url
  fileName?: string
}

export interface HistoryItem {
  id: string
  plantType: string
  status: 'healthy' | 'stressed' | 'diseased'
  disease?: string
  confidence: number
  timestamp: Date
  thumbnail?: string
}

export type HealthStatus = 'healthy' | 'stressed' | 'diseased'
export type UrgencyLevel = 'low' | 'medium' | 'high'

export interface IrrigationData {
  waterNeeded: number
  frequency: string
  timing: string
  soilMoisture: number
  urgency: UrgencyLevel
  notes: string[]
}

export interface ModelMetrics {
  architecture: string
  trainingDataset: string
  dataAugmentation: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  testDataSize: string
  classesDetected: number
  trainingEpochs: number
  batchSize: number
  optimizer: string
  learningRate: number
}
