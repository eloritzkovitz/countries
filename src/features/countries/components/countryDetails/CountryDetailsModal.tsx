import { FaWikipediaW, FaCrosshairs, FaTimes } from "react-icons/fa";
import {
  ActionButton,
  ErrorMessage,
  LoadingSpinner,
  Modal,
  PanelHeader,
} from "@components";
import { useCountryData } from "@contexts/CountryDataContext";
import {
  CountryFlag,
  CountryWithFlag,
  getLanguagesDisplay,
  getSovereigntyInfoForTerritory,
} from "@features/countries";
import { useKeyHandler } from "@hooks/useKeyHandler";
import type { Country } from "@types";
import { SovereigntyBadge } from "./SovereigntyBadge";
import { VisitedStatusIndicator } from "./VisitedStatusIndicator";
import { useVisitedCountries } from "../../hooks/useVisitedCountries";

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
  const { isCountryVisited } = useVisitedCountries();
  const isVisited = country ? isCountryVisited(country.isoCode) : false;

  // Center map handler
  useKeyHandler(
    (e) => {
      e.preventDefault();
      if (onCenterMap) onCenterMap();
    },
    ["x", "X"],
    isOpen
  );

  // Get sovereignty info
  const sovereigntyInfo = country
    ? getSovereigntyInfoForTerritory(country.isoCode)
    : undefined;

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ErrorMessage error={error} />;
  if (!country) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-white rounded-xl p-8 min-w-[540px] max-w-[100vw] w-[350px] shadow-lg"
    >
      <PanelHeader
        title={
          <span className="flex items-center gap-2">            
            <CountryWithFlag
              isoCode={country.isoCode}
              name={country.name}
              size="32x24"
              className="font-bold text-lg"
            />
            <span className="text-gray-500 text-sm">({country.isoCode})</span>
            <VisitedStatusIndicator visited={isVisited} />
          </span>
        }
      >
        <ActionButton
          onClick={() =>
            window.open(
              `https://en.wikipedia.org/wiki/${country.name.replace(
                / /g,
                "_"
              )}`,
              "_blank",
              "noopener,noreferrer"
            )
          }
          ariaLabel="Open Wikipedia article"
          title="Wikipedia"
          icon={<FaWikipediaW />}
        />
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
      {country.sovereigntyType && sovereigntyInfo && (
        <SovereigntyBadge
          type={country.sovereigntyType}
          sovereign={sovereigntyInfo.sovereign}
        />
      )}
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
            <td className="font-semibold">Region:</td>
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
    </Modal>
  );
}
