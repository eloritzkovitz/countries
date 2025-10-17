import { FaCrosshairs, FaTimes } from "react-icons/fa";
import { CountryFlag } from "../../../components/ui/CountryFlag";
import { SovereigntyBadge } from "./SovereigntyBadge";
import { ActionButton } from "../../../components/common/ActionButton";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../../components/common/ErrorMessage";
import { Modal } from "../../../components/common/Modal";
import { PanelHeader } from "../../../components/common/PanelHeader";
import { useCountryData } from "../../../context/CountryDataContext";
import { useKeyHandler } from "../../../hooks/useKeyHandler";
import type { Country } from "../../../types/country";
import { getLanguagesDisplay } from "../utils/countryData";

type CountryDetailsModalProps = {
  country: Country | null;
  isOpen: boolean;
  onCenterMap?: () => void;
  onClose: () => void;
};

export function CountryDetailsModal({
  country,
  isOpen,
  onCenterMap,
  onClose,
}: CountryDetailsModalProps) {
  const { currencies, loading, error } = useCountryData();

  // Center map handler
  useKeyHandler(
    (e) => {
      e.preventDefault();
      if (onCenterMap) onCenterMap();
    },
    ["c", "C"],
    isOpen
  );

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
        {onCenterMap && (
          <ActionButton
            onClick={onCenterMap}
            ariaLabel="Center map on country"
            title="Center map"
            icon={<FaCrosshairs />}
          />
        )}
        <ActionButton
          onClick={onClose}
          ariaLabel="Close country details"
          title="Close"
          icon={<FaTimes />}
        />
      </PanelHeader>
      <SovereigntyBadge type={country.sovereigntyType} />
      <CountryFlag
        flag={{
          isoCode: country.isoCode,
          source: "flagcdn",
          style: "flat",
          size: "64x48",
        }}
        alt={`${country.name} flag`}
        style={{ marginBottom: "16px" }}
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
