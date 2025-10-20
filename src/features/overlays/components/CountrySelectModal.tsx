import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { CountryFlag, FormButton, FormField, Modal, SearchInput } from "@components";

interface CountrySelectModalProps {
  isOpen: boolean;
  selected: string[];
  options: { value: string; label: string }[];
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

  // Sort and filter options
  const sortedOptions = [...options].sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const filteredOptions = sortedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-white rounded-xl shadow-2xl p-6 min-w-[400px] max-w-[500px] max-h-[80vh] overflow-y-auto"
    >
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <FaGlobe />
        Select Countries
      </h3>
      <FormField label="Search:">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search countries..."
        />
      </FormField>
      <FormField label="Countries:">
        <div className="max-h-[50vh] overflow-y-auto mb-4">
          {filteredOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCountries.includes(opt.value)}
                onChange={() => {
                  setSelectedCountries((prev) =>
                    prev.includes(opt.value)
                      ? prev.filter((v) => v !== opt.value)
                      : [...prev, opt.value]
                  );
                }}
                className="mr-2"
              />
              <CountryFlag
                flag={{
                  isoCode: opt.value,
                  source: "flagsapi",
                  style: "flat",
                  size: "32x24",
                }}
                style={{ marginRight: 8 }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </FormField>
      <div className="flex justify-end gap-2">
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
