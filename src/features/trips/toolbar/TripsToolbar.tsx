import React, { useRef } from "react";
import {
  FaArrowLeft,
  FaRotateLeft,
  FaLocationDot,
  FaPlane,
  FaFileExport,
  FaFileImport,
  FaGlobe,
  FaChartSimple,
  FaCheck,
  FaCalendar,
} from "react-icons/fa6";
import {
  ActionButton,
  ActionsToolbar,
  SearchInput,
  ToolbarSeparator,
} from "@components";
import { useTrips } from "@contexts/TripsContext";
import { useClickOutside } from "@hooks/useClickOutside";
import type { Trip, TripFilterState } from "@types";
import { ExportMenu } from "./ExportMenu";
import { ImportNoticeModal } from "./ImportNoticeModal";
import { useTripIO } from "../hooks/useTripsIO";
import { TripsStats } from "../stats/TripsStats";

type ToolbarProps = {
  trips: Trip[];
  filters: TripFilterState;
  setFilters: React.Dispatch<React.SetStateAction<TripFilterState>>;
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  resetFilters: () => void;
};

export function TripsToolbar({
  trips,
  filters,
  setFilters,
  globalSearch,
  setGlobalSearch,
  resetFilters,
}: ToolbarProps) {
  const { addTrip } = useTrips();
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const [showStats, setShowStats] = React.useState(false);

  // Return button handler
  const handleReturn = () => {
    window.history.back();
  };

  // Clear filters handler
  const handleClearFilters = () => {
    resetFilters();
    setGlobalSearch("");
  };

  // Toggle filters
  const toggleLocal = () => setFilters({ ...filters, local: !filters.local });
  const toggleAbroad = () =>
    setFilters({ ...filters, abroad: !filters.abroad });
  const toggleCompleted = () =>
    setFilters({ ...filters, completed: !filters.completed });
  const toggleUpcoming = () =>
    setFilters({ ...filters, upcoming: !filters.upcoming });

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

  // Show stats modal handler
  const handleShowStats = () => {
    setShowStats(true);
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
            onClick={handleClearFilters}
            ariaLabel="Clear Filters"
            title="Clear Filters"
            className="toolbar-btn-menu"
            icon={<FaRotateLeft />}
          />
          <ActionButton
            onClick={toggleLocal}
            ariaLabel="Show/Hide Local Trips"
            title="Toggle Local Trips"
            className={`toolbar-btn-toggle ${
              filters.local
                ? "toolbar-btn-toggle-active"
                : "toolbar-btn-toggle-inactive"
            }`}
            icon={<FaLocationDot />}
          />
          <ActionButton
            onClick={toggleAbroad}
            ariaLabel="Show/Hide Abroad Trips"
            title="Toggle Abroad Trips"
            className={`toolbar-btn-toggle ${
              filters.abroad
                ? "toolbar-btn-toggle-active"
                : "toolbar-btn-toggle-inactive"
            }`}
            icon={<FaPlane />}
          />
          <ActionButton
            onClick={toggleCompleted}
            ariaLabel="Show/Hide Completed Trips"
            title="Toggle Completed Trips"
            className={`toolbar-btn-toggle ${
              filters.completed
                ? "toolbar-btn-toggle-active"
                : "toolbar-btn-toggle-inactive"
            }`}
            icon={<FaCheck />}
          />
          <ActionButton
            onClick={toggleUpcoming}
            ariaLabel="Show/Hide Upcoming Trips"
            title="Toggle Upcoming Trips"
            className={`toolbar-btn-toggle ${
              filters.upcoming
                ? "toolbar-btn-toggle-active"
                : "toolbar-btn-toggle-inactive"
            }`}
            icon={<FaCalendar />}
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

          <ToolbarSeparator />

          {/* Stats button */}
          <ActionButton
            onClick={handleShowStats}
            ariaLabel="Statistics"
            title="Show Trip Statistics"
            className="toolbar-btn-menu"
            icon={<FaChartSimple />}
          />
          {showStats && (
            <TripsStats
              isOpen={showStats}
              onClose={() => setShowStats(false)}
              trips={trips}
            />
          )}
        </div>
      </ActionsToolbar>
    </div>
  );
}
