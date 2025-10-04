import { createPortal } from "react-dom";
import { SketchPicker } from "react-color";
import Select from "react-select";
import { FaPlus, FaEdit, FaPalette } from "react-icons/fa";
import type { Overlay } from "../../types/overlay";

export function OverlayEditModal({
  overlay,
  isNew,
  countryOptions,
  onChange,
  onSave,
  onCancel,
}: {
  overlay: Overlay;
  isNew: boolean;
  countryOptions: { value: string; label: string }[];
  onChange: (overlay: Overlay) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-[9999] flex items-center justify-center"
      onClick={onCancel}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-8 min-w-[400px] max-w-[600px] max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 bg-none border-none text-2xl text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          aria-label="Close Overlay Modal"
        >
          ×
        </button>
        <h3 className="flex items-center gap-2 mb-6 text-lg font-bold">
          {isNew ? <FaPlus /> : <FaEdit />} {isNew ? "Add Overlay" : "Edit Overlay"}
        </h3>
        <label className="flex items-center gap-2 mb-4">
          Name:
          <input
            type="text"
            value={overlay.name}
            onChange={e => onChange({ ...overlay, name: e.target.value })}
            className="ml-2 px-2 py-1 rounded border border-gray-300 flex-1"
          />
        </label>
        <label className="flex items-center gap-2 mb-4">
          <FaPalette /> Color:
          <div className="ml-2">
            <SketchPicker
              color={overlay.color}
              onChangeComplete={color =>
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
              value={countryOptions.filter(opt =>
                overlay.countries.includes(opt.value)
              )}
              onChange={selected =>
                onChange({
                  ...overlay,
                  countries: selected.map(opt => opt.value),
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
            onChange={e =>
              onChange({ ...overlay, tooltip: e.target.value })
            }
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
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}