import { Geographies, Geography } from "react-simple-maps";
import { getCountryIsoCode } from "@features/countries";
import { useMapGeographyStyle } from "@features/map";
import type { OverlayItem } from "@types";
import { blendColors } from "@utils/color";

type MapCountriesLayerProps = {
  geographyData: string;
  overlayItems?: OverlayItem[];
  selectedIsoCode?: string | null;
  hoveredIsoCode?: string | null;
  onCountryClick?: (countryIsoCode: string) => void;
  onCountryHover?: (isoCode: string | null) => void;
  defaultColor?: string;
  isAddingMarker?: boolean;
};

export function CountriesLayer({
  geographyData,
  overlayItems = [],
  selectedIsoCode,
  hoveredIsoCode,
  onCountryClick,
  onCountryHover,
  isAddingMarker,
}: MapCountriesLayerProps) {
  const geographyStyle = useMapGeographyStyle(isAddingMarker);

  // Group overlay items by isoCode for stacking/blending
  const overlayGroups: Record<string, OverlayItem[]> = {};
  for (const item of overlayItems ?? []) {
    const code = item.isoCode.toUpperCase();
    if (!overlayGroups[code]) overlayGroups[code] = [];
    overlayGroups[code].push(item);
  }

  return (
    <g style={isAddingMarker ? { pointerEvents: "none" } : undefined}>
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

            // Overlay logic: blend all overlays for this country
            const overlays = overlayGroups[isoA2] || [];
            const overlayColors = overlays
              .map((o) => o.color)
              .filter((c): c is string => typeof c === "string");

            // Style: highlight takes precedence, then blended overlays, then base
            let style = geographyStyle.default;
            let tooltip = geo.properties.name;

            if (isSelected) {
              style = geographyStyle.pressed;
            } else if (isHovered) {
              style = geographyStyle.hover;
            } else if (overlayColors.length > 0) {
              const blended = blendColors([...overlayColors].reverse());
              style = { ...geographyStyle.default, fill: blended };
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
    </g>
  );
}
