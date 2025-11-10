import React from "react";
import { FaArrowsRotate, FaList, FaListCheck } from "react-icons/fa6";
import {
  ActionButton,
  ToolbarToggleGroup,
  type ToolbarToggleOption,
} from "@components";

interface CountriesToolbarProps {
  onRefresh?: () => void;
  isVisitedOnly: boolean;
  setOverlaySelections: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >; 
  allCount: number;
  visitedCount: number;
}

export function CountriesToolbar({
  onRefresh,
  isVisitedOnly,
  setOverlaySelections,
  allCount,
  visitedCount,
}: CountriesToolbarProps) {
  const visitedOverlayId = "visited-countries";  
  const options: ToolbarToggleOption[] = [
    {
      value: "all",
      icon: (
        <span className="flex items-center gap-1">
          <FaList />
          <span className="text-xs font-semibold">{allCount}</span>
        </span>
      ),
      label: "All Countries",
      ariaLabel: `Show all countries (${allCount})`,
      checked: !isVisitedOnly,
      onClick: () =>
        setOverlaySelections((prev) => ({
          ...prev,
          [visitedOverlayId]: "all",
        })),
    },
    {
      value: "visited",
      icon: (
        <span className="flex items-center gap-1 ml-2">
          <FaListCheck />
          <span className="text-xs font-semibold">{visitedCount}</span>
        </span>
      ),
      label: "Visited",
      ariaLabel: `Show visited countries (${visitedCount})`,
      checked: isVisitedOnly,
      onClick: () =>
        setOverlaySelections((prev) => ({
          ...prev,
          [visitedOverlayId]: "only",
        })),
    },
  ];

  return (
    <div className="flex items-center gap-2 -mx-4">
      <ActionButton
        onClick={onRefresh}
        ariaLabel="Refresh country data"
        title="Refresh country data"
        icon={<FaArrowsRotate />}
        className="toolbar-btn-menu"
      />
      <ToolbarToggleGroup options={options} />
    </div>
  );
}
