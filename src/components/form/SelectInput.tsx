import type { FilterOption } from "@types";
import "./Form.css";

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
        className="select-input bg-gray-100"
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
