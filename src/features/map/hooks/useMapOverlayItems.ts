import {
  useOverlayItems,
  useTimelineOverlayItems,
  isTimelineOverlay,
} from "@features/overlays";
import { useUI } from "@contexts/UIContext";
import type { AnyOverlay } from "@types";

export function useMapOverlayItems(
  overlays: AnyOverlay[],
  selectedYear: number
) {
  const { timelineMode } = useUI();
  const timelineOverlays = overlays.filter(isTimelineOverlay);

  // Get static items for non-timeline overlays
  const staticItems = useOverlayItems(overlays);
  const timelineItems = useTimelineOverlayItems(timelineOverlays, selectedYear);

  return timelineMode ? timelineItems : staticItems;
}
