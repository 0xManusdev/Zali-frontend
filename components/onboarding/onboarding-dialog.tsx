'use client'

import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
	Upload,
	Sparkles,
	Droplet,
	History,
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	Leaf
} from 'lucide-react'

const ONBOARDING_KEY = 'zali-onboarding-completed'

interface OnboardingStep {
	icon: React.ElementType
	iconColor: string
	iconBg: string
	title: string
	description: string
}

const steps: OnboardingStep[] = [
	{
		icon: Upload,
		iconColor: 'text-primary',
		iconBg: 'bg-primary/10',
		title: 'Upload Your Crop Image',
		description: 'Take a photo of your plant or upload an existing image. Our AI works best with clear, well-lit photos of leaves or stems showing any symptoms.',
	},
	{
		icon: Sparkles,
		iconColor: 'text-muted-foreground',
		iconBg: 'bg-muted',
		title: 'AI-Powered Analysis',
		description: 'Our advanced AI analyzes your image to detect plant health status, identify diseases, and assess overall vitality with high accuracy.',
	},
	{
		icon: Droplet,
		iconColor: 'text-primary',
		iconBg: 'bg-primary/10',
		title: 'Get Irrigation Recommendations',
		description: 'Receive personalized watering schedules and irrigation plans based on your plant\'s current condition and needs.',
	},
	{
		icon: History,
		iconColor: 'text-muted-foreground',
		iconBg: 'bg-muted',
		title: 'Track Your Progress',
		description: 'All your analyses are saved in history. Search, filter, and compare results over time to monitor plant health trends.',
	},
]

export function OnboardingDialog() {
	const [isOpen, setIsOpen] = useState(false)
	const [currentStep, setCurrentStep] = useState(0)

	useEffect(() => {
		const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY)
		if (!hasCompletedOnboarding) {
			const timer = setTimeout(() => setIsOpen(true), 500)
			return () => clearTimeout(timer)
		}
	}, [])

	const handleComplete = () => {
		localStorage.setItem(ONBOARDING_KEY, 'true')
		setIsOpen(false)
	}

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1)
		} else {
			handleComplete()
		}
	}

	const handlePrev = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1)
		}
	}

	const handleSkip = () => {
		handleComplete()
	}

	const currentStepData = steps[currentStep]
	const Icon = currentStepData.icon
	const isLastStep = currentStep === steps.length - 1

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-110">
				<DialogHeader className="space-y-4">
					<div className="flex items-center gap-2">
						<Leaf className="h-5 w-5 text-primary" />
						<span className="text-sm font-medium text-muted-foreground">Welcome to Zali</span>
					</div>

					{/* Step icon */}
					<div className={`w-10 h-10 rounded-lg ${currentStepData.iconBg} flex items-center justify-center`}>
						<Icon className={`h-5 w-5 ${currentStepData.iconColor}`} />
					</div>

					<DialogTitle className="text-lg">
						{currentStepData.title}
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground leading-relaxed">
						{currentStepData.description}
					</DialogDescription>
				</DialogHeader>

				{/* Footer */}
				<div className="pt-4">
					{/* Progress dots */}
					<div className="flex items-center justify-center gap-2 mb-4">
						{steps.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentStep(index)}
								className={`h-1.5 rounded-full transition-all ${index === currentStep
										? 'w-6 bg-primary'
										: 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
									}`}
								aria-label={`Go to step ${index + 1}`}
							/>
						))}
					</div>

					{/* Navigation buttons */}
					<div className="flex items-center justify-between gap-3">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleSkip}
							className="text-muted-foreground hover:text-foreground"
						>
							Skip tour
						</Button>

						<div className="flex items-center gap-2">
							{currentStep > 0 && (
								<Button
									variant="outline"
									size="sm"
									onClick={handlePrev}
								>
									<ChevronLeft className="h-4 w-4 mr-1" />
									Back
								</Button>
							)}
							<Button
								size="sm"
								onClick={handleNext}
							>
								{isLastStep ? (
									<>
										Get Started
										<ArrowRight className="h-4 w-4 ml-1" />
									</>
								) : (
									<>
										Next
										<ChevronRight className="h-4 w-4 ml-1" />
									</>
								)}
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
