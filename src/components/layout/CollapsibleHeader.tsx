import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ActionButton } from "@components";

export function CollapsibleHeader({
  icon,
  label,
  expanded,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between w-full mb-4">
      <span className="flex items-center gap-2 h-8 text-lg font-bold">
        {icon}
        {label}
      </span>
      <ActionButton
        onClick={onToggle}
        ariaLabel={expanded ? `Collapse ${label}` : `Expand ${label}`}
        title={expanded ? `Collapse ${label}` : `Expand ${label}`}
      >
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </ActionButton>
    </div>
  );
}