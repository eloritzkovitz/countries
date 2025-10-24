import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FloatingActionButton } from "@components";
import { useTrips } from "@contexts/TripsContext";
import { TripsTable } from "@features/trips";
import { TripModal } from "@features/trips/components/TripModal";
import type { Trip } from "@types";
import { TripsToolbar } from "@features/trips/components/TripsToolbar";

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
      await addTrip(newTrip);
    } else if (trips.some((t) => t.id === trip.id)) {
      await updateTrip(trip);
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
      <TripsToolbar></TripsToolbar>

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
            trips={trips}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
