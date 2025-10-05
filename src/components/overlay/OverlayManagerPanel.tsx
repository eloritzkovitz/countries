import { FaPlus } from "react-icons/fa";
import { OverlayPanel } from "./OverlayPanel";
import { OverlayPanelItem } from "./OverlayPanelItem";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { useOverlayContext } from "../../context/OverlayContext";
import { useKeyHandler } from "../../hooks/useKeyHandler";
import type { Overlay } from "../../types/overlay";

type OverlayManagerPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onEditOverlay: (overlay: Overlay) => void;
  onAddOverlay: () => void;
};

export function OverlayManagerPanel({
  isOpen,
  onClose,
  onEditOverlay,
  onAddOverlay,
}: OverlayManagerPanelProps) {
  const {
    overlays,
    toggleOverlayVisibility,
    removeOverlay,
    loading,
    error,
  } = useOverlayContext();

  // Close panel on Escape key
  useKeyHandler(() => onClose(), ["Escape"], isOpen);

  if (loading) return <LoadingSpinner message="Loading overlays..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Overlays</h2>
      <button
        onClick={onAddOverlay}
        className="mb-5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 font-bold flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
      >
        <FaPlus /> Add Overlay
      </button>
      <ul className="list-none p-0">
        {overlays.map((overlay) => (
          <OverlayPanel key={overlay.id} overlay={overlay}>
            <OverlayPanelItem
              overlay={overlay}
              onToggleVisibility={toggleOverlayVisibility}
              onEdit={onEditOverlay}
              onRemove={removeOverlay}
            />
          </OverlayPanel>
        ))}
      </ul>
    </div>
  );
}