import { Geography, Geographies } from "react-simple-maps";
import type { OverlayItem } from "../types/overlay";
import { getCountryIsoCode } from "../utils/countryData";

type OverlayLayerProps = {
  geographyUrl: string;
  overlayItems?: OverlayItem[];
  defaultColor?: string;
  suffix?: string;
};

export function OverlayLayer({
  geographyUrl,
  overlayItems,
  defaultColor = "#6a6e72",
  suffix = "",
}: OverlayLayerProps) {
  if (!overlayItems || overlayItems.length === 0) return null;

  // Build a lookup for fast access
  const overlayMap = Object.fromEntries(
    overlayItems.map(item => [item.isoCode.toUpperCase(), item])
  );

  return (
    <Geographies geography={geographyUrl}>
      {({ geographies }: { geographies: any[] }) =>
        geographies.map((geo) => {
          const isoA2 = getCountryIsoCode(geo.properties);
          const overlay = isoA2 && overlayMap[isoA2];
          if (!overlay) return null;
          return (
            <Geography
              key={geo.rsmKey + suffix}
              geography={geo}
              fill={overlay.color || defaultColor}
              stroke="#fff"
              strokeWidth={0.25}
              pointerEvents="none"
              style={{
                default: { outline: "none", ...(overlay.style || {}) },
                hover: { outline: "none", ...(overlay.style || {}) },
                pressed: { outline: "none", ...(overlay.style || {}) },
              }}
            >
              {overlay.tooltip && <title>{overlay.tooltip}</title>}
            </Geography>
          );
        })
      }
    </Geographies>
  );
}
