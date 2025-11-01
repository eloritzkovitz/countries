import { Branding, HomeCard } from "@components";
import { FaGlobeAmericas, FaFlag, FaSuitcaseRolling } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Branding size={128} />
      <h1 className="text-4xl font-extrabold mb-4 text-blue-800 dark:text-gray-100">
        Welcome to Countries Explorer
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl text-center mb-10">
        Explore countries on an interactive world map, manage your own overlays,
        and test your geography knowledge with our flag guessing game!
      </p>
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <HomeCard
          icon={<FaGlobeAmericas className="w-16 h-16 text-blue-500" />}
          title="Interactive Country Map"
          description="Browse, filter, and learn about countries. Create overlays to track places you've visited or want to visit."
          linkTo="/map"
          linkText="Explore Map"
        />
        <HomeCard
          icon={<FaFlag className="w-16 h-16 text-green-500" />}
          title="Flag Guessing Game"
          description="Challenge yourself to identify flags from around the world. Can you guess them all?"
          linkTo="/game"
          linkText="Play Game"
        />
        <HomeCard
          icon={<FaSuitcaseRolling className="w-16 h-16 text-purple-500" />}
          title="Trips Log"
          description="Log your trips, see where you've been, and plan future adventures. Highlight visited countries and cities."
          linkTo="/trips"
          linkText="View Trips"
        />
      </div>
      <footer className="mt-12 text-gray-400 dark:text-gray-300 text-sm text-center">
        &copy; {new Date().getFullYear()} Countries Explorer &mdash; All rights
        reserved.
      </footer>
    </div>
  );
}
