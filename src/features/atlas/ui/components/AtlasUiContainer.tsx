import { MenuPanel } from "@components";
import { useMarkers } from "@contexts/MarkersContext";
import { useOverlays } from "@contexts/OverlayContext";
import { CountryDetailsModal, CountriesPanel } from "@features/atlas/countries";
import {
  MarkerDetailsModal,
  MarkerModal,
  MarkersPanel,
  useMarkerCreation,
} from "@features/atlas/markers";
import { OverlayModal, OverlaysPanel } from "@features/atlas/overlays";
import { MapExportPanel, ShortcutsModal } from "@features/atlas/ui";
import { SettingsPanel } from "@features/settings";

interface AtlasUiContainerProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  selectedIsoCode: string | null;
  setSelectedIsoCode: any;
  hoveredIsoCode: string | null;
  setHoveredIsoCode: any;
  selectedCountry: any;
  setSelectedCountry: any;
  centerOnCountry: any;
  centerOnMarker: any;
}

export function AtlasUiContainer({
  svgRef,
  selectedIsoCode,
  setSelectedIsoCode,
  hoveredIsoCode,
  setHoveredIsoCode,
  selectedCountry,
  setSelectedCountry,
  centerOnCountry,
  centerOnMarker,
}: AtlasUiContainerProps) {
  // Data state
  const {
    editingMarker,
    setEditingMarker,
    isEditingMarker,
    isMarkerModalOpen,
    saveMarker,
    openEditMarker,
    closeMarkerModal,
    selectedMarker,
    detailsModalOpen,
    detailsModalPosition,
    closeMarkerDetails,
  } = useMarkers();

  // Markers state
  const { startAddingMarker, cancelMarkerCreation } = useMarkerCreation();

  // Overlays state
  const {
    editingOverlay,
    isEditingOverlay,
    isEditModalOpen,
    openAddOverlay,
    openEditOverlay,
    saveOverlay,
    closeOverlayModal,
    setEditingOverlay,
  } = useOverlays();

  return (
    <>
      <MenuPanel />
      <CountriesPanel
        selectedIsoCode={selectedIsoCode}
        hoveredIsoCode={hoveredIsoCode}
        selectedCountry={selectedCountry}
        onSelect={setSelectedIsoCode}
        onHover={setHoveredIsoCode}
        onCountryInfo={setSelectedCountry}
      />
      <CountryDetailsModal
        country={selectedCountry}
        isOpen={!!selectedCountry}
        onCenterMap={() => centerOnCountry(selectedCountry?.isoCode ?? "")}
        onClose={() => setSelectedCountry(null)}
      />
      <MarkerDetailsModal
        marker={selectedMarker}
        open={detailsModalOpen}
        onClose={() => closeMarkerDetails()}
        position={detailsModalPosition}
      />
      <MarkerModal
        marker={editingMarker}
        onChange={setEditingMarker}
        onSave={saveMarker}
        onClose={() => {
          closeMarkerModal();
          cancelMarkerCreation();
        }}
        isOpen={isMarkerModalOpen}
        isEditing={isEditingMarker}
      />
      <MarkersPanel
        onAddMarker={startAddingMarker}
        onEditMarker={openEditMarker}
        onCenterMap={centerOnMarker}
      />
      <OverlayModal
        overlay={editingOverlay}
        onChange={setEditingOverlay}
        onSave={saveOverlay}
        onClose={closeOverlayModal}
        isOpen={isEditModalOpen}
        isEditing={isEditingOverlay}
      />
      <OverlaysPanel
        onEditOverlay={openEditOverlay}
        onAddOverlay={openAddOverlay}
        overlayModalOpen={isEditModalOpen}
      />
      <MapExportPanel svgRef={svgRef} />
      <SettingsPanel />
      <ShortcutsModal />
    </>
  );
}
