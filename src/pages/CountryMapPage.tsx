import { useRef, useState } from "react";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { CountryDetailsModal } from "../components/country/CountryDetailsModal";
import { CountrySidebarPanel } from "../components/country/CountrySidebarPanel";
import { MapToolbar } from "../components/map/MapToolbar";
import { WorldMap } from "../components/map/WorldMap";
import { OverlayEditModal } from "../components/overlay/OverlayEditModal";
import { OverlayManagerPanel } from "../components/overlay/OverlayManagerPanel";
import { useCountryData } from "../context/CountryDataContext";
import { useOverlayContext } from "../context/OverlayContext";
import { useMapView } from "../hooks/useMapView";
import type { Country } from "../types/country";
import { exportSvg } from "../utils/fileUtils";

export default function CountryMapPage() {
  // Map state
  const { countries, loading, error } = useCountryData();
  const { zoom, setZoom, center, setCenter, handleMoveEnd } = useMapView();
  const svgRef = useRef<SVGSVGElement>(null);

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
  
  // Export the current map view as an SVG file
  const handleExportSvg = () => {
    if (svgRef.current) {
      exportSvg(svgRef.current, "countries-map.svg");
    }
  };

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading countries..." />;
  if (error) return <ErrorMessage error={error} />;  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar panel */}
      <CountrySidebarPanel
        selectedIsoCode={selectedIsoCode}
        hoveredIsoCode={hoveredIsoCode}
        onSelect={setSelectedIsoCode}
        onHover={setHoveredIsoCode}
      />

      {/* Main map area */}
      <div className="flex-2 flex flex-col items-stretch justify-stretch relative h-screen min-h-0">
        {/* Map toolbar */}
        <MapToolbar
          zoom={zoom}
          setZoom={setZoom}
          showOverlayManager={showOverlayManager}
          setShowOverlayManager={setShowOverlayManager}
          onExportSVG={handleExportSvg} 
        />
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
          svgRef={svgRef}
        />
        {modalCountry && (
          <CountryDetailsModal
            country={modalCountry}
            isOpen={!!modalCountry}
            onClose={() => setModalCountry(null)}
          />
        )}
      </div>

      {/* Overlay Modals */}
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
    </div>
  );
}
