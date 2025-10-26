import React, { useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPlane,
  FaFileExport,
  FaFileImport,
  FaArrowLeft,
} from "react-icons/fa";
import { ActionButton, ActionsToolbar, SearchInput } from "@components";
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
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
};

export function TripsToolbar({
  filter,
  setFilter,
  globalSearch,
  setGlobalSearch,
}: ToolbarProps) {
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

  const handleReturn = () => {
    // For example, navigate back or close the page/modal
    window.history.back();
  };

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
    <div className="w-full px-3 flex items-center justify-between h-10 bg-white border-b border-gray-300 dark:border-gray-600">
      <ActionsToolbar>
        <div className="flex items-center">
          <ActionButton
            onClick={handleReturn}
            ariaLabel="Return"
            title="Return"
            className="toolbar-btn-menu"
            icon={<FaArrowLeft />}
          />
          {/* Global search input */}
          <div className="mx-2">
            <SearchInput
              value={globalSearch}
              onChange={setGlobalSearch}
              placeholder="Search all trips..."
              className="w-64 h-8 rounded-full"
            />
          </div>
          {/* Filter buttons */}
          <ActionButton
            onClick={toggleLocal}
            ariaLabel="Show/Hide Local Trips"
            title="Toggle Local Trips"
            className={`toolbar-btn-toggle ${
              filter.local
                ? "toolbar-btn-toggle-active"
                : "toolbar-btn-toggle-inactive"
            }`}
            icon={<FaMapMarkerAlt />}
          />
          <ActionButton
            onClick={toggleAbroad}
            ariaLabel="Show/Hide Abroad Trips"
            title="Toggle Abroad Trips"
            className={`toolbar-btn-toggle ${
              filter.abroad
                ? "toolbar-btn-toggle-active"
                : "toolbar-btn-toggle-inactive"
            }`}
            icon={<FaPlane />}
          />
          <div className="mx-2 w-px h-6 bg-gray-400/30" /> {/* Separator */}
          <ActionButton
            onClick={handleImportClick}
            ariaLabel="Import"
            title="Import Trips"
            className="toolbar-btn-menu"
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
        </div>
      </ActionsToolbar>
    </div>
  );
}
