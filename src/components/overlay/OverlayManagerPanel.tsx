import { useRef } from "react";
import { FaPlus, FaUpload, FaDownload, FaTimes } from "react-icons/fa";
import { OverlayPanel } from "./OverlayPanel";
import { OverlayPanelItem } from "./OverlayPanelItem";
import { ActionButton } from "../common/ActionButton";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { useOverlayContext } from "../../context/OverlayContext";
import { useKeyHandler } from "../../hooks/useKeyHandler";
import type { Overlay } from "../../types/overlay";
import {
  importOverlaysFromFile,
  exportOverlaysToFile,
} from "../../utils/overlayFileUtils";

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
    setOverlays,
    toggleOverlayVisibility,
    removeOverlay,
    loading,
    error,
  } = useOverlayContext();

  // File input reference for importing overlays
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close panel on Escape key
  useKeyHandler(() => onClose(), ["Escape"], isOpen);

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading overlays..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Overlays</h2>
        <div className="flex items-center gap-2">
          {/* Action buttons */}
          <ActionButton
            onClick={onAddOverlay}
            ariaLabel="Add Overlay"
            title="Add Overlay"
            colorClass="bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaPlus />
          </ActionButton>
          <ActionButton
            onClick={() => fileInputRef.current?.click()}
            ariaLabel="Import Overlays"
            title="Import Overlays"
            colorClass="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            <FaUpload />
          </ActionButton>
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            onChange={(e) => importOverlaysFromFile(e, setOverlays)}
            style={{ display: "none" }}
          />
          <ActionButton
            onClick={exportOverlaysToFile}
            ariaLabel="Export Overlays"
            title="Export Overlays"
            colorClass="bg-green-600 text-white hover:bg-green-700"
          >
            <FaDownload />
          </ActionButton>
          <ActionButton
            onClick={onClose}
            ariaLabel="Close Overlay Manager"
            title="Close"
          >
            <FaTimes />
          </ActionButton>
        </div>
      </div>
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
