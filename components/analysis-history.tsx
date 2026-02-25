'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export interface HistoryItem {
  id: string
  plantType: string
  status: 'healthy' | 'stressed' | 'diseased'
  disease?: string
  confidence: number
  timestamp: Date
  thumbnail?: string
}

const getStatusIcon = (status: 'healthy' | 'stressed' | 'diseased') => {
  switch (status) {
    case 'healthy':
      return {
        icon: CheckCircle2,
        color: 'text-green-600 dark:text-green-400',
      }
    case 'stressed':
      return {
        icon: AlertTriangle,
        color: 'text-orange-600 dark:text-orange-400',
      }
    case 'diseased':
      return {
        icon: AlertCircle,
        color: 'text-red-600 dark:text-red-400',
      }
  }
}

export function AnalysisHistory({ items }: { items: HistoryItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const statusIcon = getStatusIcon(item.status)
        const StatusIcon = statusIcon.icon
        const timeAgo = formatDistanceToNow(new Date(item.timestamp), {
          addSuffix: true,
        })

        return (
          <Card
            key={item.id}
            className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-4 p-4">
              {item.thumbnail && (
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={item.thumbnail}
                    alt={item.plantType}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <StatusIcon className={`h-4 w-4 flex-shrink-0 ${statusIcon.color}`} />
                  <h3 className="font-semibold text-foreground truncate">
                    {item.plantType}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {item.disease || 'No disease detected'}
                </p>
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="inline-block rounded-lg bg-muted px-3 py-1">
                  <p className="text-sm font-semibold text-foreground">
                    {Math.round(item.confidence * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
