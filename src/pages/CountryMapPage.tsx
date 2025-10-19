import { useCallback, useRef, useState } from "react";
import { ErrorMessage, LoadingSpinner, ShortcutsModal } from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { useOverlayContext } from "@contexts/OverlayContext";
import { useUI } from "@contexts/UIContext";
import { useGeoData } from "@hooks/useGeoData";
import { useUiHint } from "@hooks/useUiHint";
import { useUiToggleHint } from "@hooks/useUiToggleHint";
import { CountryDetailsModal, CountriesPanel } from "@features/countries";
import { Toolbar, WorldMap } from "@features/map";
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

export default function CountryMapPage() {
  // UI state
  const [mapReady, setMapReady] = useState(false);
  const { uiVisible, setUiVisible } = useUI();
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

  // Selection state
  const [selectedIsoCode, setSelectedIsoCode] = useState<string | null>(null);
  const [hoveredIsoCode, setHoveredIsoCode] = useState<string | null>(null);
  const [modalCountry, setModalCountry] = useState<Country | null>(null);

  // Overlay state
  const {
    editingOverlay,
    isEditModalOpen,
    openAddOverlay,
    openEditOverlay,
    saveOverlay,
    closeOverlayModal,
    setEditingOverlay,
  } = useOverlayContext();

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
        {/* Sidebar Panel */}
        <CountriesPanel
          selectedIsoCode={selectedIsoCode}
          hoveredIsoCode={hoveredIsoCode}
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
            onMapClickForMarker={handleMapClickForMarker}
            onMarkerDetails={handleMarkerDetails}
          />

          {/* Toolbar & UI Overlays */}
          <Toolbar zoom={zoom} setZoom={setZoom} svgRef={svgRef} />
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
          />
          <OverlaysPanel
            onEditOverlay={openEditOverlay}
            onAddOverlay={openAddOverlay}
          />
          <SettingsPanel />
        </div>
        <ShortcutsModal />

        {/* Spinner */}
        {isLoading && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-100 bg-opacity-80">
            <LoadingSpinner message="Loading data..." />
          </div>
        )}
      </div>
    </>
  );
}
