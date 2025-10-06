import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ActionButton } from "../components/common/ActionButton";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { CountryFlag } from "../components/country/CountryFlag";
import { useCountryData } from "../context/CountryDataContext";
import type { Country } from "../types/country";
import { getRandomCountry } from "../utils/countryData";

export default function FlagGuessGamePage() {
  const { countries, loading, error } = useCountryData();
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<string>("");

  // Set the initial country when countries are loaded
  useEffect(() => {
    if (!loading && countries.length && !currentCountry) {
      setCurrentCountry(getRandomCountry(countries));
    }
  }, [loading, countries, currentCountry]);

  // Handle the guess submission
  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCountry) return;
    if (!guess.trim()) {
      setFeedback("Please enter a country name.");
      return;
    }
    const correct =
      guess.trim().toLowerCase() === currentCountry.name.toLowerCase();
    setResult(correct);
    setFeedback("");
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  // Proceed to the next flag
  const nextFlag = () => {
    setCurrentCountry(countries.length ? getRandomCountry(countries) : null);
    setGuess("");
    setResult(null);
    setFeedback("");
  };

  // Skip current flag
  const skipFlag = () => {
    setCurrentCountry(countries.length ? getRandomCountry(countries) : null);
    setGuess("");
    setResult(null);
    setFeedback("");
    setStreak(0);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-map">
      
      {/* Score and Streak Display */}
      <h1 className="mb-20 text-2xl font-bold text-blue-800 text-center">Guess the Country!</h1>
      <div className="flex justify-between items-center w-full max-w-md mb-6 px-2">
        <div className="bg-white rounded-lg shadow px-4 py-2 flex-1 flex justify-center items-center gap-8 text-2xl font-semibold text-gray-700">
          <span>
            Score: <b>{score}</b>
          </span>
          <span>
            Streak: <b>{streak}</b>
          </span>
        </div>
      </div>

      {/* Country Flag Display */}
      <div className="max-w-md w-full p-8 rounded-xl bg-white shadow-lg text-center font-sans">        
        <CountryFlag
          isoCode={currentCountry.isoCode}
          size="96x72"
          alt={currentCountry.name}
          style={{ width: "5rem", height: "auto", margin: "1rem 0" }}
        />
        <div className="flex justify-between mb-4 text-sm text-gray-600">
          <span>
            Score: <b>{score}</b>
          </span>
          <span>
            Streak: <b>{streak}</b>
          </span>
        </div>
        <form onSubmit={handleGuess}>
          <input
            type="text"
            placeholder="Enter country name"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="px-4 py-2 text-lg rounded border border-gray-300 w-4/5 mb-4"
            disabled={result !== null}
          />
          <div className="flex justify-center gap-4 mb-2">
            <ActionButton            
              type="submit"
              colorClass="bg-blue-600 text-white hover:bg-blue-700"
              className="px-6 py-2 text-base rounded font-bold"
              disabled={result !== null}
            >
              Guess
            </ActionButton>
            <ActionButton
              type="button"
              onClick={skipFlag}
              colorClass="bg-gray-200 text-gray-800 hover:bg-gray-300"
              className="px-6 py-2 text-base rounded font-bold"
              disabled={result !== null}
            >
              Skip
            </ActionButton>
          </div>
        </form>
        {feedback && <div className="text-red-500 mt-2">{feedback}</div>}
        {result !== null && (
          <div className="my-4 text-lg">
            {result ? (
              <span className="text-green-600">Correct! 🎉</span>
            ) : (
              <span className="text-red-600">
                Wrong! It was <b>{currentCountry.name}</b>
              </span>
            )}
            <div className="flex justify-center gap-4 mb-2 mt-4">
              <ActionButton
                onClick={nextFlag}
                colorClass="bg-blue-600 text-white hover:bg-blue-700"
                className="px-6 py-2 text-base rounded font-bold"
              >
                Next Flag
              </ActionButton>
            </div>
          </div>
        )}
        <div className="mt-8">
          <Link
            to="/"
            className="text-blue-600 underline font-semibold hover:text-blue-800"
          >
            &larr; Back
          </Link>
        </div>
      </div>
    </div>
  );
}
