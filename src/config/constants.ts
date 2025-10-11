// UI and Layout
export const DEFAULT_PANEL_WIDTH = 350;

// Map
export const DEFAULT_MAP_GEO_URL = import.meta.env.VITE_MAP_GEO_URL || "/data/countries.geojson";
export const DEFAULT_MAP_PROJECTION = "geoNaturalEarth1";
export const DEFAULT_MAP_SCALE_DIVISOR = 2.8;
export const DEFAULT_MAP_MIN_ZOOM = 1;
export const DEFAULT_MAP_MAX_ZOOM = 20;
export const DEFAULT_MAP_BG_COLOR = "bg-gray-100";

// Map Styles
export const MAP_FILL_COLORS = {
  default: "#b5bfca",
  hovered: "#0078d4",
  selected: "#005fa3",
};
export const MAP_STROKE_COLORS = {
  light: "#fff",
  dark: "#222",
};
export const DEFAULT_MAP_STROKE_WIDTH = 0.1;
export const MAP_CURSOR = "pointer";
export const MAP_OUTLINE = "none";

export const BASE_GEOGRAPHY_STYLE = {
  fill: MAP_FILL_COLORS.default,
  stroke: MAP_STROKE_COLORS.light,
  strokeWidth: DEFAULT_MAP_STROKE_WIDTH,  
  outline: MAP_OUTLINE,
  cursor: MAP_CURSOR,
};

// Data
export const EXCLUDED_ISO_CODES = [ // List of country codes that do not have their own flags
  "BV", // Bouvet Island
  "HM", // Heard Island and McDonald Islands
  "MF", // Saint Martin
  "SJ", // Svalbard and Jan Mayen
  "UM", // United States Minor Outlying Islands
];
