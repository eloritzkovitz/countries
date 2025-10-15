import { geoCentroid, geoBounds } from "d3-geo";
import { useMapUI } from "../context/MapUIContext";
import { BASE_GEOGRAPHY_STYLE, MAP_FILL_COLORS } from "../config/constants";

/**
 * Get the stroke color for map elements based on the settings in MapUIContext.
 * @returns The stroke color for map elements based on the settings in MapUIContext.
 */
export function useMapStrokeColor() {
  const { borderColor } = useMapUI();
  return borderColor || "none";
}

/**
 * Get the style for a geography element based on its state.
 * @param isHovered - Whether the element is hovered.
 * @param isSelected - Whether the element is selected.
 * @param strokeColor - The stroke color for the element.
 * @returns The style for the geography element.
 */
export function getGeographyStyle({
  isHovered,
  isSelected,
  strokeColor,
  fillColor,
}: {
  isHovered?: boolean;
  isSelected?: boolean;
  strokeColor: string;
  fillColor?: string;
}) {
  const fill =
    fillColor ??
    (isHovered
      ? MAP_FILL_COLORS.hovered
      : isSelected
      ? MAP_FILL_COLORS.selected
      : MAP_FILL_COLORS.default);

  return {
    default: {
      ...BASE_GEOGRAPHY_STYLE,
      fill,
      stroke: strokeColor,
    },
    hover: {
      ...BASE_GEOGRAPHY_STYLE,
      fill,
      stroke: strokeColor,
    },
    pressed: {
      ...BASE_GEOGRAPHY_STYLE,
      fill,
      stroke: strokeColor,
    },
  };
}

/**
 * Gets overlay items from an overlay definition.
 * @param overlay
 * @returns Array of overlay items with isoCode, color, and tooltip.
 */
export function getOverlayItems(overlay: {
  countries: any[];
  color: any;
  tooltip?: any;
  name: any;
}) {
  return overlay.countries.map((isoCode) => ({
    isoCode,
    color: overlay.color,
    tooltip: overlay.tooltip || overlay.name,
  }));
}

/**
 * Gets the centroid of a GeoJSON feature.
 * @param feature - The GeoJSON feature.
 * @returns = The [longitude, latitude] coordinates of the centroid.
 */
export function getFeatureCentroid(feature: any): [number, number] {
  return geoCentroid(feature);
}

/** Get the center coordinates and appropriate zoom level for a given country ISO code.
 * @param geoData - The GeoJSON data containing country geometries.
 * @param isoCode - The ISO code of the country to center on.
 * @returns An object with center coordinates and zoom level, or null if not found.
 */
export function getCountryCenterAndZoom(
  geoData: { features: any[] },
  isoCode: any
) {
  const country = geoData.features.find(
    (feature) =>
      feature.properties["ISO3166-1-Alpha-2"] === isoCode ||
      feature.properties["ISO3166-1-Alpha-3"] === isoCode
  );
  if (!country) return null;

  const centroid = geoCentroid(country);
  const bounds = geoBounds(country);
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const latDiff = Math.abs(maxLat - minLat);
  const lngDiff = Math.abs(maxLng - minLng);
  const maxDiff = Math.max(latDiff, lngDiff);

  const zoom = Math.max(6, 18 - maxDiff * 40);

  return { center: centroid, zoom };
}
