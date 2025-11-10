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
  buttonClassName?: string;
}

export function ToolbarToggleGroup({
  options,
  className = "",
  buttonClassName = "",
}: ToolbarToggleGroupProps) {
  return (
    <div className={`flex items-center ${className}`}>
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
          } ${buttonClassName}`}
          icon={opt.icon}
        />
      ))}
    </div>
  );
}
