import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function safeParseInt(value: string | null | undefined, defaultValue: number): number {
	if (value === null || value === undefined) {
		return defaultValue;
	}

	const parsedValue = parseInt(value, 10);
	return isNaN(parsedValue) ? defaultValue : parsedValue;
}

export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
	const queryString = Object.entries(params)
		.filter(([_, value]) => value !== undefined && value !== null)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
		.join('&');

	return queryString ? `?${queryString}` : '';
}