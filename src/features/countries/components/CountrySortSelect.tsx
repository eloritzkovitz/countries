import { PiArrowsDownUpBold } from "react-icons/pi";

type SortSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CountrySortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative ml-2 flex items-stretch">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 text-gray-700 focus:outline-none dark:bg-gray-500 dark:text-gray-200"
        aria-label="Sort countries"
        title="Sort countries"
      >
        <option value="name-asc">Name (ascending)</option>
        <option value="name-desc">Name (descending)</option>
        <option value="iso-asc">ISO 3166 code (ascending)</option>
        <option value="iso-desc">ISO 3166 code (descending)</option>
      </select>
      <span
        className="sort-btn flex items-center justify-center h-10 w-10 rounded bg-gray-100 hover:bg-gray-200 dark:hover text-base relative z-10 focus:outline-none"
        aria-hidden="true"
      >
        <PiArrowsDownUpBold size="24" />
      </span>
    </div>
  );
}
