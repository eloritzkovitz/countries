import { FaPlus } from "react-icons/fa";
import { OverlayPanel } from "./OverlayPanel";
import { OverlayPanelItem } from "./OverlayPanelItem";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { useOverlayContext } from "../../context/OverlayContext";
import { useKeyHandler } from "../../hooks/useKeyHandler";
import type { Overlay } from "../../types/overlay";

type OverlayManagerPanelProps = {
  isOpen: boolean,
  onClose: () => void,
};

export function OverlayManagerPanel({ isOpen, onClose }: OverlayManagerPanelProps) {
  const {
    overlays,
    toggleOverlayVisibility,
    editOverlay,
    removeOverlay,
    loading,
    error,
  } = useOverlayContext();

  // Close panel on Escape key
  useKeyHandler(() => onClose(), ["Escape"], isOpen);

  // Handler for editing overlay (could open a modal, etc.)
  function handleEditOverlay(overlay: Overlay) {
    editOverlay(overlay);
  }

  // Handler for removing overlay
  function handleRemoveOverlay(id: string) {
    removeOverlay(id);
  }

  if (loading) return <LoadingSpinner message="Loading overlays..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>Overlays</h2>
      <button
        onClick={() => {}}
        style={{
          marginBottom: 18,
          background: "#0078d4",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <FaPlus /> Add Overlay
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {overlays.map((overlay) => (
          <OverlayPanel key={overlay.id} overlay={overlay}>
            <OverlayPanelItem
              overlay={overlay}
              onToggleVisibility={toggleOverlayVisibility}
              onEdit={handleEditOverlay}
              onRemove={handleRemoveOverlay}
            />
          </OverlayPanel>
        ))}
      </ul>
    </div>
  );
}