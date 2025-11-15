import React from "react";
import { ActionsToolbar, ToolbarSeparator } from "@components";
import type { TripFilterState } from "@features/trips/types";
import type { Trip } from "@types";
import { ToolbarNavigationSearch } from "./ToolbarNavigationSearch";
import { ToolbarFilters } from "./ToolbarFilters";
import { ToolbarImportExport } from "./ToolbarImportExport";
import { ToolbarStatistics } from "./ToolbarStatistics";
import { ToolbarActions } from "./ToolbarActions";
import "./TripsToolbar.css";

interface ToolbarProps {
  trips: Trip[];
  filters: TripFilterState;
  setFilters: React.Dispatch<React.SetStateAction<TripFilterState>>;
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  resetFilters: () => void;
  selectedTripIds: string[];
  showRowNumbers: boolean;
  setShowRowNumbers: React.Dispatch<React.SetStateAction<boolean>>;
  onBulkDuplicate: () => void;
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
  showRowNumbers,
  setShowRowNumbers,
  onBulkDuplicate,
  onBulkDelete,
}: ToolbarProps) {
  return (
    <div className="trips-toolbar-container">
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
            showRowNumbers={showRowNumbers}
            setShowRowNumbers={setShowRowNumbers}
          />
          <ToolbarSeparator />

          {/* Import/Export */}
          <ToolbarImportExport trips={trips} />
          <ToolbarSeparator />

          {/* Statistics */}
          <ToolbarStatistics trips={trips} />
          <ToolbarSeparator />

          {/* Action Buttons */}
          <ToolbarActions
            selectedTripIds={selectedTripIds}
            onBulkDuplicate={onBulkDuplicate}
            onBulkDelete={onBulkDelete}
          />
        </div>
      </ActionsToolbar>
    </div>
  );
}
