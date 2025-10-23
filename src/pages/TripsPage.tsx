import { useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useTrips } from "@contexts/TripsContext";
import { TripsTable } from "@features/trips";
import { TripModal } from "@features/trips/components/TripModal";
import type { Trip } from "@types";

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

  function handleAdd() {
    setTrip({ ...emptyTrip, id: "" });
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
    if (trips.some((t) => t.id === trip.id)) {
      await updateTrip(trip);
    } else {
      await addTrip(trip);
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

  // Return button handle
  function handleReturn() {
    window.history.back();
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="w-full mx-auto flex flex-col">
        <div className="flex gap-2 mb-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded flex items-center gap-2"
            onClick={handleReturn}
          >
            <FaArrowLeft /> Return
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
            onClick={handleAdd}
          >
            <FaPlus /> Add Trip
          </button>
        </div>
        <TripModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          trip={trip}
          onChange={setTrip}
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
    </div>
  );
}
