import ReactDOM from "react-dom";
import { SketchPicker } from "react-color";
import Select from "react-select";
import { FaPlus, FaEdit, FaPalette, FaTimes } from "react-icons/fa";
import { ActionButton } from "../common/ActionButton";
import { useCountryData } from "../../context/CountryDataContext";
import { useKeyHandler } from "../../hooks/useKeyHandler";
import type { Overlay } from "../../types/overlay";

type OverlayEditModalProps = {
  overlay: Overlay;
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
  
  // Don't render if not open
  if (!isOpen) return null;

  // Handle Escape key to close modal
  useKeyHandler(() => onClose(), ["Escape"], isOpen);

  // Country options
  const countryOptions = countries.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));  

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-8 min-w-[400px] max-w-[600px] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >        
        {/* Header row with title and close button aligned */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="flex items-center gap-2 text-lg font-bold m-0">
            {isNew ? <FaPlus /> : <FaEdit />}{" "}
            {isNew ? "Add Overlay" : "Edit Overlay"}
          </h3>
          <ActionButton
            onClick={onClose}
            ariaLabel="Close Overlay Modal"
            title="Close"
            className=""
            icon={<FaTimes />}
          />
        </div>
        <label className="flex items-center gap-2 mb-4">
          Name:
          <input
            type="text"
            value={overlay.name}
            onChange={(e) => onChange({ ...overlay, name: e.target.value })}
            className="ml-2 px-2 py-1 rounded border border-gray-300 flex-1"
          />
        </label>
        <label className="flex items-center gap-2 mb-4">
          <FaPalette /> Color:
          <div className="ml-2">
            <SketchPicker
              color={overlay.color}
              onChangeComplete={(color) =>
                onChange({ ...overlay, color: color.hex })
              }
            />
          </div>
        </label>
        <label className="flex items-center gap-2 mb-4">
          Countries:
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
            />
          </div>
        </label>
        <label className="flex items-center gap-2 mb-4">
          Tooltip:
          <input
            type="text"
            value={overlay.tooltip || ""}
            onChange={(e) => onChange({ ...overlay, tooltip: e.target.value })}
            className="ml-2 px-2 py-1 rounded border border-gray-300 flex-1"
          />
        </label>
        <div className="flex gap-3 mt-6">
          <button
            className="bg-blue-600 text-white rounded px-4 py-2 font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
            onClick={onSave}
          >
            {isNew ? <FaPlus /> : <FaEdit />} Save
          </button>
          <button
            className="bg-gray-200 text-gray-700 rounded px-4 py-2 font-bold flex items-center gap-2 hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
