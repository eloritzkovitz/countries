/**
 * Utility functions for date manipulation and formatting.
 */

/**
 * Formats a date string into a locale-specific date representation.
 * @param dateStr - The date string to format.
 * @param locale - The locale code to format the date for. Defaults to "en-GB".
 * @returns The formatted date string.
 */
export function formatDate(dateStr?: string, locale: string = "en-GB"): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(locale);
}
