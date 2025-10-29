import type { Trip } from "@types";
import { FaEdit, FaTrash } from "react-icons/fa";

export function TripActions({
  trip,
  onEdit,
  onDelete,
}: {
  trip: Trip;
  onEdit: (t: Trip) => void;
  onDelete: (t: Trip) => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        className="px-2 py-1 bg-yellow-500 text-white rounded"
        onClick={() => onEdit(trip)}
        title="Edit Trip"
      >
        <FaEdit />
      </button>
      <button
        className="px-2 py-1 bg-red-600 text-white rounded"
        onClick={() => onDelete(trip)}
        title="Delete Trip"
      >
        <FaTrash />
      </button>
    </div>
  );
}
