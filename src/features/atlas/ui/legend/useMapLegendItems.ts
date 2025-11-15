import { MAP_STYLE_CONFIG } from "@constants";
import { VISIT_COLORS, HOME_COUNTRY_COLOR } from "./constants/colors";

export function useMapLegendItems(overlays: any[], timelineMode: boolean) {
  // Legend items for static overlays
  const overlayLegendItems = overlays
    .filter((o) => o.visible)
    .map((o) => ({
      color: o.color,
      label: o.name,
    }));

  // Legend items for timeline mode
  const timelineLegendItems = [
    { color: HOME_COUNTRY_COLOR, label: "Home country" },
    { color: MAP_STYLE_CONFIG.default.fill, label: "Not visited" },
    { color: VISIT_COLORS[0], label: "1 visit" },
    { color: VISIT_COLORS[1], label: "2 visits" },
    { color: VISIT_COLORS[2], label: "3 visits" },
    { color: VISIT_COLORS[3], label: "4+ visits" },
  ];

  return timelineMode ? timelineLegendItems : overlayLegendItems;
}
