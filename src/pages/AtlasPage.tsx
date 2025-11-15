import { useCallback, useRef, useState } from "react";
import {
  ErrorMessage,
  MenuPanel,
  ShortcutsModal,
  SplashScreen,
} from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { useOverlayContext } from "@contexts/OverlayContext";
import { useUI } from "@contexts/UIContext";
import { useGeoData } from "@hooks/useGeoData";
import { useUiHint } from "@hooks/useUiHint";
import { useUiToggleHint } from "@hooks/useUiToggleHint";
import { CountryDetailsModal, CountriesPanel } from "@features/countries";
import { MapExportPanel, WorldMap } from "@features/map";
import { MapUiContainer, useTimelineState } from "@features/mapUi";
import { useMapView } from "@features/map/hooks/useMapView";
import {
  MarkerDetailsModal,
  MarkerModal,
  MarkersPanel,
  useMarkerCreation,
} from "@features/markers";
import { OverlayModal, OverlaysPanel } from "@features/overlays";
import { SettingsPanel } from "@features/settings";
import type { Country, Marker } from "@types";

export default function AtlasPage() {
  // UI state
  const [mapReady, setMapReady] = useState(false);
  const {
    uiVisible,
    setUiVisible, 
    setTimelineMode,
  } = useUI();
  const [hintMessage, setHintMessage] = useState<React.ReactNode>("");
  const [hintKey, setHintKey] = useState(0);
  const uiHint = useUiHint(hintMessage, 4000, { key: hintKey });

  // Data state
  const { countries, loading: countriesLoading, error } = useCountryData();
  const { loading: overlaysLoading } = useOverlayContext();
  const { geoData } = useGeoData();

  // Map state
  const {
    zoom,
    setZoom,
    center,
    setCenter,
    handleMoveEnd,
    centerOnCountry,
    centerOnMarker,
  } = useMapView();
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);

  // Selection state
  const [selectedIsoCode, setSelectedIsoCode] = useState<string | null>(null);
  const [hoveredIsoCode, setHoveredIsoCode] = useState<string | null>(null);
  const [modalCountry, setModalCountry] = useState<Country | null>(null);

  // Marker creation state
  const {
    isAddingMarker,
    modalOpen,
    markerCoords,
    startAddingMarker,
    handleMapClickForMarker,
    handleCreateMarker,
    cancelMarkerCreation,
  } = useMarkerCreation();

  // Overlay state
  const {
    overlays,
    editingOverlay,
    isEditModalOpen,
    openAddOverlay,
    openEditOverlay,
    saveOverlay,
    closeOverlayModal,
    setEditingOverlay,
  } = useOverlayContext();

  // Determine if currently editing an existing overlay
  const isEditing =
    !!editingOverlay && overlays.some((o) => o.id === editingOverlay.id);  

  // Timeline state
  const { years, selectedYear, setSelectedYear } = useTimelineState();

  // Derived state
  const isLoading = countriesLoading || overlaysLoading || !mapReady;

  // Show UI hint on 'U' key press
  useUiToggleHint(uiVisible, setUiVisible, setHintKey, setHintMessage);

  // Map ready handler with slight delay
  const handleMapReady = useCallback(() => {
    setTimeout(() => setMapReady(true), 150);
  }, []);

  // Country click handler
  function handleCountryClick(countryIsoCode: string | null) {
    const country = countries.find((c) => c.isoCode === countryIsoCode);
    if (country) setModalCountry(country);
  }

  // Country hover handler
  const handleCountryHover = (isoCode: string | null) => {
    setHoveredIsoCode(isoCode);
  };

  // Center map on a country
  function handleCenterMapOnCountry(isoCode: string) {
    if (geoData) {
      centerOnCountry(geoData, isoCode);
    }
  }

  // Center map on a marker
  function handleCenterMapOnMarker(
    marker: { longitude: number; latitude: number } | Marker
  ) {
    centerOnMarker(marker);
    // If a marker is provided, show its details
    if ("id" in marker) {
      handleMarkerDetails(marker);
    }
  }

  // Marker details modal state
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsModalPosition, setDetailsModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Handle marker details view
  const handleMarkerDetails = (
    marker: Marker,
    position?: { top: number; left: number }
  ) => {
    setSelectedMarker(marker);
    setDetailsModalOpen(true);
    if (position) setDetailsModalPosition(position);
    else setDetailsModalPosition(null);
  };

  // Show error state
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {uiHint}
      <div className="flex h-screen bg-gray-100 relative">
        {/* Menu Panel */}
        <MenuPanel />

        {/* Countries Panel */}
        <CountriesPanel
          selectedIsoCode={selectedIsoCode}
          hoveredIsoCode={hoveredIsoCode}
          modalCountry={modalCountry}
          onSelect={setSelectedIsoCode}
          onHover={setHoveredIsoCode}
          onCountryInfo={setModalCountry}
        />

        {/* Main Map Area */}
        <div className="flex-2 flex flex-col items-stretch justify-stretch relative h-screen min-h-0">
          <WorldMap
            zoom={zoom}
            center={center}
            setZoom={setZoom}
            setCenter={setCenter}
            handleMoveEnd={handleMoveEnd}
            onCountryClick={handleCountryClick}
            onCountryHover={handleCountryHover}
            selectedIsoCode={selectedIsoCode}
            hoveredIsoCode={hoveredIsoCode}
            onReady={() => handleMapReady()}
            svgRef={svgRef}
            isAddingMarker={isAddingMarker}
            setSelectedCoords={(coords) => setSelectedCoords(coords)}
            onMapClickForMarker={handleMapClickForMarker}
            onMarkerDetails={handleMarkerDetails}
            selectedYear={selectedYear}
          />          
          <MapUiContainer
            zoom={zoom}
            setZoom={setZoom}
            selectedCoords={selectedCoords}
            setTimelineMode={setTimelineMode}
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            overlays={overlays}
            isAddingMarker={isAddingMarker}
          />
          <CountryDetailsModal
            country={modalCountry}
            isOpen={!!modalCountry}
            onCenterMap={() =>
              modalCountry
                ? handleCenterMapOnCountry(modalCountry.isoCode)
                : undefined
            }
            onClose={() => setModalCountry(null)}
          />
          <MarkerDetailsModal
            marker={selectedMarker}
            open={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            position={detailsModalPosition}
          />
          <MarkerModal
            open={modalOpen}
            coords={markerCoords}
            onSubmit={handleCreateMarker}
            onClose={cancelMarkerCreation}
          />
          <MarkersPanel
            onAddMarker={startAddingMarker}
            onCenterMap={handleCenterMapOnMarker}
          />
          <OverlayModal
            overlay={editingOverlay}
            onChange={setEditingOverlay}
            onSave={saveOverlay}
            onClose={closeOverlayModal}
            isOpen={isEditModalOpen}
            isEditing={isEditing}
          />
          <OverlaysPanel
            onEditOverlay={openEditOverlay}
            onAddOverlay={openAddOverlay}
            overlayModalOpen={isEditModalOpen}
          />
          <MapExportPanel svgRef={svgRef} />
          <SettingsPanel />
        </div>
        <ShortcutsModal />

        {/* Splash screen */}
        {isLoading && <SplashScreen />}
      </div>
    </>
  );
}
