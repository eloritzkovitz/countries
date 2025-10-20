import { useState } from "react";
import { FaLayerGroup, FaEdit, FaTimes } from "react-icons/fa";
import {
  ActionButton,
  FormButton,
  FormField,
  Modal,
  PanelHeader,
} from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { getCountryOptions } from "@features/countries";
import type { Overlay } from "@types";
import CountrySelectModal from "./CountrySelectModal";
import { ColorPickerModal } from "./ColorPickerModal";

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
  const countryOptions = getCountryOptions(countries);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);

  // State for country select modal
  const selectedCountries = countryOptions.filter(
    (opt) => overlay && overlay.countries.includes(opt.value)
  ); 

  // Handle modal close
  const handleClose = () => {
    // Only allow closing if no submodal is open
    if (!colorModalOpen && !countryModalOpen) {
      onClose();
    }
  };

  // Don't render the modal if no overlay is being edited
  if (!overlay) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        disableClose={countryModalOpen || colorModalOpen}
        className="bg-white rounded-xl shadow-2xl p-8 min-w-[500px] max-w-[800px] max-h-[90vh] overflow-y-auto"
      >
        <PanelHeader
          title={
            <>
              <FaLayerGroup />
              {overlay ? "Edit Overlay" : "Add Overlay"}
            </>
          }
        >
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
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded border"
              style={{ background: overlay.color }}
              title={overlay.color}
            />
            <FormButton
              type="button"
              variant="secondary"
              onClick={() => setColorModalOpen(true)}
            >
              <FaEdit className="inline" /> Edit
            </FormButton>
          </div>
        </FormField>

        {/* Countries */}
        <FormField label="Countries:">
          <div className="flex items-center gap-2 flex-wrap">
            {selectedCountries.length === 0 ? (
              <span className="text-gray-400">No countries selected</span>
            ) : (
              selectedCountries.map((opt) => (
                <span
                  key={opt.value}
                  className="bg-blue-100 text-blue-800 dark:bg-gray-500 dark:text-gray-200 px-2 py-1 rounded text-sm mr-1 mb-1"
                >
                  {opt.label}
                </span>
              ))
            )}
            <FormButton
              type="button"
              variant="secondary"
              onClick={() => setCountryModalOpen(true)}
            >
              <FaEdit className="inline" /> Edit
            </FormButton>
          </div>
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
      {/* Color Picker Modal */}
      <ColorPickerModal
        isOpen={colorModalOpen}
        color={overlay.color}
        onChange={(newColor) => onChange({ ...overlay, color: newColor })}
        onClose={() => setColorModalOpen(false)}
      />
      {/* Country Select Modal */}
      <CountrySelectModal
        isOpen={countryModalOpen}
        selected={overlay.countries}
        options={countryOptions}
        onClose={() => setCountryModalOpen(false)}
        onChange={(newCountries) => {
          onChange({ ...overlay, countries: newCountries });
          setCountryModalOpen(false);
        }}
      />
    </>
  );
}
