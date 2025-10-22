/**
 * Utility functions for string manipulation.
 */

/**
 * Capitalizes the first letter of a string.
 * @param str 
 * @returns 
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Capitalizes the first letter of each word in a string.
 * @param str - The input string.
 * @returns The string with each word capitalized.
 */
export function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Truncates a string to a specified maximum length, adding an ellipsis if truncated.
 * @param str - The input string.
 * @param maxLength - The maximum allowed length of the string.
 * @returns The truncated string.
 */
export function truncate(str: string, maxLength: number) {
  return str.length > maxLength ? str.slice(0, maxLength) + "…" : str;
}

/**
 * Normalizes a string by removing diacritics and converting to lowercase.
 * @param str - The input string to normalize.
 * @returns The normalized string.
 */
export function normalizeString(str: string) {
  return str
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase();
}

/**
 * Converts a string into a URL-friendly slug.
 * @param str - The input string to slugify.
 * @returns The slugified string.
 */
export function slugify(str: string) {
  return normalizeString(str)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}