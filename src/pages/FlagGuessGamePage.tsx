import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { CountryFlag } from "../components/country/CountryFlag";
import { GuessForm } from "../components/game/GuessForm";
import { ResultMessage } from "../components/game/ResultMessage";
import { Scoreboard } from "../components/game/Scoreboard";
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
      <h1 className="mb-20 text-2xl font-bold text-blue-800 text-center">
        Guess the Country!
      </h1>

      {/* Scoreboard */}
      <Scoreboard score={score} streak={streak} />

      {/* Main Content */}
      <div className="max-w-md w-full p-8 rounded-xl bg-white shadow-lg text-center font-sans">
        <CountryFlag
          isoCode={currentCountry.isoCode}
          size="96x72"
          alt={currentCountry.name}
          style={{ width: "5rem", height: "auto", margin: "1rem 0" }}
        />
        <GuessForm
          guess={guess}
          setGuess={setGuess}
          handleGuess={handleGuess}
          skipFlag={skipFlag}
          disabled={result !== null}
        />
        {feedback && (
          <div className="text-red-500 mt-2">{feedback}</div>
        )}
        <ResultMessage
          result={result}
          currentCountry={currentCountry}
          nextFlag={nextFlag}
        />
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
