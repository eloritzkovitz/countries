import React, { useRef, useState } from "react";
import { FaMapMarkerAlt, FaPlane, FaFileExport, FaFileImport } from "react-icons/fa";
import { ActionButton, ActionsToolbar } from "@components";
import { useTrips } from "@contexts/TripsContext";
import { useClickOutside } from "@hooks/useClickOutside";
import { ExportMenu } from "./ExportMenu";
import { ImportNoticeModal } from "./ImportNoticeModal";
import {
  importTripsFromFile,
  exportTripsToCSV,
  exportTripsToJSON,
} from "../utils/tripsIO";

type FilterState = { local: boolean; abroad: boolean };

type ToolbarProps = {
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
};

export function TripsToolbar({ filter, setFilter }: ToolbarProps) {
  const { trips, addTrip } = useTrips();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // UI state
  const [showImportNotice, setShowImportNotice] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Close export menu on outside click
  useClickOutside([exportMenuRef as React.RefObject<HTMLElement>], () =>
    setShowExportMenu(false)
  );

  // Toggle local filter
  const toggleLocal = () => setFilter({ ...filter, local: !filter.local });

  // Toggle abroad filter
  const toggleAbroad = () => setFilter({ ...filter, abroad: !filter.abroad });

  // Show import notice
  const handleImportClick = () => setShowImportNotice(true);

  // Confirm import after notice
  const confirmImport = () => {
    setShowImportNotice(false);
    fileInputRef.current?.click();
  };

  // Handle file selection for import
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await importTripsFromFile(file, async (trip) => {
        addTrip(trip);
      });
    }
    e.target.value = "";
  };

  // Export to CSV
  const handleExportCSV = () => {
    exportTripsToCSV(trips);
    setShowExportMenu(false);
  };

  // Export to JSON
  const handleExportJSON = () => {
    exportTripsToJSON(trips);
    setShowExportMenu(false);
  };

  return (
    <div className="w-full px-8 flex items-center justify-between h-10 bg-white">
      <ActionsToolbar>
        <div className="flex items-center">
          {/* Filter buttons */}
          <ActionButton
            onClick={toggleLocal}
            ariaLabel="Show/Hide Local Trips"
            title="Local Trips"
            className={`toolbar-btn ${
              filter.local ? "text-blue-700" : "text-gray-400"
            }`}
            icon={<FaMapMarkerAlt />}
          />
          <ActionButton
            onClick={toggleAbroad}
            ariaLabel="Show/Hide Abroad Trips"
            title="Abroad Trips"
            className={`toolbar-btn ${
              filter.abroad ? "text-blue-700" : "text-gray-400"
            }`}
            icon={<FaPlane />}
          />
          <div className="mx-2 w-px h-6 bg-gray-400/30" /> {/* Separator */}
          <ActionButton
            onClick={handleImportClick}
            ariaLabel="Import"
            title="Import Trips"
            className="toolbar-btn"
            icon={<FaFileImport />}
          />
          {showImportNotice && (
            <ImportNoticeModal
              onConfirm={confirmImport}
              onCancel={() => setShowImportNotice(false)}
            />
          )}
          <input
            type="file"
            accept=".json,.csv"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {/* Export button and dropdown in their own relative wrapper */}
          <div className="relative">
            <ActionButton
              onClick={() => setShowExportMenu((v) => !v)}
              ariaLabel="Export"
              title="Export"
              className="toolbar-btn"
              icon={<FaFileExport />}
            />
            {showExportMenu && (
              <ExportMenu
                onExportCSV={handleExportCSV}
                onExportJSON={handleExportJSON}
              />
            )}
          </div>
        </div>
      </ActionsToolbar>
    </div>
  );
}
