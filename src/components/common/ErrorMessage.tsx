export function ErrorMessage({ error }: { error: string | Error }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
      <strong className="font-bold">Error:</strong>{" "}
      <span className="block">{typeof error === "string" ? error : error.message}</span>
    </div>
  );
}