import { MAP_STYLE_CONFIG } from "@constants";
import {
  HOME_COUNTRY_COLOR,
  VISIT_COUNT_COLORS,
  NEW_VISIT_COLOR,
  REVISIT_COLOR,
  YEARLY_VISIT_COLOR,
  UPCOMING_VISIT_COLOR,
  UPCOMING_REVISIT_COLOR,
} from "./constants/colors";
import type { VisitColorMode } from "@types";

export function useMapLegendItems(
  overlays: any[],
  timelineMode: boolean,
  colorMode: VisitColorMode
) {
  // Legend items for static overlays
  const overlayLegendItems = overlays
    .filter((o) => o.visible)
    .map((o) => ({
      color: o.color,
      label: o.name,
    }));

  // Cumulative mode legend items
  const cumulativeLegendItems = [
    { color: HOME_COUNTRY_COLOR, label: "Home country" },
    { color: VISIT_COUNT_COLORS[3], label: "4+ visits" },
    { color: VISIT_COUNT_COLORS[2], label: "3 visits" },
    { color: VISIT_COUNT_COLORS[1], label: "2 visits" },
    { color: VISIT_COUNT_COLORS[0], label: "1 visit" },
    { color: MAP_STYLE_CONFIG.default.fill, label: "Not visited" },
  ];

  // Yearly mode legend items
  const yearlyLegendItems = [
    { color: HOME_COUNTRY_COLOR, label: "Home country" },
    { color: UPCOMING_VISIT_COLOR, label: "Upcoming first visit" },
    { color: UPCOMING_REVISIT_COLOR, label: "Upcoming revisit" },
    { color: NEW_VISIT_COLOR, label: "First visit this year" },
    { color: REVISIT_COLOR, label: "Revisit this year" },
    { color: YEARLY_VISIT_COLOR, label: "Visited in previous years" },
    { color: MAP_STYLE_CONFIG.default.fill, label: "Not visited" },
  ];

  if (!timelineMode) return overlayLegendItems;
  return colorMode === "cumulative" ? cumulativeLegendItems : yearlyLegendItems;
}
