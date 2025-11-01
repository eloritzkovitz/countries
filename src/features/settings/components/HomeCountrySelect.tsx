import { useState } from "react";
import { FaHome, FaChevronDown } from "react-icons/fa";
import { CollapsibleHeader, CountryWithFlag } from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { useSettings } from "@contexts/SettingsContext";
import { CountrySelectModal } from "@features/countries";

export function HomeCountrySelect() {
  const { settings, updateSettings } = useSettings();
  const { countries } = useCountryData();
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);

  // Find the currently selected country object
  const selectedCountry = countries.find(
    (c) => c.isoCode === settings.homeCountry
  );

  return (
    <div className="settings-group">
      <CollapsibleHeader
        icon={<FaHome style={{ marginRight: 6 }} />}
        label="Home Country"
        expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
      />
      {expanded && (
        <button
          type="button"
          className="settings-select-btn flex items-center gap-3 px-3 py-2 rounded border bg-gray-200 dark:bg-gray-600 text-dark hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          onClick={() => setModalOpen(true)}
          aria-label="Select home country"
        >
          {selectedCountry ? (
            <CountryWithFlag
              isoCode={selectedCountry.isoCode}
              name={selectedCountry.name}
              size="32x24"
            />
          ) : (
            <span className="opacity-50">No country selected</span>
          )}          
          <FaChevronDown className="ml-auto text-gray-400" />
        </button>
      )}
      {/* Country selection modal */}
      <CountrySelectModal
        isOpen={modalOpen}
        selected={[settings.homeCountry]}
        options={countries}
        onChange={(newCountries) => {
          if (newCountries.length > 0) {
            updateSettings({ homeCountry: newCountries[0] });
            setModalOpen(false);
          }
        }}
        onClose={() => setModalOpen(false)}
        multiple={false}
      />
    </div>
  );
}
