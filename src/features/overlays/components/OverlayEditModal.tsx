import { SketchPicker } from "react-color";
import Select from "react-select";
import { FaPlus, FaEdit, FaTimes } from "react-icons/fa";
import { ActionButton } from "../../../components/common/ActionButton";
import { FormField } from "../../../components/common/FormField";
import { Modal } from "../../../components/common/Modal";
import { PanelHeader } from "../../../components/common/PanelHeader";
import { useCountryData } from "../../../context/CountryDataContext";
import { useTheme } from "../../../context/ThemeContext";
import type { Overlay } from "../../../types/overlay";
import { getCountryOptions } from "../../countries/utils/countryData";
import { getSelectStyles } from "../utils/selectStyles";

type OverlayEditModalProps = {
  overlay: Overlay | null;
  isNew: boolean;
  onChange: (overlay: Overlay) => void;
  onSave: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export function OverlayEditModal({
  overlay,
  isNew,
  onChange,
  onSave,
  onClose,
  isOpen,
}: OverlayEditModalProps) {
  const { countries } = useCountryData();
  const { theme } = useTheme();
  const countryOptions = getCountryOptions(countries);

  // Don't render the modal if no overlay is being edited
  if (!overlay) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="bg-white rounded-xl shadow-2xl p-8 min-w-[400px] max-w-[600px] max-h-[90vh] overflow-y-auto"
      >
        <PanelHeader title={isNew ? "Add Overlay" : "Edit Overlay"}>
          <ActionButton
            onClick={onClose}
            ariaLabel="Close Overlay Modal"
            title="Close"
            className=""
            icon={<FaTimes />}
          />
        </PanelHeader>

        {/* Name */}
        <FormField label="Name:">
          <input
            type="text"
            value={overlay.name}
            onChange={(e) => onChange({ ...overlay, name: e.target.value })}
            className="ml-2 px-2 py-1 bg-gray-100 rounded border border-none flex-1"
          />
        </FormField>

        {/* Color */}
        <FormField label="Color:">
          <div className="ml-2">
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
          </div>
        </FormField>

        {/* Countries */}
        <FormField label="Countries:">
          <div className="ml-2 flex-1">
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
          </div>
        </FormField>
       
        {/* Tooltip */}
        <FormField label="Tooltip:">
          <input
            type="text"
            value={overlay.tooltip || ""}
            onChange={(e) => onChange({ ...overlay, tooltip: e.target.value })}
            className="ml-2 px-2 py-1 bg-gray-100 rounded border border-none flex-1"
          />
        </FormField>
        
        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <ActionButton
            onClick={onSave}
            className="bg-blue-600 text-white hover:bg-blue-700"
            icon={isNew ? <FaPlus /> : <FaEdit />}
          >
            Save
          </ActionButton>
          <ActionButton
            onClick={onClose}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </ActionButton>
        </div>
      </Modal>
    </>
  );
}
