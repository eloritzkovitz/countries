import type { SovereigntyType } from "../../types/country";

type SovereigntyBadgeProps = {
  type?: SovereigntyType;
};

// Define colors for different sovereignty types
const sovereigntyColors: Record<SovereigntyType, string> = {
  Sovereign: "bg-blue-300 text-gray-700 dark:bg-blue-700 dark:text-gray-100",
  Dependency: "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-100",
  "Partially Recognized": "bg-yellow-300 text-gray-700 dark:bg-yellow-700 dark:text-gray-100",
  Unrecognized: "bg-red-300 text-gray-700 dark:bg-red-700 dark:text-gray-100",
  Disputed: "bg-red-300 text-gray-700 dark:bg-red-700 dark:text-gray-100",  
  Unknown: "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-100",
};

export function SovereigntyBadge({ type }: SovereigntyBadgeProps) {
  if (!type) return null;
  return (
    <div
      className={`mb-6 text-base text-center font-semibold rounded-full p-2 ${
        sovereigntyColors[type] ||
        "bg-blue-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
      }`}
    >
      {type}
    </div>
  );
}
