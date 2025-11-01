import { useState } from "react";
import { useCountryData } from "@contexts/CountryDataContext";
import {
  DEFAULT_WIDTHS,
  MIN_WIDTHS,
  sortTrips,
  type ColumnKey,
} from "@features/trips";
import { useResizableColumns } from "@hooks/useResizableColumns";
import type { SortKey, Trip } from "@types";
import { TripsTableHeaders } from "./TripsTableHeaders";
import { TripsTableRows } from "./TripsTableRows";
import { getTripRowClass } from "../utils/trips";
import "./TripsTable.css";

type TripsTableProps = {
  trips: Trip[];
  onEdit: (trip: Trip) => void;
  onDelete: (trip: Trip) => void;
  filters: any;
  updateFilter: (key: string, value: any) => void;
  countryOptions: any[];
  yearOptions: any[];
  categoryOptions: any[];
  statusOptions: any[];
  tagOptions: any[];
  selectedTripIds: string[];
  onSelectTrip: (id: string) => void;
  allSelected: boolean;
  handleSelectAll: () => void;
  showRowNumbers: boolean;
};

export function TripsTable({
  trips,
  onEdit,
  onDelete,
  filters,
  updateFilter,
  countryOptions,
  yearOptions,
  categoryOptions,
  statusOptions,
  tagOptions,
  selectedTripIds,
  onSelectTrip,
  allSelected,
  handleSelectAll,
  showRowNumbers,
}: TripsTableProps) {
  const countryData = useCountryData();

  // Resizable columns
  const { colWidths, handleResizeStart } = useResizableColumns<ColumnKey>(
    DEFAULT_WIDTHS,
    MIN_WIDTHS
  );

  const [sortKey, setSortKey] = useState<SortKey>("startDate");
  const [sortAsc, setSortAsc] = useState(true);

  // Sorted state
  const sortedTrips = sortTrips(
    trips ?? [],
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
        className="trips-resize-handle"
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
          <col style={{ width: `${colWidths.select}px` }} />
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
        <TripsTableHeaders
          allSelected={allSelected}
          handleSelectAll={handleSelectAll}
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
          showRowNumbers={showRowNumbers}
        />
        {sortedTrips.map((trip, tripIdx) => (
          <tbody key={trip.id} className="trips-group">
            <TripsTableRows
              trip={trip}
              tripIdx={tripIdx}
              countryData={countryData}
              selected={selectedTripIds.includes(trip.id)}
              onSelect={onSelectTrip}
              getTripRowClass={getTripRowClass}
              handleResizeStart={handleResizeStart}
              onEdit={onEdit}
              onDelete={onDelete}
              showRowNumbers={showRowNumbers}
            />
          </tbody>
        ))}
      </table>
    </div>
  );
}
