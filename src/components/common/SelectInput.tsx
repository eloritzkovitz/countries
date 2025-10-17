import type { FilterOption } from "@types";

type SelectInputProps = {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: FilterOption[];
};

export function SelectInput({ label, value, onChange, options }: SelectInputProps) {
  return (
    <div className="my-4">
      <label className="font-bold block mb-2">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="select-input w-full px-3 py-2 bg-gray-100 rounded border border-none mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
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
