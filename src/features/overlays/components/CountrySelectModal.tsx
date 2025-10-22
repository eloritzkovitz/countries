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

export default function CountrySelectModal({
  isOpen,
  selected,
  options,
  onChange,
  onClose,
}: CountrySelectModalProps) {
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] =
    useState<string[]>(selected);

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
        <div className="h-64 max-h-[50vh] overflow-y-auto rounded px-2 py-1">
          {filteredOptions.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No countries found.
            </div>
          ) : (
            filteredOptions.map((country) => (
              <label
                key={country.isoCode}
                className="flex items-center mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(country.isoCode)}
                  onChange={() => {
                    setSelectedCountries((prev) =>
                      prev.includes(country.isoCode)
                        ? prev.filter((v) => v !== country.isoCode)
                        : [...prev, country.isoCode]
                    );
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
            ))
          )}
        </div>
      </FormField>
      <div className="flex justify-end gap-2 mt-4">
        <FormButton type="button" variant="secondary" onClick={onClose}>
          Cancel
        </FormButton>
        <FormButton
          type="button"
          variant="primary"
          onClick={() => onChange(selectedCountries)}
        >
          Confirm
        </FormButton>
      </div>
    </Modal>
  );
}
