import React, { useState } from "react";
import { CountryFlag } from "../components/CountryFlag";
import { useCountryData } from "../context/CountryDataContext";
import type { Country } from "../types/country";
import { getRandomCountry } from "../utils/countryData";

export default function FlagGuessGamePage() {
  const { countries } = useCountryData();
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

  if (!countries.length || !currentCountry) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading countries...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: "2rem",
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h2>Guess the Country!</h2>
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
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1.1rem",
              borderRadius: 6,
              border: "1px solid #ccc",
              width: "80%",
              marginBottom: "1rem",
            }}
            disabled={result !== null}
          />
          <br />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1.5rem",
              fontSize: "1rem",
              borderRadius: 6,
              border: "none",
              background: "#0078d4",
              color: "#fff",
              cursor: "pointer",
            }}
            disabled={result !== null}
          >
            Guess
          </button>
        </form>
        {result !== null && (
          <div style={{ margin: "1rem 0", fontSize: "1.2rem" }}>
            {result ? (
              <span style={{ color: "green" }}>Correct! 🎉</span>
            ) : (
              <span style={{ color: "red" }}>
                Wrong! It was <b>{currentCountry.name}</b>
              </span>
            )}
            <br />
            <button
              onClick={nextFlag}
              style={{
                marginTop: "1rem",
                padding: "0.4rem 1.2rem",
                fontSize: "1rem",
                borderRadius: 6,
                border: "none",
                background: "#eee",
                color: "#333",
                cursor: "pointer",
              }}
            >
              Next Flag
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
