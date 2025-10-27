import React, { useRef } from "react";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPlane,
  FaFileExport,
  FaFileImport,
  FaGlobe,
  FaUndo,
} from "react-icons/fa";
import {
  ActionButton,
  ActionsToolbar,
  SearchInput,
  ToolbarSeparator,
} from "@components";
import { useTrips } from "@contexts/TripsContext";
import { useClickOutside } from "@hooks/useClickOutside";
import type { Trip } from "@types";
import { ExportMenu } from "./ExportMenu";
import { ImportNoticeModal } from "./ImportNoticeModal";
import { useTripIO } from "../hooks/useTripsIO";

type FilterState = { local: boolean; abroad: boolean };

type ToolbarProps = {
  trips: Trip[];
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  resetFilters: () => void;
};

export function TripsToolbar({
  trips,
  filter,
  setFilter,
  globalSearch,
  setGlobalSearch,
  resetFilters,
}: ToolbarProps) {
  const { addTrip } = useTrips();
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Return button handler
  const handleReturn = () => {
    window.history.back();
  };

  // Clear filters handler
  const handleClearFilters = () => {
    setFilter({ local: true, abroad: true });
    setGlobalSearch("");
    resetFilters();
  };

  // Toggle local/abroad filters
  const toggleLocal = () => setFilter({ ...filter, local: !filter.local });
  const toggleAbroad = () => setFilter({ ...filter, abroad: !filter.abroad });

  // Import/export logic
  const {
    showImportNotice,
    setShowImportNotice,
    fileInputRef,
    handleImportClick,
    handleFileChange,
    confirmImport,
    showExportMenu,
    setShowExportMenu,
    handleExportCSV,
    handleExportJSON,
    handleExportVisitedOverlay,
  } = useTripIO(trips, addTrip);

  // Close export menu on outside click
  useClickOutside([exportMenuRef as React.RefObject<HTMLElement>], () =>
    setShowExportMenu(false)
  );

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
            onClick={handleClearFilters}
            ariaLabel="Clear Filters"
            title="Clear Filters"
            className="toolbar-btn-menu"
            icon={<FaUndo />}
          />
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
          <ToolbarSeparator />
          {/* Import/Export buttons */}
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
        </div>
      </ActionsToolbar>
    </div>
  );
}
