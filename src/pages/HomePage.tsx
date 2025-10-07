import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <img
        src="/icons/icon.svg"
        alt="App Icon"
        className="w-32 h-32 mb-4"
        width={128}
        height={128}
      />      
      <h1 className="text-4xl font-extrabold mb-4 text-blue-700">Welcome to Countries Explorer</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-10">
        Explore countries on an interactive world map, manage your own overlays, and test your geography knowledge with our flag guessing game!
      </p>
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 w-full md:w-80">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Interactive Country Map</h2>
          <p className="text-gray-600 mb-4 text-center">
            Browse, filter, and learn about countries. Create overlays to track places you've visited or want to visit.
          </p>
          <Link
            to="/map"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold no-underline hover:bg-blue-700 transition-colors"
          >
            Explore Map
          </Link>
        </div>
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 w-full md:w-80">
          <h2 className="text-xl font-bold mb-2 text-blue-600">Flag Guessing Game</h2>
          <p className="text-gray-600 mb-4 text-center">
            Challenge yourself to identify flags from around the world. Can you guess them all?
          </p>
          <Link
            to="/game"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold no-underline hover:bg-blue-700 transition-colors"
          >
            Play Game
          </Link>
        </div>
      </div>
      <footer className="mt-12 text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} Countries Explorer &mdash; All rights reserved.
      </footer>
    </div>
  );
}