import type { TripStatus } from "@types";

// Define colors for each status
const statusColors: Record<TripStatus, string> = {
  planned:
    "bg-yellow-100 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100",
  "in-progress":
    "bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-blue-100",
  completed:
    "bg-green-100 text-green-900 dark:bg-green-700 dark:text-green-100",
  cancelled: "bg-red-100 text-red-900 dark:bg-red-700 dark:text-red-100",
};

export function StatusCell({ status }: { status?: TripStatus }) {
  // If no status is provided, return null
  if (!status) return null;    

  // Get the corresponding color classes for the status
  const color = statusColors[status] || statusColors.planned;

  return (
    <div className={`trips-status-card ${color}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </div>
  );
}
