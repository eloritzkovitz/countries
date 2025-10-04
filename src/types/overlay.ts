export type Overlay = {
  id: string;
  name: string;
  color: string;
  countries: string[];
  tooltip?: string;
  visible: boolean;
};

export type OverlayItem = {
  isoCode: string;
  color?: string;
  tooltip?: string;
  style?: React.CSSProperties;
};