export function Scoreboard({ score, streak }: { score: number; streak: number }) {
  return (
    <div className="flex justify-between items-center w-full max-w-md mb-6 px-2">
      <div className="bg-white rounded-lg shadow px-4 py-2 flex-1 flex justify-center items-center gap-8 text-2xl font-semibold text-gray-700">
        <span>
          Score: <b>{score}</b>
        </span>
        <span>
          Streak: <b>{streak}</b>
        </span>
      </div>
    </div>
  );
}