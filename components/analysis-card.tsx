'use client'

import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DiseaseProbabilityChart } from './disease-probability-chart'
import type { DiseaseProb } from '@/lib/mock-data'

interface AnalysisResult {
  plantType: string
  healthStatus: 'healthy' | 'stressed' | 'diseased'
  disease?: string
  confidence: number
  recommendation: string
  plantImage?: string
  diseaseProbs?: DiseaseProb[]
  llmDescription?: string
}

const getStatusConfig = (status: 'healthy' | 'stressed' | 'diseased') => {
  switch (status) {
    case 'healthy':
      return {
        color: 'text-emerald-600 dark:text-emerald-400',
        gradient: 'bg-gradient-to-br from-emerald-500/90 via-emerald-600/85 to-green-600/80',
        bgColor: 'bg-emerald-50/80 dark:bg-emerald-950/30',
        borderColor: 'border-emerald-200/50 dark:border-emerald-800/30',
        icon: CheckCircle2,
        label: 'Healthy',
      }
    case 'stressed':
      return {
        color: 'text-amber-600 dark:text-amber-400',
        gradient: 'bg-gradient-to-br from-amber-500/90 via-orange-500/85 to-orange-600/80',
        bgColor: 'bg-amber-50/80 dark:bg-amber-950/30',
        borderColor: 'border-amber-200/50 dark:border-amber-800/30',
        icon: AlertTriangle,
        label: 'Stressed',
      }
    case 'diseased':
      return {
        color: 'text-red-600 dark:text-red-400',
        gradient: 'bg-gradient-to-br from-red-500/90 via-red-600/85 to-rose-600/80',
        bgColor: 'bg-red-50/80 dark:bg-red-950/30',
        borderColor: 'border-red-200/50 dark:border-red-800/30',
        icon: AlertCircle,
        label: 'Disease Detected',
      }
  }
}

export function AnalysisCard({ data }: { data: AnalysisResult }) {
  const statusConfig = getStatusConfig(data.healthStatus)
  const StatusIcon = statusConfig.icon

  return (
    <Card className="overflow-hidden border-0 shadow-elevated">
      <CardHeader className={`${statusConfig.gradient} text-white pb-8 pt-10 px-8`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm mb-4">
              <StatusIcon className="h-4 w-4 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-wide">
                {statusConfig.label}
              </span>
            </div>
            <CardTitle className="text-4xl font-semibold tracking-tight text-white mt-2">
              {data.plantType}
            </CardTitle>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white/80 mb-2">Confidence Score</p>
            <p className="text-4xl font-semibold text-white">
              {Math.round(data.confidence * 100)}%
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-8 px-8 pb-8">
        {data.plantImage && (
          <div className="overflow-hidden rounded-2xl">
            <img
              src={data.plantImage}
              alt="Analyzed plant"
              className="h-56 w-full object-cover"
            />
          </div>
        )}

        <div className="grid gap-4">
          {data.disease && (
            <div className={`rounded-2xl ${statusConfig.bgColor} border ${statusConfig.borderColor} p-4`}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Detected Issue
              </p>
              <p className="mt-2 text-base font-medium text-foreground">
                {data.disease}
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-border/30 bg-muted/40 p-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              AI Analysis
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90 font-medium">
              {data.llmDescription || data.recommendation}
            </p>
          </div>
        </div>

        {data.diseaseProbs && data.diseaseProbs.length > 0 && (
          <div className="rounded-2xl border border-border/30 p-5 bg-card">
            <DiseaseProbabilityChart diseaseProbs={data.diseaseProbs} plantType={data.plantType} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
