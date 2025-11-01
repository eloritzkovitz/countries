import React, { createContext, useContext, useEffect, useState } from "react";
import type { Trip } from "@types";
import { appDb } from "@utils/db";
import { getAutoTripStatus } from "@features/trips/utils/trips";

type TripsContextType = {
  trips: Trip[];
  loading: boolean;
  addTrip: (trip: Trip) => void;
  updateTrip: (trip: Trip) => void;
  removeTrip: (id: string) => Promise<void>;
  duplicateTrip: (trip: Trip) => void;  
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch trips from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    const fetchTrips = async () => {
      setLoading(true);
      const allTrips = await appDb.trips.toArray();
      if (mounted) {
        loadTrips(allTrips);
        setLoading(false);
      }
    };
    fetchTrips();
    return () => {
      mounted = false;
    };
  }, []);

  // Load trips from IndexedDB on mount
  function loadTrips(rawTrips: Trip[]) {
    setTrips(
      rawTrips.map((trip) => ({
        ...trip,
        status: getAutoTripStatus(trip),
      }))
    );
  }

  // Add a trip
  function addTrip(trip: Trip) {
    const updatedTrip = { ...trip, status: getAutoTripStatus(trip) };
    appDb.trips.add(updatedTrip);
    setTrips((prev) => [...prev, updatedTrip]);
  }

  // Update a trip
  function updateTrip(trip: Trip) {
    const updatedTrip = { ...trip, status: getAutoTripStatus(trip) };
    appDb.trips.put(updatedTrip);
    setTrips((prev) => prev.map((t) => (t.id === trip.id ? updatedTrip : t)));
  }

  // Remove a trip
  const removeTrip = async (id: string) => {
    await appDb.trips.delete(id);
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  // Duplicate a trip
  function duplicateTrip(trip: Trip) {
    const newTrip = {
      ...trip,
      id: crypto.randomUUID(),
      name: trip.name + " (Copy)",
      status: getAutoTripStatus(trip),
    };
    appDb.trips.add(newTrip);
    setTrips((prev) => [...prev, newTrip]);
  }

  return (
    <TripsContext.Provider
      value={{ trips, loading, addTrip, updateTrip, removeTrip, duplicateTrip }}
    >
      {children}
    </TripsContext.Provider>
  );
};

// Custom hook to use the TripsContext
export const useTrips = () => {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error("useTrips must be used within a TripsProvider");
  return ctx;
};
