import { SortableFilterHeader } from "./SortableFilterHeader";
import { DropdownSelectInput } from "@components";
import type { SortKey, TripCategory, TripFilters } from "@types";
import type { JSX } from "react";

type TripsTableHeaderProps = {
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

export function TripsTableHeader({
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
}: TripsTableHeaderProps) {
  return (
    <thead>
      <tr>
        <th className="trips-th">
          <div className="relative">#{renderResizeHandle("idx")}</div>
        </th>
        <th className="trips-th">
          <div className="relative">
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
          </div>
        </th>
        <th className="trips-th">
          <div className="relative">
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
            {renderResizeHandle("countries")}
          </div>
        </th>
        <th className="trips-th">
          <div className="relative">
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
            {renderResizeHandle("year")}
          </div>
        </th>
        <th className="trips-th">
          <div className="relative">
            <SortableFilterHeader
              label="Start Date"
              sortKey="startDate"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
            />
            {renderResizeHandle("startDate")}
          </div>
        </th>
        <th className="trips-th">
          <div className="relative">
            <SortableFilterHeader
              label="End Date"
              sortKey="endDate"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
            />
            {renderResizeHandle("endDate")}
          </div>
        </th>
        <th className="trips-th">
          <div className="relative">
            <SortableFilterHeader
              label="Full Days"
              sortKey="fullDays"
              currentSortKey={sortKey}
              sortAsc={sortAsc}
              onSort={handleSort}
            />
            {renderResizeHandle("fullDays")}
          </div>
        </th>
        <th className="trips-th">
          <div className="relative">
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
            {renderResizeHandle("categories")}
          </div>
        </th>
        <th className="trips-th">
          <div className="relative">
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
            {renderResizeHandle("status")}
          </div>
        </th>
        <th className="trips-th">
          <div className="relative">
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
            {renderResizeHandle("tags")}
          </div>
        </th>
        <th className="trips-th">
          <div className="relative">
            Actions
            {renderResizeHandle("actions")}
          </div>
        </th>
      </tr>
    </thead>
  );
}
