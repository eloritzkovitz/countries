import { FaChevronDown } from "react-icons/fa6";

interface YearSelectButtonProps {
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export function YearSelectButton({
  years,
  selectedYear,
  setSelectedYear,
}: YearSelectButtonProps) {
  return (
    <div
      className="toolbar-btn rounded-full flex items-center justify-center relative"
      style={{ width: "90px", height: "48px", padding: 0 }}
    >
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="w-full h-full text-center bg-gray-700 border border-gray-600 rounded-full appearance-none text-white outline-none p-0 m-0 bg-inherit shadow-none border-none select-none"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <span className="ml-5" />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white">
        <FaChevronDown />
      </span>
    </div>
  );
}
