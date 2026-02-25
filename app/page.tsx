import { Header } from '@/components/header'
import { DashboardClient } from '@/components/dashboard-client'

export const metadata = {
	title: 'Dashboard - Zali',
	description: 'Upload and analyze plant images with AI-powered crop monitoring',
}

export default function DashboardPage() {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<div className="mb-12">
						<h1 className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl text-balance">
							Plant Health Dashboard
						</h1>
						<p className="mt-4 text-xl text-muted-foreground font-medium max-w-2xl">
							Upload crop images for instant AI-powered disease detection and intelligent irrigation recommendations
						</p>
					</div>

					<DashboardClient />
				</div>
			</main>
		</>
	)
}
