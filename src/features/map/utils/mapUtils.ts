import { geoBounds, geoCentroid, geoMercator, geoNaturalEarth1, geoEquirectangular} from "d3-geo";
import type { GeoProjection } from "d3-geo";

/**
 * Returns a D3 projection instance based on type and map dimensions.
 * @param projectionType - The projection name (e.g., "mercator", "naturalEarth1", "equirectangular").
 * @param width - SVG/map width.
 * @param height - SVG/map height.
 * @param scaleDivisor - Scale divisor for projection.
 */
export function getProjection(
  projectionType: string,
  width: number,
  height: number,
  scaleDivisor: number
): GeoProjection {
  let proj;
  switch (projectionType) {
    case "naturalEarth1":
      proj = geoNaturalEarth1();
      break;
    case "equirectangular":
      proj = geoEquirectangular();
      break;
    case "mercator":
    default:
      proj = geoMercator();
      break;
  }
  return proj
    .scale(Math.min(width, height) / scaleDivisor)
    .center([0, 0])
    .translate([width / 2, height / 2]);
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
