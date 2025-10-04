import { useRef } from "react";
import { ComposableMap, ZoomableGroup } from "react-simple-maps";
import { BaseMapLayer } from "./BaseMapLayer";
import { OverlayLayer } from "./OverlayLayer";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { ErrorMessage } from "./common/ErrorMessage";
import { useOverlayContext } from "../context/OverlayContext";
import { useContainerDimensions } from "../hooks/useContainerDimensions";

const geoUrl = import.meta.env.VITE_MAP_GEO_URL || "/data/countries.geojson";

type WorldMapProps = {
  zoom: number;
  center: [number, number];
  setZoom: (zoom: number) => void;
  setCenter: (center: [number, number]) => void;
  handleMoveEnd: (params: {
    zoom: number;
    coordinates: [number, number];
  }) => void;
  onCountryClick: (countryIsoCode: string | null) => void;
  onCountryHover: (isoCode: string | null) => void;
  selectedIsoCode: string | null;
  hoveredIsoCode: string | null;
};

export function WorldMap({
  zoom,
  center,
  handleMoveEnd,
  onCountryClick,
  onCountryHover,
  selectedIsoCode,
  hoveredIsoCode,
}: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useContainerDimensions(containerRef);

  // Get overlays and toggles from context
  const { overlays, loading, error } = useOverlayContext();

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading overlays..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: Math.min(dimensions.width, dimensions.height) / 2.8,
        }}
        width={dimensions.width}
        height={dimensions.height}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={zoom} center={center} onMoveEnd={handleMoveEnd}>
          {/* Base map */}
          <BaseMapLayer
            geographyUrl={geoUrl}
            onCountryClick={onCountryClick}
            onCountryHover={onCountryHover}
            selectedIsoCode={selectedIsoCode}
            hoveredIsoCode={hoveredIsoCode}
          />
          {/* Overlay layers */}
          {overlays
            .filter((o) => o.visible)
            .map((overlay) => (
              <OverlayLayer
                key={overlay.id}
                geographyUrl={geoUrl}
                overlayItems={overlay.countries.map((isoCode) => ({
                  isoCode,
                  color: overlay.color,
                  tooltip: overlay.tooltip || overlay.name,
                }))}
                defaultColor={overlay.color}
                suffix={`-overlay-${overlay.id}`}
              />
            ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
