import React from "react";
import { FaList, FaListCheck } from "react-icons/fa6";
import { ToolbarToggleGroup, type ToolbarToggleOption } from "@components";

interface CountriesToolbarProps {
  isVisitedOnly: boolean;
  setOverlaySelections: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  visitedOverlayId: string;
}

export function CountriesToolbar({
  isVisitedOnly,
  setOverlaySelections,
  visitedOverlayId,
}: CountriesToolbarProps) {
  const options: ToolbarToggleOption[] = [
    {
      value: "all",
      icon: <FaList />,
      label: "All Countries",
      ariaLabel: "Show all countries",
      checked: !isVisitedOnly,
      onClick: () =>
        setOverlaySelections((prev) => ({
          ...prev,
          [visitedOverlayId]: "all",
        })),
    },
    {
      value: "visited",
      icon: <FaListCheck />,
      label: "Visited",
      ariaLabel: "Show visited countries",
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
