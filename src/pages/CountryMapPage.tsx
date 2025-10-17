import { useCallback, useRef, useState } from "react";
import { ErrorMessage, LoadingSpinner, ShortcutsModal} from "@components";
import { useCountryData } from "@context/CountryDataContext";
import { useOverlayContext } from "@context/OverlayContext";
import { useGeoData } from "@hooks/useGeoData";
import { useUiHint } from "@hooks/useUiHint";
import { CountryDetailsModal, CountriesPanel } from "@features/countries";
import { Toolbar, WorldMap } from "@features/map";
import { useMapView } from "@features/map/hooks/useMapView";
import { OverlayEditModal, OverlaysPanel } from "@features/overlays";
import { SettingsPanel } from "@features/settings";
import type { Country } from "../types/country";

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
