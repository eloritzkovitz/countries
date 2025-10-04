import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f6fa",
      }}
    >
      <h1>Countries</h1>
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <Link
          to="/country-map"
          style={{
            padding: "1rem 2rem",
            background: "#0078d4",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: "1.2rem",
          }}
        >
          View Countries
        </Link>
        <Link
          to="/flag-guess"
          style={{
            padding: "1rem 2rem",
            background: "#0078d4",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: "1.2rem",
          }}
        >
          Guess the Flag
        </Link>        
      </div>
    </div>
  );
}