import { FaCrosshairs, FaTimes } from "react-icons/fa";
import {
  ActionButton,
  CountryFlag,
  ErrorMessage,
  LoadingSpinner,
  Modal,
  PanelHeader,
} from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import { useKeyHandler } from "@hooks/useKeyHandler";
import type { Country } from "@types";
import { SovereigntyBadge } from "./SovereigntyBadge";
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
      <PanelHeader
        title={
          <span className="flex items-center gap-2">
            <CountryFlag
              flag={{
                isoCode: country.isoCode,
                source: "flagsapi",
                style: "flat",
                size: "32x24",
              }}
              alt={`${country.name} flag`}
              style={{ marginBottom: 0 }}
            />
            <span className="font-bold text-lg">{country.name}</span>
            <span className="text-gray-500 text-sm">({country.isoCode})</span>
          </span>
        }
      >
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
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "16px",
        }}
      />
      <table className="w-full mb-4 text-gray-700 border-separate [border-spacing:0.5rem]">
        <tbody>
          <tr>
            <td className="font-semibold">Continent:</td>
            <td>{country.region}</td>
          </tr>
          <tr>
            <td className="font-semibold">Subregion:</td>
            <td>{country.subregion}</td>
          </tr>
          <tr>
            <td className="font-semibold">Population:</td>
            <td>{country.population?.toLocaleString()}</td>
          </tr>
          <tr>
            <td className="font-semibold">Capital:</td>
            <td>{country.capital}</td>
          </tr>
          <tr>
            <td className="font-semibold">Currency:</td>
            <td>
              {country.currency && currencies[country.currency]
                ? `${currencies[country.currency]} (${country.currency})`
                : country.currency || "N/A"}
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Languages:</td>
            <td>{getLanguagesDisplay(country.languages)}</td>
          </tr>
          <tr>
            <td className="font-semibold">Calling code:</td>
            <td>{country.callingCode}</td>
          </tr>
          <tr>
            <td className="font-semibold">ISO 3166 Code:</td>
            <td>{country.isoCode}</td>
          </tr>
        </tbody>
      </table>
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
