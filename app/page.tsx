import { Header } from '@/components/layout/header'
import { DashboardClient } from '@/components/dashboard/dashboard-client'

export const metadata = {
	title: 'Zali',
	description: 'Upload and analyze plant images with AI-powered crop monitoring',
}

export default function DashboardPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-background">
				<div
					className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="mb-8">
						<h1 className="text-foreground text-balance">
							Plant Health Dashboard
						</h1>
						<p className="mt-3 text-base text-muted-foreground max-w-2xl">
							Upload crop images for instant AI-powered disease detection and irrigation recommendations
						</p>
					</div>

					<DashboardClient />
				</div>
			</main>
		</>
	)
}
