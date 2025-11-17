import { useMemo, useCallback } from "react";
import { useKeyHandler } from "@hooks/useKeyHandler";

export function useTimelineNavigation(
  years: number[],
  selectedYear: number,
  setSelectedYear: (year: number) => void
) {
  const currentIndex = useMemo(
    () => years.indexOf(selectedYear),
    [years, selectedYear]
  );
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < years.length - 1;

  // Go to previous year
  const handleBack = useCallback(() => {
    if (canGoBack) setSelectedYear(years[currentIndex - 1]);
  }, [canGoBack, years, currentIndex, setSelectedYear]);

  // Go to next year
  const handleForward = useCallback(() => {
    if (canGoForward) setSelectedYear(years[currentIndex + 1]);
  }, [canGoForward, years, currentIndex, setSelectedYear]);

  // Go to first year
  const handleFirst = useCallback(() => {
    if (years.length > 0 && selectedYear !== years[0])
      setSelectedYear(years[0]);
  }, [years, selectedYear, setSelectedYear]);

  // Go to last year
  const handleLast = useCallback(() => {
    if (years.length > 0 && selectedYear !== years[years.length - 1])
      setSelectedYear(years[years.length - 1]);
  }, [years, selectedYear, setSelectedYear]);

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

  return {
    currentIndex,
    canGoBack,
    canGoForward,
    handleBack,
    handleForward,
    handleFirst,
    handleLast,
  };
}
