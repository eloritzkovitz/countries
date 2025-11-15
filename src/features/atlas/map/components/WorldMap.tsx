import { useRef } from "react";
import { ComposableMap, ZoomableGroup } from "react-simple-maps";
import { DEFAULT_MAP_SETTINGS } from "@constants";
import { useMapUI } from "@contexts/MapUIContext";
import { useOverlayContext } from "@contexts/OverlayContext";
import { useContainerDimensions } from "@hooks/useContainerDimensions";
import { useGeoData } from "@hooks/useGeoData";
import type { Marker } from "@types";
import { MapSvgContainer } from "./MapSvgContainer";
import { CountriesLayer } from "./layers/CountriesLayer";
import { MapMarkersLayer } from "./layers/MapMarkersLayer";
import { MapStatus } from "./status/MapStatus";
import { useMapStatus } from "../hooks/useMapStatus";
import { useMapEventHandler } from "../hooks/useMapEventHandler";
import { useMapOverlayItems } from "../hooks/useMapOverlayItems";

interface WorldMapProps {
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
  isAddingMarker?: boolean;
  setSelectedCoords?: (coords: [number, number] | null) => void;
  onMapClickForMarker?: (coords: [number, number]) => void;
  onMarkerDetails?: (marker: Marker) => void;
  selectedYear: number;
}

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
  isAddingMarker,
  setSelectedCoords,
  onMapClickForMarker,
  onMarkerDetails,
  selectedYear,
}: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useContainerDimensions(containerRef);

  // Map projection and data
  const { projection } = useMapUI();
  const { geoData, geoError, loading: geoLoading } = useGeoData();

  // Load overlays data
  const {
    overlays,
    loading: overlaysLoading,
    error: overlaysError,
  } = useOverlayContext();

  // Get overlay items based on mode
  const overlayItems = useMapOverlayItems(overlays, selectedYear);

  // Determine map status
  const { isLoading, errorMsg } = useMapStatus({
    geoLoading,
    overlaysLoading,
    dimensions,
    geoData,
    overlaysError: overlaysError ?? undefined,
    geoError: geoError ?? undefined,
    onReady,
  });

  // Handle map event for mouse move or click
  const handleMapEvent = useMapEventHandler({
    projection,
    dimensions,
    zoom,
    center,
    isAddingMarker,
    setSelectedCoords: setSelectedCoords
      ? (coords) => setSelectedCoords(coords)
      : () => {},
    onMapClickForMarker,
  });

  // Show loading or error state
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
      style={{ cursor: isAddingMarker ? "crosshair" : "default" }}
    >
      {/* SVG map container */}
      <MapSvgContainer
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="map-container"
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
          onMouseMove={handleMapEvent}
          onClick={handleMapEvent}
        >
          <ZoomableGroup
            zoom={zoom}
            center={center}
            minZoom={DEFAULT_MAP_SETTINGS.minZoom}
            maxZoom={DEFAULT_MAP_SETTINGS.maxZoom}
            onMoveEnd={zoom >= 1 ? handleMoveEnd : undefined}
          >
            {/* Countries layers */}
            <CountriesLayer
              geographyData={geoData}
              overlayItems={overlayItems}
              selectedIsoCode={selectedIsoCode}
              hoveredIsoCode={hoveredIsoCode}
              onCountryClick={onCountryClick}
              onCountryHover={onCountryHover}
              isAddingMarker={isAddingMarker}
            />
            {/* Markers layer */}
            <MapMarkersLayer
              projectionType={projection || DEFAULT_MAP_SETTINGS.projection}
              width={dimensions.width}
              height={dimensions.height}
              scaleDivisor={DEFAULT_MAP_SETTINGS.scaleDivisor}
              zoom={zoom}
              onMarkerDetails={onMarkerDetails}
            />
          </ZoomableGroup>
        </ComposableMap>
      </MapSvgContainer>
    </div>
  );
}
