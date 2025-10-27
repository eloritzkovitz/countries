// src/features/trips/hooks/useTripModal.ts
import { useState } from "react";
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

export function useTripModal({
  addTrip,
  updateTrip,
  trips,
}: {
  addTrip: (trip: Trip) => void;
  updateTrip: (trip: Trip) => void;
  trips: Trip[];
}) {
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
      addTrip(newTrip);
    } else if (trips.some((t) => t.id === trip.id)) {
      updateTrip(trip);
    }
    setModalOpen(false);
  }

  return {
    trip,
    setTrip,
    modalOpen,
    setModalOpen,
    handleAdd,
    handleEdit,
    handleSave,
  };
}
