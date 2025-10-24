import { useState } from "react";
import { FaLayerGroup, FaEdit, FaTimes, FaSave } from "react-icons/fa";
import {
  ActionButton,
  FormButton,
  FormField,
  Modal,
  ModalActions,
  PanelHeader,
} from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { CountrySelectModal } from "@features/countries";
import type { Overlay } from "@types";
import { ColorPickerModal } from "./ColorPickerModal";

type OverlayModalProps = {
  overlay: Overlay | null;
  onChange: (overlay: Overlay) => void;
  onSave: () => void;
  onClose: () => void;
  isOpen: boolean;
  isEditing: boolean;
};

export function OverlayModal({
  overlay,
  onChange,
  onSave,
  onClose,
  isOpen,
  isEditing,
}: OverlayModalProps) {
  const { countries } = useCountryData();
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);

  // State for country select modal
  const selectedCountries = countries.filter(
    (country) => overlay && overlay.countries.includes(country.isoCode)
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
              {isEditing ? "Edit Overlay" : "Add Overlay"}
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
            className="form-field"
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
              selectedCountries.map((country) => (
                <span
                  key={country.isoCode}
                  className="flex items-center gap-1 bg-blue-100 text-blue-800 dark:bg-gray-500 dark:text-gray-200 px-2 py-1 rounded text-sm mr-1 mb-1"
                >
                  {country.name}
                  <button
                    type="button"
                    className="ml-auto text-gray-400 hover:text-blue-500 dark:hover:text-gray-300"
                    title="Remove"
                    onClick={() =>
                      onChange({
                        ...overlay,
                        countries: overlay.countries.filter(
                          (code) => code !== country.isoCode
                        ),
                      })
                    }
                  >
                    <FaTimes />
                  </button>
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
            className="form-field"
          />
        </FormField>
        <ModalActions
          onCancel={onClose}
          onSubmit={onSave}
          submitType="button"
          submitIcon={
            isEditing ? (
              <FaSave className="inline" />
            ) : (
              <FaLayerGroup className="inline" />
            )
          }
          submitLabel={isEditing ? "Save Changes" : "Add Overlay"}
        />
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
        options={countries}
        onClose={() => setCountryModalOpen(false)}
        onChange={(newCountries) => {
          onChange({ ...overlay, countries: newCountries });
          setCountryModalOpen(false);
        }}
      />
    </>
  );
}
