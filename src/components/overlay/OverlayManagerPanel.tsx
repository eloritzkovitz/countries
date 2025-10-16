import { useRef } from "react";
import {
  FaLayerGroup,
  FaPlus,
  FaFileImport,
  FaFileExport,
  FaTimes,
} from "react-icons/fa";
import { OverlayPanel } from "./OverlayPanel";
import { OverlayPanelItem } from "./OverlayPanelItem";
import { ActionButton } from "../common/ActionButton";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { Modal } from "../common/Modal";
import { PanelHeader } from "../common/PanelHeader";
import { useOverlayContext } from "../../context/OverlayContext";
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

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading overlays..." />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
          onClick={onClose}
          ariaLabel="Close Overlay Manager"
          title="Close"
        >
          <FaTimes />
        </ActionButton>
      </PanelHeader>
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
    </Modal>
  );
}
