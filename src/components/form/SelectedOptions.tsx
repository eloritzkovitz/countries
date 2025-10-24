import type { Option } from "@types";

export function SelectedOptions<T>({
  value,
  options,
  onRemove,
}: {
  value: T[];
  options: Option<T>[];
  onRemove: (val: T) => void;
}) {
  return (
    <span className="flex flex-wrap gap-1">
      {options
        .filter((opt) => value.includes(opt.value))
        .map((opt, i) => (
          <span
            key={i}
            className="flex items-center bg-blue-100 text-blue-800 px-1 rounded text-xs"
          >
            {opt.label}
            <button
              type="button"
              className="ml-1 text-blue-500 hover:text-red-500 focus:outline-none"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(opt.value);
              }}
              aria-label={`Remove ${opt.label}`}
            >
              ×
            </button>
          </span>
        ))}
    </span>
  );
}
