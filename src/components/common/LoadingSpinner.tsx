export function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid mb-4"></div>
      {message && <div className="text-blue-700 font-semibold">{message}</div>}
    </div>
  );
}