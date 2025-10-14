import { FaSearch } from "react-icons/fa";

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
  return (
    <div className="relative mb-4 w-full">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        title={placeholder || "Search"}
        aria-label={placeholder || "Search"}
        className={`filter-select pl-10 pr-3 py-2 bg-gray-100 rounded border border-none text-base focus:outline-none focus:ring-none w-full ${className}`}
      />
    </div>
  );
}