/**
 * Parses a string to an integer with a fallback default value.
 * @param value The string to parse.
 * @param defaultValue The default value if parsing fails.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function parsePageNumber(
  value: string | undefined,
  defaultValue = 1
): number {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

export const formatDate = (dateString?: string) => {
  if (!dateString) return "Recently";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates the estimated reading time in minutes for a given text.
 * @param content The text content to analyze.
 * @param wordsPerMinute Average reading speed (default: 200).
 * @returns Estimated reading time in minutes (rounded up).
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200
): number {
  if (!content) return 1;
  return Math.ceil(content.split(/\s+/).length / wordsPerMinute);
}

/**
 * Splits content into paragraphs by double newlines.
 * @param content The text content to split.
 * @returns Array of paragraphs.
 */
export function splitParagraphs(content: string): string[] {
  if (!content) return [];
  return content.split("\n\n");
}
