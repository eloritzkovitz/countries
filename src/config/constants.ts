// UI and Layout
export const DEFAULT_PANEL_WIDTH = 350;

// Map settings
export const DEFAULT_MAP_GEO_URL = import.meta.env.VITE_MAP_GEO_URL || "/data/countries.geojson";
export const DEFAULT_MAP_PROJECTION = "geoNaturalEarth1";
export const DEFAULT_MAP_SCALE_DIVISOR = 2.8;
export const DEFAULT_MAP_MIN_ZOOM = 1;
export const DEFAULT_MAP_MAX_ZOOM = 20;
export const DEFAULT_MAP_BG_COLOR = "bg-gray-100";

// Map styles
export const MAP_STYLE_CONFIG = {
  default: {
    fill: "#b5bfca",
    stroke: "#222",
    strokeWidth: 0.1,
    outline: "none",
    cursor: "pointer",
  },
  hovered: {
    fill: "#0078d4",
  },
  selected: {
    fill: "#fff",
  },
};

// Map options
export const MAP_PROJECTION_OPTIONS = [
  { value: "geoNaturalEarth1", label: "Natural Earth" },
  { value: "geoEqualEarth", label: "Equal Earth" },
  { value: "geoMercator", label: "Mercator" },
];

export const MAP_STROKE_COLOR_OPTIONS = [
  { value: "#222", label: "Dark" },
  { value: "#fff", label: "Light" },
  { value: "#0078d4", label: "Blue" },
  { value: "#b5bfca", label: "Gray" },
];

export const MAP_STROKE_WIDTH_OPTIONS = [
  { value: 0.1, label: "Thin" },
  { value: 0.5, label: "Medium" },
  { value: 1, label: "Thick" },
];

// Data
export const EXCLUDED_ISO_CODES = [ // List of country codes that do not have their own flags
  "BV", // Bouvet Island
  "HM", // Heard Island and McDonald Islands
  "MF", // Saint Martin
  "SJ", // Svalbard and Jan Mayen
  "UM", // United States Minor Outlying Islands
];
