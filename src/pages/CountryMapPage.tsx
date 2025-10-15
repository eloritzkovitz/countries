import { useCallback, useRef, useState } from "react";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { CountryDetailsModal } from "../components/country/CountryDetailsModal";
import { CountriesPanel } from "../components/country/CountriesPanel";
import { MapToolbar } from "../components/map/MapToolbar";
import { WorldMap } from "../components/map/WorldMap";
import { OverlayEditModal } from "../components/overlay/OverlayEditModal";
import { OverlayManagerPanel } from "../components/overlay/OverlayManagerPanel";
import { useCountryData } from "../context/CountryDataContext";
import { useOverlayContext } from "../context/OverlayContext";
import { useUI } from "../context/UIContext";
import { useKeyHandler } from "../hooks/useKeyHandler";
import { useMapView } from "../hooks/useMapView";
import { useUiHint } from "../hooks/useUiHint";
import type { Country } from "../types/country";
import { useGeoData } from "../hooks/useGeoData";

export default function CountryMapPage() {
  // UI state
  const { uiVisible, setUiVisible } = useUI();
  const [mapReady, setMapReady] = useState(false);
  const uiHint = useUiHint("Press U to hide/show the UI", 4000);

  // Data state
  const { countries, loading: countriesLoading, error } = useCountryData();
  const { loading: overlaysLoading } = useOverlayContext();
  const { geoData } = useGeoData();
  
  // Map state
  const { zoom, setZoom, center, setCenter, handleMoveEnd, centerOnCountry } =
    useMapView();
  const worldMapRef = useRef<{ exportSvg: () => void }>(null);
  
  // Selection state
  const [selectedIsoCode, setSelectedIsoCode] = useState<string | null>(null);
  const [hoveredIsoCode, setHoveredIsoCode] = useState<string | null>(null);
  const [modalCountry, setModalCountry] = useState<Country | null>(null);
  
  // Overlay state
  const [showOverlayManager, setShowOverlayManager] = useState(false);
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
  
  // Keyboard shortcut to toggle UI visibility (U key)
  useKeyHandler(() => setUiVisible((v) => !v), ["u", "U"]);

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

  // Export SVG
  const handleExportSvg = () => {
    worldMapRef.current?.exportSvg();
  };  

  // Show error state
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      {uiHint}
      <div className="flex h-screen bg-gray-100 relative">
        {/* Sidebar Panel */}
        {uiVisible && (
          <CountriesPanel
            selectedIsoCode={selectedIsoCode}
            hoveredIsoCode={hoveredIsoCode}
            onSelect={setSelectedIsoCode}
            onHover={setHoveredIsoCode}
            onCountryInfo={setModalCountry}
          />
        )}

        {/* Main Map Area */}
        <div className="flex-2 flex flex-col items-stretch justify-stretch relative h-screen min-h-0">
          <WorldMap
            ref={worldMapRef}
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
          />

          {/* Toolbar & UI Overlays */}
          {uiVisible && (
            <>
              <MapToolbar
                zoom={zoom}
                setZoom={setZoom}
                showOverlayManager={showOverlayManager}
                setShowOverlayManager={setShowOverlayManager}
                onExportSVG={handleExportSvg}
              />

              {modalCountry && (
                <CountryDetailsModal
                  country={modalCountry}
                  isOpen={!!modalCountry}
                  onCenterMap={() =>
                    handleCenterMapOnCountry(modalCountry.isoCode)
                  }
                  onClose={() => setModalCountry(null)}
                />
              )}

              {editingOverlay && isEditModalOpen ? (
                <OverlayEditModal
                  overlay={editingOverlay}
                  isNew={isNewOverlay}
                  onChange={setEditingOverlay}
                  onSave={saveOverlay}
                  onClose={closeOverlayModal}
                  isOpen={isEditModalOpen}
                />
              ) : showOverlayManager ? (
                <OverlayManagerPanel
                  isOpen={showOverlayManager}
                  onClose={() => setShowOverlayManager(false)}
                  onEditOverlay={openEditOverlay}
                  onAddOverlay={openAddOverlay}
                />
              ) : null}
            </>
          )}
        </div>

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
