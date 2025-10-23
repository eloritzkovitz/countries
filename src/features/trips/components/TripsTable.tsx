import { useState } from "react";
import { DropdownSelectInput } from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import {
  getUsedCountryCodes,
  getUsedYears,
  filterTrips,
  sortTrips,
} from "@features/trips";
import {
  getCountryDropdownOptions,
  getYearDropdownOptions,
} from "@features/trips/utils/dropdownOptions";
import type { SortKey, Trip } from "@types";
import { CountryCell } from "./CountryCell";
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
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    year: "",
  });
  const [sortKey, setSortKey] = useState<SortKey>("startDate");
  const [sortAsc, setSortAsc] = useState(true);

  // Used country codes for dropdowns
  const usedCountryCodes = getUsedCountryCodes(trips);
  const rawCountryOptions = getCountryDropdownOptions(
    countryData.countries,
    usedCountryCodes
  );

  // Enhance country options with flags
  const countryOptions = rawCountryOptions.map((opt) =>
    opt.value
      ? {
          ...opt,
          label: (
            <span className="flex items-center gap-2">
              <CountryCell code={opt.value} countryData={countryData} />
            </span>
          ),
        }
      : opt
  );

  // Used years for year dropdown
  const usedYears = getUsedYears(trips);
  const yearOptions = getYearDropdownOptions(usedYears);
  let filteredTrips = filterTrips(trips, filters);
  filteredTrips = sortTrips(
    filteredTrips,
    sortKey,
    sortAsc,
    countryData.countries
  );

  // Generic filter handler
  function handleFilterChange<K extends keyof typeof filters>(
    key: K,
    value: string
  ) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

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
      style={{ maxHeight: "90vh", overflowY: "auto" }}
    >
      <table className="trips-table w-full min-w-[1200px]">
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
              onFilterChange={(v) => handleFilterChange("name", v)}
            />
            <SortableFilterHeader
              label="Countries"
              sortKey="countries"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
              filterElement={
                <DropdownSelectInput
                  value={filters.country}
                  onChange={(v) => handleFilterChange("country", v)}
                  options={countryOptions}
                  placeholder="All Countries"
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
                <DropdownSelectInput
                  value={filters.year}
                  onChange={(v) => handleFilterChange("year", v)}
                  options={yearOptions}
                  placeholder="All Years"
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
              label="Notes"
              sortKey="notes"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
            />
            <th className="trips-th">Actions</th>
          </tr>
        </thead>
        {/* Trip table rows */}
        {filteredTrips.map((trip, tripIdx) => (
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
