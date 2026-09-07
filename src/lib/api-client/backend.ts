/**
 * Utility functions for interacting with the backend API.
 */

import { resolveBackendUrl } from "./env";

/**
 * Resolves the configured backend URL.
 * @throws If the backend URL is not configured.
 */
export function getBackendUrl(): string {
  const backendUrl = resolveBackendUrl({
    envVar: "VITE_API_URL",
  });

  if (!backendUrl) {
    throw new Error("Backend URL is not configured");
  }

  return backendUrl;
}

/**
 * Warms up the backend by sending a ping request to the API.
 */
export function warmUpBackend(): void {
  const backendUrl = resolveBackendUrl({
    envVar: "VITE_API_URL",
  });

  if (!backendUrl) return;

  void fetch(`${backendUrl}/api/ping`).catch(() => {});
}
