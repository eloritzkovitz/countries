/**
 * Utility functions for managing overlays.
 */

import type { AnyOverlay, Overlay, TimelineOverlay } from "@types";
import { appDb } from "@utils/db";

/**
 * Adds a new overlay to the overlays array.
 */
export function addOverlay(
  overlays: Overlay[],
  newOverlay: Overlay
): Overlay[] {
  return [...overlays, newOverlay];
}

/**
 * Edits an existing overlay by id.
 */
export function editOverlay(
  overlays: Overlay[],
  updatedOverlay: Overlay
): Overlay[] {
  return overlays.map((o) => (o.id === updatedOverlay.id ? updatedOverlay : o));
}

/**
 * Persists an array of overlays to the database.
 * @param overlays - The array of overlays to persist.
 */
export async function persistOverlays(overlays: AnyOverlay[]) {
  await Promise.all(overlays.map((o) => appDb.overlays.put(o)));
}

/**
 * Removes an overlay by id.
 */
export function removeOverlay(overlays: Overlay[], id: string): Overlay[] {
  return overlays.filter((o) => o.id !== id);
}

/**
 * Updates overlays by mapping and replacing the overlay with the given id.
 */
export function updateOverlayVisibility(
  overlays: Overlay[],
  id: string,
  visible: boolean
): Overlay[] {
  return overlays.map((o) => (o.id === id ? { ...o, visible } : o));
}

/**
 * Type guard to check if an overlay is a TimelineOverlay.
 * @param overlay - The overlay to check.
 * @returns True if the overlay is a TimelineOverlay, false otherwise.
 */
export function isTimelineOverlay(
  overlay: AnyOverlay
): overlay is TimelineOverlay {
  return (overlay as TimelineOverlay).timelineEnabled === true;
}
