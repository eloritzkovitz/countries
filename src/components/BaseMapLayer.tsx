import { Geographies, Geography } from "react-simple-maps";
import { getCountryIsoCode } from "../utils/countryData";

type BaseMapLayerProps = {
  geographyUrl: string;
  onCountryClick?: (countryIsoCode: string) => void;
  onCountryHover?: (isoCode: string | null) => void;
  selectedIsoCode?: string | null;
  hoveredIsoCode?: string | null;
};

export function BaseMapLayer({
  geographyUrl,
  onCountryClick,
  onCountryHover,
  selectedIsoCode,
  hoveredIsoCode,
}: BaseMapLayerProps) {
  return (
    <Geographies geography={geographyUrl}>
      {({ geographies }: { geographies: any[] }) =>
        geographies.map((geo) => {
          // Extract ISO code from properties
          const isoCode = getCountryIsoCode(geo.properties);
          const isSelected =
            isoCode &&
            selectedIsoCode &&
            isoCode === selectedIsoCode.toUpperCase();
          const isHovered =
            isoCode &&
            hoveredIsoCode &&
            isoCode === hoveredIsoCode.toUpperCase();

          return (
            <Geography
              key={isoCode || geo.rsmKey}
              geography={geo}
              onMouseEnter={() => onCountryHover && onCountryHover(isoCode ?? null)}
              onMouseLeave={() => onCountryHover && onCountryHover(null)}
              onClick={() => onCountryClick && isoCode && onCountryClick(isoCode)}
              style={{
                default: {
                  fill: isHovered
                    ? "#0078d4"
                    : isSelected
                    ? "#005fa3"
                    : "#b5bfca",
                  stroke: "#fff",
                  strokeWidth: 0.25,
                  outline: "none",
                  cursor: "pointer",
                },
                hover: {
                  fill: "#0078d4",
                  outline: "none",
                  cursor: "pointer",
                },
                pressed: {
                  fill: "#005fa3",
                  outline: "none",
                  cursor: "pointer",
                },
              }}
            >
              <title>{geo.properties.NAME || geo.properties.name}</title>
            </Geography>
          );
        })
      }
    </Geographies>
  );
}