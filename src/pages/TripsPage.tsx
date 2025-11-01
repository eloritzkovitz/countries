import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FloatingActionButton, SplashScreen } from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { useTrips } from "@contexts/TripsContext";
import { TripModal, TripsTable, TripsToolbar } from "@features/trips";
import { useTripFilters } from "@features/trips/hooks/useTripFilters";
import { useTripModal } from "@features/trips/hooks/useTripModal";
import type { Trip } from "@types";

export default function TripsPage() {
  const countryData = useCountryData();
  const { trips, loading, addTrip, updateTrip, removeTrip, duplicateTrip } =
    useTrips();
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedTripIds, setSelectedTripIds] = useState<string[]>([]);
  const [showRowNumbers, setShowRowNumbers] = useState(false);

  // Trip filtering hook
  const {
    filteredTrips,
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    countryOptions,
    yearOptions,
    categoryOptions,
    statusOptions,
    tagOptions,
  } = useTripFilters(trips, countryData, undefined, globalSearch);

  // Determine if all trips are selected
  const allSelected =
    selectedTripIds.length === filteredTrips.length && filteredTrips.length > 0;

  // Get selected trips for bulk actions
  const selectedTrips = filteredTrips.filter((trip) =>
    selectedTripIds.includes(trip.id)
  );

  // Selection handlers
  function handleSelectTrip(id: string) {
    setSelectedTripIds((prev) =>
      prev.includes(id) ? prev.filter((tripId) => tripId !== id) : [...prev, id]
    );
  }

  // Select all handler
  function handleSelectAll() {
    if (selectedTripIds.length === filteredTrips.length) {
      setSelectedTripIds([]);
    } else {
      setSelectedTripIds(filteredTrips.map((trip) => trip.id));
    }
  }

  // Bulk duplicate handler
  function handleBulkDuplicate() {
    selectedTrips.forEach((trip) => duplicateTrip(trip));
  }

  // Bulk delete handler
  async function handleBulkDelete() {
    for (const id of selectedTripIds) {
      await removeTrip(id);
    }
    setSelectedTripIds([]);
  }

  // Trip modal hook
  const {
    trip,
    setTrip,
    modalOpen,
    setModalOpen,
    handleAdd,
    handleEdit,
    handleSave,
  } = useTripModal({ addTrip, updateTrip, trips });

  // Delete trip
  async function handleDelete(trip: Trip) {
    if (confirm(`Are you sure you want to delete the trip "${trip.name}"?`)) {
      await removeTrip(trip.id);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      {/* Toolbar */}
      <TripsToolbar
        trips={filteredTrips}
        filters={filters}
        setFilters={setFilters}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        resetFilters={resetFilters}
        selectedTripIds={selectedTripIds}
        showRowNumbers={showRowNumbers}
        setShowRowNumbers={setShowRowNumbers}
        onBulkDuplicate={handleBulkDuplicate}
        onBulkDelete={handleBulkDelete}        
      />

      {/* Table area */}
      <div className="flex-1 w-full mx-auto flex flex-col overflow-auto">
        <TripModal
          isOpen={modalOpen}
          trip={trip}
          onChange={setTrip}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
          isEditing={!!trip && !!trip.id}
        />
        {loading ? (
          <SplashScreen />
        ) : trips.length === 0 ? (
          <div>No trips yet.</div>
        ) : (
          <TripsTable
            trips={filteredTrips}
            onEdit={handleEdit}
            onDelete={handleDelete}
            filters={filters}
            updateFilter={(key: string, value: any) =>
              updateFilter(key as any, value)
            }
            countryOptions={countryOptions}
            yearOptions={yearOptions}
            categoryOptions={categoryOptions}
            statusOptions={statusOptions}
            tagOptions={tagOptions}
            selectedTripIds={selectedTripIds}
            onSelectTrip={handleSelectTrip}
            allSelected={allSelected}
            handleSelectAll={handleSelectAll}
            showRowNumbers={showRowNumbers}
          />
        )}
      </div>
      <FloatingActionButton
        onClick={handleAdd}
        icon={<FaPencilAlt />}
        ariaLabel="Add Trip"
        title="Add Trip"
      />
    </div>
  );
}
