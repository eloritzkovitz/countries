export type Settings = {
  id: string; // always 'main' for singleton settings
  homeCountry: string;
  theme: 'light' | 'dark';
  projection?: string;
  borderColor?: string;
  borderWidth?: number;
  overlayPalettes?: Record<OverlayModeKey, string>;
};

// Overlay mode keys type definition
export type OverlayModeKey = "standard" | "cumulative" | "yearly";