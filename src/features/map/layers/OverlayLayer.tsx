import { Geography, Geographies } from "react-simple-maps";
import type { OverlayItem } from "@types";
import { useMapGeographyStyle } from "../utils/mapUtils";
import { getCountryIsoCode } from "../../countries/utils/countryData";

type OverlayLayerProps = {
  geographyData: string;
  overlayItems?: OverlayItem[];
  defaultColor?: string;
  suffix?: string;
};

export function OverlayLayer({
  geographyData,
  overlayItems,
  defaultColor = "#6a6e72",
  suffix = "",
}: OverlayLayerProps) {
  if (!overlayItems || overlayItems.length === 0) return null;

  // Build a lookup for fast access
  const overlayMap = Object.fromEntries(
    overlayItems.map((item) => [item.isoCode.toUpperCase(), item])
  );

  const geographyStyle = useMapGeographyStyle();

  return (
    <g className="pointer-events-none">
      <Geographies geography={geographyData}>
        {({ geographies }: { geographies: any[] }) =>
          geographies.map((geo) => {
            const isoA2 = getCountryIsoCode(geo.properties);
            const overlay = isoA2 && overlayMap[isoA2];
            if (!overlay) return null;
            
            const fillColor = overlay.color || defaultColor;
            const style = {
              default: {
                ...geographyStyle.default,
                fill: fillColor,
              },
              hover: {
                ...geographyStyle.hover,
                fill: fillColor,
              },
              pressed: {
                ...geographyStyle.pressed,
                fill: fillColor,
              },
            };

            return (
              <Geography
                key={geo.rsmKey + suffix}
                geography={geo}
                style={style}
                pointerEvents="none"
              >
                {overlay.tooltip && <title>{overlay.tooltip}</title>}
              </Geography>
            );
          })
        }
      </Geographies>
    </g>
  );
}
