import {
  useOverlayItems,
  useTimelineOverlayItems,
  isTimelineOverlay,
} from "@features/atlas/overlays";
import { useUI } from "@contexts/UIContext";
import type { AnyOverlay, VisitColorMode } from "@types";

export function useMapOverlayItems(
  overlays: AnyOverlay[],
  selectedYear: number,
  colorMode: VisitColorMode
) {
  const { timelineMode } = useUI();
  const timelineOverlays = overlays.filter(isTimelineOverlay);

  // Get static and timeline overlay items
  const staticItems = useOverlayItems(overlays);
  const timelineItems = useTimelineOverlayItems(timelineOverlays, selectedYear, colorMode);

  // Return items based on timeline mode
  return timelineMode ? timelineItems : staticItems;
}
