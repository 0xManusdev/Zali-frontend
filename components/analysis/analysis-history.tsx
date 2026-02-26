'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CheckCircle2, AlertTriangle, AlertCircle, Search, Filter, ChevronDown } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { HistoryItem } from '@/types'

// ---------------------------------------------------------------------------
// Status config helpers
// ---------------------------------------------------------------------------

type HealthStatus = 'healthy' | 'stressed' | 'diseased'

const statusConfig: Record<HealthStatus, { icon: typeof CheckCircle2; color: string; label: string }> = {
	healthy: { icon: CheckCircle2, color: 'text-primary', label: 'Healthy' },
	stressed: { icon: AlertTriangle, color: 'text-amber-700 dark:text-amber-400', label: 'Stressed' },
	diseased: { icon: AlertCircle, color: 'text-destructive', label: 'Diseased' },
}

type FilterValue = 'all' | HealthStatus

const filterOptions: { value: FilterValue; label: string; icon?: typeof CheckCircle2; iconColor?: string }[] = [
	{ value: 'all', label: 'All Status' },
	{ value: 'healthy', label: 'Healthy', icon: CheckCircle2, iconColor: 'text-primary' },
	{ value: 'stressed', label: 'Stressed', icon: AlertTriangle, iconColor: 'text-amber-700 dark:text-amber-400' },
	{ value: 'diseased', label: 'Diseased', icon: AlertCircle, iconColor: 'text-destructive' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface AnalysisHistoryProps {
	items: HistoryItem[]
	showFilters?: boolean
}

export function AnalysisHistory({ items, showFilters = true }: AnalysisHistoryProps) {
	const [searchQuery, setSearchQuery] = useState('')
	const [statusFilter, setStatusFilter] = useState<FilterValue>('all')

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			const matchesSearch =
				searchQuery === '' ||
				item.plantType.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(item.disease && item.disease.toLowerCase().includes(searchQuery.toLowerCase()))
			const matchesStatus = statusFilter === 'all' || item.status === statusFilter
			return matchesSearch && matchesStatus
		})
	}, [items, searchQuery, statusFilter])

	const activeFilter = filterOptions.find((o) => o.value === statusFilter)!

	return (
		<div className="space-y-4">
			{/* Search and Filter Controls */}
			{showFilters && items.length > 0 && (
				<div className="flex flex-col sm:flex-row gap-3">
					{/* Search */}
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search by plant or disease..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10"
							aria-label="Search analysis history"
						/>
					</div>

					{/* Filter Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="w-full sm:w-[180px] justify-between font-normal"
								aria-label="Filter by status"
							>
								<span className="flex items-center gap-2">
									<Filter className="h-4 w-4 text-muted-foreground shrink-0" />
									{activeFilter.label}
								</span>
								<ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[180px]">
							{filterOptions.map((option) => {
								const Icon = option.icon
								return (
									<DropdownMenuItem
										key={option.value}
										onClick={() => setStatusFilter(option.value)}
										className="gap-2 cursor-pointer"
									>
										{Icon ? (
											<Icon className={`h-4 w-4 ${option.iconColor}`} />
										) : (
											<span className="h-4 w-4" />
										)}
										{option.label}
									</DropdownMenuItem>
								)
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}

			{/* Results count */}
			{showFilters && items.length > 0 && (searchQuery || statusFilter !== 'all') && (
				<p className="text-xs text-muted-foreground">
					Showing {filteredItems.length} of {items.length} results
				</p>
			)}

			{/* History Items */}
			<div className="space-y-2">
				{filteredItems.length > 0 ? (
					filteredItems.map((item) => {
						const { icon: StatusIcon, color, label } = statusConfig[item.status]
						const timeAgo = formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })

						return (
							<Card
								key={item.id}
								className="transition-colors hover:bg-muted/50 cursor-pointer focus-within:ring-2 focus-within:ring-ring"
								tabIndex={0}
								role="button"
								aria-label={`${item.plantType} analysis from ${timeAgo}, status: ${label}`}
							>
								<div className="flex items-center gap-4 p-4">
									{item.thumbnail && (
										<div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
											<Image
												src={item.thumbnail}
												alt={`Thumbnail of ${item.plantType}`}
												width={56}
												height={56}
												className="h-full w-full object-cover"
												unoptimized
											/>
										</div>
									)}

									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-0.5">
											<StatusIcon className={`h-4 w-4 shrink-0 ${color}`} aria-hidden="true" />
											<h3 className="text-sm font-semibold text-foreground truncate">
												{item.plantType}
											</h3>
											<span className="sr-only">Status: {label}</span>
										</div>
										<p className="text-xs text-muted-foreground mb-0.5">
											{item.disease || 'No disease detected'}
										</p>
										<p className="text-xs text-muted-foreground">{timeAgo}</p>
									</div>

									<div className="text-right shrink-0">
										<div className="inline-block rounded-md bg-muted px-2.5 py-1">
											<p className="text-sm font-semibold text-foreground">
												{Math.round(item.confidence * 100)}%
											</p>
											<span className="sr-only">confidence</span>
										</div>
									</div>
								</div>
							</Card>
						)
					})
				) : (
					items.length > 0 && (
						<Card>
							<div className="py-10 text-center">
								<Search className="h-8 w-8 mx-auto text-muted-foreground/50 mb-3" />
								<p className="text-sm text-muted-foreground">No results found</p>
								<p className="text-xs text-muted-foreground mt-1">
									Try adjusting your search or filter
								</p>
							</div>
						</Card>
					)
				)}
			</div>
		</div>
	)
}
