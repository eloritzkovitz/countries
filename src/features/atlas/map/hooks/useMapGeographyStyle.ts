import { getMapStyleConfig } from "@constants";
import { useMapUI } from "@contexts/MapUIContext";
import { useCountryColors } from "@features/settings/hooks/useCountryColors";

export function useMapGeographyStyle(isAddingMarker?: boolean) {
  const { borderColor, borderWidth } = useMapUI();
  const cursor = isAddingMarker ? "crosshair" : "pointer";
  const { HOVERED_COUNTRY_COLOR, SELECTED_COUNTRY_COLOR } = useCountryColors();
  const MAP_STYLE_CONFIG = getMapStyleConfig({
    hoveredColor: HOVERED_COUNTRY_COLOR,
    selectedColor: SELECTED_COUNTRY_COLOR,
  });

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
