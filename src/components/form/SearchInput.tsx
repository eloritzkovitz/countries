import { useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useKeyHandler } from "@hooks/useKeyHandler";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  className = "",
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search input when / is pressed
  useKeyHandler(
    (e) => {
      e.preventDefault();
      inputRef.current?.focus();
    },
    ["/"],
    true
  );

  // Blur search input when Escape is pressed
  useKeyHandler(
    (e) => {
      if (document.activeElement === inputRef.current) {
        e.preventDefault();
        inputRef.current?.blur();
      }
    },
    ["Escape"],
    true
  );

  return (
    <div className="relative mb-4 w-full">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            inputRef.current?.blur();
          }
        }}
        placeholder={placeholder}
        title={placeholder || "Search"}
        aria-label={placeholder || "Search"}
        className={`filter-select pl-10 pr-10 py-2 bg-gray-100 rounded border border-none text-base focus:outline-none focus:ring-none w-full ${className}`}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          title="Clear search"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}
