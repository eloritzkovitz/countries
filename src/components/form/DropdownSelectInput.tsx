import { useState, useRef, useEffect } from "react";

type Option = {
  value: string;
  label: React.ReactNode;
};

type DropdownSelectInputProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

export function DropdownSelectInput({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
}: DropdownSelectInputProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        className="w-full flex items-center gap-2 px-2 py-1 border rounded bg-white text-left"
        onClick={() => setOpen((v) => !v)}
      >
        {selectedOption ? (
          selectedOption.label
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className="ml-auto">&#9662;</span>
      </button>
      {open && (
        <div className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-y-auto mt-1">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center gap-2 px-2 py-1 hover:bg-blue-100 dark:hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
