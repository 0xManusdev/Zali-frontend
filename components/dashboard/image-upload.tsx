'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
	onImageSelect: (file: File, preview: string) => void
	isLoading?: boolean
}

export function ImageUpload({ onImageSelect, isLoading = false }: ImageUploadProps) {
	const [preview, setPreview] = useState<string | null>(null)
	const [fileName, setFileName] = useState<string>('')
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setFileName(file.name)
			const reader = new FileReader()
			reader.onload = (event) => {
				const result = event.target?.result as string
				setPreview(result)
				onImageSelect(file, result)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		const file = e.dataTransfer.files?.[0]
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader()
			reader.onload = (event) => {
				const result = event.target?.result as string
				setFileName(file.name)
				setPreview(result)
				onImageSelect(file, result)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const handleRemove = () => {
		setPreview(null)
		setFileName('')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	return (
		<div className="w-full">
			{!preview ? (
				<div
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-10 text-center transition-colors hover:bg-muted/50"
				>
					<Upload className="mb-3 h-8 w-8 text-muted-foreground" />
					<p className="text-sm font-medium text-foreground mb-1">
						Drop your plant image here
					</p>
					<p className="text-xs text-muted-foreground mb-4">
						PNG, JPG up to 10MB
					</p>
					<Button
						variant="outline"
						size="sm"
						onClick={() => fileInputRef.current?.click()}
						disabled={isLoading}
						className="cursor-pointer"
					>
						Browse files
					</Button>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="hidden"
						disabled={isLoading}
					/>
				</div>
			) : (
				<div className="space-y-4">
					<div className="relative overflow-hidden rounded-lg bg-muted">
						<Image
							src={preview}
							alt="Preview"
							width={800}
							height={256}
							className="h-64 w-full object-cover"
							unoptimized
						/>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex-1">
							<p className="text-sm font-medium text-foreground">{fileName}</p>
							<p className="text-xs text-muted-foreground">Ready for analysis</p>
						</div>
						<Button
							variant="outline"
							size="icon"
							onClick={handleRemove}
							disabled={isLoading}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
