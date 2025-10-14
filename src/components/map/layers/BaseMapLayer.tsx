import { Geographies, Geography } from "react-simple-maps";
import { getCountryIsoCode } from "../../../utils/countryData";
import { useMapStrokeColor, getGeographyStyle } from "../../../utils/mapUtils";

type BaseMapLayerProps = {
  geographyData: string;
  onCountryClick?: (countryIsoCode: string) => void;
  onCountryHover?: (isoCode: string | null) => void;
};

export function BaseMapLayer({
  geographyData,
  onCountryClick,
  onCountryHover,
}: BaseMapLayerProps) {
  const strokeColor = useMapStrokeColor();

  return (
    <Geographies geography={geographyData}>
      {({ geographies }: { geographies: any[] }) =>
        geographies.map((geo) => {
          const isoCode = getCountryIsoCode(geo.properties);

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
