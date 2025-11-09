import React from "react";
import { FaList, FaListCheck } from "react-icons/fa6";
import { ToolbarToggleGroup, type ToolbarToggleOption } from "@components";

interface CountriesToolbarProps {
  isVisitedOnly: boolean;
  setOverlaySelections: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  visitedOverlayId: string;
  allCount: number;
  visitedCount: number;
}

export function CountriesToolbar({
  isVisitedOnly,
  setOverlaySelections,
  visitedOverlayId,
  allCount,
  visitedCount,
}: CountriesToolbarProps) {
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

  return <ToolbarToggleGroup options={options} />;
}
