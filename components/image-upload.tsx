'use client'

import { useState, useRef } from 'react'
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
					className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-8 transition-colors hover:bg-muted"
				>
					<Upload className="mb-4 h-12 w-12 text-primary" />
					<p className="mb-2 text-center font-semibold text-foreground">
						Drag and drop your plant image here
					</p>
					<p className="mb-6 text-center text-sm text-muted-foreground">
						or click to browse from your device
					</p>
					<Button
						onClick={() => fileInputRef.current?.click()}
						disabled={isLoading}
						className="bg-primary cursor-pointer hover:bg-primary/90"
					>
						Select Image
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
						<img
							src={preview}
							alt="Preview"
							className="h-64 w-full object-cover"
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
