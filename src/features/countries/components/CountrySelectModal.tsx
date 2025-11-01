import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa6";
import {
  Checkbox,
  CountryWithFlag,
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
  multiple?: boolean;
}

export function CountrySelectModal({
  isOpen,
  selected,
  options,
  onChange,
  onClose,
  multiple = true,
}: CountrySelectModalProps) {
  const [search, setSearch] = useState("");

  // Reset search when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearch("");
    }
  }, [isOpen]);

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
                  <Checkbox
                    checked={checked}
                    onChange={(checked) => {
                      if (multiple) {
                        const newSelected = checked
                          ? [...selected, country.isoCode]
                          : selected.filter((v) => v !== country.isoCode);
                        onChange(newSelected);
                      } else {
                        onChange([country.isoCode]);
                      }
                    }}
                  />
                  <span className="w-2" />
                  <CountryWithFlag
                    isoCode={country.isoCode}
                    name={country.name}
                    size="32x24"
                    className="mr-2"
                  />
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
