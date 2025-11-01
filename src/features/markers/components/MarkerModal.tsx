import React, { useEffect, useRef } from "react";
import { FaMapPin, FaSave, FaTimes } from "react-icons/fa";
import {
  ActionButton,
  FormField,
  Modal,
  ModalActions,
  PanelHeader,
} from "@components";
import type { Marker } from "@types";
import "./Marker.css";

interface MarkerModalProps {
  open: boolean;
  coords: [number, number] | null;
  marker?: Marker;
  onSubmit: (name: string, color?: string, description?: string) => void;
  onClose: () => void;
}

export const MarkerModal: React.FC<MarkerModalProps> = ({
  open,
  coords,
  marker,
  onSubmit,
  onClose,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus the name input when the modal opens
  useEffect(() => {
    if (open && nameRef.current) {
      nameRef.current.focus();
    }
  }, [open]);

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      position="center"
      className="modal min-w-[900px] max-w-[1200px] max-h-[90vh]"
    >
      <PanelHeader
        title={
          <>
            <FaMapPin />
            {marker ? "Edit Marker" : "Add Marker"}
          </>
        }
      >
        <ActionButton onClick={onClose} ariaLabel="Close" title="Close">
          <FaTimes />
        </ActionButton>
      </PanelHeader>
      {open && (coords || marker) ? (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const fd = new FormData(form);
            const name = String(fd.get("name") || "");
            const color = fd.get("color") ? String(fd.get("color")) : undefined;
            const description = fd.get("description")
              ? String(fd.get("description"))
              : undefined;
            onSubmit(name, color, description);
          }}
        >
          <FormField label="Name">
            <input
              ref={nameRef}
              name="name"
              className="form-field"
              placeholder="Marker name"
              required
              defaultValue={marker?.name || ""}
              autoFocus
            />
          </FormField>
          <FormField label="Color">
            <input
              name="color"
              type="color"
              className="w-8 h-8 p-0 border rounded mt-1"
              defaultValue={marker?.color || "#e53e3e"}
            />
          </FormField>
          <FormField label="Description">
            <input
              name="description"
              className="form-field"
              placeholder="Description (optional)"
              defaultValue={marker?.description || ""}
            />
          </FormField>
          {coords && !marker && (
            <div className="text-xs text-gray-500">
              Location: {coords[0].toFixed(4)}, {coords[1].toFixed(4)}
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <ModalActions
              onCancel={onClose}
              submitIcon={
                marker ? (
                  <FaSave className="inline" />
                ) : (
                  <FaMapPin className="inline" />
                )
              }
              submitLabel={marker ? "Save Changes" : "Add Marker"}
            />
          </div>
        </form>
      ) : null}
    </Modal>
  );
};
