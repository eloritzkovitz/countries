import ReactDOM from "react-dom";
import { CountryFlag } from "./CountryFlag";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { useCountryData } from "../../context/CountryDataContext";
import { useKeyHandler } from "../../hooks/useKeyHandler";
import type { Country } from "../../types/country";
import { getLanguagesDisplay } from "../../utils/countryData";

type CountryDetailsModalProps = {
  country: Country;
  onClose: () => void;
  isOpen: boolean
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: 12,
          minWidth: 320,
          maxWidth: 400,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: "#0078d4",
          }}
          aria-label="Close"
        >
          ×
        </button>
        <h2 style={{ marginTop: 0 }}>{country.name}</h2>
        <CountryFlag
          isoCode={country.isoCode}
          size="64x48"
          alt={`${country.name} flag`}
          style={{ marginBottom: 16 }}
        />
        <ul style={{ listStyle: "none", padding: 0 }}>
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
          style={{
            color: "#0078d4",
            textDecoration: "underline",
            fontWeight: "bold",
            display: "inline-block",
            marginTop: 16,
          }}
        >
          Wikipedia
        </a>
      </div>
    </div>,
    document.body
  );
}
