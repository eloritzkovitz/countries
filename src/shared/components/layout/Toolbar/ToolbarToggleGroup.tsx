import React from "react";
import { ActionButton } from "@components";

export interface ToolbarToggleOption {
  value: string;
  icon: React.ReactNode;
  label: string;
  ariaLabel?: string;
  title?: string;
  checked: boolean;
  onClick: () => void;
}

interface ToolbarToggleGroupProps {
  options: ToolbarToggleOption[];
  className?: string;
}

export function ToolbarToggleGroup({
  options,
  className = "",
}: ToolbarToggleGroupProps) {
  return (
    <div
      className={`toolbar-toggle-group flex items-center gap-2 ${className}`}
    >
      {options.map((opt) => (
        <ActionButton
          key={opt.value}
          onClick={opt.onClick}
          ariaLabel={opt.ariaLabel || opt.label}
          title={opt.title || opt.label}
          className={`toolbar-btn-toggle ${
            opt.checked
              ? "toolbar-btn-toggle-active"
              : "toolbar-btn-toggle-inactive"
          }`}
          icon={opt.icon}
        />
      ))}
    </div>
  );
}
