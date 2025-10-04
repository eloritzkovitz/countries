import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { CountryDetailsModal } from "../components/country/CountryDetailsModal";
import { CountrySidebarPanel } from "../components/country/CountrySidebarPanel";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { MapScale } from "../components/map/MapScale";
import OverlayManagerPanel from "../components/overlay/OverlayManagerPanel";
import { WorldMap } from "../components/map/WorldMap";
import { useCountryData } from "../context/CountryDataContext";
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

  // Overlay Manager Modal state
  const [showOverlayManager, setShowOverlayManager] = useState(false);

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
    <div style={{ display: "flex", height: "100vh", background: "#f5f6fa" }}>
      {/* Map and toolbar */}
      <div
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "stretch",
          position: "relative",
          height: "100vh",
          minHeight: 0,
        }}
      >
        <MapScale
          scale={zoom}
          minScale={1}
          maxScale={10}
          onScaleChange={setZoom}
          onZoomIn={() => setZoom((z) => Math.min(z * 1.5, 16))}
          onZoomOut={() => setZoom((z) => Math.max(z / 1.5, 1))}
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
      {/* Overlay Manager Button */}
      <button
        onClick={() => setShowOverlayManager((v) => !v)}
        style={{
          position: "fixed",
          left: 32,
          bottom: 32,
          zIndex: 100,
          background: "#0078d4",
          color: "#fff",
          border: "none",
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          cursor: "pointer",
          padding: 0,
        }}
        aria-label={
          showOverlayManager ? "Close Overlays Panel" : "Open Overlays Panel"
        }
      >
        <FaLayerGroup size={32} color="#fff" />
      </button>

      {/* Overlay Manager Modal */}
      {showOverlayManager && (
        <div
          style={{
            position: "fixed",
            left: 32,
            bottom: 100,
            zIndex: 101,
            minWidth: 340,
            background: "#fff",
            padding: 28,
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            transition: "opacity 0.2s",
            maxWidth: 600,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
          onClick={() => setShowOverlayManager(false)}
          aria-modal="true"
          role="dialog"
        >
          <button
            onClick={() => setShowOverlayManager(false)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: "#0078d4",
            }}
            aria-label="Close Overlay Manager"
          >
            ×
          </button>
          <OverlayManagerPanel isOpen={showOverlayManager} onClose={() => setShowOverlayManager(false)} />
        </div>
      )}
    </div>
  );
}
