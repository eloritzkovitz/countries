import { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { FormButton, FormField, Modal } from "@components";
import type { Trip } from "@types";

type TripModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (trip: Trip) => Promise<void>;
  initialTrip?: Trip | null;
};

export function TripModal({
  isOpen,
  onClose,
  onSave,
  initialTrip,
}: TripModalProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [countryCodes, setCountryCodes] = useState("");
  const [fullDays, setFullDays] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (initialTrip) {
      setName(initialTrip.name || "");
      setStartDate(initialTrip.startDate || "");
      setEndDate(initialTrip.endDate || "");
      setCountryCodes(initialTrip.countryCodes?.join(", ") || "");
      setFullDays(initialTrip.fullDays || 1);
      setNotes(initialTrip.notes || "");
    } else {
      setName("");
      setStartDate("");
      setEndDate("");
      setCountryCodes("");
      setFullDays(1);
      setNotes("");
    }
  }, [initialTrip, isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trip: Trip = {
      id: initialTrip?.id || Date.now().toString(),
      name,
      startDate,
      endDate,
      countryCodes: countryCodes
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      fullDays,
      notes,
    };
    onSave(trip).then(onClose);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="p-4 max-w-md mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaSave />
          {initialTrip ? "Edit Trip" : "Add Trip"}
        </h2>
        <FormField label="Name" className="mb-2">
          <input
            className="border px-2 py-1 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>
        <FormField label="Start Date" className="mb-2">
          <input
            type="date"
            className="border px-2 py-1 w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormField>
        <FormField label="End Date" className="mb-2">
          <input
            type="date"
            className="border px-2 py-1 w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormField>
        <FormField label="Country Codes (comma separated)" className="mb-2">
          <input
            className="border px-2 py-1 w-full"
            value={countryCodes}
            onChange={(e) => setCountryCodes(e.target.value)}
          />
        </FormField>
        <FormField label="Full Days" className="mb-2">
          <input
            type="number"
            min={1}
            className="border px-2 py-1 w-full"
            value={fullDays}
            onChange={(e) => setFullDays(Number(e.target.value))}
          />
        </FormField>
        <FormField label="Notes" className="mb-2">
          <input
            className="border px-2 py-1 w-full"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </FormField>
        <div className="flex gap-2 mt-4">
          <FormButton type="submit" className="bg-blue-600 text-white">
            <FaSave className="mr-2" />
            {initialTrip ? "Save Changes" : "Add Trip"}
          </FormButton>
          <FormButton
            type="button"
            className="bg-gray-400 text-white"
            onClick={onClose}
          >
            <FaTimes className="mr-2" />
            Cancel
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
