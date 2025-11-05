// Overlay type definition
export type Overlay = {
  id: string;
  name: string;
  color: string;
  countries: string[];
  tooltip?: string;
  visible: boolean;
  order?: number;
};

// Timeline overlay type definition
export type TimelineOverlay = Overlay & {
  timelineEnabled: true;
  timelineSnapshot?: boolean;
};

// Union type for all overlays
export type AnyOverlay = Overlay | TimelineOverlay;

// Overlay item type definition
export type OverlayItem = {
  isoCode: string;
  color?: string;
  overlayId: string;
  tooltip?: string;
  style?: React.CSSProperties;
};
