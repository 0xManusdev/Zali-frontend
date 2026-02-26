import { Header } from '@/components/layout/header'
import { AIInsights } from '@/components/analysis/ai-insights'

export const metadata = {
	title: 'AI Insights - Zali',
	description: 'Learn about Zali\'s AI model architecture, training data, and performance metrics',
}

export default function InsightsPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="mb-8">
						<h1 className="text-foreground text-balance">
							AI Model Insights
						</h1>
						<p className="mt-3 text-base text-muted-foreground max-w-2xl">
							Explore the technical architecture, training methodology, and performance metrics behind Zali&apos;s plant disease detection engine
						</p>
					</div>

					<AIInsights />
				</div>
			</main>
		</>
	)
}
