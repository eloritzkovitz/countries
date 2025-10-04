import type { FilterOption } from "../../types/filters";

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
};

export function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <label style={{ fontWeight: "bold" }}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: 6,
          border: "1px solid #ccc",
          marginTop: "0.5rem",
        }}
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
