import { FaChartSimple } from "react-icons/fa6";
import { ActionButton } from "@components";
import type { Trip } from "@types";
import { TripsStats } from "../tripStats/TripsStats";
import React from "react";

type ToolbarStatisticsProps = {
  trips: Trip[];
};

export function ToolbarStatistics({ trips }: ToolbarStatisticsProps) {
  const [showStats, setShowStats] = React.useState(false);

  // Show stats modal handler
  const handleShowStats = () => {
    setShowStats(true);
  };

  return (
    <>
      <ActionButton
        onClick={handleShowStats}
        ariaLabel="Statistics"
        title="Show Trip Statistics"
        className="toolbar-btn-menu"
        icon={<FaChartSimple />}
      />
      {showStats && (
        <TripsStats
          isOpen={showStats}
          onClose={() => setShowStats(false)}
          trips={trips}
        />
      )}
    </>
  );
}
