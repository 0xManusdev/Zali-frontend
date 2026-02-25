'use client'

import { Droplet, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface IrrigationRecommendation {
  waterNeeded: number
  frequency: string
  timing: string
  soilMoisture: number
  urgency: 'low' | 'medium' | 'high'
  notes: string[]
}

export function IrrigationRecommendation({
  data,
}: {
  data: IrrigationRecommendation
}) {
  const urgencyConfig = {
    low: {
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      label: 'Low Priority',
    },
    medium: {
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      label: 'Medium Priority',
    },
    high: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      label: 'High Priority',
    },
  }

  const config = urgencyConfig[data.urgency]

  return (
    <Card className="border-0 shadow-medium overflow-hidden">
      <CardHeader className="pb-4 pt-8 px-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/20 p-3">
              <Droplet className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">Irrigation Plan</CardTitle>
          </div>
          <Badge className={`${config.color} rounded-full px-4 py-1.5 font-semibold`}>{config.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-8 px-8 pb-8">
        {/* Water Needs */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/40 bg-card p-6 hover:shadow-soft transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Droplet className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                Water Needed
              </p>
            </div>
            <p className="text-4xl font-semibold text-foreground">
              {data.waterNeeded}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                mm
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">per watering cycle</p>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card p-6 hover:shadow-soft transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-orange-100/50 dark:bg-orange-950/30 p-2">
                <Zap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                Soil Moisture
              </p>
            </div>
            <p className="text-4xl font-semibold text-foreground">
              {data.soilMoisture}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                %
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">current level</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="rounded-2xl border border-border/30 bg-muted/40 p-6">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide mb-3">
              Watering Schedule
            </p>
            <p className="text-lg font-semibold text-foreground">
              {data.frequency}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Best time: <span className="font-medium text-foreground">{data.timing}</span>
            </p>
          </div>
        </div>

        {/* Notes */}
        {data.notes.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
              Important Notes
            </p>
            <ul className="space-y-2">
              {data.notes.map((note, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 text-sm text-foreground/85 leading-relaxed"
                >
                  <span className="mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
