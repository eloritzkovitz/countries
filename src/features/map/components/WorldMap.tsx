import { useEffect, useRef } from "react";
import { ComposableMap, ZoomableGroup } from "react-simple-maps";
import { DEFAULT_MAP_SETTINGS } from "@config/constants";
import { useMapUI } from "@context/MapUIContext";
import { useOverlayContext } from "@context/OverlayContext";
import { useGeoData } from "@hooks/useGeoData";
import { CountriesLayer } from "./CountriesLayer";
import { MapStatus } from "./MapStatus";
import { MapSvgContainer } from "../export/MapSvgContainer";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { getOverlayItems } from "../utils/mapUtils";

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
  onReady?: () => void;
  svgRef?: React.Ref<SVGSVGElement>;
};

export function WorldMap({
  zoom,
  center,
  handleMoveEnd,
  onCountryClick,
  onCountryHover,
  selectedIsoCode,
  hoveredIsoCode,
  onReady,
  svgRef,
}: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useContainerDimensions(containerRef);
  const { projection } = useMapUI();

  // Load geographical data
  const { geoData, geoError, loading: geoLoading } = useGeoData();

  // Load overlays data
  const {
    overlays,
    loading: overlaysLoading,
    error: overlaysError,
  } = useOverlayContext();

  // Call onReady when everything is loaded and ready
  useEffect(() => {
    if (
      !geoLoading &&
      !overlaysLoading &&
      dimensions.width &&
      dimensions.height &&
      geoData
    ) {
      onReady?.();
    }
  }, [
    geoLoading,
    overlaysLoading,
    dimensions.width,
    dimensions.height,
    geoData,
    onReady,
  ]);

  // Show spinner until overlays, dimensions, and geoData are ready
  const isLoading =
    geoLoading ||
    overlaysLoading ||
    !dimensions.width ||
    !dimensions.height ||
    !geoData;
  const errorMsg = overlaysError || geoError;

  if (isLoading || errorMsg) {
    return (
      <MapStatus
        loading={isLoading}
        error={errorMsg}
        containerRef={containerRef}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-[100dvh] ${DEFAULT_MAP_SETTINGS.bgColor} overflow-hidden`}
    >
      {/* SVG map container */}
      <MapSvgContainer
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
      >
        <ComposableMap
          projection={projection || DEFAULT_MAP_SETTINGS.projection}
          projectionConfig={{
            scale:
              Math.min(dimensions.width, dimensions.height) /
              DEFAULT_MAP_SETTINGS.scaleDivisor,
            center: [0, 0],
          }}
          width={dimensions.width}
          height={dimensions.height}
        >
          <ZoomableGroup
            zoom={zoom}
            center={center}
            minZoom={DEFAULT_MAP_SETTINGS.minZoom}
            maxZoom={DEFAULT_MAP_SETTINGS.maxZoom}
            onMoveEnd={zoom >= 1 ? handleMoveEnd : undefined}
          >            
            {/* Countries layers */}
            {overlays
              .filter((o) => o.visible)
              .map((overlay) => (
                <CountriesLayer
                  key={overlay.id}
                  geographyData={geoData}
                  overlayItems={getOverlayItems(overlay)}
                  defaultColor={overlay.color}
                  suffix={`-overlay-${overlay.id}`}
                  selectedIsoCode={selectedIsoCode}
                  hoveredIsoCode={hoveredIsoCode}
                  onCountryClick={onCountryClick}
                  onCountryHover={onCountryHover}
                />
              ))}
          </ZoomableGroup>
        </ComposableMap>
      </MapSvgContainer>
    </div>
  );
}
