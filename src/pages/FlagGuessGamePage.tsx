import React, { useState } from "react";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { CountryFlag } from "../components/country/CountryFlag";
import { useCountryData } from "../context/CountryDataContext";
import type { Country } from "../types/country";
import { getRandomCountry } from "../utils/countryData";

export default function FlagGuessGamePage() {
  const { countries, loading, error } = useCountryData();
  const [currentCountry, setCurrentCountry] = useState<Country | null>(() =>
    countries.length ? getRandomCountry(countries) : null
  );
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<null | boolean>(null);

  // Handle the guess submission
  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCountry) return;
    setResult(guess.trim().toLowerCase() === currentCountry.name.toLowerCase());
  };

  // Proceed to the next flag
  const nextFlag = () => {
    setCurrentCountry(countries.length ? getRandomCountry(countries) : null);
    setGuess("");
    setResult(null);
  };

  // Show loading or error states
  if (loading) return <LoadingSpinner message="Loading countries..." />;
  if (error) return <ErrorMessage error={error} />;
  if (!currentCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        <div>No country selected. Please try again or reload the page.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 rounded-xl bg-white shadow-lg text-center font-sans">
        <h2 className="mb-2 text-xl font-bold">Guess the Country!</h2>
        <CountryFlag
          isoCode={currentCountry.isoCode}
          size="96x72"
          alt={currentCountry.name}
          style={{ width: "5rem", height: "auto", margin: "1rem 0" }}
        />
        <form onSubmit={handleGuess}>
          <input
            type="text"
            placeholder="Enter country name"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="px-4 py-2 text-lg rounded border border-gray-300 w-4/5 mb-4"
            disabled={result !== null}
          />
          <br />
          <button
            type="submit"
            className="px-6 py-2 text-base rounded bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-700 transition-colors"
            disabled={result !== null}
          >
            Guess
          </button>
        </form>
        {result !== null && (
          <div className="my-4 text-lg">
            {result ? (
              <span className="text-green-600">Correct! 🎉</span>
            ) : (
              <span className="text-red-600">
                Wrong! It was <b>{currentCountry.name}</b>
              </span>
            )}
            <br />
            <button
              onClick={nextFlag}
              className="mt-4 px-5 py-2 text-base rounded bg-gray-200 text-gray-800 font-bold cursor-pointer hover:bg-gray-300 transition-colors"
            >
              Next Flag
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
