import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FloatingActionButton } from "@components";
import { useTrips } from "@contexts/TripsContext";
import { TripModal, TripsTable, TripsToolbar } from "@features/trips";
import type { Trip } from "@types";

// Empty trip template
const emptyTrip: Trip = {
  id: "",
  name: "",
  startDate: "",
  endDate: "",
  countryCodes: [],
  fullDays: 1,
  notes: "",
};

export default function TripsPage() {
  const { trips, loading, addTrip, updateTrip, removeTrip } = useTrips();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState({ local: true, abroad: true });
  const [globalSearch, setGlobalSearch] = useState("");

  // Filter trips before passing to TripsTable
  const filteredTrips = trips.filter((trip) => {
    const isLocal = trip.categories?.includes("local");
    if (filter.local && filter.abroad) return true;
    if (filter.local) return isLocal;
    if (filter.abroad) return !isLocal;
    return false; // If both are off, show nothing
  });

  // Add trip
  function handleAdd() {
    setTrip({ ...emptyTrip });
    setModalOpen(true);
  }

  // Edit trip
  function handleEdit(selectedTrip: Trip) {
    setTrip({ ...selectedTrip });
    setModalOpen(true);
  }

  // Save trip (add or edit)
  async function handleSave() {
    if (!trip) return;
    if (!trip.id) {
      const newTrip = { ...trip, id: crypto.randomUUID() };
      addTrip(newTrip);
    } else if (trips.some((t) => t.id === trip.id)) {
      updateTrip(trip);
    }
    setModalOpen(false);
  }

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
        filter={filter}
        setFilter={setFilter}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
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
            globalSearch={globalSearch}
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
