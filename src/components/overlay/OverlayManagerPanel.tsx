import { useRef } from "react";
import { FaPlus, FaUpload, FaDownload } from "react-icons/fa";
import { OverlayPanel } from "./OverlayPanel";
import { OverlayPanelItem } from "./OverlayPanelItem";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { useOverlayContext } from "../../context/OverlayContext";
import { useKeyHandler } from "../../hooks/useKeyHandler";
import type { Overlay } from "../../types/overlay";
import { importOverlaysFromFile, exportOverlaysToFile } from "../../utils/overlayFileUtils";

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
    <div>
      <h2 className="text-lg font-bold mb-4">Overlays</h2>
      <div className="flex gap-3 mb-5">
        <button
          onClick={onAddOverlay}
          className="bg-blue-600 text-white border-none rounded-lg px-4 py-2 font-bold flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-yellow-500 text-white border-none rounded-lg px-4 py-2 font-bold flex items-center gap-2 cursor-pointer hover:bg-yellow-600 transition-colors"
        >
          <FaUpload /> Import
        </button>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          onChange={(e) => importOverlaysFromFile(e, setOverlays)}
          style={{ display: "none" }}
        />
        <button
          onClick={exportOverlaysToFile}
          className="bg-green-600 text-white border-none rounded-lg px-4 py-2 font-bold flex items-center gap-2 cursor-pointer hover:bg-green-700 transition-colors"
        >
          <FaDownload /> Export
        </button>
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
