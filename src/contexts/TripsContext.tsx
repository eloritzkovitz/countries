import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Trip } from '@types';
import { appDb } from '@utils/db';

// --- Context types ---
type TripsContextType = {
  trips: Trip[];
  addTrip: (trip: Trip) => Promise<void>;
  updateTrip: (trip: Trip) => Promise<void>;
  removeTrip: (id: string) => Promise<void>;
  loading: boolean;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export const TripsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  // Load trips from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    const loadTrips = async () => {
      setLoading(true);
      const allTrips = await appDb.trips.toArray();
      if (mounted) {
        setTrips(allTrips);
        setLoading(false);
      }
    };
    loadTrips();
    return () => { mounted = false; };
  }, []);

  // Add a trip
  const addTrip = async (trip: Trip) => {
    await appDb.trips.add(trip);
    setTrips(prev => [...prev, trip]);
  };

  // Update a trip
  const updateTrip = async (trip: Trip) => {
    await appDb.trips.put(trip);
    setTrips(prev => prev.map(t => (t.id === trip.id ? trip : t)));
  };

  // Remove a trip
  const removeTrip = async (id: string) => {
    await appDb.trips.delete(id);
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip, updateTrip, removeTrip, loading }}>
      {children}
    </TripsContext.Provider>
  );
};

// Custom hook to use the TripsContext
export const useTrips = () => {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error('useTrips must be used within a TripsProvider');
  return ctx;
};