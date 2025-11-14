import type { FilterOption } from "@types";
import "./Form.css";
import { FaChevronDown } from "react-icons/fa6";

interface SelectInputProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: FilterOption[];
};

export function SelectInput({
  label,
  value,
  onChange,
  options,
}: SelectInputProps) {
  return (
    <div className="my-4">
      <label className="font-bold block mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="select-input bg-gray-100"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="chevron-container">
          <FaChevronDown />
        </span>
      </div>
    </div>
  );
}
