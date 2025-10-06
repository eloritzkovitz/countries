import { ActionButton } from "../common/ActionButton";

export function GuessForm({
  guess,
  setGuess,
  handleGuess,
  skipFlag,
  disabled,
}: {
  guess: string;
  setGuess: (g: string) => void;
  handleGuess: (e: React.FormEvent) => void;
  skipFlag: () => void;
  disabled: boolean;
}) {
  return (
    <form onSubmit={handleGuess}>
      <input
        type="text"
        placeholder="Enter country name"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="px-4 py-2 text-lg rounded border border-gray-300 w-4/5 mb-4"
        disabled={disabled}
      />
      <div className="flex justify-center gap-4 mb-2">
        <ActionButton
          type="submit"
          colorClass="bg-blue-600 text-white hover:bg-blue-700"
          className="px-6 py-2 text-base rounded font-bold"
          disabled={disabled}
        >
          Guess
        </ActionButton>
        <ActionButton
          type="button"
          onClick={skipFlag}
          colorClass="bg-gray-200 text-gray-800 hover:bg-gray-300"
          className="px-6 py-2 text-base rounded font-bold"
          disabled={disabled}
        >
          Skip
        </ActionButton>
      </div>
    </form>
  );
}