import { useState } from "react";
import { useCountryData } from "@contexts/CountryDataContext";
import { sortTrips } from "@features/trips";
import { useTripFilters } from "@features/trips/hooks/useTripFilters";
import type { SortKey, Trip } from "@types";
import { TripsTableRows } from "./TripsTableRows";
import { getTripRowClass } from "../utils/trips";
import "./TripsTable.css";
import { useResizableColumns } from "../hooks/useResizableColumns";
import { TripsTableHeader } from "./TripsTableHeader";

type TripsTableProps = {
  trips: Trip[];
  onEdit: (trip: Trip) => void;
  onDelete: (trip: Trip) => void;
};

export function TripsTable({ trips, onEdit, onDelete }: TripsTableProps) {
  const countryData = useCountryData();

  // Use the resizing hook
  const { colWidths, handleResizeStart } = useResizableColumns();

  // Filters state
  const {
    filters,
    updateFilter,
    filteredTrips,
    countryOptions,
    yearOptions,
    categoryOptions,
    statusOptions,
    tagOptions,
  } = useTripFilters(trips, countryData);
  const [sortKey, setSortKey] = useState<SortKey>("startDate");
  const [sortAsc, setSortAsc] = useState(true);

  // Sorted state
  const sortedTrips = sortTrips(
    filteredTrips ?? [],
    sortKey,
    sortAsc,
    countryData.countries
  );

  // Header click handler
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  // Helper to render resize handle
  const renderResizeHandle = (key: string) => {
    const colKey = key as keyof typeof colWidths;
    return (
      <div
        className="absolute right-0 top-0 w-[6px] h-full cursor-col-resize z-10 select-none bg-transparent"
        onMouseDown={(e) => handleResizeStart(e, colKey)}
      />
    );
  };

  return (
    <div
      className="overflow-x-auto w-full"
      style={{ maxHeight: "93vh", overflowY: "auto" }}
    >
      <table className="trips-table w-full">
        <colgroup>
          <col style={{ width: `${colWidths.idx}px` }} />
          <col style={{ width: `${colWidths.name}px` }} />
          <col style={{ width: `${colWidths.countries}px` }} />
          <col style={{ width: `${colWidths.year}px` }} />
          <col style={{ width: `${colWidths.startDate}px` }} />
          <col style={{ width: `${colWidths.endDate}px` }} />
          <col style={{ width: `${colWidths.fullDays}px` }} />
          <col style={{ width: `${colWidths.categories}px` }} />
          <col style={{ width: `${colWidths.status}px` }} />
          <col style={{ width: `${colWidths.tags}px` }} />
          <col style={{ width: `${colWidths.actions}px` }} />
        </colgroup>
        <TripsTableHeader
          sortKey={sortKey}
          sortAsc={sortAsc}
          handleSort={handleSort}
          filters={filters}
          updateFilter={updateFilter as (key: string, value: any) => void}
          countryOptions={countryOptions}
          yearOptions={yearOptions}
          categoryOptions={categoryOptions}
          statusOptions={statusOptions}
          tagOptions={tagOptions}
          renderResizeHandle={renderResizeHandle}
        />
        {sortedTrips.map((trip, tripIdx) => (
          <tbody key={trip.id} className="trips-group">
            <TripsTableRows
              trip={trip}
              tripIdx={tripIdx}
              countryData={countryData}
              getTripRowClass={getTripRowClass}
              onEdit={onEdit}
              onDelete={onDelete}
              handleResizeStart={handleResizeStart}
            />
          </tbody>
        ))}
      </table>
    </div>
  );
}
