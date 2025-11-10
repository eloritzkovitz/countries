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

  // Helper component for toolbar icons with counts
  function ToolbarIcon({
    icon,
    count,
  }: {
    icon: React.ReactNode;
    count: number;
  }) {
    return (
      <span className={`flex items-center gap-1`}>
        {icon}
        <span className="text-xs font-semibold">{count}</span>
      </span>
    );
  }

  // Toolbar toggle options
  const options: ToolbarToggleOption[] = [
    {
      value: "all",
      icon: <ToolbarIcon icon={<FaList />} count={allCount} />,
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
      icon: <ToolbarIcon icon={<FaListCheck />} count={visitedCount} />,
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
    <div className="flex items-center -mx-4">
      <ActionButton
        onClick={onRefresh}
        ariaLabel="Refresh country data"
        title="Refresh country data"
        icon={<FaArrowsRotate />}
        className="toolbar-btn-menu"
      />
      <ToolbarToggleGroup options={options} buttonClassName="h-8 w-12" />
    </div>
  );
}
