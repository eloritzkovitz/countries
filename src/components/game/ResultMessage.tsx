import { ActionButton } from "../common/ActionButton";
import type { Country } from "../../types/country";

export function ResultMessage({
  result,
  currentCountry,
  nextFlag,
}: {
  result: boolean | null;
  currentCountry: Country;
  nextFlag: () => void;
}) {
  if (result === null) return null;
  return (
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
  );
}