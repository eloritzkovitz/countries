import { useRef } from "react";
import { ComposableMap, ZoomableGroup } from "react-simple-maps";
import { BaseMapLayer } from "../BaseMapLayer";
import { OverlayLayer } from "../OverlayLayer";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import {
  DEFAULT_MAP_GEO_URL,
  DEFAULT_MAP_PROJECTION,
  DEFAULT_MAP_SCALE_DIVISOR,
  DEFAULT_MAP_MIN_ZOOM,
  DEFAULT_MAP_MAX_ZOOM,
  DEFAULT_MAP_BG_COLOR,
} from "../../config/constants";
import { useOverlayContext } from "../../context/OverlayContext";
import { useContainerDimensions } from "../../hooks/useContainerDimensions";


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
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-[100dvh] ${DEFAULT_MAP_BG_COLOR} overflow-hidden`}
    >
      <ComposableMap
        projection={DEFAULT_MAP_PROJECTION}
        projectionConfig={{
          scale: Math.min(dimensions.width, dimensions.height) / DEFAULT_MAP_SCALE_DIVISOR,
          center: [0, 0],
        }}
        width={dimensions.width}
        height={dimensions.height}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          minZoom={DEFAULT_MAP_MIN_ZOOM}
          maxZoom={DEFAULT_MAP_MAX_ZOOM}
          onMoveEnd={zoom > 1 ? handleMoveEnd : undefined}         
        >
          {/* Base map */}
          <BaseMapLayer
            geographyUrl={DEFAULT_MAP_GEO_URL}
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
                geographyUrl={DEFAULT_MAP_GEO_URL}
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
