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
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder || "Search"}
        className={`px-3 py-2 bg-gray-100 rounded border border-none text-base focus:outline-none focus:ring-none ${className}`}
      />
    </div>
  );
}
