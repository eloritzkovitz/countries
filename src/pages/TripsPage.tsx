import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FloatingActionButton } from "@components";
import { useTrips } from "@contexts/TripsContext";
import { TripModal, TripsTable, TripsToolbar } from "@features/trips";
import { useCountryData } from "@contexts/CountryDataContext";
import { useTripFilters } from "@features/trips/hooks/useTripFilters";
import type { Trip } from "@types";
import { useTripModal } from "@features/trips/hooks/useTripModal";

export default function TripsPage() {  
  const countryData = useCountryData();
  const { trips, loading, addTrip, updateTrip, removeTrip } = useTrips();
  const [globalSearch, setGlobalSearch] = useState("");
  const [filter, setFilter] = useState({ local: true, abroad: true });   

  // Trip filtering hook
  const {
    filteredTrips,
    filters,
    updateFilter,
    resetFilters,
    countryOptions,
    yearOptions,
    categoryOptions,
    statusOptions,
    tagOptions,
  } = useTripFilters(trips, countryData, filter, undefined, globalSearch);

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
  async function handleDelete(selectedTrip: Trip) {
    if (
      confirm(
        `Are you sure you want to delete the trip "${selectedTrip.name}"?`
      )
    ) {
      await removeTrip(selectedTrip.id);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      {/* Toolbar */}
      <TripsToolbar
        trips={filteredTrips}
        filter={filter}
        setFilter={setFilter}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        resetFilters={resetFilters}
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
          <div>Loading trips...</div>
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
