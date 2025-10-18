import { MAP_STYLE_CONFIG } from "@config/constants";
import { useMapUI } from "@contexts/MapUIContext";

export function useMapGeographyStyle(isAddingMarker?: boolean) {
  const { borderColor, borderWidth } = useMapUI();
  const cursor = isAddingMarker ? "crosshair" : "pointer";
  return {
    default: {
      ...MAP_STYLE_CONFIG.default,
      stroke: borderColor,
      strokeWidth: borderWidth,
      cursor,
    },
    hover: {
      ...MAP_STYLE_CONFIG.default,
      ...MAP_STYLE_CONFIG.hovered,
      stroke: borderColor,
      strokeWidth: borderWidth,
      cursor,
    },
    pressed: {
      ...MAP_STYLE_CONFIG.default,
      ...MAP_STYLE_CONFIG.selected,
      stroke: borderColor,
      strokeWidth: borderWidth,
      cursor,
    },
  };
}
