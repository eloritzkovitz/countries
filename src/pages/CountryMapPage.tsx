import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { CountryDetailsModal } from "../components/country/CountryDetailsModal";
import { CountrySidebarPanel } from "../components/country/CountrySidebarPanel";
import { MapScale } from "../components/map/MapScale";
import { WorldMap } from "../components/map/WorldMap";
import { OverlayEditModal } from "../components/overlay/OverlayEditModal";
import { OverlayManagerPanel } from "../components/overlay/OverlayManagerPanel";
import { useCountryData } from "../context/CountryDataContext";
import { useOverlayContext } from "../context/OverlayContext";
import { useMapView } from "../hooks/useMapView";
import type { Country } from "../types/country";

export default function CountryMapPage() {
  // Map state
  const { countries, loading, error } = useCountryData();
  const { zoom, setZoom, center, setCenter, handleMoveEnd } = useMapView(
    1,
    [0, 20]
  );

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

  // Handler for map country click
  const handleCountryClick = (countryIsoCode: string | null) => {
    const country = countries.find((c) => c.isoCode === countryIsoCode);
    if (country) setModalCountry(country);
  };

  // Handler for hover
  const handleCountryHover = (isoCode: string | null) => {
    setHoveredIsoCode(isoCode);
  };  

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading countries..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-2 flex flex-col items-stretch justify-stretch relative h-screen min-h-0">
        {/* Map toolbar */}
        <div className="absolute left-8 bottom-8 flex items-center gap-6 z-[101]">
          {/* Overlay Manager Button */}
          <button
            onClick={() => setShowOverlayManager((v) => !v)}
            className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer p-0 rounded-full border-none"
            aria-label={
              showOverlayManager
                ? "Close Overlays Panel"
                : "Open Overlays Panel"
            }
          >
            <FaLayerGroup size={32} color="#fff" />
          </button>
          <MapScale
            scale={zoom}
            minScale={1}
            maxScale={10}
            onScaleChange={setZoom}
            onZoomIn={() => setZoom((z) => Math.min(z * 1.5, 16))}
            onZoomOut={() => setZoom((z) => Math.max(z / 1.5, 1))}
          />
        </div>
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
        />
        {modalCountry && (
          <CountryDetailsModal
            country={modalCountry}
            isOpen={!!modalCountry}
            onClose={() => setModalCountry(null)}
          />
        )}
      </div>

      {/* Sidebar panel */}
      <CountrySidebarPanel
        selectedIsoCode={selectedIsoCode}
        hoveredIsoCode={hoveredIsoCode}
        onSelect={setSelectedIsoCode}
        onHover={setHoveredIsoCode}
      />

      {/* Overlay Manager Modal */}
      {showOverlayManager && (
        <div
          className="fixed left-8 bottom-[100px] z-[101] min-w-[340px] max-w-[600px] max-h-[90vh] bg-white p-7 rounded-2xl shadow-2xl overflow-y-auto transition-opacity"
          onClick={() => setShowOverlayManager(false)}
          aria-modal="true"
          role="dialog"
        >
          <button
            onClick={() => setShowOverlayManager(false)}
            className="absolute top-4 right-4 bg-none border-none text-2xl text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            aria-label="Close Overlay Manager"
          >
            ×
          </button>
          <OverlayManagerPanel
            isOpen={showOverlayManager}
            onClose={() => setShowOverlayManager(false)}
            onEditOverlay={openEditOverlay}
            onAddOverlay={openAddOverlay}
          />{" "}
        </div>
      )}

      {/* Overlay Add/Edit Modal */}
      {editingOverlay && (
        <OverlayEditModal
          overlay={editingOverlay}
          isNew={isNewOverlay}          
          onChange={setEditingOverlay}
          onSave={saveOverlay}
          onClose={closeOverlayModal}
          isOpen={isEditModalOpen}
        />
      )}
    </div>
  );
}
