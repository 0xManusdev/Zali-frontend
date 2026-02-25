'use client'

import Link from 'next/link'
import { Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function Header() {
	const pathname = usePathname()

	return (
		<header className="sticky top-0 z-40 border-b border-border/50 bg-card/95 backdrop-blur-md supports-backdrop-filter:bg-card/60">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-20 items-center justify-between">
					<Link href="/" className="flex items-center gap-3 group">
						<div className="rounded-full bg-linear-to-br from-primary to-primary/80 p-2 group-hover:shadow-soft transition-shadow">
							<Leaf className="h-6 w-6 text-primary-foreground" />
						</div>
						<div>
							<h1 className="text-xl font-semibold tracking-tight text-foreground">Zali</h1>
							<p className="text-xs font-medium text-muted-foreground">AI Crop Intelligence</p>
						</div>
					</Link>

					<nav className="flex items-center gap-2">
						<Button
							variant={pathname === '/' ? 'default' : 'ghost'}
							asChild
							className="rounded-full px-6 font-medium"
						>
							<Link href="/">Dashboard</Link>
						</Button>
						<Button
							variant={pathname === '/insights' ? 'default' : 'ghost'}
							asChild
							className="rounded-full px-6 font-medium"
						>
							<Link href="/insights">AI Insights</Link>
						</Button>
					</nav>
				</div>
			</div>
		</header>
	)
}
