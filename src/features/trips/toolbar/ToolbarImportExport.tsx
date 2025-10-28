import React, { useRef } from "react";
import { FaFileImport, FaFileExport, FaGlobe, FaCheck } from "react-icons/fa6";
import { ActionButton, ConfirmModal } from "@components";
import { ExportMenu } from "./ExportMenu";
import { useClickOutside } from "@hooks/useClickOutside";
import { useTripIO } from "../hooks/useTripsIO";
import type { Trip } from "@types";
import { useTrips } from "@contexts/TripsContext";

type ToolbarImportExportProps = {
  trips: Trip[];
};

export function ToolbarImportExport({
  trips,
}: ToolbarImportExportProps) {
  const { addTrip } = useTrips();
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const [showImportNotice, setShowImportNotice] = React.useState(false);
  const [showExportMenu, setShowExportMenu] = React.useState(false);

  // Import/export logic
  const {
    fileInputRef,
    handleFileChange,
    handleExportCSV,
    handleExportJSON,
    handleExportVisitedOverlay,
  } = useTripIO(trips, addTrip);

  // Close export menu on outside click
  useClickOutside([exportMenuRef as React.RefObject<HTMLElement>], () =>
    setShowExportMenu(false)
  );  

  // Trigger file input click
  function triggerFileInput() {
    fileInputRef.current?.click();
  }

  return (
    <>
      <ActionButton
        onClick={() => setShowImportNotice(true)}
        ariaLabel="Import"
        title="Import Trips"
        className="toolbar-btn-menu"
        icon={<FaFileImport />}
      />
      {showImportNotice && (
        <ConfirmModal
          message={
            <>
              Importing will <b>add</b> trips to your current list. Existing
              trips will not be overwritten.
            </>
          }
          onConfirm={() => {
            setShowImportNotice(false);
            setTimeout(triggerFileInput, 0);
          }}
          onCancel={() => setShowImportNotice(false)}
          submitLabel="Continue"
          cancelLabel="Cancel"
          submitIcon={<FaCheck className="inline" />}
        />
      )}
      <input
        type="file"
        accept=".json,.csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="relative" ref={exportMenuRef}>
        <ActionButton
          onClick={() => setShowExportMenu((v) => !v)}
          ariaLabel="Export"
          title="Export Trips"
          className="toolbar-btn-menu"
          icon={<FaFileExport />}
        />
        {showExportMenu && (
          <ExportMenu
            onExportCSV={handleExportCSV}
            onExportJSON={handleExportJSON}
          />
        )}
      </div>
      <ActionButton
        onClick={handleExportVisitedOverlay}
        ariaLabel="Export Visited Countries"
        title="Export Visited Countries"
        className="toolbar-btn-menu"
        icon={<FaGlobe />}
      />
    </>
  );
}
