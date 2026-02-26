import { API_BASE_URL } from '@/lib/constants'

/**
 * Generic API error with HTTP status info
 */
export class ApiError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message)
		this.name = 'ApiError'
	}
}

/**
 * POST request sending a FormData body.
 * Throws ApiError on non-2xx responses.
 */
export async function apiPost<T>(endpoint: string, body: FormData): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${endpoint}`, {
		method: 'POST',
		body,
		// Do NOT set Content-Type — browser sets it with boundary automatically for FormData
	})

	if (!res.ok) {
		const detail = await res.text().catch(() => res.statusText)
		throw new ApiError(res.status, detail)
	}

	return res.json() as Promise<T>
}

/**
 * GET request.
 * Throws ApiError on non-2xx responses.
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${endpoint}`)

	if (!res.ok) {
		const detail = await res.text().catch(() => res.statusText)
		throw new ApiError(res.status, detail)
	}

	return res.json() as Promise<T>
}
