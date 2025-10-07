// UI and Layout
export const DEFAULT_PANEL_WIDTH = 350;

// Map
export const DEFAULT_MAP_GEO_URL = import.meta.env.VITE_MAP_GEO_URL || "/data/countries.geojson";
export const DEFAULT_MAP_PROJECTION = "geoNaturalEarth1";
export const DEFAULT_MAP_SCALE_DIVISOR = 2.8;
export const DEFAULT_MAP_MIN_ZOOM = 1;
export const DEFAULT_MAP_MAX_ZOOM = 10;
export const DEFAULT_MAP_BG_COLOR = "bg-gray-100";

// Data
export const EXCLUDED_ISO_CODES = [ // List of country codes that do not have their own flags
  "BV", // Bouvet Island
  "HM", // Heard Island and McDonald Islands
  "MF", // Saint Martin
  "SJ", // Svalbard and Jan Mayen
  "UM", // United States Minor Outlying Islands
];
