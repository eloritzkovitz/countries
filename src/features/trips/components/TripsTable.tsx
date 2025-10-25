import { useState } from "react";
import { DropdownSelectInput } from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { sortTrips } from "@features/trips";
import { useTripFilters } from "@features/trips/hooks/useTripFilters";
import type { SortKey, Trip, TripCategory } from "@types";
import { SortableFilterHeader } from "./SortableFilterHeader";
import { TripRows } from "./TripRows";
import { getTripRowClass } from "../utils/trips";
import "./TripsTable.css";

type TripsTableProps = {
  trips: Trip[];
  onEdit: (trip: Trip) => void;
  onDelete: (trip: Trip) => void;
};

export function TripsTable({ trips, onEdit, onDelete }: TripsTableProps) {
  const countryData = useCountryData();

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

  return (
    <div
      className="overflow-x-auto w-full"
      style={{ maxHeight: "93vh", overflowY: "auto" }}
    >
      <table className="trips-table w-full">
        <thead>
          <tr>
            <th className="trips-th">#</th>
            <SortableFilterHeader
              label="Name"
              sortKey="name"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
              filterValue={filters.name}
              onFilterChange={(v) => updateFilter("name", v)}
              placeholder="Search by name..."
            />
            <SortableFilterHeader
              label="Countries"
              sortKey="countries"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
              filterElement={
                <DropdownSelectInput<string>
                  value={filters.country}
                  onChange={(v) =>
                    updateFilter("country", Array.isArray(v) ? v : v ? [v] : [])
                  }
                  options={countryOptions}
                  placeholder="All Countries"
                  isMulti
                  className="block w-full mt-1 text-xs focus:outline-none"
                />
              }
            />
            <SortableFilterHeader
              label="Year"
              sortKey="year"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
              filterElement={
                <DropdownSelectInput<string>
                  value={filters.year}
                  onChange={(v) =>
                    updateFilter("year", Array.isArray(v) ? v : v ? [v] : [])
                  }
                  options={yearOptions}
                  placeholder="All Years"
                  isMulti
                  className="block w-full mt-1 text-xs"
                />
              }
            />
            <SortableFilterHeader
              label="Start Date"
              sortKey="startDate"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
            />
            <SortableFilterHeader
              label="End Date"
              sortKey="endDate"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
            />
            <SortableFilterHeader
              label="Full Days"
              sortKey="fullDays"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
            />
            <SortableFilterHeader
              label="Categories"
              sortKey="categories"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
              filterElement={
                <DropdownSelectInput<TripCategory>
                  value={filters.categories}
                  onChange={(v) =>
                    updateFilter(
                      "categories",
                      Array.isArray(v) ? v : v ? [v] : []
                    )
                  }
                  options={categoryOptions}
                  placeholder="All Categories"
                  isMulti
                  className="block w-full mt-1 text-xs"
                />
              }
            />
            <SortableFilterHeader
              label="Status"
              sortKey="status"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
              filterElement={
                <DropdownSelectInput
                  value={filters.status}
                  onChange={(v) =>
                    updateFilter("status", Array.isArray(v) ? v[0] : v)
                  }
                  options={statusOptions}
                  placeholder="All Statuses"
                  className="block w-full mt-1 text-xs"
                />
              }
            />
            <SortableFilterHeader
              label="Tags"
              sortKey="tags"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
              filterElement={
                <DropdownSelectInput
                  value={filters.tags}
                  onChange={(v) =>
                    updateFilter("tags", Array.isArray(v) ? v : v ? [v] : [])
                  }
                  options={tagOptions}
                  placeholder="All Tags"
                  isMulti
                  className="block w-full mt-1 text-xs"
                />
              }
            />
            <th className="trips-th">Actions</th>
          </tr>
        </thead>
        {/* Trip table rows */}
        {sortedTrips.map((trip, tripIdx) => (
          <tbody key={trip.id} className="trips-group">
            <TripRows
              trip={trip}
              tripIdx={tripIdx}
              countryData={countryData}
              getTripRowClass={getTripRowClass}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </tbody>
        ))}
      </table>
    </div>
  );
}
