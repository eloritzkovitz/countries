import { FaMapPin, FaPlus, FaTimes } from "react-icons/fa";
import { ActionButton, Panel } from "@components";
import { DEFAULT_PANEL_WIDTH } from "@config/constants";
import { useMarkers } from "@contexts/MarkersContext";
import { useUI } from "@contexts/UIContext";

interface MarkersPanelProps {
  onAddMarker: () => void;
}

export function MarkersPanel({ onAddMarker }: MarkersPanelProps) {
  const { markers, removeMarker } = useMarkers();
  const { showMarkers, closePanel } = useUI();

  return (
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
            {markers.map((marker) => (
              <li
                key={marker.id}
                className="flex items-center justify-between bg-gray-50 rounded px-3 py-2"
              >
                <div>
                  <div className="font-medium">{marker.name}</div>
                  <div className="text-xs text-gray-500">
                    {marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
                  </div>
                  {marker.description && (
                    <div className="text-xs text-gray-400">
                      {marker.description}
                    </div>
                  )}
                </div>
                <ActionButton
                  onClick={() => removeMarker(marker.id)}
                  ariaLabel="Remove Marker"
                  title="Remove Marker"
                  className="ml-2 text-red-500"
                >
                  <FaTimes />
                </ActionButton>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  );
}

export default MarkersPanel;
