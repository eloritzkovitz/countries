import { useCallback, useRef, useState } from "react";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ShortcutsModal } from "../components/common/ShortcutsModal";
import { CountryDetailsModal } from "../features/countries/components/CountryDetailsModal";
import { CountriesPanel } from "../features/countries/components/CountriesPanel";
import { MapToolbar } from "../features/map/components/MapToolbar";
import { WorldMap } from "../features/map/components/WorldMap";
import { OverlayEditModal } from "../features/overlays/components/OverlayEditModal";
import { OverlaysPanel } from "../features/overlays/components/OverlaysPanel";
import { SettingsPanel } from "../features/settings/SettingsPanel";
import { useCountryData } from "../context/CountryDataContext";
import { useOverlayContext } from "../context/OverlayContext";
import { useMapView } from "../features/map/hooks/useMapView";
import { useUiHint } from "../hooks/useUiHint";
import type { Country } from "../types/country";
import { useGeoData } from "../hooks/useGeoData";

export default function CountryMapPage() {
  // UI state
  const [mapReady, setMapReady] = useState(false);
  const uiHint = useUiHint("Press U to hide/show the UI", 4000);

  // Data state
  const { countries, loading: countriesLoading, error } = useCountryData();
  const { loading: overlaysLoading } = useOverlayContext();
  const { geoData } = useGeoData();

  // Map state
  const { zoom, setZoom, center, setCenter, handleMoveEnd, centerOnCountry } =
    useMapView();
  const svgRef = useRef<SVGSVGElement>(null);

  // Selection state
  const [selectedIsoCode, setSelectedIsoCode] = useState<string | null>(null);
  const [hoveredIsoCode, setHoveredIsoCode] = useState<string | null>(null);
  const [modalCountry, setModalCountry] = useState<Country | null>(null);

  // Overlay state
  const {
    editingOverlay,
    isEditModalOpen,
    isNewOverlay,
    openAddOverlay,
    openEditOverlay,
    saveOverlay,
    closeOverlayModal,
    setEditingOverlay,
  } = useOverlayContext();

  // Derived state
  const isLoading = countriesLoading || overlaysLoading || !mapReady;

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
          />

          {/* Toolbar & UI Overlays */}
          <MapToolbar zoom={zoom} setZoom={setZoom} svgRef={svgRef} />

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

          <OverlayEditModal
            overlay={editingOverlay}
            isNew={isNewOverlay}
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
