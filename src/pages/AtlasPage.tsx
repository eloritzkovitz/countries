import { useRef, useState } from "react";
import { ErrorMessage, MenuPanel, SplashScreen } from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { useOverlayContext } from "@contexts/OverlayContext";
import { useUI } from "@contexts/UIContext";
import { useGeoData } from "@hooks/useGeoData";
import { useUiHint } from "@hooks/useUiHint";
import {
  CountryDetailsModal,
  CountriesPanel,
  useCountrySelection,
} from "@features/atlas/countries";
import { WorldMap, useMapReady, useMapView } from "@features/atlas/map";
import {
  MarkerDetailsModal,
  MarkerModal,
  MarkersPanel,
  useMarkerCreation,
  useMarkerDetailsModal,
} from "@features/atlas/markers";
import { OverlayModal, OverlaysPanel } from "@features/atlas/overlays";
import {
  MapExportPanel,
  MapUiContainer,
  ShortcutsModal,
  useTimelineState,
  useUiToggleHint,
} from "@features/atlas/ui";
import { SettingsPanel } from "@features/settings";
import type { Marker } from "@types";

export default function AtlasPage() {
  // UI state
  const { uiVisible, setUiVisible, setTimelineMode } = useUI();
  const [hintMessage, setHintMessage] = useState<React.ReactNode>("");
  const [hintKey, setHintKey] = useState(0);
  const uiHint = useUiHint(hintMessage, 4000, { key: hintKey });

  // Toggle UI visibility with hint
  useUiToggleHint(uiVisible, setUiVisible, setHintKey, setHintMessage);

  // Data state
  const { geoData } = useGeoData();
  const { countries, loading: countriesLoading, error } = useCountryData();
  const { loading: overlaysLoading } = useOverlayContext();

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
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(
    null
  );
  const { mapReady, handleMapReady } = useMapReady();

  // Country selection state
  const {
    selectedIsoCode,
    setSelectedIsoCode,
    hoveredIsoCode,
    setHoveredIsoCode,
    selectedCountry,
    setSelectedCountry,
    handleCountryClick,
    handleCountryHover,
  } = useCountrySelection(countries);

  // Markers state
  const {
    isAddingMarker,
    modalOpen,
    markerCoords,
    startAddingMarker,
    handleMapClickForMarker,
    handleCreateMarker,
    cancelMarkerCreation,
  } = useMarkerCreation();
  const {
    selectedMarker,
    detailsModalOpen,
    setDetailsModalOpen,
    detailsModalPosition,
    handleMarkerDetails,
  } = useMarkerDetailsModal();

  // Overlays state
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
  const isEditing =
    !!editingOverlay && overlays.some((o) => o.id === editingOverlay.id);

  // Timeline state
  const { years, selectedYear, setSelectedYear } = useTimelineState();

  // Derived state
  const isLoading = countriesLoading || overlaysLoading || !mapReady;

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
          selectedCountry={selectedCountry}
          onSelect={setSelectedIsoCode}
          onHover={setHoveredIsoCode}
          onCountryInfo={setSelectedCountry}
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
            country={selectedCountry}
            isOpen={!!selectedCountry}
            onCenterMap={() =>
              selectedCountry
                ? handleCenterMapOnCountry(selectedCountry.isoCode)
                : undefined
            }
            onClose={() => setSelectedCountry(null)}
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
