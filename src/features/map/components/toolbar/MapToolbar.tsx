import { useState } from "react";
import {
  FaGlobe,
  FaMapPin,
  FaLayerGroup,
  FaDownload,
  FaGear,
  FaClockRotateLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { ActionButton, ActionsToolbar, ToolbarSeparator } from "@components";
import { useOverlayContext } from "@contexts/OverlayContext";
import { useUI } from "@contexts/UIContext";
import { isTimelineOverlay } from "@features/overlays";
import { ZoomControls } from "./ZoomControls";
import "./MapToolbar.css";

export function MapToolbar({
  zoom,
  setZoom,
  setSnapshotMode,
  children,
}: {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setSnapshotMode: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}) {
  // UI state
  const {
    uiVisible,
    toggleCountries,
    toggleMarkers,
    toggleOverlays,
    toggleExport,
    toggleSettings,
  } = useUI();
  const [visible, setVisible] = useState(true);

  // Overlay context
  const { overlays } = useOverlayContext();
  const visitedOverlay = overlays.find((o) => o.id === "visited-countries");

  return (
    <div
      className={`toolbar-container ${
        uiVisible ? "toolbar-container-visible" : "toolbar-container-hidden"
      }`}
    >
      {/* Zoom controls: vertical slide */}
      <div
        className={`toolbar-zoom-controls ${
          visible
            ? "toolbar-zoom-controls-visible"
            : "toolbar-zoom-controls-hidden"
        }`}
      >
        <ZoomControls zoom={zoom} setZoom={setZoom} />
      </div>
      <div className="relative flex items-center" style={{ height: "40px" }}>
        {/* Actions: horizontal slide */}
        <ActionsToolbar
          className={
            visible
              ? "toolbar-actions-row-bg toolbar-actions-row-visible"
              : "toolbar-actions-row-bg toolbar-actions-row-hidden"
          }
        >
          <ActionButton
            onClick={toggleCountries}
            ariaLabel="Countries"
            title="Countries"
            className="toolbar-btn rounded-full"
            icon={<FaGlobe />}
          />
          <ActionButton
            onClick={toggleMarkers}
            ariaLabel="Markers"
            title="Markers"
            className="toolbar-btn rounded-full"
            icon={<FaMapPin />}
          />
          <ActionButton
            onClick={toggleOverlays}
            ariaLabel="Overlays"
            title="Overlays"
            className="toolbar-btn rounded-full"
            icon={<FaLayerGroup />}
          />
          {/* Snapshot toggle button */}
          {visitedOverlay && isTimelineOverlay(visitedOverlay) && (
            <ActionButton
              onClick={() => setSnapshotMode((prev) => !prev)}
              ariaLabel="Timeline"
              title="Timeline"
              className="toolbar-btn rounded-full"
              icon={<FaClockRotateLeft />}
            />
          )}
          <ActionButton
            onClick={toggleExport}
            ariaLabel="Export"
            title="Export"
            className="toolbar-btn rounded-full"
            icon={<FaDownload />}
          />
          <ToolbarSeparator />
          <ActionButton
            onClick={toggleSettings}
            ariaLabel="Settings"
            title="Settings"
            className="toolbar-btn rounded-full"
            icon={<FaGear />}
          />
          {children}
        </ActionsToolbar>
        {/* Toggle button */}
        <ActionButton
          onClick={() => setVisible((v) => !v)}
          ariaLabel={visible ? "Hide toolbar" : "Show toolbar"}
          title={visible ? "Hide toolbar" : "Show toolbar"}
          className={`toolbar-btn toolbar-btn-action ${
            !visible ? "opacity-70" : ""
          }`}
          icon={visible ? <FaChevronRight /> : <FaChevronLeft />}
        />
      </div>
    </div>
  );
}
