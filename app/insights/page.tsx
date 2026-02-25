import { Header } from '@/components/header'
import { AIInsights } from '@/components/ai-insights'

export const metadata = {
  title: 'AI Insights - Zali',
  description: 'Learn about Zali\'s AI model architecture, training data, and performance metrics',
}

export default function InsightsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl text-balance">
              AI Model Insights
            </h1>
            <p className="mt-4 text-xl text-muted-foreground font-medium max-w-2xl">
              Explore the technical architecture, training methodology, and performance metrics behind Zali's plant disease detection engine
            </p>
          </div>

          <AIInsights />
        </div>
      </main>
    </>
  )
}
