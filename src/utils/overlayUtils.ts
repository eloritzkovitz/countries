import type { Overlay } from "../types/overlay";

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
 * Removes an overlay by id.
 */
export function removeOverlay(
  overlays: Overlay[],
  id: string
): Overlay[] {
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
