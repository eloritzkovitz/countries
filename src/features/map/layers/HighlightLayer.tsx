import { Geographies, Geography } from "react-simple-maps";
import { getCountryIsoCode } from "@features/countries";
import { useMapGeographyStyle } from "../utils/mapUtils";

type HighlightLayerProps = {
  geographyData: string;
  selectedIsoCode?: string | null;
  hoveredIsoCode?: string | null;
};

export function HighlightLayer({
  geographyData,
  selectedIsoCode,
  hoveredIsoCode,
}: HighlightLayerProps) {
  const geographyStyle = useMapGeographyStyle();

  // Only highlight selected or hovered countries
  const highlightIsoCodes = [
    selectedIsoCode?.toUpperCase(),
    hoveredIsoCode?.toUpperCase(),
  ].filter(Boolean);

  return (
    <Geographies geography={geographyData}>
      {({ geographies }: { geographies: any[] }) =>
        geographies
          .filter((geo) => {
            const isoCode = getCountryIsoCode(geo.properties);
            return highlightIsoCodes.includes(isoCode);
          })
          .map((geo) => {
            const isoCode = getCountryIsoCode(geo.properties);
            const isSelected =
              !!isoCode &&
              !!selectedIsoCode &&
              isoCode === selectedIsoCode?.toUpperCase();
            const isHovered =
              !!isoCode &&
              !!hoveredIsoCode &&
              isoCode === hoveredIsoCode?.toUpperCase();

            // Choose the correct style variant
            let style = geographyStyle.default;
            if (isSelected) style = geographyStyle.pressed;
            else if (isHovered) style = geographyStyle.hover;

            return (
              <Geography
                key={isoCode || geo.rsmKey}
                geography={geo}
                style={{ default: style, hover: style, pressed: style }}
                pointerEvents="none"
              >
                <title>{geo.properties.NAME || geo.properties.name}</title>
              </Geography>
            );
          })
      }
    </Geographies>
  );
}
