import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useTrips } from "@contexts/TripsContext";
import { TripsTable } from "@features/trips";
import { TripModal } from "@features/trips/components/TripModal";
import type { Trip } from "@types";

export default function TripsPage() {
  const { trips, loading, addTrip, updateTrip, removeTrip } = useTrips();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  // Add trip
  function handleAdd() {
    setEditingTrip(null);
    setModalOpen(true);
  }

  // Edit trip
  function handleEdit(trip: Trip) {
    setEditingTrip(trip);
    setModalOpen(true);
  }

  // Save trip (add or edit)
  async function handleSave(trip: Trip) {
    if (editingTrip) {
      await updateTrip(trip);
    } else {
      await addTrip(trip);
    }
  }

  // Delete trip
  async function handleDelete(trip: Trip) {
    if (confirm(`Are you sure you want to delete the trip "${trip.name}"?`)) {
      await removeTrip(trip.id);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="w-full mx-auto flex flex-col">
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded self-start flex items-center gap-2"
          onClick={handleAdd}
        >
          <FaPlus /> Add Trip
        </button>
        <TripModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialTrip={editingTrip}
        />
        {loading ? (
          <div>Loading trips...</div>
        ) : trips.length === 0 ? (
          <div>No trips yet.</div>
        ) : (
          <TripsTable trips={trips} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
