import type { FilterOption } from "../../types/filters";

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
};

export function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <div className="my-4">
      <label className="font-bold block mb-2">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-gray-100 rounded border border-none mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
