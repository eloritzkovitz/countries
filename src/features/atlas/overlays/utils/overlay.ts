/**
 * Utility functions for managing overlays.
 */

import type { AnyOverlay, TimelineOverlay } from "@types";

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
