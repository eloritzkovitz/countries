import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { CountryFlag } from "./CountryFlag";
import { ActionButton } from "../common/ActionButton";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { useCountryData } from "../../context/CountryDataContext";
import { useKeyHandler } from "../../hooks/useKeyHandler";
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

  useKeyHandler(() => onClose(), ["Escape"], isOpen);

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ErrorMessage error={error} />;
  if (!country) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl min-w-[80] max-w-[100vw] w-[350px] relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row with close button on the right */}
        <div className="flex items-center justify-between">
          <h2 className="mt-0 mb-0 text-xl font-bold">{country.name}</h2>
          <ActionButton
            onClick={onClose}
            ariaLabel="Close country details"
            title="Close"
            className="ml-2"
          >
            <FaTimes />
          </ActionButton>
        </div>
        {country.sovereigntyType && (
          <div className="mb-6 text-base font-semibold text-gray-600">
            {country.sovereigntyType}
          </div>
        )}
        <CountryFlag
          isoCode={country.isoCode}
          size="64x48"
          alt={`${country.name} flag`}
          style={{ marginBottom: 16 }}
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
      </div>
    </div>,
    document.body
  );
}
