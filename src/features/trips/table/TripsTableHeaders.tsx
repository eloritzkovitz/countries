import type { JSX } from "react";
import { DropdownSelectInput } from "@components";
import type { SortKey, TripCategory, TripFilters } from "@types";
import { SortableFilterHeader } from "./SortableFilterHeader";

type TripsTableHeadersProps = {
  allSelected: boolean;
  handleSelectAll: () => void;
  sortKey: SortKey;
  sortAsc: boolean;
  handleSort: (key: SortKey) => void;
  filters: TripFilters;
  updateFilter: (key: string, value: any) => void;
  countryOptions: any[];
  yearOptions: any[];
  categoryOptions: any[];
  statusOptions: any[];
  tagOptions: any[];  
  renderResizeHandle: (key: string) => JSX.Element;  
};

export function TripsTableHeaders({
  allSelected,
  handleSelectAll,
  sortKey,
  sortAsc,
  handleSort,
  filters,
  updateFilter,
  countryOptions,
  yearOptions,
  categoryOptions,
  statusOptions,
  tagOptions,
  renderResizeHandle,  
}: TripsTableHeadersProps) {
  return (
    <thead>
      <tr>
        <th className="trips-th">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
            aria-label="Select all trips"
          />
        </th>
        <th className="trips-th">#{renderResizeHandle("idx")}</th>
        <th className="trips-th">
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
          {renderResizeHandle("name")}
        </th>
        <th className="trips-th">
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
                className="trips-filter-dropdown"
              />
            }
          />
          {renderResizeHandle("countries")}
        </th>
        <th className="trips-th">
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
                className="trips-filter-dropdown"
              />
            }
          />
          {renderResizeHandle("year")}
        </th>
        <th className="trips-th">
          <SortableFilterHeader
            label="Start Date"
            sortKey="startDate"
            currentSortKey={sortKey}
            sortAsc={sortAsc}
            onSort={handleSort}
          />
          {renderResizeHandle("startDate")}
        </th>
        <th className="trips-th">
          <SortableFilterHeader
            label="End Date"
            sortKey="endDate"
            currentSortKey={sortKey}
            sortAsc={sortAsc}
            onSort={handleSort}
          />
          {renderResizeHandle("endDate")}
        </th>
        <th className="trips-th">
          <SortableFilterHeader
            label="Full Days"
            sortKey="fullDays"
            currentSortKey={sortKey}
            sortAsc={sortAsc}
            onSort={handleSort}
          />
          {renderResizeHandle("fullDays")}
        </th>
        <th className="trips-th">
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
                className="trips-filter-dropdown"
              />
            }
          />
          {renderResizeHandle("categories")}
        </th>
        <th className="trips-th">
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
                className="trips-filter-dropdown"
              />
            }
          />
          {renderResizeHandle("status")}
        </th>
        <th className="trips-th">
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
                className="trips-filter-dropdown"
              />
            }
          />
          {renderResizeHandle("tags")}
        </th>
        <th className="trips-th">
          Actions
          {renderResizeHandle("actions")}
        </th>
      </tr>
    </thead>
  );
}
