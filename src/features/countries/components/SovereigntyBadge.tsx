import { CountryFlag } from "@components";
import type { SovereigntyType } from "@types";

type SovereigntyBadgeProps = {
  type?: SovereigntyType;
  sovereign?: { name: string; isoCode?: string };
};

// Define colors for different sovereignty types
const badgeColors: Record<string, string> = {
  Blue: "bg-blue-300 text-gray-700 dark:bg-blue-700 dark:text-gray-100",
  Gray: "bg-gray-300 text-gray-700 dark:bg-gray-500 dark:text-gray-100",
  Green: "bg-green-300 text-gray-700 dark:bg-green-700 dark:text-gray-100",
  Yellow: "bg-yellow-300 text-gray-700 dark:bg-yellow-700 dark:text-gray-100",
  Red: "bg-red-300 text-gray-700 dark:bg-red-700 dark:text-gray-100",
};

export function SovereigntyBadge({ type, sovereign }: SovereigntyBadgeProps) {
  if (!type) return null;

  // Map sovereignty types to badge colors
  const color =
    type === "Sovereign"
      ? badgeColors.Blue
      : type === "Unrecognized"
      ? badgeColors.Red
      : type === "Overseas Region" || type === "Special Administrative Region"
      ? badgeColors.Green
      : type === "Disputed"
      ? badgeColors.Yellow
      : badgeColors.Gray;

  let label: React.ReactNode = type;

  if (
    (type !== "Sovereign" && type !== "Unrecognized") &&
    sovereign &&
    sovereign.name
  ) {
    label = (
      <>
        {type === "Special Administrative Region"
          ? "Special Administrative Region of "
          : type === "Overseas Region"
          ? "Overseas Region of "
          : type === "Disputed"
          ? "Disputed by "
          : "Dependency of "}
        {sovereign.isoCode && (
          <CountryFlag
            flag={{
              isoCode: sovereign.isoCode,
              source: "svg",
              style: "flat",
              size: "32x24",
            }}
            alt={`${sovereign.name} flag`}
            style={{
              marginLeft: 6,
              marginRight: 6,
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
        )}
        {sovereign.name}
      </>
    );
  }  

  return (
    <div
      className={`mb-6 text-base text-center font-semibold rounded-full p-2 ${color}`}
    >
      {label}
    </div>
  );
}
