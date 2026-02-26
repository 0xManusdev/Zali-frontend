'use client'

import { Droplet, Zap, Calendar, ShoppingCart, Share2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { IrrigationData } from '@/types'

export function IrrigationRecommendation({
	data,
}: {
	data: IrrigationData
}) {
	const urgencyConfig = {
		low: {
			color: 'bg-primary/10 text-primary border-primary/20',
			label: 'Low Priority',
		},
		medium: {
			color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800/30',
			label: 'Medium Priority',
		},
		high: {
			color: 'bg-destructive/10 text-destructive border-destructive/20',
			label: 'High Priority',
		},
	}

	const config = urgencyConfig[data.urgency]

	const handleScheduleWatering = () => {
		alert('Watering reminder scheduled! You will be notified at the optimal time.')
	}

	const handleOrderTreatment = () => {
		alert('Redirecting to recommended treatments...')
	}

	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: 'Irrigation Recommendation from Zali',
				text: `Water needed: ${data.waterNeeded}mm, Frequency: ${data.frequency}, Best time: ${data.timing}`,
			})
		} else {
			navigator.clipboard.writeText(
				`Irrigation Recommendation:\nWater needed: ${data.waterNeeded}mm\nFrequency: ${data.frequency}\nBest time: ${data.timing}\nSoil moisture: ${data.soilMoisture}%`
			)
			alert('Recommendation copied to clipboard!')
		}
	}

	return (
		<Card>
			<CardHeader className="p-6 pb-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Droplet className="h-5 w-5 text-primary" />
						<CardTitle className="text-lg">Irrigation Plan</CardTitle>
					</div>
					<Badge variant="outline" className={`${config.color} rounded-md px-2.5 py-0.5 text-xs font-medium`}>
						{config.label}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-4 px-6 pb-6">
				{/* Water Needs */}
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="rounded-lg border border-border p-4">
						<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
							Water Needed
						</p>
						<p className="mt-2 text-2xl font-semibold text-foreground">
							{data.waterNeeded}
							<span className="text-sm font-normal text-muted-foreground ml-1">mm</span>
						</p>
						<p className="mt-1 text-xs text-muted-foreground">per watering cycle</p>
					</div>

					<div className="rounded-lg border border-border p-4">
						<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
							Soil Moisture
						</p>
						<p className="mt-2 text-2xl font-semibold text-foreground">
							{data.soilMoisture}
							<span className="text-sm font-normal text-muted-foreground ml-1">%</span>
						</p>
						<p className="mt-1 text-xs text-muted-foreground">current level</p>
					</div>
				</div>

				{/* Schedule */}
				<div className="rounded-lg border border-border bg-muted/50 p-4">
					<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider mb-2">
						Watering Schedule
					</p>
					<p className="text-base font-semibold text-foreground">
						{data.frequency}
					</p>
					<p className="text-sm text-muted-foreground mt-1">
						Best time: <span className="font-medium text-foreground">{data.timing}</span>
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-2">
					<Button
						variant="outline"
						size="sm"
						className="gap-2"
						onClick={handleScheduleWatering}
					>
						<Calendar className="h-4 w-4" />
						Schedule Watering
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="gap-2"
						onClick={handleOrderTreatment}
					>
						<ShoppingCart className="h-4 w-4" />
						Order Treatment
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="gap-2"
						onClick={handleShare}
					>
						<Share2 className="h-4 w-4" />
						Share
					</Button>
				</div>

				{/* Notes */}
				{data.notes.length > 0 && (
					<div className="space-y-2">
						<p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
							Notes
						</p>
						<ul className="space-y-1.5">
							{data.notes.map((note, idx) => (
								<li
									key={idx}
									className="flex gap-2 text-sm text-foreground leading-relaxed"
								>
									<span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
