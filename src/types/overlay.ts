// Overlay type definition
export type Overlay = {
  id: string;
  name: string;
  color: string;
  countries: string[];
  tooltip?: string;
  visible: boolean;
};

// Overlay item type definition
export type OverlayItem = {
  isoCode: string;
  color?: string;
  tooltip?: string;
  style?: React.CSSProperties;
};
