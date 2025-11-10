import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { useClickOutside } from "@hooks/useClickOutside";
import { useKeyHandler } from "@hooks/useKeyHandler";
import type { Trip } from "@types";
import { ActionButton } from "@components";

type TripActionsProps = {
  trip: Trip;
  onEdit: (t: Trip) => void;
  onDelete: (t: Trip) => void;
};

export function TripActions({ trip, onEdit, onDelete }: TripActionsProps) {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const btnRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useClickOutside(
    [
      menuRef as React.RefObject<HTMLElement>,
      btnRef as React.RefObject<HTMLElement>,
    ],
    () => setOpen(false),
    open
  );

  // Close menu on ESC key
  useKeyHandler(() => setOpen(false), ["Escape"], open);

  // Position the menu when open
  useLayoutEffect(() => {
    if (open && btnRef.current && menuRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - btnRect.bottom;
      const spaceAbove = btnRect.top;

      let top = btnRect.bottom + window.scrollY;
      let left = btnRect.right - menuRect.width + window.scrollX;

      // Flip above if not enough space below
      if (spaceBelow < menuRect.height && spaceAbove > menuRect.height) {
        top = btnRect.top - menuRect.height + window.scrollY;
      }

      setMenuStyle({
        position: "absolute",
        top,
        left,
        zIndex: 1000,
      });
    }
  }, [open]);

  return (
    <>
      <div ref={btnRef}>
        <ActionButton
          onClick={() => setOpen((v) => !v)}
          ariaLabel="More actions"
          title="More actions"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          icon={<FaEllipsisV />}
        />
      </div>
      {open &&
        createPortal(
          <div ref={menuRef} className="trips-actions-menu" style={menuStyle}>
            <ActionButton
              className="trips-actions-button"
              onClick={() => {
                setTimeout(() => setOpen(false), 300);
                onEdit(trip);
              }}
              icon={<FaEdit className="mr-2" />}
            >
              Edit
            </ActionButton>
            <ActionButton
              className="trips-actions-button trips-actions-delete"
              onClick={() => {
                setTimeout(() => setOpen(false), 300);
                onDelete(trip);
              }}
              icon={<FaTrash className="mr-2" />}
            >
              Delete
            </ActionButton>
          </div>,
          document.body
        )}
    </>
  );
}
