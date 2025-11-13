import { useState, useMemo } from "react";
import { getYearsFromTrips } from "@features/visits";
import { useTrips } from "@contexts/TripsContext";

export function useTimelineState() {
  const { trips } = useTrips();
  
  // Compute years from trips
  const years = useMemo(() => getYearsFromTrips(trips), [trips]);

  // Selected year state
  const [selectedYear, setSelectedYear] = useState(
    years[years.length - 1] || new Date().getFullYear()
  );

  return { years, selectedYear, setSelectedYear };
}
