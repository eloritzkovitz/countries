import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Countries</h1>
      <div className="flex gap-8 mt-8">
        <Link
          to="/country-map"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-xl font-semibold no-underline hover:bg-blue-700 transition-colors"
        >
          View Countries
        </Link>
        <Link
          to="/flag-guess"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-xl font-semibold no-underline hover:bg-blue-700 transition-colors"
        >
          Guess the Flag
        </Link>
      </div>
    </div>
  );
}