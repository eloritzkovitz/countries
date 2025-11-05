import { Geographies, Geography } from "react-simple-maps";
import { getCountryIsoCode } from "@features/countries";
import { useMapGeographyStyle } from "@features/map/hooks/useMapGeographyStyle";
import {
  getBlendedOverlayColor,
  groupOverlayItemsByIsoCode,
} from "@features/overlays";
import type { OverlayItem } from "@types";

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
  const overlayGroups = groupOverlayItemsByIsoCode(overlayItems);

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
            const blendedFill = getBlendedOverlayColor(
              overlays,
              geographyStyle.default.fill
            );

            // Style: highlight takes precedence, then blended overlays, then base
            let style = geographyStyle.default;
            let tooltip = geo.properties.name;

            if (isHovered) {
              style = geographyStyle.hover;
            } else if (blendedFill) {
              style = { ...geographyStyle.default, fill: blendedFill };
            } else if (isSelected) {
              style = geographyStyle.hover;
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
