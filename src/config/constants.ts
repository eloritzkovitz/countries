// UI and Layout
export const DEFAULT_PANEL_WIDTH = 350;

// Map settings
export const DEFAULT_MAP_SETTINGS = {
  geoUrl: import.meta.env.VITE_MAP_GEO_URL || "/data/countries.geojson",
  projection: "geoNaturalEarth1",
  scaleDivisor: 2.8,
  minZoom: 1,
  maxZoom: 20,
  bgColor: "bg-gray-100",
};

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
export const MAP_OPTIONS = {
  projection: [
    { value: "geoNaturalEarth1", label: "Natural Earth" },
    { value: "geoEqualEarth", label: "Equal Earth" },
    { value: "geoMercator", label: "Mercator" },
  ],
  strokeColor: [
    { value: "#222", label: "Dark" },
    { value: "#fff", label: "Light" },
    { value: "#b5bfca", label: "Gray" },
  ],
  strokeWidth: [
    { value: 0.1, label: "Thin" },
    { value: 0.5, label: "Medium" },
    { value: 1, label: "Thick" },
  ],  
};

// Data
export const EXCLUDED_ISO_CODES = [ // List of country codes that do not have their own flags
  "BV", // Bouvet Island
  "HM", // Heard Island and McDonald Islands
  "MF", // Saint Martin
  "SJ", // Svalbard and Jan Mayen
  "UM", // United States Minor Outlying Islands
];

export const SOVEREIGN_FLAG_MAP: Record<string, string> = {
  "BV": "NO", // Bouvet Island → Norway
  "GF": "FR", // French Guiana → France  
  "HM": "AU", // Heard Island and McDonald Islands → Australia
  "MF": "FR", // Saint Martin → France
  "SJ": "NO", // Svalbard and Jan Mayen → Norway  
  "UM": "US", // United States Minor Outlying Islands → United States
};
