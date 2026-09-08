import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "@components";
import { useCountryData } from "@features/countries";
import { usePageTitle, useScreenSize, useTablePagination } from "@hooks";
import { TripModal } from "../components/modal/TripModal";
import { TripsTable } from "../components/table/TripsTable";
import { TripsToolbar } from "../components/toolbar/TripsToolbar";
import { useTripModal } from "../hooks/useTripModal";
import { useTrips } from "../../core/context/TripsContext";
import { useTripFilters } from "../../core/hooks/useTripFilters";
import type { TripFilterState, TripSortBy } from "../../core/types";
import { sortTrips } from "../../core/utils/tripSort";

export default function TripsPage() {
  const { countries } = useCountryData();
  const { isMobile } = useScreenSize();
  const { trips, loading } = useTrips();
  const { t } = useTranslation("trips");

  const [globalSearch, setGlobalSearch] = useState("");
  const [sortBy, setSortBy] = useState<TripSortBy>("startDate-desc");

  usePageTitle(t("pageTitle", "Trips"));

  const {
    filteredTrips,
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    countryOptions,
    yearOptions,
    participantsOptions,
    categoryOptions,
    statusOptions,
    tagOptions,
  } = useTripFilters(trips, undefined, globalSearch);

  const sortedTrips = sortTrips(filteredTrips, countries ?? [], sortBy);

  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems: paginatedTrips,
    totalCount: totalTripsCount,
  } = useTablePagination({
    items: sortedTrips,
    initialPage: 1,
    initialPageSize: 20,
  });

  const { isOpen, trip, setTrip, handleAdd, handleEdit, handleSave, onClose } =
    useTripModal();

  // Update filter handler
  const handleUpdateFilter = (key: string, value: unknown) => {
    if (key in filters) {
      updateFilter(
        key as keyof TripFilterState,
        value as TripFilterState[keyof TripFilterState],
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Toolbar */}
      {!isMobile && (
        <TripsToolbar
          trips={filteredTrips}
          filters={filters}
          setFilters={setFilters}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          resetFilters={resetFilters}
          onAddTrip={handleAdd}
        />
      )}

      {/* Table area */}
      <div className="flex-1 w-full mx-auto flex flex-col">
        <TripModal
          key={trip?.id ?? "new-trip"}
          isOpen={isOpen}
          trip={trip}
          onChange={setTrip}
          onSave={handleSave}
          onClose={onClose}
          isEditing={!!trip && !!trip.id}
        />
        {loading ? (
          <LoadingSpinner
            fullScreen
            message={t("loading", "Loading trips...")}
          />
        ) : trips.length === 0 ? (
          <div className="flex flex-1 items-center justify-center min-h-[300px] text-muted text-lg">
            {t("noTrips", "No trips yet.")}
          </div>
        ) : (
          <>
            <TripsTable
              trips={paginatedTrips}
              onEdit={handleEdit}
              filters={filters}
              updateFilter={handleUpdateFilter}
              countryOptions={countryOptions}
              yearOptions={yearOptions}
              participantsOptions={participantsOptions}
              categoryOptions={categoryOptions}
              statusOptions={statusOptions}
              tagOptions={tagOptions}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              totalCount={totalTripsCount}
              onPageSizeChange={setPageSize}
              sortBy={sortBy}
              onSort={setSortBy}
            />
          </>
        )}
      </div>
    </div>
  );
}
