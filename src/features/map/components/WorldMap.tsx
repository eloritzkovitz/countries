import { useEffect, useRef, useState } from "react";
import { ComposableMap, ZoomableGroup } from "react-simple-maps";
import { DEFAULT_MAP_SETTINGS } from "@config/constants";
import { useMapUI } from "@contexts/MapUIContext";
import { useOverlayContext } from "@contexts/OverlayContext";
import { MapMarkersLayer } from "@features/markers";
import { getOverlayItems } from "@features/overlays";
import { useGeoData } from "@hooks/useGeoData";
import { useUiHint } from "@hooks/useUiHint";
import { CountriesLayer } from "./CountriesLayer";
import { MapCoordinatesDisplay } from "./MapCoordinatesDisplay";
import { MapStatus } from "./MapStatus";
import { MapSvgContainer } from "../export/MapSvgContainer";
import { useContainerDimensions } from "../hooks/useContainerDimensions";
import { getGeoCoordsFromMouseEvent } from "../utils/mapUtils";

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
  isAddingMarker?: boolean;
  onMapClickForMarker?: (coords: [number, number]) => void;
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
  isAddingMarker,
  onMapClickForMarker,
}: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useContainerDimensions(containerRef);
  const { projection } = useMapUI();

  // Load geographical data
  const { geoData, geoError, loading: geoLoading } = useGeoData();

  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(
    null
  );

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

  // Merge all visible overlays into a single ordered array
  const overlayItems = overlays
    .filter((o) => o.visible)
    .flatMap(getOverlayItems);

  // UI hint for adding marker
  const addMarkerHint = useUiHint(
    isAddingMarker ? "Click on the map to place a marker." : "",
    isAddingMarker ? 0 : 1
  ); 

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

  // Handle map event for mouse move or click
  const handleMapEvent = (event: React.MouseEvent<SVGSVGElement>) => {
    const coords = getGeoCoordsFromMouseEvent(
      event,
      projection || DEFAULT_MAP_SETTINGS.projection,
      dimensions.width,
      dimensions.height,
      DEFAULT_MAP_SETTINGS.scaleDivisor,
      zoom,
      center
    );
    if (coords) {
      setSelectedCoords([coords[0], coords[1]]);
      if (isAddingMarker && onMapClickForMarker && event.type === "click") {
        onMapClickForMarker([coords[1], coords[0]]);
      }
    }
  };  

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-[100dvh] ${DEFAULT_MAP_SETTINGS.bgColor} overflow-hidden`}
      style={{
        cursor: isAddingMarker ? "crosshair" : "default",
      }}
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
            />
          </ZoomableGroup>
        </ComposableMap>
      </MapSvgContainer>
      {/* UI hint for adding marker */}
      {addMarkerHint}
      {/* Display selected coordinates */}
      {selectedCoords && <MapCoordinatesDisplay coords={selectedCoords} />}
    </div>
  );
}
