import { FaXmark } from "react-icons/fa6";
import type { Option } from "@types";

interface SelectedOptionsProps<T> {
  value: T[];
  options: Option<T>[];
  onRemove: (val: T) => void;
}

export function SelectedOptions<T>({
  value,
  options,
  onRemove,
}: SelectedOptionsProps<T>) {
  return (
    <span className="flex flex-wrap gap-1 h-8">
      {options
        .filter((opt) => value.includes(opt.value))
        .map((opt, i) => (
          <span key={i} className="selected-option">
            {opt.label}
            <button
              type="button"
              className="ml-1 text-blue-500 dark:text-gray-200 hover:text-gray-400 focus:outline-none"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(opt.value);
              }}
              aria-label={`Remove ${opt.label}`}
            >
              <FaXmark className="w-3 h-3" />
            </button>
          </span>
        ))}
    </span>
  );
}
