import { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useClickOutside } from "@hooks/useClickOutside";
import type { Option } from "@types";
import { OptionItem } from "./OptionItem";
import { SelectedOptions } from "./SelectedOptions";

type DropdownSelectInputProps<T = string> = {
  value: T | T[];
  onChange: (value: T | T[]) => void;
  options: Option<T>[];
  placeholder?: string;
  className?: string;
  isMulti?: boolean;
};

export function DropdownSelectInput<T = string>({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
  isMulti = false,
}: DropdownSelectInputProps<T>) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    [
      ref as React.RefObject<HTMLElement>,
      menuRef as React.RefObject<HTMLElement>,
    ],
    () => setOpen(false),
    open
  );

  // For multi-select, value is T[]
  const isSelected = (val: T) =>
    isMulti && Array.isArray(value) ? value.includes(val) : value === val;

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        className="w-full flex items-center gap-2 px-2 py-1 border rounded bg-white text-left min-h-[32px] disabled:opacity-50"
        onClick={(e) => {
          if (options.length === 0) return;
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          setMenuPos({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
          });
          setOpen((v) => !v);
        }}
        disabled={options.length === 0}
      >
        {isMulti && Array.isArray(value) && value.length > 0 ? (
          <SelectedOptions
            value={value}
            options={options}
            onRemove={(val) => onChange(value.filter((v) => v !== val))}
          />
        ) : !isMulti && options.find((opt) => opt.value === value) ? (
          options.find((opt) => opt.value === value)?.label
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className="ml-auto">&#9662;</span>
      </button>
      {open &&
        menuPos &&
        ReactDOM.createPortal(
          <div
            id="dropdown-menu-portal"
            ref={menuRef}
            className="absolute z-[9999] bg-white border rounded shadow max-h-60 overflow-y-auto overflow-x-hidden min-w-[150px] mt-1"
            style={{
              top: menuPos.top,
              left: menuPos.left,
              width: menuPos.width,
              position: "absolute",
            }}
          >
            {options.map((opt) => (
              <OptionItem
                key={String(opt.value)}
                opt={opt}
                isSelected={isSelected}
                isMulti={isMulti}
                value={value}
                onChange={onChange}
                setOpen={setOpen}
              />
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
