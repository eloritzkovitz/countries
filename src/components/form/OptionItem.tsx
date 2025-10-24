import type { Option } from "@types";

export function OptionItem<T>({
  opt,
  isSelected,
  isMulti,
  value,
  onChange,
  setOpen,
}: {
  opt: Option<T>;
  isSelected: (val: T) => boolean;
  isMulti: boolean;
  value: T | T[];
  onChange: (v: T | T[]) => void;
  setOpen: (v: boolean) => void;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 hover:bg-blue-100 dark:hover:bg-gray-500 cursor-pointer ${
        isSelected(opt.value) ? "bg-blue-50 font-semibold" : ""
      }`}
      onClick={() => {
        if (isMulti) {
          if (!Array.isArray(value)) return;
          if (value.includes(opt.value)) {
            onChange(value.filter((v) => v !== opt.value));
          } else {
            onChange([...value, opt.value]);
          }
        } else {
          onChange(opt.value);
          setOpen(false);
        }
      }}
    >
      {isMulti && Array.isArray(value) && (
        <input
          type="checkbox"
          checked={value.includes(opt.value)}
          readOnly
          className="mr-1"
        />
      )}
      {opt.label}
    </div>
  );
}
