import { useState, useMemo } from "react";
import { useTrips } from "@contexts/TripsContext";
import { getYearsFromTrips } from "@features/visits";
import { useKeyHandler } from "@hooks/useKeyHandler";

export function useTimelineState() {
  const { trips } = useTrips();

  // Compute years from trips
  const years = useMemo(() => getYearsFromTrips(trips), [trips]);

  // Selected year state
  const [selectedYear, setSelectedYear] = useState(
    years[years.length - 1] || new Date().getFullYear()
  );

  // Arrow key navigation
  useKeyHandler(
    (e) => {
      const idx = years.indexOf(selectedYear);
      if (e.key === "ArrowLeft" && idx > 0) {
        setSelectedYear(years[idx - 1]);
      } else if (e.key === "ArrowRight" && idx < years.length - 1) {
        setSelectedYear(years[idx + 1]);
      }
    },
    ["ArrowLeft", "ArrowRight"],
    true
  );

  return { years, selectedYear, setSelectedYear };
}
