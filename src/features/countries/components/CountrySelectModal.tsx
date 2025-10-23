import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import {
  CountryFlag,
  FormButton,
  FormField,
  Modal,
  PanelHeader,
  SearchInput,
} from "@components";
import { filterCountriesBySearch } from "@features/countries";
import type { Country } from "@types";

interface CountrySelectModalProps {
  isOpen: boolean;
  selected: string[];
  options: Country[];
  onChange: (newCountries: string[]) => void;
  onClose: () => void;
}

export function CountrySelectModal({
  isOpen,
  selected,
  options,
  onChange,
  onClose,
}: CountrySelectModalProps) {
  const [search, setSearch] = useState("");

  // Filter options by search (accent-insensitive)
  const filteredOptions = filterCountriesBySearch(options, search);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="modal w-[500px] max-h-[80vh] flex flex-col"
    >
      <PanelHeader
        title={
          <>
            <FaGlobe />
            Select Countries
          </>
        }
      />
      <FormField label="Search:">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search countries..."
        />
      </FormField>
      <FormField label="Countries:">
        <div className="bg-gray-100 h-64 max-h-[50vh] overflow-y-auto rounded px-2 py-1">
          {filteredOptions.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No countries found.
            </div>
          ) : (
            filteredOptions.map((country) => {
              const checked = selected.includes(country.isoCode);
              return (
                <label
                  key={country.isoCode}
                  className="flex items-center mb-2 cursor-pointer hover:text-blue-500 dark:hover:text-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const newSelected = checked
                        ? selected.filter((v) => v !== country.isoCode)
                        : [...selected, country.isoCode];
                      onChange(newSelected);
                    }}
                    className="mr-2"
                  />
                  <CountryFlag
                    flag={{
                      isoCode: country.isoCode,
                      source: "svg",
                      style: "flat",
                      size: "32x24",
                    }}
                    style={{ marginRight: 8 }}
                  />
                  {country.name}
                </label>
              );
            })
          )}
        </div>
      </FormField>
      <div className="flex justify-end gap-2 mt-4">
        <FormButton type="button" variant="secondary" onClick={onClose}>
          Cancel
        </FormButton>
        <FormButton type="button" variant="primary" onClick={onClose}>
          Confirm
        </FormButton>
      </div>
    </Modal>
  );
}
