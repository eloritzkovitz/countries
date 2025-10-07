import { FaTimes } from "react-icons/fa";
import { CountryFlag } from "./CountryFlag";
import { ActionButton } from "../common/ActionButton";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { Modal } from "../common/Modal";
import { PanelHeader } from "../common/PanelHeader";
import { useCountryData } from "../../context/CountryDataContext";
import type { Country } from "../../types/country";
import { getLanguagesDisplay } from "../../utils/countryData";

type CountryDetailsModalProps = {
  country: Country;
  onClose: () => void;
  isOpen: boolean;
};

export function CountryDetailsModal({
  country,
  onClose,
  isOpen,
}: CountryDetailsModalProps) {
  const { currencies, loading, error } = useCountryData();

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ErrorMessage error={error} />;
  if (!country) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-white rounded-xl p-8 min-w-[340px] max-w-[100vw] w-[350px] shadow-lg"
    >
      <PanelHeader title={country.name}>
        <ActionButton
          onClick={onClose}
          ariaLabel="Close country details"
          title="Close"
          className="ml-2"
          icon={<FaTimes />}
        />
      </PanelHeader>
      {country.sovereigntyType && (
        <div className="mb-6 text-base text-center font-semibold bg-blue-300 text-gray-600 rounded-full p-2 dark:bg-gray-600 dark:text-gray-300">
          {country.sovereigntyType}
        </div>
      )}
      <CountryFlag
        flag={{
          isoCode: country.isoCode,
          source: "flagcdn",
          style: "flat",
          size: "64x48",
        }}
        alt={`${country.name} flag`}
        style={{marginBottom: '16px'}}
      />
      <ul className="list-none p-0 mb-4 text-gray-700">
        <li>
          <strong>Region:</strong> {country.region}
        </li>
        <li>
          <strong>Subregion:</strong> {country.subregion}
        </li>
        <li>
          <strong>Population:</strong> {country.population?.toLocaleString()}
        </li>
        <li>
          <strong>Capital:</strong> {country.capital}
        </li>
        <li>
          <strong>Currency: </strong>{" "}
          {country.currency && currencies[country.currency]
            ? `${currencies[country.currency]} (${country.currency})`
            : country.currency || "N/A"}
        </li>
        <li>
          <strong>Languages:</strong> {getLanguagesDisplay(country.languages)}
        </li>
      </ul>
      <a
        href={`https://en.wikipedia.org/wiki/${country.name.replace(
          / /g,
          "_"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline font-bold inline-block mt-2"
      >
        Wikipedia
      </a>
    </Modal>
  );
}
