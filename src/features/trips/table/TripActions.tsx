import { useState, useRef } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { useClickOutside, useKeyHandler } from "@hooks";
import type { Trip } from "@types";
import { ActionButton } from "@components";

type TripActionsProps = {
  trip: Trip;
  onEdit: (t: Trip) => void;
  onDelete: (t: Trip) => void;
};

export function TripActions({ trip, onEdit, onDelete }: TripActionsProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useClickOutside([menuRef as any], () => setOpen(false), open);

  // Close menu on ESC key
  useKeyHandler(() => setOpen(false), ["Escape"], open);

  return (
    <div className="relative" ref={menuRef}>
      <ActionButton
        onClick={() => setOpen((v) => !v)}
        ariaLabel="More actions"
        title="More actions"
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        icon={<FaEllipsisV />}
      />
      {open && (
        <div className="trips-actions-menu">
          <ActionButton
            className="trips-actions-button"
            onClick={() => {
              setOpen(false);
              onEdit(trip);
            }}
            icon={<FaEdit className="mr-2" />}
          >
            Edit
          </ActionButton>
          <ActionButton
            className="trips-actions-button trips-actions-delete"
            onClick={() => {
              setOpen(false);
              onDelete(trip);
            }}
            icon={<FaTrash className="mr-2" />}
          >
            Delete
          </ActionButton>
        </div>
      )}
    </div>
  );
}
