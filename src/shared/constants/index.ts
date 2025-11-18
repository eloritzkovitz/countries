import {
  MAP_BG_COLOR,
  MAP_BORDER_COLOR_DARK,
  MAP_BORDER_COLOR_GRAY,
  MAP_BORDER_COLOR_LIGHT,
} from "./colors";

// UI and Layout
export const DEFAULT_PANEL_WIDTH = 350;

// Map settings
export const DEFAULT_MAP_SETTINGS = {
  geoUrl: import.meta.env.VITE_MAP_GEO_URL || "/data/countries.geojson",
  projection: "geoNaturalEarth1",
  scaleDivisor: 2.8,
  minZoom: 1,
  maxZoom: 20,
  bgColor: MAP_BG_COLOR,
};

// Function to get map style configuration
export function getMapStyleConfig({
  hoveredColor,
  selectedColor,
}: {
  hoveredColor: string;
  selectedColor: string;
}) {
  return {
    default: {
      fill: MAP_BG_COLOR,
      stroke: MAP_BORDER_COLOR_DARK,
      strokeWidth: 0.1,
      outline: "none",
      cursor: "pointer",
    },
    hovered: {
      fill: hoveredColor,
    },
    selected: {
      fill: selectedColor,
    },
  };
}

// Map options
export const MAP_OPTIONS = {
  projection: [
    { value: "geoNaturalEarth1", label: "Natural Earth" },
    { value: "geoEqualEarth", label: "Equal Earth" },
    { value: "geoMercator", label: "Mercator" },
  ],
  strokeColor: [
    { value: MAP_BORDER_COLOR_DARK, label: "Dark" },
    { value: MAP_BORDER_COLOR_LIGHT, label: "Light" },
    { value: MAP_BORDER_COLOR_GRAY, label: "Gray" },
  ],
  strokeWidth: [
    { value: 0.1, label: "Thin" },
    { value: 0.5, label: "Medium" },
    { value: 1, label: "Thick" },
  ],
};
