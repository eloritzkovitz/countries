import { Geographies, Geography } from "react-simple-maps";
import { getCountryIsoCode } from "../utils/countryData";
import { useMapStrokeColor, getGeographyStyle } from "../utils/mapStyles";

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
  const strokeColor = useMapStrokeColor();

  return (
    <Geographies geography={geographyUrl}>
      {({ geographies }: { geographies: any[] }) =>
        geographies.map((geo) => {
          const isoCode = getCountryIsoCode(geo.properties);
          const isSelected =
            !!isoCode &&
            !!selectedIsoCode &&
            isoCode === selectedIsoCode.toUpperCase()
              ? true
              : undefined;
          const isHovered =
            !!isoCode &&
            !!hoveredIsoCode &&
            isoCode === hoveredIsoCode.toUpperCase();

          return (
            <Geography
              key={isoCode || geo.rsmKey}
              geography={geo}
              onMouseEnter={() =>
                onCountryHover && onCountryHover(isoCode ?? null)
              }
              onMouseLeave={() => onCountryHover && onCountryHover(null)}
              onClick={() =>
                onCountryClick && isoCode && onCountryClick(isoCode)
              }
              style={getGeographyStyle({
                isHovered,
                isSelected,
                strokeColor,
              })}
            >
              <title>{geo.properties.NAME || geo.properties.name}</title>
            </Geography>
          );
        })
      }
    </Geographies>
  );
}
