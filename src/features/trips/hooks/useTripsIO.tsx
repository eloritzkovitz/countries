import { useRef, useState } from "react";
import type { Trip } from "@types";
import {
  exportTripsToCSV,
  exportTripsToJSON,
  exportVisitedOverlay,
  importTripsFromFile,
} from "../utils/tripsIO";

export function useTripIO(trips: Trip[], addTrip: (trip: Trip) => void) {
  // Import state
  const [showImportNotice, setShowImportNotice] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Export state
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Import handlers
  function handleImportClick() {
    fileInputRef.current?.click();
  }

  // File change handler
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await importTripsFromFile(file, async (trip: Trip) => {
      addTrip(trip);
    });
    setShowImportNotice(false);
    e.target.value = ""; // reset input
  }

  // Confirm import after notice
  function confirmImport() {
    setShowImportNotice(true);
  }

  // Export to CSV handler
  function handleExportCSV() {
    exportTripsToCSV(trips);
    setShowExportMenu(false);
  }

  // Export to JSON handler
  function handleExportJSON() {
    exportTripsToJSON(trips);
    setShowExportMenu(false);
  }

  // Export visited overlay handler
  function handleExportVisitedOverlay() {
    exportVisitedOverlay(trips);
    setShowExportMenu(false);
  }

  return {
    showImportNotice,
    setShowImportNotice,
    fileInputRef,
    handleImportClick,
    handleFileChange,
    confirmImport,
    showExportMenu,
    setShowExportMenu,
    handleExportCSV,
    handleExportJSON,
    handleExportVisitedOverlay,
  };
}
