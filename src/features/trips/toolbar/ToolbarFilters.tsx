import React from "react";
import {
  FaRotateLeft,
  FaLocationDot,
  FaPlane,
  FaCheck,
  FaCalendar,
} from "react-icons/fa6";
import { ActionButton } from "@components";
import type { TripFilterState } from "@types";

type ToolbarFiltersProps = {
  filters: TripFilterState;
  setFilters: React.Dispatch<React.SetStateAction<TripFilterState>>;
  setGlobalSearch: (search: string) => void;
  resetFilters: () => void;
};

export function ToolbarFilters({
  filters,
  setFilters,
  setGlobalSearch,
  resetFilters,
}: ToolbarFiltersProps) {
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

  return (
    <>
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
    </>
  );
}
