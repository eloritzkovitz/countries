import { useState } from "react";
import { FaSuitcaseRolling, FaGlobe, FaSave, FaTimes } from "react-icons/fa";
import {
  CountryFlag,
  DropdownSelectInput,
  FormField,
  Modal,
  ModalActions,
  SelectInput,
} from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { CountrySelectModal } from "@features/countries";
import type { Trip, TripCategory, TripStatus } from "@types";
import { useTripFilters } from "../hooks/useTripFilters";

type TripModalProps = {
  isOpen: boolean;
  trip: Trip | null;
  onChange: (trip: Trip) => void;
  onSave: (trip: Trip) => Promise<void>;
  onClose: () => void;
  isEditing: boolean;
};

export function TripModal({
  isOpen,
  trip,
  onChange,
  onSave,
  onClose,
  isEditing,
}: TripModalProps) {
  const { countries } = useCountryData();
  const [countryModalOpen, setCountryModalOpen] = useState(false);

  // Dropdown options
  const { categoryOptions, statusOptions, tagOptions } = useTripFilters();

  // If no trip is provided, don't render anything
  if (!trip) return null;

  // Get the selected country objects
  const selectedCountries = countries.filter((country) =>
    trip.countryCodes.includes(country.isoCode)
  );

  // Form validation
  const isValid =
    trip.name.trim() && trip.startDate && trip.countryCodes.length > 0;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="bg-white w-[800px] max-h-[80vh] flex flex-row"
      >
        {/* Left: Form */}
        <form
          className="p-4 flex-1 min-w-0"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isValid) return;
            onSave(trip);
          }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaSuitcaseRolling />
            {isEditing ? "Edit Trip" : "Add Trip"}
          </h2>
          <FormField label="Name" className="mb-2">
            <input
              className="form-field"
              value={trip.name}
              onChange={(e) => onChange({ ...trip, name: e.target.value })}
              required
            />
          </FormField>
          <FormField label="Start Date" className="mb-2">
            <input
              type="date"
              className="form-field"
              value={trip.startDate}
              onChange={(e) => {
                const newStart = e.target.value;
                let newEnd = trip.endDate;
                if (!trip.endDate || newEnd < newStart) {
                  newEnd = newStart;
                }
                onChange({ ...trip, startDate: newStart, endDate: newEnd });
              }}
              required
            />
          </FormField>
          <FormField label="End Date" className="mb-2">
            <input
              type="date"
              className="form-field"
              value={trip.endDate}
              min={trip.startDate || undefined}
              onChange={(e) => onChange({ ...trip, endDate: e.target.value })}
            />
          </FormField>
          <FormField label="Countries" className="mb-2">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:text-blue-500 dark:hover:text-gray-300 font-medium"
              onClick={() => setCountryModalOpen(true)}
            >
              <FaGlobe />
              {selectedCountries.length > 0
                ? `Edit Countries (${selectedCountries.length})`
                : "Select Countries"}
            </button>            
          </FormField>
          <FormField label="Full Days" className="mb-2">
            <input
              type="number"
              min={1}
              className="form-field"
              value={trip.fullDays}
              onChange={(e) =>
                onChange({ ...trip, fullDays: Number(e.target.value) })
              }
            />
          </FormField>
          <FormField label="Categories" className="mb-2">
            <DropdownSelectInput
              value={trip.categories || []}
              onChange={(v) =>
                onChange({
                  ...trip,
                  categories: Array.isArray(v)
                    ? (v as TripCategory[])
                    : v
                    ? [v as TripCategory]
                    : [],
                })
              }
              options={categoryOptions}
              placeholder="Select categories"
              isMulti
              className="form-field"
            />
          </FormField>
          <FormField label="Status" className="mb-2">
            <SelectInput
              value={trip.status || ""}
              onChange={(v) =>
                onChange({
                  ...trip,
                  status: v as TripStatus,
                })
              }
              options={statusOptions}
              label={""}
            />
          </FormField>
          <FormField label="Tags" className="mb-2">
            <DropdownSelectInput
              value={trip.tags || []}
              onChange={(v) =>
                onChange({ ...trip, tags: Array.isArray(v) ? v : v ? [v] : [] })
              }
              options={tagOptions}
              placeholder="Add tags"
              isMulti
              className="form-field"
            />
          </FormField>
          <FormField label="Notes" className="mb-2">
            <input
              className="form-field"
              value={trip.notes}
              onChange={(e) => onChange({ ...trip, notes: e.target.value })}
            />
          </FormField>
          <ModalActions
            onCancel={onClose}
            submitIcon={
              isEditing ? (
                <FaSave className="inline" />
              ) : (
                <FaSuitcaseRolling className="inline" />
              )
            }
            submitLabel={isEditing ? "Save Changes" : "Add Trip"}
            disabled={!isValid}
          />
        </form>
        {/* Right: Selected Countries */}
        <div className="flex flex-col w-[250px] border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
          <div className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Selected Countries
          </div>
          <div className="flex flex-col gap-2">
            {selectedCountries.length === 0 && (
              <span className="text-gray-400 text-sm">
                No countries selected
              </span>
            )}
            {selectedCountries.map((country) => (
              <span
                key={country.isoCode}
                className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700"
              >
                <CountryFlag
                  flag={{
                    isoCode: country.isoCode,
                    source: "svg",
                    style: "flat",
                    size: "32x24",
                  }}
                />
                <span className="text-sm">{country.name}</span>
                <button
                  type="button"
                  className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  title="Remove"
                  onClick={() =>
                    onChange({
                      ...trip,
                      countryCodes: trip.countryCodes.filter(
                        (code) => code !== country.isoCode
                      ),
                    })
                  }
                >
                  <FaTimes />
                </button>
              </span>
            ))}
          </div>
        </div>
      </Modal>
      <CountrySelectModal
        isOpen={countryModalOpen}
        selected={trip.countryCodes}
        options={countries}
        onClose={() => setCountryModalOpen(false)}
        onChange={(newCodes) => {
          onChange({ ...trip, countryCodes: newCodes });
        }}
      />
    </>
  );
}
