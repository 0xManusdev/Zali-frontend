'use client'

import Link from 'next/link'
import { Leaf, Menu, LayoutDashboard, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Header() {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	const navItems = [
		{ href: '/', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/insights', label: 'Insights', icon: Sparkles },
	]

	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-14 items-center justify-between">
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/logo.svg"
							alt="Zali Logo"
							quality={100}
							width={30}
							height={30}
							className='w-5 h-5'
						/>
						<span className="text-base font-bold text-foreground">Zali</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
									pathname === item.href
										? "text-foreground bg-muted"
										: "text-muted-foreground hover:text-foreground hover:bg-muted/50"
								)}
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Mobile Navigation */}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
								aria-label="Open navigation menu"
							>
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[280px] sm:w-[320px]">
							<SheetHeader className="text-left">
								<SheetTitle className="flex items-center gap-2">
									<Leaf className="h-5 w-5 text-primary" />
									<span>Zali</span>
								</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-1 mt-6" aria-label="Mobile navigation">
								{navItems.map((item) => {
									const Icon = item.icon
									return (
										<Link
											key={item.href}
											href={item.href}
											className={cn(
												"flex items-center gap-3 h-10 px-3 rounded-md text-sm font-medium transition-colors",
												pathname === item.href
													? "text-foreground bg-muted"
													: "text-muted-foreground hover:text-foreground hover:bg-muted/50"
											)}
											onClick={() => setIsOpen(false)}
										>
											<Icon className="h-4 w-4" />
											{item.label}
										</Link>
									)
								})}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}
