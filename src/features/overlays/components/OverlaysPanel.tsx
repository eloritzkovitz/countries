import { useRef } from "react";
import {
  FaLayerGroup,
  FaPlus,
  FaFileImport,
  FaFileExport,
  FaTimes,
} from "react-icons/fa";
import {
  ActionButton,
  ErrorMessage,
  LoadingSpinner,
  Modal,
  PanelHeader,
} from "@components";
import { useOverlayContext } from "@context/OverlayContext";
import { useUI } from "@context/UIContext";
import { useDragReorder } from "@hooks/useDragReorder";
import type { Overlay } from "@types";
import { OverlayPanelItem } from "./OverlayPanelItem";
import {
  importOverlaysFromFile,
  exportOverlaysToFile,
} from "../utils/overlayFileUtils";

type OverlaysPanelProps = {
  onEditOverlay: (overlay: Overlay) => void;
  onAddOverlay: () => void;
};

export function OverlaysPanel({
  onEditOverlay,
  onAddOverlay,
}: OverlaysPanelProps) {
  const { showOverlays, closePanel } = useUI();

  const {
    overlays,
    setOverlays,
    toggleOverlayVisibility,
    removeOverlay,
    loading,
    error,
  } = useOverlayContext();
  
  // Drag state
  const { draggedIndex, handleDragStart, handleDragOver, handleDragEnd } =
    useDragReorder(overlays, setOverlays);

  // File input reference for importing overlays
  const fileInputRef = useRef<HTMLInputElement>(null);  

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading overlays..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Modal
      isOpen={showOverlays}
      onClose={closePanel}
      position="custom"
      containerClassName="right-40 bottom-[80px]"
      className="min-w-[340px] max-w-[600px] max-h-[90vh] bg-white rounded-xl shadow-2xl p-4 overflow-y-auto"
    >
      <PanelHeader
        title={
          <>
            <FaLayerGroup />
            Overlays
          </>
        }
      >
        {/* Action buttons */}
        <ActionButton
          onClick={onAddOverlay}
          ariaLabel="Add Overlay"
          title="Add Overlay"
        >
          <FaPlus />
        </ActionButton>
        <ActionButton
          onClick={() => fileInputRef.current?.click()}
          ariaLabel="Import Overlays"
          title="Import Overlays"
        >
          <FaFileImport />
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
        >
          <FaFileExport />
        </ActionButton>
        <ActionButton
          onClick={closePanel}
          ariaLabel="Close Overlay Manager"
          title="Close"
        >
          <FaTimes />
        </ActionButton>
      </PanelHeader>
      <ul className="list-none p-0">
        {overlays.map((overlay, index) => (
          <div
            key={overlay.id}
            className={`rounded-lg mb-4 bg-gray-50 shadow-sm
      ${draggedIndex === index ? "opacity-70 cursor-grabbing" : "cursor-grab"}
    `}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <OverlayPanelItem
              overlay={overlay}
              onToggleVisibility={toggleOverlayVisibility}
              onEdit={onEditOverlay}
              onRemove={removeOverlay}
            />
          </div>
        ))}
      </ul>
    </Modal>
  );
}
