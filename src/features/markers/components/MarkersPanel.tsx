import { useState } from "react";
import { FaMapPin, FaPlus, FaTimes } from "react-icons/fa";
import { ActionButton, Panel } from "@components";
import { DEFAULT_PANEL_WIDTH } from "@config/constants";
import { useMarkers } from "@contexts/MarkersContext";
import { useUI } from "@contexts/UIContext";
import { useDragReorder } from "@hooks/useDragReorder";
import { MarkersPanelItem } from "./MarkersPanelItem";
import { CreateMarkerModal } from "./CreateMarkerModal";

interface MarkersPanelProps {
  onAddMarker: () => void;
  onCenterMap: (marker: { longitude: number; latitude: number }) => void;
}

export function MarkersPanel({ onAddMarker, onCenterMap }: MarkersPanelProps) {
  const {
    markers,
    editMarker,
    removeMarker,
    toggleMarkerVisibility,
    reorderMarkers,
  } = useMarkers();
  const { showMarkers, closePanel } = useUI();
  const { draggedIndex, handleDragStart, handleDragOver, handleDragEnd } =
    useDragReorder(markers, reorderMarkers);
  const [editingMarker, setEditingMarker] = useState<any | null>(null);

  return (
    <>
      <CreateMarkerModal
        open={!!editingMarker}
        marker={editingMarker || undefined}
        onSubmit={(name, color, description) => {
          if (editingMarker) {
            editMarker({
              ...editingMarker,
              name,
              color: color || editingMarker.color,
              description: description ?? editingMarker.description,
            });
            setEditingMarker(null);
          }
        }}
        onClose={() => setEditingMarker(null)}
        coords={null}
      />
      <Panel
        title={
          <>
            <FaMapPin />
            Markers
          </>
        }
        show={showMarkers}
        width={DEFAULT_PANEL_WIDTH}
        onHide={closePanel}
        headerActions={
          <>
            <ActionButton
              onClick={onAddMarker}
              ariaLabel="Add Marker"
              title="Add Marker"
            >
              <FaPlus />
            </ActionButton>
            <ActionButton
              onClick={closePanel}
              ariaLabel="Close markers panel"
              title="Close"
            >
              <FaTimes />
            </ActionButton>
          </>
        }
      >
        <div className="p-4">
          {markers.length === 0 ? (
            <div className="text-sm text-gray-500">No markers yet.</div>
          ) : (
            <ul className="space-y-2">
              {markers.map((marker, idx) => (
                <MarkersPanelItem
                  key={marker.id}
                  marker={marker}
                  idx={idx}
                  onToggleVisibility={() => toggleMarkerVisibility(marker.id)}
                  onEdit={() => setEditingMarker(marker)}
                  onCenter={() => onCenterMap(marker)}
                  onRemove={() => removeMarker(marker.id)}
                  draggedIndex={draggedIndex}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDragEnd={handleDragEnd}
                />
              ))}
            </ul>
          )}
        </div>
      </Panel>
    </>
  );
}
