import { Geographies, Geography } from "react-simple-maps";
import { getCountryIsoCode } from "@features/countries";
import { useMapGeographyStyle } from "../utils/mapUtils";
import type { OverlayItem } from "@types";

type MapCountriesLayerProps = {
  geographyData: string;
  overlayItems?: OverlayItem[];
  selectedIsoCode?: string | null;
  hoveredIsoCode?: string | null;
  onCountryClick?: (countryIsoCode: string) => void;
  onCountryHover?: (isoCode: string | null) => void;
  defaultColor?: string;
};

export function CountriesLayer({
  geographyData,
  overlayItems = [],  
  selectedIsoCode,
  hoveredIsoCode,
  onCountryClick,
  onCountryHover,
}: MapCountriesLayerProps) {
  const geographyStyle = useMapGeographyStyle();

  // Build overlay lookup
  const overlayMap = Object.fromEntries(
    (overlayItems ?? []).map((item) => [item.isoCode.toUpperCase(), item])
  );

  return (
    <Geographies geography={geographyData}>
      {({ geographies }: { geographies: any[] }) =>
        geographies.map((geo) => {
          const isoA2 = getCountryIsoCode(geo.properties);
          if (!isoA2) return null;

          // Highlight logic
          const isSelected =
            !!selectedIsoCode && isoA2 === selectedIsoCode.toUpperCase();
          const isHovered =
            !!hoveredIsoCode && isoA2 === hoveredIsoCode.toUpperCase();

          // Overlay logic
          const overlay = overlayMap[isoA2];

          // Style: highlight takes precedence, then overlay, then base
          let style = geographyStyle.default;
          let tooltip = geo.properties.name;

          if (isSelected) {
            style = geographyStyle.pressed;
          } else if (isHovered) {
            style = geographyStyle.hover;
          } else if (overlay && overlay.color) {
            style = { ...geographyStyle.default, fill: overlay.color };
          }          

          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() =>
                onCountryHover && onCountryHover(isoA2 ?? null)
              }
              onMouseLeave={() => onCountryHover && onCountryHover(null)}
              onClick={() => onCountryClick && isoA2 && onCountryClick(isoA2)}
              style={{
                default: style,
                hover: style,
                pressed: style,
              }}
            >
              <title>{tooltip}</title>
            </Geography>
          );
        })
      }
    </Geographies>
  );
}
