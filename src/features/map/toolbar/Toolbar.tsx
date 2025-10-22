import { useState } from "react";
import {
  FaLayerGroup,
  FaChevronLeft,
  FaChevronRight,
  FaMapPin,
  FaDownload,
  FaCog,
} from "react-icons/fa";
import { ActionButton } from "@components";
import { useUI } from "@contexts/UIContext";
import { ZoomControls } from "./ZoomControls";
import { MapExportModal } from "../export/MapExportModal";
import "./toolbar.css";

export function Toolbar({
  zoom,
  setZoom,
  svgRef,
  children,
}: {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  svgRef: React.RefObject<SVGSVGElement | null>;
  children?: React.ReactNode;
}) {
  // UI state
  const {
    uiVisible,
    toggleMarkers,
    toggleOverlays,
    toggleExport,
    toggleSettings,
  } = useUI();
  const [visible, setVisible] = useState(true);

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
      {/* Actions and toggle: aligned horizontally */}
      <div className="relative flex items-center" style={{ height: "40px" }}>
        {/* Actions: horizontal slide */}
        <div
          className={`toolbar-actions-row ${
            visible
              ? "toolbar-actions-row-visible"
              : "toolbar-actions-row-hidden"
          }`}
        >
          <ActionButton
            onClick={toggleMarkers}
            ariaLabel="Markers"
            title="Markers"
            className="toolbar-btn"
            icon={<FaMapPin />}
          />
          <ActionButton
            onClick={toggleOverlays}
            ariaLabel="Overlays"
            title="Overlays"
            className="toolbar-btn"
            icon={<FaLayerGroup />}
          />
          <ActionButton
            onClick={toggleExport}
            ariaLabel="Export"
            title="Export"
            className="toolbar-btn"
            icon={<FaDownload />}
          />
          <MapExportModal svgRef={svgRef} />
          <div className="mx-2 w-px h-6 bg-gray-400/30" /> {/* Separator */}
          <ActionButton
            onClick={toggleSettings}
            ariaLabel="Settings"
            title="Settings"
            className="toolbar-btn"
            icon={<FaCog />}
          />
          {children}
        </div>
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
