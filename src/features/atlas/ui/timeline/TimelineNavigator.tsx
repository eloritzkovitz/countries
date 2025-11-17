import {
  FaChevronLeft,
  FaChevronRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import { ActionButton } from "@components";
import { useKeyHandler } from "@hooks/useKeyHandler";
import { YearSelectButton } from "./YearSelectButton";

interface TimelineNavigatorProps {
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export function TimelineNavigator({
  years,
  selectedYear,
  setSelectedYear,
}: TimelineNavigatorProps) {

  // Determine navigation availability
  const currentIndex = years.indexOf(selectedYear);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < years.length - 1;

  // Go to previous year
  const handleBack = () => {
    if (canGoBack) setSelectedYear(years[currentIndex - 1]);
  };

  // Go to next year
  const handleForward = () => {
    if (canGoForward) setSelectedYear(years[currentIndex + 1]);
  };

  // Go to first year
  const handleFirst = () => {
    if (years.length > 0 && selectedYear !== years[0])
      setSelectedYear(years[0]);
  };

  // Go to last year
  const handleLast = () => {
    if (years.length > 0 && selectedYear !== years[years.length - 1])
      setSelectedYear(years[years.length - 1]);
  };

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

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 flex items-center gap-2">
      <ActionButton
        onClick={handleFirst}
        ariaLabel="First year"
        title="First year"
        icon={
          <FaAnglesLeft className={currentIndex === 0 ? "opacity-50" : ""} />
        }
        disabled={currentIndex === 0}
        className="toolbar-btn rounded-full transition"
      />
      <ActionButton
        onClick={handleBack}
        ariaLabel="Previous year"
        title="Previous year"
        icon={<FaChevronLeft className={!canGoBack ? "opacity-50" : ""} />}
        disabled={!canGoBack}
        className="toolbar-btn rounded-full transition"
      />
      <YearSelectButton
        years={years}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <ActionButton
        onClick={handleForward}
        ariaLabel="Next year"
        title="Next year"
        icon={<FaChevronRight className={!canGoForward ? "opacity-50" : ""} />}
        disabled={!canGoForward}
        className="toolbar-btn rounded-full transition"
      />
      <ActionButton
        onClick={handleLast}
        ariaLabel="Last year"
        title="Last year"
        icon={
          <FaAnglesRight
            className={currentIndex === years.length - 1 ? "opacity-50" : ""}
          />
        }
        disabled={currentIndex === years.length - 1}
        className="toolbar-btn rounded-full transition"
      />      
    </div>
  );
}
