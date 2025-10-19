import { SketchPicker } from "react-color";
import Select from "react-select";
import { FaTimes } from "react-icons/fa";
import { ActionButton, FormButton, FormField, Modal, PanelHeader } from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { useTheme } from "@contexts/ThemeContext";
import { getCountryOptions } from "@features/countries";
import type { Overlay } from "@types";
import { getSelectStyles } from "../utils/selectStyles";

type OverlayModalProps = {
  overlay: Overlay | null;
  onChange: (overlay: Overlay) => void;
  onSave: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export function OverlayModal({
  overlay,
  onChange,
  onSave,
  onClose,
  isOpen,
}: OverlayModalProps) {
  const { countries } = useCountryData();
  const { theme } = useTheme();
  const countryOptions = getCountryOptions(countries);

  // Don't render the modal if no overlay is being edited
  if (!overlay) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-white rounded-xl shadow-2xl p-8 min-w-[400px] max-w-[600px] max-h-[90vh] overflow-y-auto"
    >
      <PanelHeader title={overlay ? "Edit Overlay" : "Add Overlay"}>
        <ActionButton
          onClick={onClose}
          ariaLabel="Close Overlay Modal"
          title="Close"
          icon={<FaTimes />}
        />
      </PanelHeader>

      {/* Name */}
      <FormField label="Name:">
        <input
          type="text"
          value={overlay.name}
          onChange={(e) => onChange({ ...overlay, name: e.target.value })}
          className="w-full px-3 py-2 bg-gray-100 rounded border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
        />
      </FormField>

      {/* Color */}
      <FormField label="Color:">
        <SketchPicker
          color={overlay.color}
          onChangeComplete={(color) =>
            onChange({
              ...overlay,
              color: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
            })
          }
          styles={{
            default: {
              picker: {
                background: theme === "dark" ? "#4a5568" : "#fff",
                color: theme === "dark" ? "#f7fafc" : undefined,
                boxShadow: "none",
              },
              saturation: { borderRadius: "4px" },
              hue: { borderRadius: "4px" },
              alpha: { borderRadius: "4px" },
            },
          }}
        />
      </FormField>

      {/* Countries */}
      <FormField label="Countries:">
        <Select
          isMulti
          options={countryOptions}
          value={countryOptions.filter((opt) =>
            overlay.countries.includes(opt.value)
          )}
          onChange={(selected) =>
            onChange({
              ...overlay,
              countries: selected.map((opt) => opt.value),
            })
          }
          classNamePrefix="country-select"
          className="!border-none dark:bg-gray-800 dark:text-gray-100"
          theme={(selectTheme) => ({
            ...selectTheme,
            colors: {
              ...selectTheme.colors,
              neutral0: theme === "dark" ? "#4a5568" : "#fff",
              neutral80: theme === "dark" ? "#f3f4f6" : "#222",
              primary25: theme === "dark" ? "#374151" : "#e0e7ff",
              primary: "#2563eb",
              multiValue: theme === "dark" ? "#1e293b" : "#e0e7ff",
              multiValueLabel: theme === "dark" ? "#fff" : "#222",
              multiValueRemove: theme === "dark" ? "#1e293b" : "#2563eb",
            },
          })}
          styles={{
            ...getSelectStyles(theme),
          }}
        />
      </FormField>

      {/* Tooltip */}
      <FormField label="Tooltip:">
        <input
          type="text"
          value={overlay.tooltip || ""}
          onChange={(e) => onChange({ ...overlay, tooltip: e.target.value })}
          className="w-full px-3 py-2 bg-gray-100 rounded border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
        />
      </FormField>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <FormButton type="button" variant="secondary" onClick={onClose}>
          Cancel
        </FormButton>
        <FormButton type="button" variant="primary" onClick={onSave}>
          {overlay ? "Save Changes" : "Add Overlay"}
        </FormButton>
      </div>
    </Modal>
  );
}
