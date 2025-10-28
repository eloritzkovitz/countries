import React from "react";
import { FaTrash } from "react-icons/fa6";
import {
  ActionButton,
  ActionsToolbar,
  ConfirmModal,
  ToolbarSeparator,
} from "@components";
import type { Trip, TripFilterState } from "@types";
import { ToolbarNavigationSearch } from "./ToolbarNavigationSearch";
import { ToolbarFilters } from "./ToolbarFilters";
import { ToolbarImportExport } from "./ToolbarImportExport";
import { ToolbarStatistics } from "./ToolbarStatistics";

type ToolbarProps = {
  trips: Trip[];
  filters: TripFilterState;
  setFilters: React.Dispatch<React.SetStateAction<TripFilterState>>;
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  resetFilters: () => void;
  selectedTripIds: string[];
  onBulkDelete: () => void;
};

export function TripsToolbar({
  trips,
  filters,
  setFilters,
  globalSearch,
  setGlobalSearch,
  resetFilters,
  selectedTripIds,
  onBulkDelete,
}: ToolbarProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);  

  return (
    <div className="w-full px-3 flex items-center justify-between h-16 bg-white border-b border-gray-300 dark:border-gray-600">
      <ActionsToolbar>
        <div className="flex items-center">
          {/* Navigation & Search */}
          <ToolbarNavigationSearch
            globalSearch={globalSearch}
            setGlobalSearch={setGlobalSearch}
          />
          <ToolbarSeparator />

          {/* Filters & Toggles */}
          <ToolbarFilters
            filters={filters}
            setFilters={setFilters}
            setGlobalSearch={setGlobalSearch}
            resetFilters={resetFilters}
          />
          <ToolbarSeparator />

          {/* Import/Export */}
          <ToolbarImportExport trips={trips} />
          <ToolbarSeparator />

          {/* Statistics */}
          <ToolbarStatistics trips={trips} />
          <ToolbarSeparator />

          <ActionButton
            onClick={() => setShowDeleteConfirm(true)}
            ariaLabel="Delete selected"
            title="Delete selected"
            className={`toolbar-btn-toggle ${
              selectedTripIds.length === 0
                ? "toolbar-btn-toggle-inactive"
                : "toolbar-btn-menu"
            }`}
            icon={<FaTrash />}
            disabled={selectedTripIds.length === 0}
          />
          {showDeleteConfirm && (
            <ConfirmModal
              title="Delete Trips"
              message={`Delete ${selectedTripIds.length} selected trips?`}
              onConfirm={() => {
                setShowDeleteConfirm(false);
                onBulkDelete();
              }}
              onCancel={() => setShowDeleteConfirm(false)}
              submitLabel="Delete"
              cancelLabel="Cancel"
              submitIcon={<FaTrash className="inline" />}
            />
          )}
        </div>
      </ActionsToolbar>
    </div>
  );
}
