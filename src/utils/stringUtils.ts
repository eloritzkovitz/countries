/**
 * Utility functions for string manipulation.
 */

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